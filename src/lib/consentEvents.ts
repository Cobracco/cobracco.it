export const CONSENT_OPEN_EVENT = "cobracco:open-consent";

export function openConsentManager() {
  if (typeof window === "undefined") {
    return;
  }
  const event = new Event(CONSENT_OPEN_EVENT);
  const customEvent = new CustomEvent(CONSENT_OPEN_EVENT);
  window.dispatchEvent(event);
  window.dispatchEvent(customEvent);
  document.dispatchEvent(event);
  document.dispatchEvent(customEvent);
}
