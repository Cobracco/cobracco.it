import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.pages.ai.meta.title,
  description: siteContent.pages.ai.meta.description,
};

export default function AiPage() {
  const { hero, items, security } = siteContent.pages.ai;

  return (
    <Container>
      <Section title={hero.title} description={hero.subtitle}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} title={item.title} text={item.text} />
          ))}
        </div>
      </Section>

      <Section title={security.title} description={security.text} />

      <Section title="Approfondimenti">
        <div className="space-y-2 text-sm text-[var(--color-ink-soft)]">
          <Link href="/blog/ai-in-azienda-casi-uso-pmi">
            AI in azienda: 5 casi d'uso concreti per PMI (senza fuffa)
          </Link>
        </div>
      </Section>
    </Container>
  );
}

