"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { hasAcceptedConsent } from "@/lib/consent";
import { trackAdsMicroConversion, trackAdsRemarketingPageView } from "@/lib/tracking";

function getIntentEventForPath(path: string) {
  if (path === "/contatti") {
    return "view_contact_page";
  }
  if (path === "/mvp-startup") {
    return "view_mvp_page";
  }
  if (path === "/sviluppo-software") {
    return "view_sviluppo_software_page";
  }
  if (path === "/freelance-sviluppatore-software") {
    return "view_freelance_software_page";
  }
  if (path.startsWith("/blog/")) {
    return "view_blog_article_page";
  }
  return null;
}

export default function PageView() {
  const pathname = usePathname();
  const lastSentRef = useRef<string | null>(null);
  const lastIntentSentRef = useRef<string | null>(null);

  const sendPageView = useCallback((path: string) => {
    if (
      typeof window === "undefined" ||
      !hasAcceptedConsent() ||
      path.startsWith("/health") ||
      path.startsWith("/api")
    ) {
      return false;
    }

    if (!window.gtag) {
      return false;
    }

    if (lastSentRef.current === path) {
      return true;
    }

    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
    });
    trackAdsRemarketingPageView(path);
    lastSentRef.current = path;
    return true;
  }, []);

  const sendIntentEvent = useCallback((path: string) => {
    const eventName = getIntentEventForPath(path);
    if (!eventName || lastIntentSentRef.current === `${eventName}:${path}`) {
      return;
    }

    trackAdsMicroConversion(eventName, {
      event_category: "page_intent",
      event_label: path,
    });
    lastIntentSentRef.current = `${eventName}:${path}`;
  }, []);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    sendIntentEvent(pathname);

    if (sendPageView(pathname)) {
      return;
    }

    const interval = setInterval(() => {
      if (sendPageView(pathname)) {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [pathname, sendIntentEvent, sendPageView]);

  useEffect(() => {
    const handler = (event: Event) => {
      if (!(event instanceof CustomEvent)) {
        return;
      }

      const state = event.detail as "accepted" | "rejected" | null;
      if (state === "accepted" && pathname) {
        sendPageView(pathname);
        sendIntentEvent(pathname);
      }
    };

    window.addEventListener("consent:changed", handler);
    return () => window.removeEventListener("consent:changed", handler);
  }, [pathname, sendIntentEvent, sendPageView]);

  return null;
}
