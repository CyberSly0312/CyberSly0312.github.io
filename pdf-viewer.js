/*
 * Custom PDF viewer for public certificate PDFs.
 *
 * The PDF.js web viewer, download manager and printing controls are not used.
 * PDF.js core renders individual pages into a canvas inside this modal, so the
 * portfolio never hands the document to the browser's built-in PDF viewer.
 *
 * Paths are validated again with safeDocumentPath() from security-utils.js.
 * The module never accepts arbitrary or remote document URLs.
 */

const PDFJS_VERSION = "4.10.38";
const PDFJS_URL = new URL(`vendor/pdfjs/${PDFJS_VERSION}/pdf.min.mjs`, document.baseURI).href;
const PDF_WORKER_URL = new URL(`vendor/pdfjs/${PDFJS_VERSION}/pdf.worker.min.mjs`, document.baseURI).href;
const MIN_SCALE = 0.2;
const MAX_SCALE = 4;

const DEFAULT_STRINGS = {
  title: "Certificate viewer",
  documentLabel: "Document",
  loading: "Loading PDF…",
  close: "Close viewer",
  previous: "Previous page",
  next: "Next page",
  page: "Page",
  of: "of",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  zoom: "Zoom",
  fitWidth: "Fit width",
  fitPage: "Fit page",
  error: "The PDF could not be loaded.",
  retry: "Retry",
  escape: "Esc to close",
  local: "Local PDF rendering · no download or print controls"
};

/*
 * The modal's layout normally comes from professional.css. If that stylesheet
 * is stale (a pre-viewer cached copy) or blocked, the modal would fall back to
 * a static block at the end of <body>. These rules are injected only when the
 * expected positioning is absent, so the viewer still works as a real modal.
 */
const CRITICAL_VIEWER_CSS = `
.pdf-viewer[hidden],.pdf-viewer__loading[hidden],.pdf-viewer__error[hidden]{display:none!important}
html.pdf-viewer-open,body.pdf-viewer-open{overflow:hidden!important}
body.pdf-viewer-open{position:fixed!important;left:0!important;right:0!important;width:100%!important}
.pdf-viewer{position:fixed!important;inset:0!important;z-index:2147483000!important;display:grid!important;place-items:center!important;padding:20px!important;box-sizing:border-box!important;font-family:var(--mono)}
.pdf-viewer__backdrop{position:absolute!important;inset:0!important;background:rgba(3,8,14,.86)!important;backdrop-filter:blur(7px)}
.pdf-viewer__dialog{position:relative!important;width:min(1040px,100%);height:min(820px,calc(100dvh - 40px));min-height:0;display:grid!important;grid-template-rows:auto auto minmax(0,1fr) auto;overflow:hidden;background:#0b1420;border:1px solid rgba(82,217,245,.34);border-radius:10px;box-shadow:0 30px 100px rgba(0,0,0,.7)}
.pdf-viewer__header{display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:16px!important;padding:17px 19px 13px!important;border-bottom:1px solid var(--line)!important}
.pdf-viewer__heading{min-width:0!important}
.pdf-viewer__close{flex:0 0 auto!important;width:32px!important;height:32px!important;display:grid!important;place-items:center!important;border:1px solid var(--line)!important;border-radius:4px!important;background:#101b29!important;color:var(--cyan)!important;font:18px var(--mono)!important;cursor:pointer!important}
.pdf-viewer__toolbar{display:flex!important;align-items:center!important;justify-content:center!important;flex-wrap:wrap!important;gap:6px!important;padding:10px 14px!important;border-bottom:1px solid var(--line)!important;background:#0a121d!important}
.pdf-viewer__stage{position:relative!important;min-height:0!important;overflow:auto!important;background:#060b12!important}
.pdf-viewer__canvas-wrap{min-width:100%!important;min-height:100%!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:14px!important}
.pdf-viewer__canvas{display:block!important;flex:0 0 auto!important;max-width:none!important;background:#fff!important}
.pdf-viewer__loading,.pdf-viewer__error{position:absolute!important;inset:0!important;z-index:2!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:10px!important;padding:20px!important;background:rgba(6,11,18,.88)!important;text-align:center!important}
.pdf-viewer__error{flex-direction:column!important}
.pdf-viewer__footer{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;padding:9px 16px!important;border-top:1px solid var(--line)!important}
@media(max-width:600px){.pdf-viewer{padding:10px!important}.pdf-viewer__dialog{width:100%!important;height:calc(100dvh - 20px)!important}.pdf-viewer__footer{flex-direction:column!important;align-items:flex-start!important}}
`;

