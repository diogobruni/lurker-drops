interface LurkerTabLite {
  tabId: number;
  enabled: boolean;
}

/**
 * ISOLATED-world content script that shows the Lurker mode banner on Twitch
 * tabs managed by the extension and guards in-page navigation while the lurker
 * is on. Styled in a shadow root so Twitch CSS cannot leak in.
 */

interface OverlayCopy {
  title: string;
  subtitle: string;
  disable: string;
  turningOff: string;
  dialogTitle: string;
  dialogMessage: string;
  cancel: string;
  confirm: string;
}

interface ContentState {
  tabId: number | null;
  enabled: boolean;
  copy: OverlayCopy;
}

interface BackgroundReply<T> {
  ok?: boolean;
  data?: T;
  error?: string;
}

const LURKER_TABS_KEY = 'lurkerTabs';
interface OverlayElements {
  host: HTMLDivElement;
  banner: HTMLDivElement;
  dialog: HTMLDivElement;
  dialogText: HTMLParagraphElement;
  disableButton: HTMLButtonElement;
  cancelButton: HTMLButtonElement;
  confirmButton: HTMLButtonElement;
}

const STYLE = `
  :host { all: initial; }
  *, *::before, *::after { box-sizing: border-box; }
  .border {
    position: fixed;
    inset: 0;
    pointer-events: none;
    box-shadow:
      inset 0 0 0 3px #8b5cf6,
      inset 0 0 32px rgba(139, 92, 246, 0.18);
  }
  .banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    color: #fff;
    background: linear-gradient(90deg, #7c3aed 0%, #9333ea 100%);
    box-shadow: 0 8px 24px rgba(76, 29, 149, 0.35);
    font-family: Inter, 'Segoe UI', system-ui, -apple-system, sans-serif;
    pointer-events: auto;
  }
  .banner[hidden], .dialog[hidden] { display: none; }
  .dot {
    width: 10px;
    height: 10px;
    flex: none;
    border-radius: 9999px;
    background: #e9d5ff;
    box-shadow: 0 0 0 4px rgba(233, 213, 255, 0.2);
    animation: pulse 1.6s ease-in-out infinite;
  }
  .texts { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .title { font-size: 13px; font-weight: 700; letter-spacing: 0.01em; }
  .subtitle {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.82);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .spacer { flex: 1; }
  button { font-family: inherit; cursor: pointer; }
  .disable {
    flex: none;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.14);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 9999px;
    transition: background 0.15s ease;
    white-space: nowrap;
  }
  .disable:hover { background: rgba(255, 255, 255, 0.24); }
  .disable:disabled { opacity: 0.6; cursor: default; }
  .dialog {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    pointer-events: auto;
  }
  .backdrop {
    position: absolute;
    inset: 0;
    background: rgba(9, 9, 11, 0.72);
    backdrop-filter: blur(3px);
  }
  .card {
    position: relative;
    width: 100%;
    max-width: 360px;
    border-radius: 16px;
    border: 1px solid #3f3f46;
    background: #18181b;
    color: #fafafa;
    padding: 20px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
    font-family: Inter, 'Segoe UI', system-ui, -apple-system, sans-serif;
    animation: pop 0.16s ease-out;
  }
  .card h2 { margin: 0; font-size: 16px; font-weight: 700; }
  .card p { margin: 8px 0 0; font-size: 12px; line-height: 1.6; color: #a1a1aa; }
  .actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 20px; }
  .ghost {
    background: transparent;
    border: 1px solid #3f3f46;
    color: #e4e4e7;
    border-radius: 8px;
    padding: 7px 12px;
    font-size: 12px;
    font-weight: 600;
  }
  .ghost:hover { background: #27272a; }
  .ghost:disabled, .confirm:disabled { opacity: 0.6; cursor: default; }
  .confirm {
    border: 0;
    border-radius: 8px;
    padding: 7px 12px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(90deg, #7c3aed, #9333ea);
  }
  .confirm:hover { background: linear-gradient(90deg, #8b5cf6, #a855f7); }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.45; }
  }
  @keyframes pop {
    from { opacity: 0; transform: translateY(6px) scale(0.98); }
    to { opacity: 1; transform: none; }
  }
`;

