import { promises as fs } from "node:fs";
import path from "node:path";

type Slide = {
  title: string;
  subtitle: string;
  content: string;
  imgData: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function GET() {
  const canonicalUrl =
    "https://cobracco.it/lp/linkedin-servizi/esempi/erp-crm-non-si-parlano";
  const sourcePath = path.join(
    process.cwd(),
    "public",
    "linkedin",
    "erp-crm-non-si-parlano.html"
  );

  const source = await fs.readFile(sourcePath, "utf8");
  const match = source.match(/const slides = (\[[\s\S]*?\]);/);
  if (!match) {
    return new Response("Slides non trovate", { status: 500 });
  }

  const slides = JSON.parse(match[1]) as Slide[];
  const ogImage = slides[0]?.imgData ?? "https://cobracco.it/projects/superai.png";

  const slidesHtml = slides
    .map(
      (slide) => `
      <section class="slide">
        <div class="content">
          <span class="tag">${escapeHtml(slide.subtitle)}</span>
          <h2>${escapeHtml(slide.title)}</h2>
          <div class="body">${slide.content}</div>
        </div>
        <div class="media">
          <img src="${slide.imgData}" alt="${escapeHtml(slide.title)}" />
        </div>
      </section>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ERP e CRM non si parlano | Cobracco</title>
  <meta name="description" content="Presentazione completa del caso ERP e CRM non si parlano." />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Cobracco" />
  <meta property="og:title" content="ERP e CRM non si parlano | Cobracco" />
  <meta property="og:description" content="Presentazione completa in slide del caso ERP e CRM non si parlano." />
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
