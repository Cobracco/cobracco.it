import {
  parseInlineImageDataUri,
  readLinkedInSlides,
} from "../_lib/slideDeck";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");
  const indexParam = searchParams.get("index");
  const index = Number(indexParam);

  if (!file || !Number.isInteger(index) || index < 0) {
    return new Response("Parametro non valido", { status: 400 });
  }

  try {
    const slides = await readLinkedInSlides(file);
    const slide = slides[index];
    if (!slide) {
      return new Response("Immagine non trovata", { status: 404 });
    }

    const { mimeType, base64 } = parseInlineImageDataUri(slide.imgData);
    const binary = Buffer.from(base64, "base64");

    return new Response(binary, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch {
    return new Response("Immagine non disponibile", { status: 404 });
  }
}