const TEMPLATE = `
  <style>${STYLE}</style>
  <div class="border" aria-hidden="true"></div>
  <div class="banner" role="status" hidden>
    <span class="dot" aria-hidden="true"></span>
    <div class="texts">
      <span class="title"></span>
      <span class="subtitle"></span>
    </div>
    <div class="spacer"></div>
    <button class="disable" type="button"></button>
  </div>
  <div class="dialog" hidden>
    <div class="backdrop"></div>
    <div class="card" role="dialog" aria-modal="true" aria-labelledby="lurker-drops-dialog-title">
      <h2 id="lurker-drops-dialog-title"></h2>
      <p class="dialog-text"></p>
      <div class="actions">
        <button class="ghost" type="button"></button>
        <button class="confirm" type="button"></button>
      </div>
    </div>
  </div>
`;

(() => {
  const flag = '__lurkerDropsOverlayInstalled';
  const windowWithFlag = window as unknown as Record<string, unknown>;
  if (windowWithFlag[flag]) return;
  windowWithFlag[flag] = true;

  let tabId: number | null = null;
  let enabled = false;
  let busy = false;
  let pendingAction: (() => void) | null = null;
  let elements: OverlayElements | null = null;
  let copy: OverlayCopy | null = null;
  let originalBodyPaddingTop: string | null = null;
  let bannerResizeObserver: ResizeObserver | null = null;

  function reserveBannerSpace(): void {
    if (!elements || !document.body) return;
    const height = elements.banner.getBoundingClientRect().height;
    if (height <= 0) return;
    if (originalBodyPaddingTop === null) {
      originalBodyPaddingTop = document.body.style.paddingTop;
    }
    document.body.style.setProperty(
      'padding-top',
      `${Math.ceil(height)}px`,
      'important',
    );
  }

  function releaseBannerSpace(): void {
    if (!document.body || originalBodyPaddingTop === null) return;
    if (originalBodyPaddingTop) {
      document.body.style.setProperty('padding-top', originalBodyPaddingTop);
    } else {
      document.body.style.removeProperty('padding-top');
    }
    originalBodyPaddingTop = null;
  }

  function ensureElements(): OverlayElements {
    if (elements) return elements;
    if (!copy) throw new Error('Lurker Drops overlay: missing copy');

    const host = document.createElement('div');
    host.id = 'lurker-drops-overlay';
    host.style.cssText =
      'position:fixed;inset:0;pointer-events:none;z-index:2147483647;display:none;';
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = TEMPLATE;

    const query = <T extends Element>(selector: string): T => {
      const found = shadow.querySelector<T>(selector);
      if (!found) throw new Error(`Lurker Drops overlay: missing ${selector}`);
      return found;
    };

    const banner = query<HTMLDivElement>('.banner');
    const dialog = query<HTMLDivElement>('.dialog');
    const dialogText = query<HTMLParagraphElement>('.dialog-text');
    const disableButton = query<HTMLButtonElement>('.disable');
    const cancelButton = query<HTMLButtonElement>('.ghost');
    const confirmButton = query<HTMLButtonElement>('.confirm');

    query<HTMLSpanElement>('.title').textContent = copy.title;
    query<HTMLSpanElement>('.subtitle').textContent = copy.subtitle;
    query<HTMLHeadingElement>('.card h2').textContent = copy.dialogTitle;
    dialogText.textContent = copy.dialogMessage;
    cancelButton.textContent = copy.cancel;
    confirmButton.textContent = copy.confirm;
    disableButton.textContent = copy.disable;

    disableButton.addEventListener('click', () => void disableLurker());
    cancelButton.addEventListener('click', closeDialog);
    confirmButton.addEventListener('click', () => void confirmDialog());
    query<HTMLDivElement>('.backdrop').addEventListener('click', closeDialog);

    document.documentElement.appendChild(host);

    elements = {
      host,
      banner,
      dialog,
      dialogText,
      disableButton,
      cancelButton,
      confirmButton,
    };

    bannerResizeObserver = new ResizeObserver(() => {
      if (enabled) reserveBannerSpace();
    });
    bannerResizeObserver.observe(banner);

    return elements;
  }

  function syncBusy(): void {
    if (!elements) return;
    elements.disableButton.disabled = busy;
    elements.cancelButton.disabled = busy;
    elements.confirmButton.disabled = busy;
    if (copy) {
      elements.disableButton.textContent = busy
        ? copy.turningOff
        : copy.disable;
    }
  }

  function applyState(next: boolean): void {
    enabled = next;
    if (!next && !elements) return;

    const dom = ensureElements();
    dom.host.style.display = next ? 'block' : 'none';
    dom.banner.hidden = !next;
    if (next) {
      reserveBannerSpace();
    } else {
      releaseBannerSpace();
      closeDialog();
    }
    syncBusy();
  }

  function openDialog(action: () => void): void {
    pendingAction = action;
    const dom = ensureElements();
    dom.dialog.hidden = false;
    dom.cancelButton.focus();
  }

  function closeDialog(): void {
    pendingAction = null;
    if (elements) elements.dialog.hidden = true;
  }

  async function disableLurker(): Promise<boolean> {
    if (busy) return false;
    busy = true;
    syncBusy();
    try {
      const reply = (await chrome.runtime.sendMessage({
        type: 'content:disable',
      })) as BackgroundReply<unknown> | undefined;
      if (!reply?.ok) {
        throw new Error(reply?.error ?? 'The background worker did not respond.');
      }
      busy = false;
      applyState(false);
      return true;
    } catch (error) {
      console.error('Lurker Drops: could not turn off the lurker', error);
      busy = false;
      syncBusy();
      return false;
    }
  }

  async function confirmDialog(): Promise<void> {
    const action = pendingAction;
    if (!action) return;
    const disabled = await disableLurker();
    if (!disabled) return;
    closeDialog();
    action();
  }

  function navigableAnchor(event: MouseEvent): HTMLAnchorElement | null {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return null;
    }

    const anchor = event
      .composedPath()
      .find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement);
    if (!anchor) return null;
    if (anchor.target && anchor.target !== '_self') return null;
    if (anchor.hasAttribute('download')) return null;

    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
      return null;
    }

    let url: URL;
    try {
      url = new URL(anchor.href);
    } catch {
      return null;
    }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    if (url.href === window.location.href) return null;
    return anchor;
  }

  document.addEventListener(
    'click',
    (event) => {
      if (!enabled || busy) return;
      const anchor = navigableAnchor(event);
      if (!anchor) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const href = anchor.href;
      openDialog(() => window.location.assign(href));
    },
    true,
  );

  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape' && elements && !elements.dialog.hidden) {
        event.preventDefault();
        if (!busy) closeDialog();
        return;
      }

      if (!enabled || busy) return;
      if (elements && !elements.dialog.hidden) return;

      const key = event.key.toLowerCase();
      const isReload =
        event.key === 'F5' ||
        ((event.ctrlKey || event.metaKey) && key === 'r');
      const isBack = event.altKey && event.key === 'ArrowLeft';
      if (!isReload && !isBack) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      openDialog(() => {
        if (isReload) window.location.reload();
        else window.history.back();
      });
    },
    true,
  );

  window.addEventListener('pagehide', () => {
    if (!enabled) return;
    void chrome.runtime.sendMessage({ type: 'content:leave' });
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'local' || !changes[LURKER_TABS_KEY]) return;
    if (tabId === null) return;
    const raw = changes[LURKER_TABS_KEY].newValue;
    const tabs = Array.isArray(raw) ? (raw as LurkerTabLite[]) : [];
    const record = tabs.find((tab) => tab?.tabId === tabId);
    applyState(record?.enabled === true);
  });

  void (async () => {
    try {
      const reply = (await chrome.runtime.sendMessage({
        type: 'content:state',
      })) as BackgroundReply<ContentState> | undefined;
      const state = reply?.data;
      if (!state) return;
      copy = state.copy;
      tabId = state.tabId;
      if (state.enabled) applyState(true);
    } catch (error) {
      console.error('Lurker Drops: could not read the tab state', error);
    }
  })();
})();
