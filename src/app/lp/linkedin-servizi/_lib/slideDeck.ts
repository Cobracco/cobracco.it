import { promises as fs } from "node:fs";
import path from "node:path";

type LinkedInDeckSection = "esempi" | "media";

type Slide = {
  title: string;
  subtitle: string;
  content: string;
  imgData: string;
};

type BuildLinkedInSlidesResponseParams = {
  section: LinkedInDeckSection;
  slug: string;
  sourceFile: string;
};

type ImageSource = {
  mimeType: string;
  base64: string;
};

const SAFE_SOURCE_FILE_PATTERN = /^[a-z0-9-]+\.html$/;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function getLinkedInSourcePath(sourceFile: string): string {
  if (!SAFE_SOURCE_FILE_PATTERN.test(sourceFile)) {
    throw new Error("source file non valido");
  }

  return path.join(process.cwd(), "public", "linkedin", sourceFile);
}

export async function readLinkedInSlides(sourceFile: string): Promise<Slide[]> {
  const sourcePath = getLinkedInSourcePath(sourceFile);
  const source = await fs.readFile(sourcePath, "utf8");
  const match = source.match(/const slides = (\[[\s\S]*?\]);/);
  if (!match) {
    throw new Error("Slides non trovate");
  }

  const slides = JSON.parse(match[1]) as Slide[];
  if (!slides.length) {
    throw new Error("Deck vuoto");
  }

  return slides;
}

export function parseInlineImageDataUri(dataUri: string): ImageSource {
  const match = dataUri.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!match) {
    throw new Error("Formato immagine non supportato");
  }

  return {
    mimeType: match[1],
    base64: match[2],
  };
}

export async function buildLinkedInSlidesResponse(
  params: BuildLinkedInSlidesResponseParams
): Promise<Response> {
  const canonicalUrl = `https://cobracco.it/lp/linkedin-servizi/${params.section}/${params.slug}`;
  let slides: Slide[];
  try {
    slides = await readLinkedInSlides(params.sourceFile);
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : "Errore lettura slide",
      { status: 500 }
    );
  }

  const ogTitle = slides[0]?.title ?? "Presentazione";
  const ogDescription = stripHtml(slides[0]?.content ?? "").slice(0, 220);
  const imageBaseUrl = `https://cobracco.it/lp/linkedin-servizi/image?file=${encodeURIComponent(params.sourceFile)}`;
  const ogImage = `${imageBaseUrl}&index=0`;

  const slidesHtml = slides
    .map(
      (slide, index) => `
      <section class="slide">
        <div class="content">
          <span class="tag">${escapeHtml(slide.subtitle)}</span>
          <h2>${escapeHtml(slide.title)}</h2>
          <div class="body">${slide.content}</div>
        </div>
        <div class="media">
          <img src="${imageBaseUrl}&index=${index}" alt="${escapeHtml(slide.title)}" loading="lazy" />
        </div>
      </section>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(ogTitle)} | Cobracco</title>
  <meta name="description" content="${escapeHtml(ogDescription)}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Cobracco" />
  <meta property="og:title" content="${escapeHtml(ogTitle)} | Cobracco" />
  <meta property="og:description" content="${escapeHtml(ogDescription)}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${ogImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <style>
    body {
      margin: 0;
      font-family: Inter, -apple-system, Segoe UI, Roboto, sans-serif;
      background: #0f172a;
      color: #f8fafc;
    }
    .page {
      max-width: 1180px;
      margin: 0 auto;
      padding: 24px 16px 48px;
      display: grid;
      gap: 18px;
    }
    .slide {
      border: 1px solid #334155;
      border-radius: 18px;
      background: linear-gradient(160deg, #1e293b 0%, #0f172a 60%);
      padding: 18px;
      display: grid;
      gap: 16px;
      grid-template-columns: 1.15fr 1fr;
      align-items: center;
      overflow: hidden;
    }
    .content h2 {
      margin: 8px 0 12px;
      font-size: clamp(28px, 4vw, 52px);
      line-height: 1.04;
      letter-spacing: -0.02em;
    }
    .body {
      color: #d2d9e8;
      font-size: clamp(17px, 2vw, 30px);
      line-height: 1.45;
    }
    .body ul {
      margin: 10px 0 0 20px;
      padding: 0;
    }
    .tag {
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      border-radius: 999px;
      padding: 7px 12px;
      background: rgba(59, 130, 246, 0.2);
      border: 1px solid rgba(96, 165, 250, 0.45);
      color: #93c5fd;
    }
    .media img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 14px;
      border: 1px solid #3b4f73;
      background: #0b1220;
    }
    @media (max-width: 940px) {
      .slide {
        grid-template-columns: 1fr;
      }
      .body {
        font-size: 18px;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    ${slidesHtml}
  </main>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
