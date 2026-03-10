import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "esempi",
    slug: "automazione-flussi-uffici-clienti",
    sourceFile: "automazione-flussi-uffici-clienti.html",
  });
}
