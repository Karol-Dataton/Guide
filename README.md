# WO Guide

Documentation suite for **Dataton WATCHOUT** — the WATCHOUT 7 User Guide, hardware manuals for the WATCHPAX media server family, and a set of supporting tools.

All modules are vanilla HTML/CSS/JavaScript with no bundler. Open any `index.html` directly in a browser, or build the static output with Node.js scripts.

---

## Repository layout

```
WO_keys/
├── wiki/               # WATCHOUT 7 User Guide
├── hardware/
│   ├── WP30/           # WATCHPAX 30 User Guide
│   ├── WP50/           # WATCHPAX 50 User Guide (stub — content pending)
│   └── WP64/           # WATCHPAX 64 User Guide
└── index.html          # Root redirect → wiki/index.html
```

---

## Modules

### `wiki/` — WATCHOUT 7 User Guide

Full documentation for WATCHOUT 7, built from Markdown source files.

```bash
cd wiki
npm run build      # build-content.js + generate-static.js
npm run pdf        # generate PDF export
npm run release    # bump version and publish
```

| Script | Purpose |
|---|---|
| `scripts/build-content.js` | Converts `content/**/*.md` → `content-data.js` |
| `scripts/generate-static.js` | Renders fully static HTML pages from `content-data.js` |
| `scripts/generate-pdf.js` | Exports a combined PDF via Puppeteer |
| `scripts/release.js` | Bumps `version.html` and tags a release |

Content lives in `wiki/content/<chapter>/<page>.md`. Interactive widgets are standalone HTML files in `wiki/widgets/`.

### `hardware/WP64/` and `hardware/WP30/` — Hardware Manuals

Same build pipeline as the main wiki.

```bash
cd hardware/WP64
npm run build
```

### `hardware/WP50/` — WATCHPAX 50 Manual (stub)

Structure is in place; all content pages contain `TODO` placeholders. Run `npm run build` once content has been authored.
---

## Development notes

- **No build tools required** for browsing — open any `index.html` directly.
- **Node.js ≥ 18** is required for the build scripts.
- `.DS_Store` files are gitignored.
- Generated files (`content-data.js`, `toc-data.js`, and static `*.html` pages in wiki chapters) are committed for deployment but should be re-generated after content changes.

---
