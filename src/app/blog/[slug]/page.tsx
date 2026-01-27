import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { getPostBySlug, type BlogPost } from "@/content/blog";
import { siteContent } from "@/content/siteContent";

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

function renderBlock(block: BlogPost["body"][number], index: number) {
  if (block.type === "paragraph") {
    return (
      <p key={index} className="mt-6 text-base leading-7 text-[var(--color-ink-soft)]">
        {block.text}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={index} className="mt-6 ml-4 list-disc space-y-2 text-[var(--color-ink-soft)]">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "cta") {
    return (
      <div key={index} className="mt-8 flex flex-col gap-3 rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-6 shadow-sm">
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
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
          <span>{post.date}</span>
          <span>-</span>
          <span>{post.readingTime}</span>
        </div>
        <div className="mt-6 space-y-4">
          {post.body.map((block, index) => renderBlock(block, index))}
        </div>
      </Section>
    </Container>
  );
}
