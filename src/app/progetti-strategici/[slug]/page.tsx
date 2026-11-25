import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import CallToAction from "@/components/CallToAction";
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
  type CaseStudyBodyBlock,
} from "@/content/caseStudies";
import { siteContent } from "@/content/siteContent";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Caso studio non trovato",
      description: "Il contenuto richiesto non è disponibile.",
    };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.description,
    alternates: {
      canonical: `/progetti-strategici/${caseStudy.slug}`,
    },
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.description,
      url: `${siteContent.brand.siteUrl}/progetti-strategici/${caseStudy.slug}`,
      siteName: siteContent.brand.name,
      type: "article",
    },
    twitter: {
      title: caseStudy.title,
      description: caseStudy.description,
      card: "summary_large_image",
    },
  };
}

function renderBlock(block: CaseStudyBodyBlock, index: number) {
  if (block.type === "list") {
    return (
      <ul key={index} className="mt-4 ml-4 list-disc space-y-2 text-[var(--color-ink-soft)]">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p key={index} className="mt-4 text-base leading-7 text-[var(--color-ink-soft)]">
      {block.text}
    </p>
  );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return (
      <Container>
        <Section title="Caso studio non trovato" description="Il contenuto richiesto non è disponibile.">
          <p className="text-sm text-[var(--color-ink-soft)]">
            Torna alla pagina <Link href="/progetti-strategici">Progetti strategici</Link>.
          </p>
        </Section>
      </Container>
    );
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.description,
    url: `${siteContent.brand.siteUrl}/progetti-strategici/${caseStudy.slug}`,
    mainEntityOfPage: `${siteContent.brand.siteUrl}/progetti-strategici/${caseStudy.slug}`,
    inLanguage: "it-IT",
    about: { "@type": "SoftwareApplication", name: caseStudy.projectTitle },
    author: { "@id": `${siteContent.brand.siteUrl}/#organization` },
    publisher: { "@id": `${siteContent.brand.siteUrl}/#organization` },
  };

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Section title={caseStudy.projectTitle} description={caseStudy.tagline}>
        <div className="mt-6 max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {caseStudy.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[11px] font-semibold text-[var(--color-ink-soft)]"
              >
                {item}
              </span>
            ))}
          </div>

          <h2 className="mt-8 text-lg font-semibold text-[var(--color-ink)]">Il problema</h2>
          <div className="space-y-1">
            {caseStudy.context.map((block, index) => renderBlock(block, index))}
          </div>

          <h2 className="mt-8 text-lg font-semibold text-[var(--color-ink)]">L'approccio</h2>
          <div className="space-y-1">
            {caseStudy.approach.map((block, index) => renderBlock(block, index))}
          </div>

          <h2 className="mt-8 text-lg font-semibold text-[var(--color-ink)]">Il risultato</h2>
          <div className="space-y-1">
            {caseStudy.outcome.map((block, index) => renderBlock(block, index))}
          </div>

          <div className="mt-8">
            <Link
              href={caseStudy.projectHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0b2f6a] to-[#0092d6] px-6 py-3 text-sm font-semibold tracking-wide !text-white shadow-lg shadow-[rgba(11,61,145,0.45)] transition hover:!text-white"
            >
              Visita {caseStudy.projectTitle}
            </Link>
          </div>
        </div>
      </Section>

      <Section title="Altri casi studio">
        <div className="space-y-2 text-sm text-[var(--color-ink-soft)]">
          <Link href="/progetti-strategici">Torna a tutti i progetti strategici</Link>
        </div>
      </Section>
    </Container>
  );
}
