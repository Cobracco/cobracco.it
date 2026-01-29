import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { getPostBySlug, type BlogPost } from "@/content/blog";
import { siteContent } from "@/content/siteContent";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Articolo non trovato",
      description: "Il contenuto richiesto non è disponibile.",
    };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteContent.brand.siteUrl}/blog/${post.slug}`,
      siteName: siteContent.brand.name,
      type: "article",
    },
    twitter: {
      title: post.title,
      description: post.description,
      card: "summary_large_image",
    },
  };
}

function renderParagraph(text: string, index: number) {
  if (text.startsWith("### ")) {
    return (
      <h3 key={index} className="mt-8 text-lg font-semibold text-[var(--color-ink)]">
        {text.replace(/^###\s+/, "")}
      </h3>
    );
  }

  if (text.startsWith("## ")) {
    return (
      <h2 key={index} className="mt-8 text-xl font-semibold text-[var(--color-ink)]">
        {text.replace(/^##\s+/, "")}
      </h2>
    );
  }

  if (text.startsWith("Repository:")) {
    const url = text.replace(/^Repository:\s*/, "").trim();
    return (
      <p key={index} className="mt-6 text-sm font-semibold text-[var(--color-ink)]">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[var(--color-accent)]"
        >
          Repository
          <span className="break-all text-[var(--color-ink-soft)]">{url}</span>
        </a>
      </p>
    );
  }

  return (
    <p key={index} className="mt-4 text-base leading-7 text-[var(--color-ink-soft)]">
      {text}
    </p>
  );
}

function renderBlock(block: BlogPost["body"][number], index: number) {
  if (block.type === "paragraph") {
    return renderParagraph(block.text, index);
  }

  if (block.type === "list") {
    return (
      <ul key={index} className="mt-4 ml-4 list-disc space-y-2 text-[var(--color-ink-soft)]">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "cta") {
    return (
      <div key={index} className="mt-8 flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
        <p className="text-sm font-semibold text-[var(--color-ink)]">{block.text}</p>
        <Button href={block.href} variant="ghost" label={block.label} className="self-start" />
      </div>
    );
  }

  return null;
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <Container>
        <Section title="Articolo non trovato" description="Il contenuto richiesto non è disponibile.">
          <p className="text-sm text-[var(--color-ink-soft)]">
            Torna alla pagina <Link href="/blog">Blog</Link>.
          </p>
        </Section>
      </Container>
    );
  }

  return (
    <Container>
      <Section title={post.title} description={post.description}>
        <div className="mt-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
            <span>{formatDate(post.date)}</span>
            <span>-</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[11px] font-semibold text-[var(--color-ink-soft)]"
              >
                {keyword}
              </span>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            {post.body.map((block, index) => renderBlock(block, index))}
          </div>
        </div>
      </Section>
    </Container>
  );
}
