import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Card from "@/components/Card";
import CallToAction from "@/components/CallToAction";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.pages.migrazioneShopify.meta.title,
  description: siteContent.pages.migrazioneShopify.meta.description,
  keywords: [
    "migrazione shopify",
    "migrazione da prestashop a shopify",
    "migrazione da magento a shopify",
    "migrazione da opencart a shopify",
    "migrazione da woocommerce a shopify",
    "porting e-commerce shopify",
    "passare a shopify",
  ],
  alternates: {
    canonical: "/migrazione-shopify",
  },
};

export default function MigrazioneShopifyPage() {
  const {
    hero,
    perChi,
    cosaInclude,
    perche,
    limiti,
    comeLavoriamo,
    costi,
    faq,
    callToAction,
  } = siteContent.pages.migrazioneShopify;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Migrazione di e-commerce a Shopify",
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

  const listClassName = "mt-3 space-y-2 text-sm text-[var(--color-ink-soft)]";

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
              <ul className={listClassName}>
                {perChi.items.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </Card>
            <Card title={cosaInclude.title}>
              <ul className={listClassName}>
                {cosaInclude.items.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>

        <Section title={perche.title} description={perche.text}>
          <div className="grid gap-6 md:grid-cols-2">
            {perche.items.map((item) => (
              <Card key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </Section>

        <Section title={comeLavoriamo.title}>
          <div className="grid gap-6 md:grid-cols-2">
            {comeLavoriamo.steps.map((step) => (
              <Card key={step.title} title={step.title} text={step.text} />
            ))}
          </div>
        </Section>

        <Section title={costi.title}>
          <div className="grid gap-6 md:grid-cols-3">
            <Card title={costi.porting.title} text={costi.porting.text} />
            <Card title={costi.shopify.title} text={costi.shopify.text} />
            <Card title={costi.assistenza.title} text={costi.assistenza.text} />
          </div>
        </Section>

        <Section title={limiti.title} description={limiti.text}>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <ul className="space-y-3 text-sm text-[var(--color-ink-soft)]">
              {limiti.items.map((item) => (
                <li key={item}>- {item}</li>
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

        <Section title="Altri servizi">
          <div className="space-y-2 text-sm text-[var(--color-ink-soft)]">
            <Link href="/sviluppo-software">
              Sviluppo software su misura, per le parti che vanno oltre il perimetro standard
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
