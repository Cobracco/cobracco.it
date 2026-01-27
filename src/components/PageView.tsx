"use client";

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { hasAcceptedConsent } from "@/lib/consent";

export default function PageView() {
  const pathname = usePathname();
  const lastSentRef = useRef<string | null>(null);

  const sendPageView = (path: string) => {
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
    lastSentRef.current = path;
    return true;
  };

  useEffect(() => {
    if (!pathname) {
      return;
    }

    if (sendPageView(pathname)) {
      return;
    }

    const interval = setInterval(() => {
      if (sendPageView(pathname)) {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [pathname]);

  useEffect(() => {
    const handler = (event: Event) => {
      if (!(event instanceof CustomEvent)) {
        return;
      }

      const state = event.detail as "accepted" | "rejected" | null;
      if (state === "accepted" && pathname) {
        sendPageView(pathname);
      }
    };

    window.addEventListener("consent:changed", handler);
    return () => window.removeEventListener("consent:changed", handler);
  }, [pathname]);

  return null;
}
