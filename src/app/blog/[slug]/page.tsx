import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { getPostBySlug, getAllPosts } from "@/content/blog";
import { siteContent } from "@/content/siteContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
  };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: siteContent.brand.name,
      url: siteContent.brand.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteContent.brand.name,
      url: siteContent.brand.siteUrl,
    },
    mainEntityOfPage: `${siteContent.brand.siteUrl}/blog/${post.slug}`,
  };

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section>
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-ink-soft)]">{post.date}</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">{post.title}</h1>
          <p className="text-base text-[var(--color-ink-soft)] sm:text-lg">
            {post.description}
          </p>
          <p className="text-xs text-[var(--color-ink-soft)]">
            Tempo di lettura: {post.readingTime}
          </p>
        </div>
        <div className="prose-lite mt-10">
          {post.body.map((block, index) => {
            if (block.type === "list") {
              return (
                <ul key={`${post.slug}-list-${index}`}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            if (block.type === "cta") {
              return (
                <p key={`${post.slug}-cta-${index}`}>
                  {block.text} <Link href={block.href}>{block.label}</Link>
                </p>
              );
            }
            return <p key={`${post.slug}-p-${index}`}>{block.text}</p>;
          })}
        </div>
      </Section>
    </Container>
  );
}
