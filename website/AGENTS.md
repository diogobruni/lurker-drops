# Website Instructions

Prefer pnpm over npm. Run commands inside `website/`.

## Product site (GitHub Pages)

- The product page lives in `website/` and is fully isolated from the extension: its own `package.json`, lockfile, Astro config, and PostCSS config. Never import files from `app/` into it, and never add its dependencies to the extension package in `app/`.
- Local commands: `cd website && pnpm install`, `pnpm dev` (http://localhost:4321/lurker-drops/), and `pnpm build` (type check + static output in `website/dist/`).
- Deployment is branch-based, not GitHub Actions: `cd website && pnpm run deploy` builds and force-pushes `dist/` to the `gh-pages` branch. GitHub Pages serves that branch from `/`.
- Run `pnpm run deploy` after every version bump, after any change under `website/`, and after any release that changes the download asset, so the page always offers the current `latest` release.
- Verify after deploying: `https://diogobruni.github.io/lurker-drops/`, `/pt-br/`, and `/es/` must return 200.
- Keep `website/public/.nojekyll`; without it GitHub Pages ignores the `_astro/` assets.
- The site base path is `/lurker-drops`. If the repository is renamed or moved to a user site, update `site` and `base` in `website/astro.config.mjs`, the sitemap URL in `website/public/robots.txt`, and `start_url` plus icon paths in `website/public/site.webmanifest`.
- Never edit the `gh-pages` branch or `website/dist/` by hand; both are generated.
- Install buttons open the Chrome Web Store listing (`https://chromewebstore.google.com/detail/lurker-drops/ebcahoihcbkbebpebmdmofpfohnfinoc`). The manual option still uses `releases/latest/download/lurker-drops.zip`, produced by `.github/workflows/release.yml` on `v*` tags, so a release must exist before the download link works.
