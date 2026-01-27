import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Card from "@/components/Card";
import CallToAction from "@/components/CallToAction";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.pages.mvpStartup.meta.title,
  description: siteContent.pages.mvpStartup.meta.description,
};

export default function MvpStartupPage() {
  const {
    hero,
    perChi,
    cosaInclude,
    pianoMinimale,
    pricing,
    comeLavoriamo,
    stack,
    faq,
    callToAction,
  } = siteContent.pages.mvpStartup;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Sviluppo MVP per startup",
    provider: {
      "@type": "LocalBusiness",
      name: siteContent.brand.name,
      url: siteContent.brand.siteUrl,
      email: siteContent.footer.email,
      telephone: siteContent.footer.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Roma",
        addressCountry: "IT",
      },
      areaServed: "IT",
      sameAs: [],
    },
  };

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        <Section title={hero.title} description={hero.subtitle}>
          <div className="grid gap-6 md:grid-cols-2">
            <Card title={perChi.title}>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink-soft)]">
                {perChi.items.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </Card>
            <Card title={cosaInclude.title}>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink-soft)]">
                {cosaInclude.items.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>

        <Section title={pianoMinimale.title} description={pianoMinimale.text}>
          <div className="grid gap-6 md:grid-cols-2">
            <Card title={pricing.title} text={pricing.text} />
            <Card title={stack.title} text={stack.text} />
          </div>
        </Section>

        <Section title={comeLavoriamo.title}>
          <div className="grid gap-6 md:grid-cols-2">
            {comeLavoriamo.steps.map((step) => (
              <Card key={step.title} title={step.title} text={step.text} />
            ))}
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
          <div className="space-y-2 text-sm text-[var(--color-ink-soft)]">
            <Link href="/blog/quanto-costa-un-mvp">
              Quanto costa un MVP? Come stimare budget e tempi senza sprechi
            </Link>
          </div>
        </Section>
      </Container>

      <CallToAction
        title={callToAction.title}
        text={callToAction.text}
        buttonLabel={callToAction.buttonLabel}
        buttonHref={callToAction.buttonHref}
      />
    </>
  );
}

