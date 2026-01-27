import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Button from "@/components/Button";
import CallToAction from "@/components/CallToAction";
import Plans from "@/components/Plans";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.pages.home.meta.title,
  description: siteContent.pages.home.meta.description,
};

export default function Home() {
  const {
    hero,
    highlights,
    services,
    plans,
    methodSummary,
    aiSummary,
    callToAction,
  } = siteContent.pages.home;

  return (
    <>
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-soft)]">
              {siteContent.brand.tagline}
            </p>
            <h1 className="text-4xl font-semibold sm:text-5xl">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-base text-[var(--color-ink-soft)] sm:text-lg">
              {hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button label={hero.ctaLabel} href={hero.ctaHref} />
              <Button
                label={hero.secondaryLabel}
                href={hero.secondaryHref}
                variant="secondary"
              />
            </div>
            <p className="text-sm text-[var(--color-ink-soft)]">
              <Link href="/mvp-startup" className="font-medium text-[var(--color-ink)]">
                Se sei una startup: scopri il nostro piano MVP -&gt;
              </Link>
            </p>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-8 shadow-sm">
            <div className="flex items-center gap-4">
              <Image
                src="/logos/logo-primary.png"
                alt="Logo Cobracco"
                width={120}
                height={120}
                className="h-28 w-28"
              />
              <div className="text-sm text-[var(--color-ink-soft)]">
                Artigiani del software
              </div>
            </div>
            <p className="mt-6 text-sm text-[var(--color-ink-soft)]">
              {siteContent.brand.description}
            </p>
            <div className="mt-6 space-y-4">
              {highlights.map((item) => (
                <div key={item.title} className="space-y-2">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-[var(--color-ink-soft)]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <Section title={services.title} description={services.text}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.items.map((item) => (
              <Card key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </Section>

        <Plans title={plans.title} description={plans.text} items={plans.items} />

        <Section title={methodSummary.title} description={methodSummary.text}>
          <div className="grid gap-6 md:grid-cols-2">
            <Card title={aiSummary.title} text={aiSummary.text} />
            <Card
              title="Operativita"
              text="Sede a Roma, lavoro remoto su tutta Italia con la stessa cura artigianale."
            />
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
