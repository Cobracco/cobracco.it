import type { Metadata } from "next";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.pages.chiSiamo.meta.title,
  description: siteContent.pages.chiSiamo.meta.description,
};

export default function ChiSiamoPage() {
  const { hero, values, location } = siteContent.pages.chiSiamo;

  return (
    <Container>
      <Section title={hero.title} description={hero.subtitle}>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((item) => (
            <Card key={item.title} title={item.title} text={item.text} />
          ))}
        </div>
      </Section>

      <Section title={location.title}>
        <p className="prose-lite max-w-3xl">{location.text}</p>
      </Section>
    </Container>
  );
}

