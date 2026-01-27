"use client";

import { useEffect } from "react";
import { gtagConsentGranted, mapConsentToGtag } from "@/lib/consent";

type GoogleAnalyticsProps = {
  gaId?: string;
};

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  useEffect(() => {
    if (!gaId) {
      return;
    }
    const handler = (event: Event) => {
      if (!(event instanceof CustomEvent)) {
        return;
      }

      if (!window.gtag) {
        return;
      }
      const state = event.detail as "accepted" | "rejected" | null;
      if (state === "accepted") {
        window.gtag("consent", "update", gtagConsentGranted());
      } else {
        window.gtag("consent", "update", mapConsentToGtag(state));
      }
    };

    window.addEventListener("consent:changed", handler);
    return () => window.removeEventListener("consent:changed", handler);
  }, [gaId]);

  return null;
}
