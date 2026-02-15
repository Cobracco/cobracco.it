"use client";

import { hasAcceptedConsent } from "@/lib/consent";

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

type GtagParams = Record<string, string | number | boolean | undefined>;

function canTrack() {
  return (
    typeof window !== "undefined" &&
    typeof window.gtag === "function" &&
    hasAcceptedConsent()
  );
}

export function trackEvent(eventName: string, params: GtagParams = {}) {
  if (!canTrack()) {
    return;
  }

  window.gtag?.("event", eventName, params);
}

export function trackAdsRemarketingPageView(path: string) {
  if (!GOOGLE_ADS_ID || typeof window === "undefined") {
    return;
  }

  trackEvent("page_view", {
    send_to: GOOGLE_ADS_ID,
    page_path: path,
    page_location: window.location.href,
  });
}

export function trackAdsMicroConversion(eventName: string, params: GtagParams = {}) {
  if (!GOOGLE_ADS_ID) {
    return;
  }

  trackEvent(eventName, {
    send_to: GOOGLE_ADS_ID,
    ...params,
  });
}

export function trackAdsConversion(
  conversionLabel: string | undefined,
  params: GtagParams = {}
) {
  if (!GOOGLE_ADS_ID || !conversionLabel) {
    return;
  }

  trackEvent("conversion", {
    send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
    ...params,
  });
}
