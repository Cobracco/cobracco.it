"use client";

import { useEffect, useState } from "react";
import { ConsentState, getConsent, setConsent } from "@/lib/consent";
import { registerConsentOpener } from "@/lib/consentController";
import Button from "@/components/Button";

const dispatchConsentEvent = (state: ConsentState) => {
  if (typeof window === "undefined") {
    return;
  }

  const event = new CustomEvent("consent:changed", { detail: state });
  window.dispatchEvent(event);
};

export default function ConsentBanner() {
  const initialConsent = getConsent();
  const [isVisible, setIsVisible] = useState(initialConsent === null);
  const [consentState, setConsentState] = useState<ConsentState>(initialConsent);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    initialConsent === "accepted"
  );

  useEffect(() => {
    const unregister = registerConsentOpener(() => {
      const stored = getConsent();
      setConsentState(stored);
      setIsVisible(true);
      setAnalyticsEnabled(stored === "accepted");
      setIsDialogOpen(true);
    });
    return () => {
      unregister();
    };
  }, []);

  const handleDecision = (state: Exclude<ConsentState, null>) => {
    setConsent(state);
    setIsVisible(false);
    setConsentState(state);
    setAnalyticsEnabled(state === "accepted");
    dispatchConsentEvent(state);
  };

  const handleManage = () => {
    setIsDialogOpen(true);
  };

  const handleSavePreferences = () => {
    const nextState: Exclude<ConsentState, null> = analyticsEnabled
      ? "accepted"
      : "rejected";
    setConsent(nextState);
    setConsentState(nextState);
    setIsVisible(false);
    setIsDialogOpen(false);
    dispatchConsentEvent(nextState);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsVisible(consentState === null);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-[60] w-[min(520px,92vw)] -translate-x-1/2 rounded-2xl border border-[var(--color-border)] bg-white/95 p-5 shadow-lg shadow-[rgba(15,23,42,0.2)]">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink)]">
        Stato attuale:{" "}
        {consentState === "accepted"
          ? "Accettato"
          : consentState === "rejected"
          ? "Rifiutato"
          : "Non impostato"}
      </p>
      <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
        Usiamo cookie tecnici necessari e, se lo consenti, cookie di analytics per
        misurare l&apos;uso del sito. Puoi accettare, rifiutare o gestire le preferenze.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button
          label="Accetta"
          type="button"
          size="sm"
          onClick={() => handleDecision("accepted")}
        />
        <Button
          label="Rifiuta"
          type="button"
          size="sm"
          onClick={() => handleDecision("rejected")}
        />
        <Button
          label="Gestisci"
          type="button"
          size="sm"
          onClick={handleManage}
        />
      </div>
      {isDialogOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-title"
          className="mt-4 rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-sm"
        >
          <h3 id="consent-title" className="text-sm font-semibold text-[var(--color-ink)]">
            Preferenze cookie
          </h3>
          <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
            I cookie tecnici sono sempre attivi. Puoi scegliere se attivare i cookie
            di analytics.
          </p>
          <div className="mt-3 flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2">
            <div>
              <p className="text-sm font-medium text-[var(--color-ink)]">Analytics</p>
              <p className="text-xs text-[var(--color-ink-soft)]">
                Misurazione anonima dell&apos;uso del sito.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAnalyticsEnabled((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                analyticsEnabled ? "bg-[var(--color-accent)]" : "bg-slate-300"
              }`}
              aria-pressed={analyticsEnabled}
              aria-label="Attiva o disattiva analytics"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                  analyticsEnabled ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              label="Salva preferenze"
              type="button"
              size="sm"
              onClick={handleSavePreferences}
            />
            <Button
              label="Annulla"
              type="button"
              size="sm"
              onClick={handleCloseDialog}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
