# Sylvestre Zongo — Personal Portfolio

A bilingual (English/French), responsive cybersecurity and development portfolio with a terminal-inspired visual identity.

## Stack

- HTML5
- CSS3 (responsive layout, animations, reduced-motion support)
- Vanilla JavaScript
- Static JSON files loaded with `fetch()`
- GitHub Pages (no backend, no database, no build step)

## Run locally

JavaScript `fetch()` does not work from `file://` pages in most browsers. Serve the folder over HTTP instead:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. If the JSON files cannot be loaded, the page displays a bilingual error message instead of empty sections.

## Project structure

```text
index.html              # GitHub Pages entry point (stays at repository root)
.gitignore
.nojekyll
README.md
assets/
  css/
    style.css           # global layout, theme and responsive rules
    professional.css    # cards, footprint icons and in-page PDF viewer styles
  js/
    data-loader.js      # fetches the four public JSON files
    security-utils.js   # shared path and URL validators
    script.js           # rendering, i18n, terminal and profile links
    pdf-viewer.js       # dynamically imported PDF.js modal viewer
    network-background.js
  images/
    profile.jpg
    profile-placeholder.svg
    issuers/            # public issuer emblem artwork (for example ANSSI)
  icons/
    issuers/            # public issuer logos
    platforms/          # platform mask icons used by CSS
  documents/
    certificates/       # public certificate PDFs and badge images
    academic/           # public diploma / transcript PDFs
    achievements/       # optional public achievement PDFs
data/
  public/
    certifications.json # professional certifications + academic records
    experience.json     # professional experience timeline
    projects.json       # selected projects
    profiles.json       # GitHub, LinkedIn, TryHackMe, Hack The Box, CyberDefenders, etc.
vendor/
  pdfjs/4.10.38/        # pinned PDF.js core, worker and licence
tests/
  security-utils.test.js
private-documents/      # IGNORED BY GIT — local only, never published
  certificates/
  academic/
  personal/
  logo/
```

Only files inside `assets/documents/certificates/` and `assets/documents/academic/` can be linked from JSON. `safeDocumentPath()` in `assets/js/security-utils.js` enforces these rules:

- The path must be a non-empty relative string starting exactly with `assets/documents/certificates/` or `assets/documents/academic/`.
- No `%` characters are allowed anywhere. Input is **never decoded**, so `%2e%2e`, `%2e%2e%2f`, `%252e%252e`, `%252e%252e%252f`, mixed-case and malformed encodings are all rejected.
- No absolute paths (leading `/`), no backslashes, no `://`, no query string (`?`) and no fragment (`#`).
- No `.` or `..` path segments, no empty `//` segments and no `private-documents` segment.
- The filename must end in `.pdf` (case-insensitive).

The page then checks each accepted file with a `HEAD` request before enabling the **View** action. View opens a custom in-page modal viewer; there is no Download action.

`assets/js/data-loader.js` fetches the four JSON files and dispatches `portfolio:ready` or `portfolio:error`. `assets/js/script.js` renders the sections from that data. There is no second copy of the data in JavaScript.

## Maintain content

All text fields that appear in both languages use this shape:

```json
{ "en": "English text", "fr": "Texte français" }
```

Plain strings are also accepted; they are shown in both languages.

### Add a public certificate

1. Put the PDF in `assets/documents/certificates/`.
2. Add one entry to `certifications.json` → `certifications` with `"visibility": "public"`.
3. Test locally with `python -m http.server`.
4. Commit and push (only when you are ready to publish).

Example entry:

```json
{
  "id": "example-certificate",
  "visibility": "public",
  "category": "security",
  "categoryLabel": { "en": "Security", "fr": "Sécurité" },
  "title": { "en": "Example Certificate", "fr": "Certificat exemple" },
  "issuer": "Issuing Organization",
  "issuerLogo": "assets/icons/issuers/example-issuer.png",
  "issueDate": "2026-01-15",
  "description": { "en": "Short public description.", "fr": "Brève description publique." },
  "badgeImage": "assets/documents/certificates/example-badge.png",
  "pdfPath": "assets/documents/certificates/example-certificate.pdf",
  "verificationUrl": "https://example.org/verify/123",
  "credentialId": "ABC-123"
}
```

`issuerLogo` and `badgeImage` are optional. A real issuer logo appears at the card's top-right; a real achievement badge is anchored at the bottom-right. `badgeImage` is never opened in the PDF viewer. Both paths are checked by `safeImagePath()`, which accepts only local PNG/JPG/JPEG/WebP files in `assets/documents/certificates/`, `assets/documents/achievements/`, `assets/icons/issuers/` or `assets/images/issuers/`. Leave `pdfPath` / `verificationUrl` as `null` until a real public file or link exists. Entries without `"visibility": "public"` are never rendered.

The ANSSI and TaTU logos are local transparent PNG copies of authentic public artwork (Wikimedia Commons `File:ANSSI.jpg` and the official `tatu.edu.gh` logo). The public ANSSI emblem used by the credential card is `assets/images/issuers/anssi.png`, a byte-for-byte copy of the official artwork; the original private file stays in ignored `private-documents/logo/`. TaTU is served from `assets/icons/issuers/tatu.png`. Contrast is handled by explicit allow-listed CSS variants rather than by altering the source artwork.

### Add an academic record

Add an entry to `certifications.json` → `academic` with an `institution`, optional `institutionLogo`, `programme`, optional `graduationDate`, optional `verificationUrl`, and a `documents` array of `{ "kind", "label", "pdfPath" }` entries. The institution logo appears at the card's top-right and uses the same `safeImagePath()` rules. Put diploma and transcript PDFs in `assets/documents/academic/`. Do not add student IDs, grades or other private student information.

