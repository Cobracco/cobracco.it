let openFn: null | (() => void) = null;
let pendingOpen = false;

export function registerConsentOpener(fn: () => void) {
  openFn = fn;
  if (pendingOpen) {
    pendingOpen = false;
    try {
      openFn?.();
    } catch {
      // no-op
    }
  }
  return () => {
    if (openFn === fn) {
      openFn = null;
    }
  };
}

export function openConsentManager() {
  if (!openFn) {
    pendingOpen = true;
    return;
  }
  openFn();
}
