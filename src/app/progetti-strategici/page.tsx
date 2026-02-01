import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Card from "@/components/Card";
import CallToAction from "@/components/CallToAction";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.pages.progettiStrategici.meta.title,
  description: siteContent.pages.progettiStrategici.meta.description,
};

export default function ProgettiStrategiciPage() {
  const { hero, pillars, projects, callToAction } = siteContent.pages.progettiStrategici;

  return (
    <>
      <Container>
        <Section title={hero.title} description={hero.subtitle} />

        <Section title={pillars.title} description={pillars.text}>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.items.map((item) => (
              <Card key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </Section>

        <Section title={projects.title} description={projects.text}>
          <div className="grid gap-6">
            {projects.items.map((project) => (
              <Card key={project.title} title={project.title} text={project.description}>
                {project.highlights?.length ? (
                  <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink-soft)]">
                    {project.highlights.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-5">
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0b2f6a] to-[#0092d6] px-6 py-3 text-sm font-semibold tracking-wide !text-white shadow-lg shadow-[rgba(11,61,145,0.45)] transition hover:!text-white"
                  >
                    {project.linkLabel}
                  </Link>
                </div>
              </Card>
            ))}
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

