// consentController: queue open requests until banner registers,
// then flush once and allow direct open calls.
// Fallback event is also dispatched for extra robustness.
let openFn: null | (() => void) = null;
let pendingOpen = false;
export const CONSENT_OPEN_EVENT = "cobracco:open-consent";

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
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
      window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
      document.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
      document.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
    }
    return;
  }
  openFn();
}
