"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { hasAcceptedConsent } from "@/lib/consent";

const initialState = {
  name: "",
  email: "",
  message: "",
  website: "",
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const validate = () => {
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Errore durante l'invio.");
      }

      setSuccess(true);
      setValues(initialState);

      if (typeof window !== "undefined" && hasAcceptedConsent()) {
        window.gtag?.("event", "generate_lead", {
          method: "contact_form",
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
          placeholder="email@azienda.it"
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
          rows={5}
          className="w-full resize-none rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          placeholder="Raccontaci il tuo progetto..."
        />
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
        <p className="text-sm text-emerald-700">Grazie, ti ricontatteremo.</p>
      ) : null}
      <Button label={isSending ? "Invio..." : "Invia"} type="submit" />
    </form>
  );
}
