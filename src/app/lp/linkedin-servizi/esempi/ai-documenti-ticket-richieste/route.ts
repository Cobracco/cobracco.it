import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "esempi",
    slug: "ai-documenti-ticket-richieste",
    sourceFile: "ai-documenti-ticket-richieste.html",
  });
}
