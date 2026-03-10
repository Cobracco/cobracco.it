import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "esempi",
    slug: "app-business-collegata-ai-sistemi",
    sourceFile: "app-business-collegata-ai-sistemi.html",
  });
}
