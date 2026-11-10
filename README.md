# Lurker Drops

A Chrome (Manifest V3) extension that keeps selected browser tabs watching a Twitch live that matches your filters. Manage several tabs independently, each with its own preset, mute, and pursue settings.

## Features

- **Lurking Tabs** dashboard with the current live name and per-tab actions: Go to, Mute/Unmute, Turn on/off, Close tab.
- **Current Tab** panel: status, preset picker, muted checkbox (browser tab mute), Pursue checkbox (chase the most-watched live), and on/off button.
- **Pop out** button in the top-right corner opens the full manager in a standalone window that follows the last focused normal browser tab.
- **Presets** with category, case-insensitive title filter, ordered favorites, and a blacklist.
- **Twitch category search** using Twitch's public GraphQL endpoint; custom category names can be typed manually.
- **Persistent settings** in `chrome.storage.local`, validated with Zod and managed through a Zustand store.
- **Chat watchdog**: every minute, checks the Twitch chat WebSocket; if it is closed, tries a soft reconnect, then a rate-limited page reload as fallback.
- **Toolbar status indicator**: the action icon changes between idle and active states, and the badge shows the number of active lurkers.
- Automatic checks every minute while at least one lurker is active.

## How a live is selected

For every enabled tab, the background worker:

1. Collects live favorites and the category's top streams, then applies the preset filters (category, title, blacklist).
2. Favorites form the preferred pool: if at least one eligible favorite is live, the winner comes from the favorites; otherwise it comes from all top-stream candidates.
3. With **Pursue on** (default), the most-watched live in that pool wins. The choice is re-evaluated every minute, so the tab switches whenever another eligible live takes the lead. Favorite order breaks viewer-count ties.
4. With **Pursue off**, favorites are followed in the configured order. If no favorite is eligible, the current live is kept while it remains valid; otherwise the most-watched candidate is chosen.
5. Navigates the tab to the chosen channel and applies its mute setting.

Twitch's public GraphQL stream listing is capped at 30 entries per directory, so candidate scanning uses the top 30 of the chosen category. Favorite channels are checked directly and do not depend on that cap.

## Chat watchdog

For every active lurker watching a Twitch channel, the minute tick also verifies that the page's chat connection is healthy:

1. A content script tracks Twitch's `irc-ws.chat.twitch.tv` WebSocket and reports whether it is open, connecting, closed, or absent.
2. If the socket is closed and chat is mounted, the first failure triggers a soft reconnect: the extension closes the stale chat socket so Twitch's own client opens a fresh connection.
3. If chat is still disconnected on the next check, the tab is reloaded to rebuild it. Reloads are limited to once every 5 minutes, and soft reconnects to once every 90 seconds.
4. A successful connection resets the failure counter.

The watchdog only runs on enabled, watching lurkers. It validates the chat connection itself, not the watchtime accounting of any third-party drops platform.

## Stack

- TypeScript + React 19
- Vite
- Tailwind CSS
- shadcn/ui-style components (Radix UI + `cmdk`)
- Zustand
- Zod
- Chrome Manifest V3 (service worker, content scripts, alarms, storage)

## Install

```bash
npm install
npm test
npm run build
```

Then open `chrome://extensions` (or `edge://extensions` in Edge), enable **Developer mode**, choose **Load unpacked**, and select the generated `dist` folder.

The `dist` folder contains the complete extension: popup, background service worker, Twitch chat content scripts, manifest, and icons.

## Usage

1. Open **Presets** from the popup and create a preset.
2. Optionally set a Twitch category, a title filter, ordered favorites, and a blacklist.
3. Return to the main screen, choose the preset for the current tab, set **Muted** and **Pursue** as needed, and press **Turn on lurker**.
4. Repeat on other tabs to manage multiple lurkers.
5. Optionally use **Pop out** in the top-right corner to keep the manager in its own window while you switch browser tabs.

The extension icon badge shows how many tabs are actively lurking. Use **Expand** on the main screen to manage each tab.

## Development

```bash
npm run typecheck
npm test
npm run build
```

Reload the unpacked extension after each build. The popup itself cannot be exercised with the normal Vite dev server because it depends on Chrome extension APIs.

To regenerate the icon variants:

```bash
python scripts/generate-icons.py
```

Requires Pillow.

## Data and privacy

- Presets and lurking-tab settings are stored locally in `chrome.storage.local`.
- No Twitch account, OAuth token, or secret is required.
- The background worker queries Twitch's public web GraphQL endpoint using Twitch's public web client ID.
- The only API host permission requested is `https://gql.twitch.tv/*`.
- The extension also runs content scripts on `https://www.twitch.tv/*` to observe the chat WebSocket connection state and detect new chat messages. It does not read, store, or transmit message contents.
- No data is sent to any third-party service other than Twitch.

## Notes

- This uses Twitch's unofficial public web GraphQL API, which may change or rate-limit requests at any time.
- The "Muted" setting uses the browser's tab mute (`chrome.tabs.update({ muted })`), not the Twitch player controls.
- **Pursue** can switch the tab whenever a more-watched eligible live appears. Turn it off to stay on the current live while it remains valid.
- The extension checks again every minute; a viewership change or an offline live can take up to a minute to be reflected.
- Chat detection uses Twitch's public page DOM and chat WebSocket. If Twitch changes either, the watchdog may need updating.
- After installing or reloading the extension, reload already-open Twitch tabs once so the chat content scripts are present.