let pdfjsPromise = null;
let modal = null;
let elements = null;
let pdfDocument = null;
let loadingTask = null;
let renderTask = null;
let renderToken = 0;
let pageNumber = 1;
let scale = 1;
let fitMode = "width";
let currentPath = null;
let currentTitle = "";
let currentStrings = { ...DEFAULT_STRINGS };
let lastError = null;
let lastFocusedElement = null;
let savedScrollY = 0;
let resizeObserver = null;

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text != null) element.textContent = String(text);
  return element;
}

function actionButton(className, label, ariaKey) {
  const button = node("button", className, label);
  button.type = "button";
  button.dataset.pdfAria = ariaKey;
  return button;
}

function t(key) {
  return currentStrings[key] || DEFAULT_STRINGS[key] || key;
}

function isOpen() {
  return Boolean(modal && !modal.hidden);
}

function ensureCriticalViewerStyles(dialog) {
  if (document.getElementById("pdfViewerCriticalStyles")) return;
  const modalStyle = getComputedStyle(modal);
  const dialogStyle = getComputedStyle(dialog);
  if (modalStyle.position === "fixed" && dialogStyle.position === "relative") return;
  const style = document.createElement("style");
  style.id = "pdfViewerCriticalStyles";
  style.textContent = CRITICAL_VIEWER_CSS;
  document.head.appendChild(style);
}

function lockPageScroll() {
  savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  document.documentElement.classList.add("pdf-viewer-open");
  document.body.classList.add("pdf-viewer-open");
  document.body.style.top = `-${savedScrollY}px`;
}

function unlockPageScroll() {
  document.documentElement.classList.remove("pdf-viewer-open");
  document.body.classList.remove("pdf-viewer-open");
  document.body.style.top = "";
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  try {
    window.scrollTo({ top: savedScrollY, left: 0, behavior: "auto" });
  } catch (error) {
    window.scrollTo(0, savedScrollY);
  }
  root.style.scrollBehavior = previousBehavior;
  savedScrollY = 0;
}

