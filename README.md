# Sylvestre Zongo — Personal Portfolio

A bilingual (English/French), responsive cybersecurity and development portfolio with a terminal-inspired visual identity.

## Stack
- HTML5
- CSS3 (responsive layout, animations, reduced-motion support)
- Vanilla JavaScript
- GitHub public contribution calendar endpoint

## Run locally
Open `index.html` in your browser. No build tools or package installation are required.
To test the certificate file checks, serve the folder over HTTP (for example, `python -m http.server`); browsers restrict requests from `file://` pages.

## Personalise before publishing

### 1. Update your portrait
The page uses `assets/profile.jpg`. Replace that file with your portrait, keeping the same filename, or update the image path in `index.html`. The included SVG is used as a fallback if the JPG cannot be loaded.

### 2. Maintain credentials and professional information
The new sections are populated from `portfolio-data.js`. Add or update records there; each text description supports `en` and `fr`.

Place certificate PDFs in `assets/documents/certificates/` and academic PDFs in `assets/documents/academic/`. Then set each record's `pdfPath` to its relative path. The page checks that the file exists before enabling the view and download actions. Leave paths and verification URLs `null` until real documents or public verification links are available.

Experience types, dates, responsibilities, achievements, technologies, and evidence links are also maintained in `portfolio-data.js`. Only add details that can be confirmed. In the professional footprint list, use `url: null` until a public profile or project URL is confirmed.

### 3. Add your CV
When your CV is ready, place it in `assets/` and add a download link in the hero section.

## Publish with GitHub Pages
1. Create a repository named `CyberSly0312.github.io` (or use an existing portfolio repository).
2. Upload the contents of this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. Your site will be available at `https://CyberSly0312.github.io` after deployment completes.

## Notes
- The contribution calendar is fetched from a public community endpoint. It may be unavailable temporarily; the page displays a fallback message.
- GitHub's unauthenticated REST API is not used for private data.
- Project links and descriptions should be checked before publishing.
- Do not add private credentials or API tokens to this static site.
