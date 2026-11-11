# Project Instructions

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
- Suggested flow: `npm version <version> --no-git-tag-version`, then update `public/manifest.json`.
- Run `npm run typecheck`, `npm test`, and `npm run build` after bumping and before committing.
- Every version bump must be followed by a commit. If the related changes are still uncommitted, commit the code, changelog, and version files together right after the bump.
- Mention the released version in the commit message, for example `chore: release v1.2.0`.
