# Project Instructions

Prefer pnpm over npm for all project commands. Fall back to npm only if pnpm is unavailable.

## Changelog

- `CHANGELOG.md` at the repository root is the internal changelog. It must be written in English only.
- Use Keep a Changelog-style headings: `Added`, `Changed`, `Fixed`, `Removed`.
- Keep version sections ordered oldest to newest and leave `[Unreleased]` as the last section.
- Record every new feature, behavior change, and fix under `[Unreleased]` as soon as it is implemented.
- On a version bump, rename `[Unreleased]` to `## [x.y.z] - YYYY-MM-DD` and open a new empty `[Unreleased]` section.

## Version bumps

- After implementing new features, behavior changes, or fixes, always ask the user whether they want a version bump before changing any version.
- Follow semantic versioning: patch for fixes only, minor for backward-compatible features, major for breaking changes.
- Keep the version in sync in `package.json`, `package-lock.json`, and `public/manifest.json`.
- Suggested flow: `pnpm version <version> --no-git-tag-version`, then update `public/manifest.json`.
- Run `pnpm run typecheck`, `pnpm test`, and `pnpm run build` after bumping and before committing.
- Every version bump must be followed by a commit. If the related changes are still uncommitted, commit the code, changelog, and version files together right after the bump.
- Mention the released version in the commit message, for example `chore: release v1.2.0`.
- After the bump commit and the release, run `pnpm run deploy` inside `site/` so the public page stays in sync with the published version.

## Build

- Run `pnpm run build` automatically when finishing any change that affects the extension output: popup, background worker, content scripts, manifest, assets, dependencies, or a version bump.
- Do not ask for confirmation before building; run it as the final verification step of the task.

## Product site (GitHub Pages)

- The product page lives in `site/` and is fully isolated from the extension: its own `package.json`, lockfile, Astro config, and PostCSS config. Never import extension files into it, and never add its dependencies to the root package.
- Local commands: `cd site && pnpm install`, `pnpm dev` (http://localhost:4321/lurker-drops/), and `pnpm build` (type check + static output in `site/dist/`).
- Deployment is branch-based, not GitHub Actions: `cd site && pnpm run deploy` builds and force-pushes `dist/` to the `gh-pages` branch. GitHub Pages serves that branch from `/`.
- Run `pnpm run deploy` after every version bump, after any change under `site/`, and after any release that changes the download asset, so the page always offers the current `latest` release.
- Verify after deploying: `https://diogobruni.github.io/lurker-drops/`, `/pt-br/`, and `/es/` must return 200.
- Keep `site/public/.nojekyll`; without it GitHub Pages ignores the `_astro/` assets.
- The site base path is `/lurker-drops`. If the repository is renamed or moved to a user site, update `site` and `base` in `site/astro.config.mjs`, the sitemap URL in `site/public/robots.txt`, and `start_url` plus icon paths in `site/public/site.webmanifest`.
- Never edit the `gh-pages` branch or `site/dist/` by hand; both are generated.
- Install buttons point to `releases/latest/download/lurker-drops.zip`. That asset is produced by `.github/workflows/release.yml` on `v*` tags, so a release must exist before the download link works.

## Chrome Web Store descriptions

- Store copy lives in `chrome-web-store/APP_DETAILS.<locale>.txt`, one file per locale, using the same locale codes as `src/shared/i18n.ts` (for example `APP_DETAILS.en.txt` and `APP_DETAILS.pt_BR.txt`).
- The Chrome Web Store shows plain text only: do not use Markdown, HTML, bold, links, or headings. Use light ASCII/Unicode decoration (`★`, `✔`, `▸`, separator lines) to organize sections, without overdoing it.
- Write for someone who has never used the app: short sentences, everyday words, and no technical jargon (avoid API, GraphQL, WebSocket, manifest, storage).
- Explain any in-app term in plain language the first time it appears.
- Keep the summary line at 132 characters or less.
- Required structure: summary, full description, how it works in a few steps, a plain-language feature list, who it is for, and a privacy/affiliation note.
- Update every locale when user-facing features change. Never promise drops or rewards.
