import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "media",
    slug: "cover-manifesto-servizi",
    sourceFile: "cover-manifesto-servizi.html",
  });
}
