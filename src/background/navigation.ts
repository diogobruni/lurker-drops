const INTERNAL_NAVIGATION_TTL_MS = 5_000;

const internalNavigations = new Map<number, number>();

/**
 * Marks a tab navigation made by the lurker engine so the page-hide handler
 * does not treat it as the user leaving Lurker mode.
 */
export function markInternalNavigation(tabId: number): void {
  internalNavigations.set(tabId, Date.now());
}

/** Returns true when the pending page hide was caused by the engine. */
export function consumeInternalNavigation(tabId: number): boolean {
  const startedAt = internalNavigations.get(tabId);
  if (startedAt === undefined) return false;
  internalNavigations.delete(tabId);
  return Date.now() - startedAt <= INTERNAL_NAVIGATION_TTL_MS;
}
