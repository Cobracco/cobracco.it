import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "esempi",
    slug: "portale-operativo-team-interni",
    sourceFile: "portale-operativo-team-interni.html",
  });
}