### Update experience, projects or profile links

- `experience.json`: organization, job title, employment type, start/end dates, responsibilities, achievements, technologies, location.
- `projects.json`: title, visual (`school`, `shop` or `web`), status (`development` or `live`), description, technologies, URL.
- `profiles.json`: one object per public profile. Set `url` to `null` until a link is confirmed. GitHub, LinkedIn, the repository link and the header/contact links are all read from this file; no HTML edit is needed.

External URLs are validated by `externalUrl()` in `assets/js/security-utils.js`. Because the site is deployed over HTTPS, **only `https:` URLs are accepted**. `http:`, `javascript:`, `data:`, `file:`, protocol-relative URLs, relative paths, URLs with embedded credentials (`user:pass@host`) and malformed URLs are all rejected. Valid links always open with `target="_blank"` and `rel="noopener noreferrer"`.

### Single-source-of-truth notes

`profiles.json` is the source for the GitHub and LinkedIn links in the header, activity section, contact section, all-repositories link and the terminal `contact` output. Edit the URL there rather than in HTML or `assets/js/script.js`.

`Aganiwu Enterprise` currently appears in both `projects.json` and `profiles.json`, and the NexusSchool/ShopToo cards use the generic GitHub repositories URL. These are duplication risks rather than active bugs: if you later add a specific repository URL, update the matching entry in `projects.json` and remove the redundant `profiles.json` entry. No such redesign was done here to avoid regressions.

## Privacy and security notes

- `assets/documents/` holds **public** files. Anything committed there can be fetched directly by its URL, whether or not a JSON entry links to it.
- `private-documents/` is excluded through `.gitignore`. Files placed there stay on your machine and can never be turned into site links by the path validator.
- **`.gitignore` only affects untracked files.** It does not remove a file that is already tracked, and it does not undo anything already committed or published. To stop publishing a previously committed document you must explicitly remove it from the repository and push that change; shortening a `pdfPath` alone is not enough.
- Certificate filenames can themselves leak personal information. Use neutral filenames for any document you intend to commit and publish.
- Hiding a section does **not** protect a file: only put PDFs in `assets/documents/` if they are safe to publish.
- There is no authentication and no backend. Do not add tokens, private credentials or personal student records to this repository.
- A link's presence is not an endorsement or a verification claim.

## In-page PDF viewer

`assets/js/pdf-viewer.js` renders public PDF pages with a locally vendored, pinned Mozilla PDF.js core build in `vendor/pdfjs/4.10.38/`. Clicking **View Certificate** validates the path again with `safeDocumentPath()`, then renders the PDF into a canvas inside a modal. The browser's built-in PDF viewer is not used.

The viewer provides page navigation, a page indicator, zoom in/out, fit width/fit page, a loading state, error handling, Escape-to-close, focus management and background scroll locking. It has no Download, Print or direct-link controls. This only removes normal interface options: because files under `assets/documents/` are public static files, visitors can still retrieve the originals directly and no client-side interface can prevent that.

Only the two PDF.js core files and Apache-2.0 licence are vendored; the full PDF.js web viewer, download manager and print UI are intentionally excluded. Hashes are recorded in `vendor/pdfjs/4.10.38/README.txt`.

## TryHackMe badge

The existing TryHackMe entry in `profiles.json` owns both the dynamic badge and the public profile link. `assets/js/script.js` loads the supplied badge script exactly once inside a same-page frame so its `document.write()` is confined to that frame and cannot replace the portfolio. The frame uses `allow-scripts allow-same-origin` because TryHackMe's `frame-ancestors` policy blocks a fully opaque sandbox; only the exact pinned HTTPS script URL is accepted after `externalUrl()` validation. A clean bilingual profile-link fallback appears if the badge cannot load. The badge card is preserved in place across EN/FR switches, so the iframe is not reloaded and no duplicate TryHackMe card is created.

## Automated security tests

Run the validator tests with Node (no dependencies required):

```bash
node --test tests/security-utils.test.js
```

The suite covers valid PDF paths, literal traversal, single- and double-encoded traversal, mixed-case and malformed encodings, absolute paths, backslashes, unsafe extensions, private-document paths, HTTPS-only URLs and rejected URL schemes/credentials.

## Testing checklist

- JSON files load and sections render in English and French.
- Category filters show the right certifications and reset on language change.
- A missing or misspelled `pdfPath` leaves the actions disabled with a clear message.
- Existing PDFs open in the in-page viewer with page/zoom/fit controls; no new tab, Download or Print control is present.
- Verification URLs open in a new tab; invalid schemes are ignored.
- Profile links update from `profiles.json` without editing HTML.
- The TryHackMe badge renders in its card and survives an EN/FR switch without a duplicate card or a second script load.
- Issuer/institution logos stay at the top-right and achievement badges stay at the bottom-right on desktop and mobile, without overlapping text.
- Mobile layout, terminal, language switch, menu and contribution graph still work.
- Paths stay relative, so the site works on GitHub Pages from a repository root or subfolder.

## Publish with GitHub Pages

1. Create a repository named `CyberSly0312.github.io` (or use an existing portfolio repository).
2. Upload the contents of this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. Your site will be available at `https://CyberSly0312.github.io` after deployment completes.

Nothing is published automatically. Review the diff and push only when you are ready.

## Notes

- The contribution calendar is fetched from a public community endpoint. It may be unavailable temporarily; the page displays a fallback message.
- The portrait falls back to `assets/images/profile-placeholder.svg` if `assets/images/profile.jpg` is missing.
- Project links and descriptions should be checked before publishing.
