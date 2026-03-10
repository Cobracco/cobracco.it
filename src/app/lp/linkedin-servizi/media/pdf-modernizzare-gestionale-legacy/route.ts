import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "media",
    slug: "pdf-modernizzare-gestionale-legacy",
    sourceFile: "pdf-modernizzare-gestionale-legacy.html",
  });
}
