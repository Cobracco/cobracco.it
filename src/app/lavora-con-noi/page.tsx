import type { Metadata } from "next";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Card from "@/components/Card";
import CandidaturaForm from "@/components/CandidaturaForm";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.pages.lavoraConNoi.meta.title,
  description: siteContent.pages.lavoraConNoi.meta.description,
};

export default function LavoraConNoiPage() {
  const { hero, profile, roles, process, offer, form } =
    siteContent.pages.lavoraConNoi;
  const { footer } = siteContent;

  return (
    <>
      <Container>
        <Section title={hero.title} description={hero.subtitle}>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="prose-lite max-w-2xl">{hero.text}</p>
              <ul className="space-y-2 text-sm text-[var(--color-ink-soft)]">
                {hero.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="card-gradient" title={hero.highlight.title}>
              <p className="text-sm opacity-90">{hero.highlight.text}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {hero.highlight.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-white/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>

        <Section title={profile.title} description={profile.text}>
          <div className="grid gap-6 md:grid-cols-2">
            {profile.items.map((item) => (
              <Card key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </Section>

        <Section title={roles.title}>
          <div className="grid gap-6 md:grid-cols-2">
            {roles.items.map((item) => (
              <Card key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </Section>

        <Section title={process.title}>
          <div className="grid gap-6 md:grid-cols-2">
            {process.steps.map((item) => (
              <Card key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </Section>

        <Section title={offer.title}>
          <div className="grid gap-6 md:grid-cols-2">
            {offer.items.map((item) => (
              <Card key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </Section>

        <Section title={form.title} description={form.helper}>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <CandidaturaForm />
            </div>
            <div className="space-y-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5 shadow-sm">
              <div>
                <h3 className="text-lg font-semibold">Cosa valutiamo</h3>
                <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                  {form.note}
                </p>
              </div>
              <div className="space-y-2 text-sm text-[var(--color-ink-soft)]">
                <p>{footer.address}</p>
                <p>{footer.email}</p>
                <p>
                  Il team risponde alle candidature entro 1-2 giorni
                  lavorativi.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink-soft)]">
                <p className="font-semibold text-[var(--color-ink)]">
                  Hai domande prima di candidarti?
                </p>
                <p>
                  Puoi scriverci al nostro indirizzo email aziendale o usare il
                  form accanto.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </Container>    </>
  );
}
