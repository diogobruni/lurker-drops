# Changelog

Internal changelog for Lurker Drops. All entries are written in English.
Sections are ordered oldest to newest; unreleased work goes last.

## [1.0.0] - 2026-11-10

### Added

- Manifest V3 Chrome extension with a React 19 + TypeScript popup and a background service worker.
- Multi-tab lurking dashboard where each managed tab has its own preset, muted state, and pursue setting, with live title and preview per row.
- Per-tab actions: go to the lurking tab, mute/unmute the browser tab, turn the lurker on or off, and close the tab.
- Current Tab panel with active-tab status, preset selection, muted checkbox, pursue checkbox, and enable/disable control.
- Filter presets with a Twitch category, case-insensitive title filter, ordered favorites, and a blacklist.
- Preset management: create, edit, and delete presets, including an in-use warning before deletion.
- Twitch category search through Twitch's public GraphQL endpoint, with support for manually typed category names.
- Automatic live selection and navigation checked every minute: favorites-first candidate pool, pursue most-watched behavior, and favorite order as tie-breaker.
- Pop-out standalone manager window that follows the last focused normal browser tab.
- Chat watchdog that checks the Twitch chat WebSocket every minute, performs a soft reconnect when possible, and falls back to a rate-limited page reload.
- Toolbar status indicator with idle/active icons and a badge showing the number of active lurkers.
- Local persistence in `chrome.storage.local`, validated with Zod and managed through a Zustand store.
- Vite build pipeline, Vitest test suite, and icon generation script.

## [1.1.0] - 2026-11-10

### Added

- Redesigned main screen focused on a single Lurking Tabs list, with an Add button for new lurkers.
- Dedicated mobile-style create/edit lurker screen with preset selection, Muted, Pursue, and New tab options.
- Live preview card that shows the Twitch live matching the selected preset, including thumbnail, channel, category, and viewers.
- Per-row Edit action and a power icon toggle next to Close: gray when paused and green when active.
- New tab option for new lurkers (enabled by default), opening a Twitch tab and starting the lurker there.
- Shared inline confirmation overlay for destructive actions, used by Close lurker tab and Delete preset, with no layout shift and a 150ms double-click guard.
- In-page Lurker mode overlay on Twitch tabs: violet/purple gradient banner, viewport border, and a Turn off lurker button.
- Navigation guard on lurking Twitch tabs for link clicks, reload, and back shortcuts, with a confirmation dialog that disables the lurker before leaving.
- shadcn-style Radix tooltips on all popup buttons, replacing native `title` tooltips.
- Full interface localization for 14 languages: English, Spanish, French, German, Simplified Chinese, Japanese, Italian, Brazilian Portuguese, Korean, Traditional Chinese, Dutch, Polish, Russian, and Turkish.
- Automatic browser language detection with English fallback, plus localized manifest strings.
- Brand assets: master logo, popup logo, active and inactive extension icons at multiple sizes, and a padded Chrome Web Store 128x128 icon.

### Changed

- Preset navigation now remembers its origin: Back from Presets returns to the lurker form when opened from there, otherwise to the main screen.
- New lurkers default to the Muted option enabled.
- Removed the Live/Paused badge and the text Turn on/off button from lurker rows; state is shown by the power icon.
- Removed the tab information and status card from the lurker form.
- Preset deletion and lurker closing confirmations now overlay the existing card instead of expanding or opening a modal.
- Replaced the native browser confirmation for close-tab with an inline confirmation.
- Tooltips and destructive confirmations use the shadcn component style.

### Fixed

- Add lurker is no longer disabled when the active tab already has a lurker record.
- Removed the in-page `beforeunload` guard that blocked extension-initiated tab closes and confused users.
- Automatic channel switches made by the lurker engine are distinguished from user navigation so the overlay does not disable the lurker.

### Removed

- Current Tab panel and the bottom tab bar, replaced by the dedicated lurker create/edit screen.
- Native `title` tooltips across the popup.
- The `beforeunload` close guard on Twitch pages.

## [1.2.0] - 2026-11-10

### Added

- Automatic collector for Twitch channel-points bonus chests that claims available bonuses through the page's own Claim Bonus button, with an 800ms debounce, a 2s cooldown, and a 15s fallback scan.

## [1.2.1] - 2026-11-10

### Fixed

- The Lurker mode banner now reserves its height at the top of the Twitch page instead of covering the page content.

## [1.3.0] - 2026-11-10

### Changed

- Lurking tab rows now always show the assigned preset name, including while a live is being watched.

## [1.4.0] - 2026-11-10

### Changed

- Lurking tabs now always appear in creation order, regardless of whether they are active or paused.

## [1.5.0] - 2026-11-10

### Added

- Modern About screen with the app name, current manifest version, and author Geox, reachable from the navbar and returning to the previous screen.

## [Unreleased]

### Added

- Product website built with Astro, TypeScript, and Tailwind CSS, with English, Brazilian Portuguese, and Spanish pages, SEO metadata, and install buttons pointing to the latest GitHub release.
