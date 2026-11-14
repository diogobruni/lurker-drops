# Project Instructions

Prefer pnpm over npm for all project commands. Fall back to npm only if pnpm is unavailable.

## Layout

- `app/` holds the Chrome extension and everything it needs to build and release: source, public assets, tests, scripts, and its own `package.json`, lockfile, and build configs. Run extension commands inside `app/`.
- `website/` holds the product site (see below).
- The repository root keeps only shared files: READMEs, `CHANGELOG.md`, `AGENTS.md`, `.github/`, and `demo-screens/`.

## Changelog

- `CHANGELOG.md` at the repository root is the internal changelog. It must be written in English only.
- Use Keep a Changelog-style headings: `Added`, `Changed`, `Fixed`, `Removed`.
- Keep version sections ordered oldest to newest and leave `[Unreleased]` as the last section.
- Record every new feature, behavior change, and fix under `[Unreleased]` as soon as it is implemented.
- On a version bump, rename `[Unreleased]` to `## [x.y.z] - YYYY-MM-DD` and open a new empty `[Unreleased]` section.

## Version bumps

- After implementing new features, behavior changes, or fixes, always ask the user whether they want a version bump before changing any version.
- Follow semantic versioning: patch for fixes only, minor for backward-compatible features, major for breaking changes.
- Keep the version in sync in `app/package.json`, `app/package-lock.json`, and `app/public/manifest.json`.
- Suggested flow: inside `app/`, run `pnpm version <version> --no-git-tag-version`, then update `app/public/manifest.json`.
- Run `pnpm run typecheck`, `pnpm test`, and `pnpm run build` inside `app/` after bumping and before committing.
- Every version bump must be followed by a commit. If the related changes are still uncommitted, commit the code, changelog, and version files together right after the bump.
- Mention the released version in the commit message, for example `chore: release v1.2.0`.
- After the bump commit and the release, run `pnpm run deploy` inside `website/` so the public page stays in sync with the published version.

## Build

- Run `pnpm run build` inside `app/` automatically when finishing any change that affects the extension output: popup, background worker, content scripts, manifest, assets, dependencies, or a version bump.
- Do not ask for confirmation before building; run it as the final verification step of the task.

## Product site

- Instructions for the product site live in `website/AGENTS.md`. After a version bump and release, run `pnpm run deploy` inside `website/` (see that file).

## Chrome Web Store descriptions

- Store copy lives in `app/chrome-web-store/APP_DETAILS.<locale>.txt`, one file per locale, using the same locale codes as `app/src/shared/i18n.ts` (for example `APP_DETAILS.en.txt` and `APP_DETAILS.pt_BR.txt`).
- The Chrome Web Store shows plain text only: do not use Markdown, HTML, bold, links, or headings. Use light ASCII/Unicode decoration (`★`, `✔`, `▸`, separator lines) to organize sections, without overdoing it.
- Write for someone who has never used the app: short sentences, everyday words, and no technical jargon (avoid API, GraphQL, WebSocket, manifest, storage).
- Explain any in-app term in plain language the first time it appears.
- Keep the summary line at 132 characters or less.
- Required structure: summary, full description, how it works in a few steps, a plain-language feature list, who it is for, and a privacy/affiliation note.
- Update every locale when user-facing features change. Never promise drops or rewards.
