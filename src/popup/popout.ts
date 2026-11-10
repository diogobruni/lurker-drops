export const IS_POPOUT =
  new URLSearchParams(window.location.search).get('popout') === '1';

const sourceTabId = Number.parseInt(
  new URLSearchParams(window.location.search).get('sourceTabId') ?? '',
  10,
);

export const SOURCE_TAB_ID = Number.isInteger(sourceTabId) ? sourceTabId : null;

export async function openPopout(): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(chrome.runtime.getURL('popup.html'));
  url.searchParams.set('popout', '1');
  if (typeof tab?.id === 'number') {
    url.searchParams.set('sourceTabId', String(tab.id));
  }

  await chrome.windows.create({
    url: url.toString(),
    type: 'popup',
    width: 440,
    height: 680,
    focused: true,
  });
  window.close();
}
