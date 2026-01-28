import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

type BlogBodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "cta"; text: string; href: string; label: string };

type BlogPostInput = {
  slug?: string;
  title: string;
  description: string;
  date?: string;
  readingTime?: string;
  keywords?: string[];
  body: BlogBodyBlock[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "blog.json");

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function estimateReadingTime(body: BlogBodyBlock[]) {
  const text = body
    .map((block) => {
      if (block.type === "paragraph") return block.text;
      if (block.type === "list") return block.items.join(" ");
      if (block.type === "cta") return block.text;
      return "";
    })
    .join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

function validateInput(input: BlogPostInput) {
  if (!input.title || !input.description || !input.body) {
    return "title, description e body sono obbligatori.";
  }

  if (!Array.isArray(input.body) || input.body.length === 0) {
    return "body deve contenere almeno un blocco.";
  }

  for (const block of input.body) {
    if (!block || typeof block !== "object" || !("type" in block)) {
      return "Ogni blocco deve avere un type valido.";
    }

    if (block.type === "paragraph" && !block.text) {
      return "I blocchi paragraph richiedono text.";
    }

    if (block.type === "list" && (!Array.isArray(block.items) || block.items.length === 0)) {
      return "I blocchi list richiedono items.";
    }

    if (block.type === "cta" && (!block.text || !block.href || !block.label)) {
      return "I blocchi cta richiedono text, href e label.";
    }
  }

  return null;
}

async function readPosts() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writePosts(posts: unknown[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), "utf8");
}

export async function POST(request: Request) {
  const apiKey = process.env.BLOG_API_KEY;
  const providedKey = request.headers.get("x-api-key");

  if (!apiKey || providedKey !== apiKey) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }

  let payload: BlogPostInput;

  try {
    payload = (await request.json()) as BlogPostInput;
  } catch {
    return NextResponse.json({ error: "Payload JSON non valido." }, { status: 400 });
  }

  const validationError = validateInput(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const slug = payload.slug ? slugify(payload.slug) : slugify(payload.title);
  if (!slug) {
    return NextResponse.json({ error: "Impossibile generare lo slug." }, { status: 400 });
  }

  const date = payload.date ?? new Date().toISOString().slice(0, 10);
  const readingTime = payload.readingTime ?? estimateReadingTime(payload.body);
  const keywords = payload.keywords ?? [];

  const posts = await readPosts();

  if (posts.some((post) => post.slug === slug)) {
    return NextResponse.json({ error: "Slug gia esistente." }, { status: 409 });
  }

  const newPost = {
    slug,
    title: payload.title,
    description: payload.description,
    date,
    readingTime,
    keywords,
    body: payload.body,
  };

  posts.push(newPost);
  await writePosts(posts);

  return NextResponse.json({ ok: true, post: newPost }, { status: 201 });
}