function ensureModal() {
  if (modal) return modal;

  modal = node("div", "pdf-viewer");
  modal.id = "pdfViewerModal";
  modal.hidden = true;
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "pdfViewerTitle");

  const backdrop = node("div", "pdf-viewer__backdrop");
  backdrop.setAttribute("aria-hidden", "true");

  const dialog = node("div", "pdf-viewer__dialog");
  dialog.setAttribute("role", "document");

  const header = node("header", "pdf-viewer__header");
  const headingGroup = node("div", "pdf-viewer__heading");
  const eyebrow = node("p", "pdf-viewer__eyebrow mono", "CERTIFICATE.VIEW");
  eyebrow.setAttribute("aria-hidden", "true");
  const title = node("h2", "pdf-viewer__title", t("title"));
  title.id = "pdfViewerTitle";
  const documentLabel = node("p", "pdf-viewer__document mono");
  headingGroup.append(eyebrow, title, documentLabel);

  const close = actionButton("pdf-viewer__close", "×", "close");
  close.id = "pdfViewerClose";
  header.append(headingGroup, close);

  const toolbar = node("div", "pdf-viewer__toolbar");
  toolbar.setAttribute("role", "toolbar");
  toolbar.dataset.pdfAria = "toolbar";

  const previous = actionButton("pdf-viewer__control pdf-viewer__page-control", "←", "previous");
  previous.id = "pdfViewerPrevious";
  const pageStatus = node("span", "pdf-viewer__status mono", `${t("page")} 1 ${t("of")} 1`);
  pageStatus.id = "pdfViewerPageStatus";
  pageStatus.setAttribute("aria-live", "polite");
  const next = actionButton("pdf-viewer__control pdf-viewer__page-control", "→", "next");
  next.id = "pdfViewerNext";

  const dividerOne = node("span", "pdf-viewer__divider");
  dividerOne.setAttribute("aria-hidden", "true");

  const zoomOut = actionButton("pdf-viewer__control", "−", "zoomOut");
  zoomOut.id = "pdfViewerZoomOut";
  const zoomStatus = node("span", "pdf-viewer__status mono", "100%");
  zoomStatus.id = "pdfViewerZoomStatus";
  const zoomIn = actionButton("pdf-viewer__control", "+", "zoomIn");
  zoomIn.id = "pdfViewerZoomIn";

  const dividerTwo = node("span", "pdf-viewer__divider");
  dividerTwo.setAttribute("aria-hidden", "true");

  const fitWidth = actionButton("pdf-viewer__control pdf-viewer__fit", t("fitWidth"), "fitWidth");
  fitWidth.id = "pdfViewerFitWidth";
  const fitPage = actionButton("pdf-viewer__control pdf-viewer__fit", t("fitPage"), "fitPage");
  fitPage.id = "pdfViewerFitPage";

  toolbar.append(previous, pageStatus, next, dividerOne, zoomOut, zoomStatus, zoomIn, dividerTwo, fitWidth, fitPage);

  const stage = node("div", "pdf-viewer__stage");
  stage.id = "pdfViewerStage";
  stage.tabIndex = 0;
  stage.setAttribute("aria-label", t("documentLabel"));

  const canvasWrap = node("div", "pdf-viewer__canvas-wrap");
  const canvas = node("canvas", "pdf-viewer__canvas");
  canvas.id = "pdfViewerCanvas";
  canvas.setAttribute("role", "img");
  canvasWrap.appendChild(canvas);

  const loading = node("div", "pdf-viewer__loading mono");
  loading.id = "pdfViewerLoading";
  const spinner = node("span", "pdf-viewer__spinner");
  spinner.setAttribute("aria-hidden", "true");
  const loadingText = node("span", "", t("loading"));
  loading.append(spinner, loadingText);

  const error = node("div", "pdf-viewer__error");
  error.id = "pdfViewerError";
  error.hidden = true;
  error.setAttribute("role", "alert");
  const errorText = node("p", "pdf-viewer__error-text mono", t("error"));
  const retry = actionButton("credential-action pdf-viewer__retry", t("retry"), "retry");
  error.append(errorText, retry);

  stage.append(canvasWrap, loading, error);

  const footer = node("footer", "pdf-viewer__footer mono");
  const escapeText = node("span", "", t("escape"));
  const localText = node("span", "", t("local"));
  footer.append(escapeText, localText);

  dialog.append(header, toolbar, stage, footer);
  modal.append(backdrop, dialog);
  document.body.appendChild(modal);
  ensureCriticalViewerStyles(dialog);

  elements = {
    backdrop: backdrop,
    toolbar: toolbar,
    title: title,
    documentLabel: documentLabel,
    close: close,
    previous: previous,
    pageStatus: pageStatus,
    next: next,
    zoomOut: zoomOut,
    zoomStatus: zoomStatus,
    zoomIn: zoomIn,
    fitWidth: fitWidth,
    fitPage: fitPage,
    stage: stage,
    canvas: canvas,
    loading: loading,
    loadingText: loadingText,
    error: error,
    errorText: errorText,
    retry: retry,
    escapeText: escapeText,
    localText: localText
  };

  backdrop.addEventListener("click", closePdfViewer);
  close.addEventListener("click", closePdfViewer);
  previous.addEventListener("click", () => goToPage(pageNumber - 1));
  next.addEventListener("click", () => goToPage(pageNumber + 1));
  zoomOut.addEventListener("click", () => zoomBy(1 / 1.2));
  zoomIn.addEventListener("click", () => zoomBy(1.2));
  fitWidth.addEventListener("click", () => setFitMode("width"));
  fitPage.addEventListener("click", () => setFitMode("page"));
  retry.addEventListener("click", () => {
    if (currentPath) openPdfViewer({ path: currentPath, title: currentTitle, strings: currentStrings });
  });

  applyLanguage();
  return modal;
}

function ariaLabels() {
  return {
    toolbar: `${t("zoom")} / ${t("page")}`,
    close: t("close"),
    previous: t("previous"),
    next: t("next"),
    zoomIn: t("zoomIn"),
    zoomOut: t("zoomOut"),
    zoom: t("zoom"),
    fitWidth: t("fitWidth"),
    fitPage: t("fitPage"),
    retry: t("retry")
  };
}

function applyLanguage() {
  if (!modal || !elements) return;
  const labels = ariaLabels();
  elements.title.textContent = t("title");
  elements.documentLabel.textContent = `${t("documentLabel")}: ${currentTitle}`;
  elements.toolbar.setAttribute("aria-label", labels.toolbar);
  elements.loadingText.textContent = t("loading");
  elements.stage.setAttribute("aria-label", currentTitle || t("documentLabel"));
  elements.escapeText.textContent = t("escape");
  elements.localText.textContent = t("local");
  elements.fitWidth.textContent = t("fitWidth");
  elements.fitPage.textContent = t("fitPage");
  elements.retry.textContent = t("retry");
  Object.keys(labels).forEach(key => {
    const target = key === "toolbar" ? elements.toolbar : elements[key];
    if (target) target.setAttribute("aria-label", labels[key]);
  });
  if (lastError) showError(lastError);
  updateControls();
}

