"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { hasAcceptedConsent } from "@/lib/consent";
import { trackAdsConversion, trackEvent } from "@/lib/tracking";

const initialState = {
  name: "",
  email: "",
  role: "",
  seniority: "",
  experience: "",
  salary: "",
  availability: "",
  linkedin: "",
  portfolio: "",
  message: "",
  website: "",
};
const GOOGLE_ADS_CONVERSION_LABEL_CANDIDATURA =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CANDIDATURA ||
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

export default function CandidaturaForm() {
  const [values, setValues] = useState(initialState);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const validate = () => {
    if (
      !values.name.trim() ||
      !values.email.trim() ||
      !values.role.trim() ||
      !values.seniority.trim() ||
      !values.message.trim()
    ) {
      return "Compila tutti i campi obbligatori.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      return "Inserisci un indirizzo email valido.";
    }
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setSuccess(false);
      return;
    }

    setIsSending(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (attachment) {
        formData.append("attachment", attachment);
      }

      const response = await fetch("/api/candidature", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Errore durante l'invio.");
      }

      setSuccess(true);
      setValues(initialState);
      setAttachment(null);

      if (hasAcceptedConsent()) {
        trackEvent("career_application", {
          method: "candidatura_form",
        });
        trackAdsConversion(GOOGLE_ADS_CONVERSION_LABEL_CANDIDATURA, {
          event_category: "career",
          event_label: "candidatura_form_submit",
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'invio.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-sm"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="name">
          Nome e cognome
        </label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          placeholder="Mario Rossi"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          placeholder="nome@dominio.it"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="role">
          Ruolo di interesse
        </label>
        <input
          id="role"
          name="role"
          value={values.role}
          onChange={handleChange}
          className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          placeholder="Senior Full-Stack, Tech Lead, Product & UX"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="seniority">
          Seniority
        </label>
        <input
          id="seniority"
          name="seniority"
          value={values.seniority}
          onChange={handleChange}
          className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          placeholder="Senior, Lead, Principal"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="experience">
          Anni di esperienza (opzionale)
        </label>
        <input
          id="experience"
          name="experience"
          value={values.experience}
          onChange={handleChange}
          className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          placeholder="10+"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="salary">
          Compenso atteso (opzionale)
        </label>
        <input
          id="salary"
          name="salary"
          value={values.salary}
          onChange={handleChange}
          className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          placeholder="es. 55-70k"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="availability">
          Disponibilita (opzionale)
        </label>
        <input
          id="availability"
          name="availability"
          value={values.availability}
          onChange={handleChange}
          className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          placeholder="Subito, 30 giorni, 60 giorni"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="linkedin">
          LinkedIn (opzionale)
        </label>
        <input
          id="linkedin"
          name="linkedin"
          value={values.linkedin}
          onChange={handleChange}
          className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          placeholder="https://www.linkedin.com/in/tuo-profilo"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="portfolio">
          Portfolio o GitHub (opzionale)
        </label>
        <input
          id="portfolio"
          name="portfolio"
          value={values.portfolio}
          onChange={handleChange}
          className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          placeholder="https://github.com/username"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="message">
          Messaggio
        </label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          rows={6}
          className="w-full resize-none rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          placeholder="Progetti complessi che hai guidato, responsabilita, stack principali, risultati ottenuti."
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="attachment">
          CV o allegato (PDF/DOC, opzionale)
        </label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(event) =>
            setAttachment(event.target.files?.item(0) ?? null)
          }
          className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--color-surface)] file:px-4 file:py-2 file:text-sm file:font-medium"
        />
        <p className="text-xs text-[var(--color-ink-soft)]">
          Dimensione massima 5MB.
        </p>
      </div>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          value={values.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {success ? (
        <p className="text-sm text-emerald-700">
          Grazie, abbiamo ricevuto la tua candidatura.
        </p>
      ) : null}
      <Button label={isSending ? "Invio..." : "Invia candidatura"} type="submit" size="sm" />
    </form>
  );
}
