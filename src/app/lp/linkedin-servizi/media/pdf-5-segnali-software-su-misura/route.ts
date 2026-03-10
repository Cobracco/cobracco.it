import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "media",
    slug: "pdf-5-segnali-software-su-misura",
    sourceFile: "pdf-5-segnali-software-su-misura.html",
  });
}
