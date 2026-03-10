import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "esempi",
    slug: "mvp-solido-servizio-digitale",
    sourceFile: "mvp-solido-servizio-digitale.html",
  });
}
