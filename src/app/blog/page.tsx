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

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Card title={post.title} text={post.description}>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[var(--color-ink-soft)]">
        <span>{post.date}</span>
        <span>-</span>
        <span>{post.readingTime}</span>
      </div>
      <div className="mt-4">
        <Link href={`/blog/${post.slug}`} className="text-sm font-semibold">
          Leggi l'articolo
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
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>
    </Container>
  );
}

