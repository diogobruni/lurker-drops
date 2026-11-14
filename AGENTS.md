# Repository Instructions

## Layout

- `app/` holds the Chrome extension (Lurker Drops) and everything it needs to build and release: source, public assets, tests, scripts, and its own `package.json`, lockfile, and build configs. Its instructions live in `app/AGENTS.md`. Run extension commands inside `app/`.
- `website/` holds the product site (Astro, published on GitHub Pages), fully isolated from the extension. Its instructions live in `website/AGENTS.md`. Run site commands inside `website/`.
- The repository root keeps only shared files: READMEs, `AGENTS.md`, `.github/`, `chrome-web-store/` (store listing text), and `demo-screens/`.
