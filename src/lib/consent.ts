export type ConsentState = "accepted" | "rejected" | null;

const COOKIE_NAME = "cobracco_consent";
const CONSENT_DAYS = 180;

type ConsentValues = "denied" | "granted";

export type GtagConsent = {
  analytics_storage: ConsentValues;
  ad_storage: ConsentValues;
  ad_user_data: ConsentValues;
  ad_personalization: ConsentValues;
  wait_for_update?: number;
};

const defaultConsent: GtagConsent = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  wait_for_update: 500,
};

const grantedConsent: GtagConsent = {
  analytics_storage: "granted",
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
};

function getCookieValue() {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));

  if (!match) {
    return null;
  }

  const value = match.split("=")[1];
  if (value === "accepted" || value === "rejected") {
    return value;
  }

  return null;
}

export function getConsent(): ConsentState {
  return getCookieValue();
}

export function setConsent(state: Exclude<ConsentState, null>) {
  if (typeof document === "undefined") {
    return;
  }

  const expires = new Date(Date.now() + CONSENT_DAYS * 24 * 60 * 60 * 1000).toUTCString();
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${COOKIE_NAME}=${state}; path=/; expires=${expires}; SameSite=Lax${secure}`;
}

export function shouldLoadAnalytics(state: ConsentState) {
  return state === "accepted";
}

export function gtagConsentDefault(): GtagConsent {
  return defaultConsent;
}

export function gtagConsentGranted(): GtagConsent {
  return grantedConsent;
}

export function hasAcceptedConsent() {
  return getConsent() === "accepted";
}

export function mapConsentToGtag(state: ConsentState): GtagConsent {
  return state === "accepted" ? grantedConsent : defaultConsent;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
