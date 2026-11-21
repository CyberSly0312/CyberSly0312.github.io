"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { safeDocumentPath, safeImagePath, externalUrl } = require("../assets/js/security-utils.js");

// Synthetic valid paths are used here. Real personal certificate documents are
// deliberately not referenced by tests, data files or public configuration.

test("accepts valid PDF paths in the approved public folders", () => {
  assert.equal(safeDocumentPath("assets/documents/certificates/example.pdf"),
    "assets/documents/certificates/example.pdf");
  assert.equal(safeDocumentPath("assets/documents/academic/diploma.pdf"),
    "assets/documents/academic/diploma.pdf");
  assert.equal(safeDocumentPath("assets/documents/certificates/nested/example.pdf"),
    "assets/documents/certificates/nested/example.pdf");
  assert.equal(safeDocumentPath("assets/documents/certificates/Example Certificate.PDF"),
    "assets/documents/certificates/Example Certificate.PDF");
});

test("rejects literal traversal and dot segments", () => {
  assert.equal(safeDocumentPath("assets/documents/certificates/../private.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/../../private.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/./example.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/../academic/private.pdf"), null);
});

test("rejects URL-encoded dots and slashes", () => {
  assert.equal(safeDocumentPath("assets/documents/certificates/%2e%2e/private.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/%2e%2e%2fprivate.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/%2E%2E%2Fprivate.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/%2e%2E/private.pdf"), null);
});

test("rejects double-encoded traversal attempts", () => {
  assert.equal(safeDocumentPath("assets/documents/certificates/%252e%252e/private.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/%252e%252e%252fprivate.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/%252E%252E%252Fprivate.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/%25252e%25252e/private.pdf"), null);
});

test("rejects mixed-case, malformed and stray encodings", () => {
  assert.equal(safeDocumentPath("assets/documents/certificates/%2e%2E%2fprivate.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/%2e%2e%2Fprivate.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/%/private.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/%zz/private.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/%2/private.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/example%20copy.pdf"), null);
});

test("rejects absolute paths, backslashes and alternate schemes", () => {
  assert.equal(safeDocumentPath("/assets/documents/certificates/example.pdf"), null);
  assert.equal(safeDocumentPath("C:\\assets\\documents\\certificates\\example.pdf"), null);
  assert.equal(safeDocumentPath("assets\\documents\\certificates\\example.pdf"), null);
  assert.equal(safeDocumentPath("https://example.org/assets/documents/certificates/example.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/example.pdf?download=1"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/example.pdf#page=1"), null);
});

test("rejects paths outside the approved folders and non-PDF files", () => {
  assert.equal(safeDocumentPath("private-documents/example.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/private-documents/example.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/private-documents/example.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/achievements/example.pdf"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/example.png"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/example.pdf.txt"), null);
  assert.equal(safeDocumentPath("assets/documents/certificates//example.pdf"), null);
  assert.equal(safeDocumentPath(""), null);
  assert.equal(safeDocumentPath(null), null);
});

test("accepts valid image paths in the approved public folders", () => {
  assert.equal(safeImagePath("assets/documents/certificates/badge.png"),
    "assets/documents/certificates/badge.png");
  assert.equal(safeImagePath("assets/documents/achievements/badge.webp"),
    "assets/documents/achievements/badge.webp");
  assert.equal(safeImagePath("assets/icons/issuers/cisco.png"),
    "assets/icons/issuers/cisco.png");
  assert.equal(safeImagePath("assets/icons/issuers/microsoft.png"),
    "assets/icons/issuers/microsoft.png");
  assert.equal(safeImagePath("assets/icons/issuers/google.png"),
    "assets/icons/issuers/google.png");
  assert.equal(safeImagePath("assets/icons/issuers/anssi.png"),
    "assets/icons/issuers/anssi.png");
  assert.equal(safeImagePath("assets/images/issuers/anssi.png"),
    "assets/images/issuers/anssi.png");
  assert.equal(safeImagePath("assets/icons/issuers/tatu.png"),
    "assets/icons/issuers/tatu.png");
  assert.equal(safeImagePath("assets/documents/certificates/Badge.JPEG"),
    "assets/documents/certificates/Badge.JPEG");
});

test("rejects unsafe image paths without weakening PDF validation", () => {
  assert.equal(safeImagePath("assets/documents/certificates/../private.png"), null);
  assert.equal(safeImagePath("assets/documents/certificates/%2e%2e/private.png"), null);
  assert.equal(safeImagePath("assets/documents/certificates/%252e%252e/private.png"), null);
  assert.equal(safeImagePath("assets/documents/certificates/./badge.png"), null);
  assert.equal(safeImagePath("assets/documents/certificates//badge.png"), null);
  assert.equal(safeImagePath("assets/documents/private-documents/badge.png"), null);
  assert.equal(safeImagePath("assets/documents/certificates/private-documents/badge.png"), null);
  assert.equal(safeImagePath("assets/images/issuers/../private-documents/anssi.png"), null);
  assert.equal(safeImagePath("assets/images/issuers/%2e%2e/private-documents/anssi.png"), null);
  assert.equal(safeImagePath("assets/images/issuers/anssi.svg"), null);
  assert.equal(safeImagePath("/assets/documents/certificates/badge.png"), null);
  assert.equal(safeImagePath("https://example.org/badge.png"), null);
  assert.equal(safeImagePath("assets/documents/certificates/badge.svg"), null);
  assert.equal(safeImagePath("assets/icons/issuers/cisco.svg"), null);
  assert.equal(safeImagePath("assets/documents/certificates/badge.pdf"), null);
  assert.equal(safeImagePath(""), null);
  assert.equal(safeImagePath(null), null);
  assert.equal(safeDocumentPath("assets/documents/certificates/badge.png"), null);
});

test("accepts only valid HTTPS external URLs", () => {
  assert.equal(externalUrl("https://example.org/path?q=1"), "https://example.org/path?q=1");
  assert.match(externalUrl("  https://github.com/CyberSly0312  "), /^https:\/\/github\.com\/CyberSly0312\/?$/);
});

test("rejects unsafe and malformed external URLs", () => {
  assert.equal(externalUrl("http://example.org"), null);
  assert.equal(externalUrl("javascript:alert(1)"), null);
  assert.equal(externalUrl("data:text/html,<script>alert(1)</script>"), null);
  assert.equal(externalUrl("file:///etc/passwd"), null);
  assert.equal(externalUrl("https://user:pass@example.org"), null);
  assert.equal(externalUrl("//example.org"), null);
  assert.equal(externalUrl("/relative/path"), null);
  assert.equal(externalUrl("https://"), null);
  assert.equal(externalUrl("not a url"), null);
  assert.equal(externalUrl(""), null);
  assert.equal(externalUrl(null), null);
});
