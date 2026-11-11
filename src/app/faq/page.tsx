import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import CallToAction from "@/components/CallToAction";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.pages.faq.meta.title,
  description: siteContent.pages.faq.meta.description,
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  const { hero, groups, callToAction } = siteContent.pages.faq;
  const allItems = groups.flatMap((group) => group.items);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((item) => ({
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
      <Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <Section title={hero.title} description={hero.subtitle} />

        {groups.map((group) => (
          <Section key={group.title} title={group.title}>
            <div className="grid gap-4">
              {group.items.map((item) => (
                <article
                  key={item.question}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                  <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </Section>
        ))}

        <Section title="Approfondimenti">
          <div className="grid gap-2 text-sm text-[var(--color-ink-soft)] sm:grid-cols-2">
            <Link href="/ai">Come usiamo l&apos;AI nello sviluppo software</Link>
            <Link href="/progetti-strategici">Nexus e gli altri progetti strategici</Link>
            <Link href="/metodo">Il metodo di lavoro, fase per fase</Link>
            <Link href="/sviluppo-software">Sviluppo software su misura</Link>
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
