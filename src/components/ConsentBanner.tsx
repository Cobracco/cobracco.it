"use client";

import { useEffect, useState } from "react";
import { ConsentState, getConsent, setConsent } from "@/lib/consent";
import { CONSENT_OPEN_EVENT } from "@/lib/consentEvents";

const dispatchConsentEvent = (state: ConsentState) => {
  if (typeof window === "undefined") {
    return;
  }

  const event = new CustomEvent("consent:changed", { detail: state });
  window.dispatchEvent(event);
};

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [consentState, setConsentState] = useState<ConsentState>(null);

  useEffect(() => {
    const stored = getConsent();
    setConsentState(stored);
    setIsVisible(stored === null);
  }, []);

  useEffect(() => {
    const reopen = (_event: Event) => {
      const stored = getConsent();
      setConsentState(stored);
      setIsVisible(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => {
      window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
    };
  }, []);

  const handleDecision = (state: Exclude<ConsentState, null>) => {
    setConsent(state);
    setIsVisible(false);
    setConsentState(state);
    dispatchConsentEvent(state);
  };

  const handleManage = () => {
    const stored = getConsent();
    setConsentState(stored);
    setIsVisible(true);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-[60] w-[min(480px,90vw)] -translate-x-1/2 rounded-2xl border border-[var(--color-border)] bg-white/95 p-5 shadow-lg shadow-[rgba(15,23,42,0.2)]">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink)]">
        Stato attuale:{" "}
        {consentState === "accepted"
          ? "Accettato"
          : consentState === "rejected"
          ? "Rifiutato"
          : "Non deciso"}
      </p>
      <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
        Usiamo cookie per misurare l’uso del sito (Analytics). Puoi accettare o rifiutare.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-full bg-[var(--color-gradient)] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white"
          onClick={() => handleDecision("accepted")}
        >
          Accetta
        </button>
        <button
          type="button"
          className="rounded-full border border-[var(--color-border)] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink)]"
          onClick={() => handleDecision("rejected")}
        >
          Rifiuta
        </button>
        <button
          type="button"
          className="rounded-full border border-transparent px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink)] transition hover:border-[var(--color-border)] hover:text-[var(--color-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          onClick={handleManage}
        >
          Gestisci
        </button>
      </div>
    </div>
  );
}
