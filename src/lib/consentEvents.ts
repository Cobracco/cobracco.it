export const CONSENT_OPEN_EVENT = "cobracco:open-consent";

export function openConsentManager() {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
