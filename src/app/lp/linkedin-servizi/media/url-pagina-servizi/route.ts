import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "media",
    slug: "url-pagina-servizi",
    sourceFile: "url-pagina-servizi.html",
  });
}
