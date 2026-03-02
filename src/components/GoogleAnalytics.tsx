"use client";

import { useEffect } from "react";
import { getConsent, gtagConsentGranted, mapConsentToGtag } from "@/lib/consent";

type GoogleAnalyticsProps = {
  gaId?: string;
  googleAdsId?: string;
};

export default function GoogleAnalytics({
  gaId,
  googleAdsId,
}: GoogleAnalyticsProps) {
  useEffect(() => {
    if (!gaId && !googleAdsId) {
      return;
    }
    const applyConsent = (state: "accepted" | "rejected" | null) => {
      if (!window.gtag) {
        return false;
      }

      if (state === "accepted") {
        window.gtag("consent", "update", gtagConsentGranted());
      } else {
        window.gtag("consent", "update", mapConsentToGtag(state));
      }
      return true;
    };

    const syncStoredConsent = () => {
      const stored = getConsent();
      if (applyConsent(stored)) {
        return;
      }

      let retries = 10;
      const interval = window.setInterval(() => {
        if (applyConsent(stored) || retries <= 0) {
          window.clearInterval(interval);
        }
        retries -= 1;
      }, 100);
    };

    const handler = (event: Event) => {
      if (!(event instanceof CustomEvent)) {
        return;
      }

      const state = event.detail as "accepted" | "rejected" | null;
      applyConsent(state);
    };

    syncStoredConsent();
    window.addEventListener("consent:changed", handler);
    return () => window.removeEventListener("consent:changed", handler);
  }, [gaId, googleAdsId]);

  return null;
}
