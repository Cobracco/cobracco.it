"use client";

import { useEffect, useMemo } from "react";
import Script from "next/script";
import {
  ConsentState,
  gtagConsentDefault,
  gtagConsentGranted,
  mapConsentToGtag,
  getConsent,
} from "@/lib/consent";

type GoogleAnalyticsProps = {
  gaId?: string;
};

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  useEffect(() => {
    const handler = (event: Event) => {
      if (!(event instanceof CustomEvent)) {
        return;
      }

      const state = event.detail as ConsentState;
      if (!window.gtag) {
        return;
      }

      if (state === "accepted") {
        window.gtag("consent", "update", gtagConsentGranted());
      } else {
        window.gtag("consent", "update", mapConsentToGtag(state));
      }
    };

    window.addEventListener("consent:changed", handler);
    return () => window.removeEventListener("consent:changed", handler);
  }, []);

  const baseSnippet = useMemo(() => {
    if (!gaId) {
      return "";
    }

    const denied = JSON.stringify(gtagConsentDefault());

    return `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent','default', ${denied});
      gtag('js', new Date());
      gtag('config','${gaId}', { anonymize_ip: true, send_page_view: false });
    `;
  }, [gaId]);

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script id="gtag-base" strategy="beforeInteractive">
        {baseSnippet}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="beforeInteractive"
      />
    </>
  );
}
