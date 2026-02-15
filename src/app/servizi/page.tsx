import type { Metadata } from "next";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Plans from "@/components/Plans";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.pages.servizi.meta.title,
  description: siteContent.pages.servizi.meta.description,
  keywords: [
    ...siteContent.seo.primaryKeywords,
    "servizi sviluppo software",
    "consulenza sviluppo software",
    ...siteContent.seo.freelanceKeywords,
  ],
  alternates: {
    canonical: "/servizi",
  },
};

export default function ServiziPage() {
  const { hero, sections, serviceList, plans } = siteContent.pages.servizi;

  return (
    <Container>
      <Section title={hero.title} description={hero.subtitle}>
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((item) => (
            <Card key={item.title} title={item.title} text={item.text} />
          ))}
        </div>
      </Section>

      <Plans title={plans.title} description={plans.text} items={plans.items} />

      <Section title="Servizi nel dettaglio">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceList.map((item) => (
            <Card key={item.title} title={item.title} text={item.text} />
          ))}
        </div>
      </Section>
    </Container>
  );
}
