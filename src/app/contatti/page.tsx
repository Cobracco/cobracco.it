import type { Metadata } from "next";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import Script from "next/script";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.pages.contatti.meta.title,
  description: siteContent.pages.contatti.meta.description,
};

export default function ContattiPage() {
  const { hero, info, form } = siteContent.pages.contatti;
  const { footer } = siteContent;
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  return (
    <Container>
      {siteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="afterInteractive"
        />
      ) : null}
      <Section title={hero.title} description={hero.subtitle}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{form.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                {form.helper}
              </p>
            </div>
            <ContactForm />
          </div>
          <div className="space-y-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <div>
              <h3 className="text-lg font-semibold">{info.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                {info.text}
              </p>
            </div>
            <div className="space-y-2 text-sm text-[var(--color-ink-soft)]">
              <p>{footer.address}</p>
              <p>Il team risponde attraverso il form e le call programmate, ti ricontattiamo entro 1-2 giorni.</p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink-soft)]">
              <p className="font-semibold text-[var(--color-ink)]">Preferisci un messaggio diretto?</p>
              <p>Usa il form accanto o prenota una call per raccontarci il progetto.</p>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
