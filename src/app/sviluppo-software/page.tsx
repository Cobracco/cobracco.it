import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.pages.sviluppoSoftware.meta.title,
  description: siteContent.pages.sviluppoSoftware.meta.description,
};

export default function SviluppoSoftwarePage() {
  const {
    hero,
    whenNeeded,
    includes,
    approach,
    timing,
    technologies,
    faq,
  } = siteContent.pages.sviluppoSoftware;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Section title={hero.title} description={hero.subtitle}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card title={whenNeeded.title} text={whenNeeded.text} />
          <Card title={approach.title} text={approach.text} />
          <Card title={timing.title} text={timing.text} />
          <Card title={technologies.title} text={technologies.text} />
        </div>
      </Section>

      <Section title={includes.title}>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-sm">
          <ul className="grid gap-3 text-sm text-[var(--color-ink-soft)] sm:grid-cols-2">
            {includes.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title={faq.title}>
        <div className="grid gap-4">
          {faq.items.map((item) => (
            <div
              key={item.question}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Approfondimenti">
        <div className="flex flex-col gap-3 text-sm text-[var(--color-ink-soft)]">
          <Link href="/blog/sviluppo-software-su-misura-pmi">
            Sviluppo software su misura per PMI: quando conviene davvero
          </Link>
          <Link href="/blog/integrazioni-api-crm-erp">
            Integrazioni API tra CRM ed ERP: errori comuni e come evitarli
          </Link>
        </div>
      </Section>
    </Container>
  );
}

