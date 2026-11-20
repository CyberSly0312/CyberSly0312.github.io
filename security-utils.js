/*
 * Shared validation helpers used by the browser and by Node tests.
 *
 * Browser: exposes window.safeDocumentPath / window.externalUrl.
 * Node:    module.exports = { safeDocumentPath, externalUrl }.
 *
 * Both validators are deliberately allow-list based. They never decode user
 * input: any percent-encoded input is rejected outright, which blocks
 * single-encoded, double-encoded, mixed-case and malformed traversal attempts
 * without ever calling decodeURIComponent().
 */
(function (global) {
  "use strict";

  // HTTPS only: no credentials, no javascript:/data:/file:/http: schemes.
  function externalUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value.trim());
      if (url.protocol !== "https:") return null;
      if (url.username || url.password) return null;
      return url.href;
    } catch (error) {
      return null;
    }
  }

  const PUBLIC_DOCUMENT_ROOT = /^assets\/documents\/(certificates|academic)\//i;

  // Only files inside the two approved public folders can ever become links.
  function safeDocumentPath(path) {
    if (typeof path !== "string" || !path.trim()) return null;
    const value = path.trim();

    // Control characters and every percent sign are rejected. This blocks
    // %2e, %2E, %2f, %2F, %252e, %252f, mixed case, and malformed encodings
    // such as "%", "%zz" or "%2" without decoding anything.
    if (value.includes("%") || /[\u0000-\u001F\u007F]/.test(value)) return null;

    // No backslashes, schemes, query strings, fragments or absolute paths.
    if (value.includes("\\") || value.includes("://") || value.includes("?") ||
        value.includes("#") || value.startsWith("/")) return null;

    // Must live under one of the two approved public document directories.
    if (!PUBLIC_DOCUMENT_ROOT.test(value)) return null;

    const parts = value.slice("assets/documents/".length).split("/");
    // Reject empty segments, traversal, and any private-documents segment.
    if (parts.some(part => part === "" || part === "." || part === ".." ||
                    part.toLowerCase() === "private-documents")) return null;

    // Public documents are PDFs only.
    if (!/\.pdf$/i.test(value)) return null;

    return value;
  }

  const api = { externalUrl: externalUrl, safeDocumentPath: safeDocumentPath };

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    global.externalUrl = externalUrl;
    global.safeDocumentPath = safeDocumentPath;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
