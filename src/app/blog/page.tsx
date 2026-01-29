import type { BlogPost } from "@/content/blog";
import { getAllPosts } from "@/content/blog";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articoli pratici su sviluppo software, MVP e AI per PMI e startup italiane.",
};

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

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Card
      title={post.title}
      text={post.description}
      className="flex h-full flex-col justify-between transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
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
      <div className="mt-6">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]"
        >
          Leggi l'articolo
          <span aria-hidden="true">-></span>
        </Link>
      </div>
    </Card>
  );
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <Container>
      <Section
        title="Blog"
        description="Guide rapide e concrete per decisioni software migliori."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>
    </Container>
  );
}

