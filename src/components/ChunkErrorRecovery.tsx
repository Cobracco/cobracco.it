"use client";

import { useEffect } from "react";

const RECOVERY_KEY = "cobracco_chunk_recovery_ts";
const RECOVERY_WINDOW_MS = 20_000;

function getErrorMessage(error: unknown) {
  if (!error) {
    return "";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return `${error.name} ${error.message}`.trim();
  }

  if (typeof error === "object" && "message" in error) {
    const value = (error as { message?: unknown }).message;
    if (typeof value === "string") {
      return value;
    }
  }

  return "";
}

function isChunkLoadingError(message: string) {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("chunkloaderror") ||
    normalized.includes("loading chunk") ||
    normalized.includes("failed to fetch dynamically imported module") ||
    normalized.includes("/_next/static/chunks/")
  );
}

function tryRecover() {
  if (typeof window === "undefined") {
    return;
  }

  const now = Date.now();
  const last = Number.parseInt(sessionStorage.getItem(RECOVERY_KEY) ?? "0", 10);
  if (Number.isFinite(last) && now - last < RECOVERY_WINDOW_MS) {
    return;
  }

  sessionStorage.setItem(RECOVERY_KEY, String(now));

  const url = new URL(window.location.href);
  url.searchParams.set("__cb", String(now));
  window.location.replace(url.toString());
}

export default function ChunkErrorRecovery() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      const message = getErrorMessage(event.error) || getErrorMessage(event.message);
      if (isChunkLoadingError(message)) {
        tryRecover();
      }
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const message = getErrorMessage(event.reason);
      if (isChunkLoadingError(message)) {
        tryRecover();
      }
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}
