"use client";

import { useEffect } from "react";
import { trackAdsMicroConversion } from "@/lib/tracking";

type CtaRule = {
  path: string;
  eventName: string;
};

const ctaRules: CtaRule[] = [
  { path: "/contatti", eventName: "cta_contact_click" },
  { path: "/mvp-startup", eventName: "cta_mvp_click" },
  { path: "/sviluppo-software", eventName: "cta_sviluppo_software_click" },
  {
    path: "/freelance-sviluppatore-software",
    eventName: "cta_freelance_software_click",
  },
];

function normalizePath(href: string) {
  try {
    if (href.startsWith("http://") || href.startsWith("https://")) {
      const targetUrl = new URL(href);
      if (targetUrl.origin !== window.location.origin) {
        return null;
      }
      return targetUrl.pathname;
    }
    return new URL(href, window.location.origin).pathname;
  } catch {
    return null;
  }
}

export default function AdsClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const anchor = event.target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href) {
        return;
      }

      const path = normalizePath(href);
      if (!path) {
        return;
      }

      const matchedRule = ctaRules.find((rule) => rule.path === path);
      if (!matchedRule) {
        return;
      }

      trackAdsMicroConversion(matchedRule.eventName, {
        event_category: "cta",
        event_label: path,
        source_path: window.location.pathname,
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
