# projectmem - chrome-rubinot-twitch

_Last updated: 2026-11-11_

## Project purpose
Chrome extension that keeps selected tabs watching a matching Twitch live.

## Recent issues
- [DONE] #0001 Add lurker button was disabled on the main screen because it required an active tab without an existing lurker record. [src/popup/screens/MainScreen.tsx] -> Removed the disabled condition; the create form defaults New tab on and can start a lurker even when the current tab is already managed. Submit guard only requires a tab when New tab is unchecked. [src/popup/screens/MainScreen.tsx,src/popup/screens/LurkerFormScreen.tsx] (fixed)

## Decisions
- Brand logo assets: master/UI copies in src/assets (logo.png 512 master, logo-128.png for popup), extension sizes 16/32/48/128 in public/icons as active-* and inactive-* (grayscale), and padded Chrome Web Store 128x128 icon in chrome-web-store/icon-128.png. [src/assets/logo.png]
- Main screen splits Lurking Tabs and Current Tab into a two-item mobile-style bottom tab bar inside MainScreen (role=tablist, local panel state, icons plus labels). Collapse/expand control for the lurking list was removed because each section now owns its view; the scroller resets to top on tab change. [src/popup/screens/MainScreen.tsx]
- Main screen tab selection lives in the zustand store (mainPanel, default 'current') so the Navbar active-count pill can switch screens and open Lurking Tabs. The pill is now a button that calls setMainPanel('lurking') plus goToMain(). [src/popup/store.ts,src/popup/components/Navbar.tsx]
- Main screen is now just the Lurking Tabs list (bottom tab bar and Current Tab panel removed). Add opens a mobile-style lurker-form screen (new Screen value, lurkerFormTabId null for create / tabId for edit) reusing the old Current Tab fields; row actions gain Pursue toggle before Turn on/off, Close moved to the card top-right, and a right-aligned Edit button. Shared status presentation moved to src/popup/lurker-status.ts. [src/popup/screens/MainScreen.tsx,src/popup/screens/LurkerFormScreen.tsx,src/popup/store.ts]
- Presets navigation remembers where it came from (presetsOrigin): Back from the presets screen returns to the lurker form when it was opened from there, otherwise to main. New lurkers default to muted, and the create form has a New tab checkbox (default on) handled by background request lurker:startInNewTab, which opens https://www.twitch.tv/ and starts the lurker there. [src/popup/store.ts,src/background/index.ts,src/popup/screens/LurkerFormScreen.tsx]
- Closing a lurking tab now asks for inline confirmation in the lurker row (Cancel/Close, no native confirm) before sending lurker:remove with closeTab. [src/popup/screens/MainScreen.tsx]
- Close-tab confirmation uses a native <dialog> shown with showModal() (styled backdrop, Esc and backdrop-click cancel), replacing the inline confirm block; MainScreen no longer renders per-row confirmation UI. [src/popup/screens/MainScreen.tsx]
- Native title tooltips are replaced by shadcn-style Radix tooltips (components/ui/tooltip.tsx, TooltipProvider in App) on every popup button. Lurker rows no longer show the Live/Paused badge or the text Turn on/off action; a power icon button sits next to Close, gray when paused and green when enabled. [src/components/ui/tooltip.tsx,src/popup/screens/MainScreen.tsx,src/popup/components/Navbar.tsx]
- Close lurker tab and Delete preset now confirm through a shared InlineConfirm overlay (components/ui/inline-confirm.tsx) that covers the existing card absolutely, avoiding layout shift; the confirm action is delayed 150ms and locked to swallow double clicks. [src/components/ui/inline-confirm.tsx,src/popup/screens/MainScreen.tsx,src/popup/screens/PresetsScreen.tsx]
- Removed the in-page beforeunload guard from lurking tabs because it blocked extension-initiated tab closes and confused users. Tabs can now close normally; pagehide still sends content:leave so leaving the page turns the lurker off, and engine navigations remain exempt via navigation.ts. [src/content/lurker-overlay.ts]
- Lurker form no longer shows the tab info/status card. After the preset selector it shows a live preview card fetched with lurker:previewStream, backed by engine.previewStreamForPreset (favorites tier first, then most-watched) with a 300ms debounce and skeleton state. The orphaned lurker-status helper was deleted. [src/popup/screens/LurkerFormScreen.tsx,src/background/engine.ts,src/background/index.ts]
- Added bonus-collector content script for Twitch: watches the DOM for the channel-points bonus chest and programmatically clicks the page's own Claim Bonus button (selector .claimable-bonus__icon, aria-label bonus fallback) with an 800ms debounce and 2s claim cooldown. Chosen over direct GQL because the mutation needs Twitch's persisted-query hash and auth token; clicking the native button reuses the page's authenticated flow. [src/content/bonus-collector.ts,public/manifest.json,package.json]

## Notes
- No notes logged yet.

## Key files
- `logo.png`
- `logo-128.png`
- `chrome-web-store/icon-128.png`
- `src/popup/lurker-status.ts`
- `//www.twitch.tv`
- `background/navigation.ts`
- `components/ui/tooltip.tsx`
- `components/ui/inline-confirm.tsx`
- `navigation.ts`
- `engine.previewStreamForPreset`

## Open questions
- None logged yet.
