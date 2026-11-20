Mozilla PDF.js — vendored pinned build
Version: 4.10.38
License: Apache-2.0 (see LICENSE)
Source: https://registry.npmjs.org/pdfjs-dist/-/pdfjs-dist-4.10.38.tgz
npm package shasum: 3ee698003790dc266cc8b55c0e662ccb9ae18f53
npm package integrity: sha512-/Y3fcFrXEAsMjJXeL9J8+ZG9U01LbuWaYypvDW2ycW1jL269L3js3DVBjDJ0Up9Np1uqDXsDrRihHANhZOlwdQ==

Files copied from the npm package without modification:
- package/build/pdf.min.mjs              -> pdf.min.mjs
  SHA-256: 27FC2A057A00F92A4334AD06E17DBD7259912954E9FB7F76400BCCA5FD190A9C
- package/build/pdf.worker.min.mjs       -> pdf.worker.min.mjs
  SHA-256: 1BAA1844C89C80A5B2797C916E75AB29254BE46D8E9CB53CB6364D7AAD84BE36
- package/LICENSE                        -> LICENSE

Only these core files are included. The PDF.js web viewer, download manager,
printing UI and remote resources are intentionally not vendored. The portfolio
uses the core API to render pages into a custom modal canvas.
