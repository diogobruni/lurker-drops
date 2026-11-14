## The Extension

Lurker Drops is a Manifest V3 Chrome extension (React 19 + TypeScript popup, background service worker, and content scripts) that keeps Twitch tabs "lurking" to earn drops. Each managed tab follows a filter preset (Twitch category, title filter, favorites, blacklist) and the background worker picks and switches to a matching live stream every minute. It also watches chat connections, claims channel-points bonus chests, and can mute the tab. State is stored in `chrome.storage.local`. This folder (`app/`) holds the whole extension.

## Project Instructions

Prefer pnpm over npm for all project commands. Fall back to npm only if pnpm is unavailable.

## Changelog

- `CHANGELOG.md` in this folder (`app/`) is the internal changelog. It must be written in English only.
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

## Releases

Always publish a release manually: build, zip, and create the GitHub release with `gh`. Do not rely on `.github/workflows/release.yml`.

When the user asks for a release:

1. Make sure the version bump is committed (see Version bumps) and the work is on `main`. If it is on a feature branch, fast-forward merge it into `main` first.
2. Push `main`.
3. Inside `app/`, run `pnpm run build`.
4. Zip the contents of `app/dist/` so `manifest.json` sits at the zip root, named `lurker-drops.zip`. On Windows: `Compress-Archive -Path dist\* -DestinationPath <temp>\lurker-drops.zip`. Keep the zip outside the repository.
5. From the repository root, run `gh release create vX.Y.Z <path>\lurker-drops.zip --title vX.Y.Z --generate-notes`. This also creates the `vX.Y.Z` tag. If the tag already exists, use `gh release upload vX.Y.Z <zip> --clobber` for an existing release.
6. Report the release URL.

A release request from the user authorizes pushing `main` and creating the tag and release. Ask first before any other push.

## Build

- Run `pnpm run build` inside `app/` automatically when finishing any change that affects the extension output: popup, background worker, content scripts, manifest, assets, dependencies, or a version bump.
- Do not ask for confirmation before building; run it as the final verification step of the task.

## Chrome Web Store descriptions

- Store copy lives in `chrome-web-store/` at the repository root, in `APP_DETAILS.<locale>.txt`, one file per locale, using the same locale codes as `app/src/shared/i18n.ts` (for example `APP_DETAILS.en.txt` and `APP_DETAILS.pt_BR.txt`).
- The Chrome Web Store shows plain text only: do not use Markdown, HTML, bold, links, or headings. Use light ASCII/Unicode decoration (`★`, `✔`, `▸`, separator lines) to organize sections, without overdoing it.
- Write for someone who has never used the app: short sentences, everyday words, and no technical jargon (avoid API, GraphQL, WebSocket, manifest, storage).
- Explain any in-app term in plain language the first time it appears.
- Keep the summary line at 132 characters or less.
- Required structure: summary, full description, how it works in a few steps, a plain-language feature list, who it is for, and a privacy/affiliation note.
- Update every locale when user-facing features change. Never promise drops or rewards.