function loadPdfJs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import(PDFJS_URL)
      .then(module => {
        const pdfjs = module && module.getDocument ? module : module.default;
        if (!pdfjs || typeof pdfjs.getDocument !== "function") {
          throw new Error("PDF.js core is unavailable");
        }
        if (pdfjs.GlobalWorkerOptions) {
          pdfjs.GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;
        }
        return pdfjs;
      })
      .catch(error => {
        pdfjsPromise = null;
        throw error;
      });
  }
  return pdfjsPromise;
}

function showLoading(visible) {
  if (elements) elements.loading.hidden = !visible;
}

function hideError() {
  lastError = null;
  if (elements) elements.error.hidden = true;
}

function showError(error) {
  lastError = error || new Error(t("error"));
  if (!elements) return;
  const detail = lastError && lastError.message ? ` ${lastError.message}` : "";
  elements.errorText.textContent = `${t("error")}${detail}`;
  elements.error.hidden = false;
  elements.loading.hidden = true;
  elements.canvas.style.visibility = "hidden";
}

function setControlsEnabled(enabled) {
  if (!elements) return;
  [elements.previous, elements.next, elements.zoomIn, elements.zoomOut,
   elements.fitWidth, elements.fitPage].forEach(button => { button.disabled = !enabled; });
}

function updateControls() {
  if (!elements) return;
  const total = pdfDocument ? pdfDocument.numPages : 1;
  pageNumber = Math.min(Math.max(pageNumber, 1), total);
  elements.pageStatus.textContent = `${t("page")} ${pageNumber} ${t("of")} ${total}`;
  elements.zoomStatus.textContent = `${Math.round(scale * 100)}%`;
  elements.previous.disabled = !pdfDocument || pageNumber <= 1;
  elements.next.disabled = !pdfDocument || pageNumber >= total;
  [elements.zoomIn, elements.zoomOut, elements.fitWidth, elements.fitPage].forEach(button => {
    button.disabled = !pdfDocument;
  });
  elements.fitWidth.setAttribute("aria-pressed", String(fitMode === "width"));
  elements.fitPage.setAttribute("aria-pressed", String(fitMode === "page"));
}

function destroyCurrentDocument() {
  renderToken += 1;
  if (renderTask) {
    try { renderTask.cancel(); } catch (error) { /* already finished */ }
    renderTask = null;
  }
  if (loadingTask && typeof loadingTask.destroy === "function") {
    try { loadingTask.destroy().catch(() => {}); } catch (error) { /* already destroyed */ }
  }
  loadingTask = null;
  pdfDocument = null;
}

function resetViewer() {
  destroyCurrentDocument();
  pageNumber = 1;
  scale = 1;
  fitMode = "width";
  hideError();
  setControlsEnabled(false);
  if (elements) {
    elements.canvas.style.visibility = "visible";
    const context = elements.canvas.getContext("2d");
    if (context) context.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
  }
  updateControls();
  showLoading(true);
}

function computeScale(baseViewport) {
  if (!elements || !baseViewport) return 1;
  const stageWidth = Math.max(160, elements.stage.clientWidth - 40);
  const stageHeight = Math.max(180, elements.stage.clientHeight - 40);
  let nextScale = scale;
  if (fitMode === "width") {
    nextScale = stageWidth / baseViewport.width;
  } else if (fitMode === "page") {
    nextScale = Math.min(stageWidth / baseViewport.width, stageHeight / baseViewport.height);
  }
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale));
}

async function renderCurrentPage() {
  if (!pdfDocument || !elements) return;
  const token = ++renderToken;
  if (renderTask) {
    try { renderTask.cancel(); } catch (error) { /* already finished */ }
    renderTask = null;
  }

  hideError();
  showLoading(true);
  elements.canvas.style.visibility = "visible";

  try {
    const page = await pdfDocument.getPage(pageNumber);
    if (token !== renderToken || !pdfDocument) return;
    const baseViewport = page.getViewport({ scale: 1 });
    scale = computeScale(baseViewport);
    const viewport = page.getViewport({ scale: scale });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(viewport.width * pixelRatio));
    const height = Math.max(1, Math.floor(viewport.height * pixelRatio));

    elements.canvas.width = width;
    elements.canvas.height = height;
    elements.canvas.style.width = `${Math.floor(viewport.width)}px`;
    elements.canvas.style.height = `${Math.floor(viewport.height)}px`;
    elements.canvas.setAttribute("aria-label", `${t("page")} ${pageNumber} ${t("of")} ${pdfDocument.numPages}`);

    const context = elements.canvas.getContext("2d");
    if (!context) throw new Error("Canvas is unavailable");
    const parameters = { canvasContext: context, viewport: viewport };
    if (pixelRatio !== 1) parameters.transform = [pixelRatio, 0, 0, pixelRatio, 0, 0];

    renderTask = page.render(parameters);
    await renderTask.promise;
    if (token === renderToken) updateControls();
  } catch (error) {
    if (error && error.name === "RenderingCancelledException") return;
    if (token === renderToken) showError(error);
  } finally {
    if (token === renderToken) showLoading(false);
  }
}

