/**
 * ISOLATED-world content script that claims Twitch channel-point bonus chests
 * automatically. Twitch does not expose a stable public endpoint for this, so
 * the script triggers the page's own "Claim Bonus" button as soon as it shows
 * up, without any user interaction.
 */

(() => {
  const flag = '__lurkerDropsBonusCollectorInstalled';
  const windowWithFlag = window as unknown as Record<string, unknown>;
  if (windowWithFlag[flag]) return;
  windowWithFlag[flag] = true;

  const SCAN_DEBOUNCE_MS = 800;
  const CLAIM_COOLDOWN_MS = 2_000;

  let scanTimer: number | null = null;
  let lastClaimAt = 0;

  function findClaimButton(): HTMLButtonElement | null {
    const icon = document.querySelector('.claimable-bonus__icon');
    const iconButton = icon?.closest('button');
    if (iconButton instanceof HTMLButtonElement) return iconButton;

    const buttons = document.querySelectorAll<HTMLButtonElement>(
      'button[aria-label]',
    );
    for (const button of buttons) {
      if (/bon[uú]s/i.test(button.getAttribute('aria-label') ?? '')) {
        return button;
      }
    }
    return null;
  }

  function claimBonus(): void {
    if (Date.now() - lastClaimAt < CLAIM_COOLDOWN_MS) return;

    const button = findClaimButton();
    if (!button || button.disabled) return;
    if (button.getClientRects().length === 0) return;

    lastClaimAt = Date.now();
    button.click();
  }

  function scheduleScan(): void {
    if (scanTimer !== null) return;
    scanTimer = window.setTimeout(() => {
      scanTimer = null;
      claimBonus();
    }, SCAN_DEBOUNCE_MS);
  }

  const observer = new MutationObserver(scheduleScan);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  window.setInterval(claimBonus, 15_000);
  claimBonus();
})();
