import type { Metadata } from "next";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.pages.metodo.meta.title,
  description: siteContent.pages.metodo.meta.description,
};

export default function MetodoPage() {
  const { hero, steps } = siteContent.pages.metodo;

  return (
    <Container>
      <Section title={hero.title} description={hero.subtitle}>
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((item) => (
            <Card key={item.title} title={item.title} text={item.text} />
          ))}
        </div>
      </Section>
    </Container>
  );
}