function goToPage(nextPage) {
  if (!pdfDocument) return;
  const clamped = Math.min(Math.max(nextPage, 1), pdfDocument.numPages);
  if (clamped === pageNumber) return;
  pageNumber = clamped;
  updateControls();
  renderCurrentPage();
}

function zoomBy(factor) {
  if (!pdfDocument) return;
  scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * factor));
  fitMode = "custom";
  updateControls();
  renderCurrentPage();
}

function setFitMode(mode) {
  if (!pdfDocument || (mode !== "width" && mode !== "page")) return;
  fitMode = mode;
  updateControls();
  renderCurrentPage();
}

function handleResize() {
  if (isOpen() && pdfDocument && fitMode !== "custom") renderCurrentPage();
}

function observeResize() {
  stopObservingResize();
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(elements.stage);
  } else {
    window.addEventListener("resize", handleResize);
  }
}

function stopObservingResize() {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
  window.removeEventListener("resize", handleResize);
}

function focusableElements() {
  if (!modal) return [];
  const candidates = [
    elements.close,
    elements.previous,
    elements.next,
    elements.zoomOut,
    elements.zoomIn,
    elements.fitWidth,
    elements.fitPage,
    elements.stage
  ];
  if (!elements.error.hidden) candidates.unshift(elements.retry);
  return candidates.filter(element => element && !element.disabled && element.offsetParent !== null);
}

function trapFocus(event) {
  const focusable = focusableElements();
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function handleKeydown(event) {
  if (!isOpen()) return;
  if (event.key === "Escape") {
    event.preventDefault();
    event.stopPropagation();
    closePdfViewer();
    return;
  }
  if (event.key === "Tab") {
    trapFocus(event);
    return;
  }
  if (document.activeElement === elements.stage && event.key === "ArrowRight") {
    event.preventDefault();
    goToPage(pageNumber + 1);
  }
  if (document.activeElement === elements.stage && event.key === "ArrowLeft") {
    event.preventDefault();
    goToPage(pageNumber - 1);
  }
}

async function openPdfViewer(options = {}) {
  const safePath = typeof window.safeDocumentPath === "function"
    ? window.safeDocumentPath(options.path)
    : null;
  if (!safePath) throw new Error("Rejected PDF path");

  if (options.strings) currentStrings = { ...DEFAULT_STRINGS, ...options.strings };
  currentPath = safePath;
  currentTitle = options.title || safePath.split("/").pop() || t("documentLabel");

  const wasOpen = isOpen();
  ensureModal();
  applyLanguage();
  resetViewer();

  if (!wasOpen) {
    lastFocusedElement = document.activeElement;
    lockPageScroll();
  }
  modal.hidden = false;
  document.addEventListener("keydown", handleKeydown);
  observeResize();
  requestAnimationFrame(() => elements.close.focus());

  try {
    const pdfjs = await loadPdfJs();
    loadingTask = pdfjs.getDocument({ url: safePath, withCredentials: false });
    pdfDocument = await loadingTask.promise;
    if (!isOpen()) return;
    setControlsEnabled(true);
    updateControls();
    await renderCurrentPage();
  } catch (error) {
    if (isOpen()) showError(error);
  }
}

function closePdfViewer() {
  if (!isOpen()) return;
  destroyCurrentDocument();
  modal.hidden = true;
  unlockPageScroll();
  document.removeEventListener("keydown", handleKeydown);
  stopObservingResize();
  showLoading(false);
  hideError();
  if (elements) elements.canvas.style.visibility = "visible";
  if (lastFocusedElement && lastFocusedElement.isConnected) lastFocusedElement.focus();
  lastFocusedElement = null;
}

function updateLanguage(strings, title) {
  if (strings) currentStrings = { ...DEFAULT_STRINGS, ...strings };
  if (typeof title === "string" && title) currentTitle = title;
  applyLanguage();
}

export { openPdfViewer, closePdfViewer, updateLanguage, isOpen };
