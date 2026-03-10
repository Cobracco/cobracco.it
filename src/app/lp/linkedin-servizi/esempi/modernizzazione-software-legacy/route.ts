import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "esempi",
    slug: "modernizzazione-software-legacy",
    sourceFile: "modernizzazione-software-legacy.html",
  });
}
