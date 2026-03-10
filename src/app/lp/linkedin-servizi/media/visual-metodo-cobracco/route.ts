import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "media",
    slug: "visual-metodo-cobracco",
    sourceFile: "visual-metodo-cobracco.html",
  });
}
