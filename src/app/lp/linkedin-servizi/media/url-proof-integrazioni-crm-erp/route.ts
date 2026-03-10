import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "media",
    slug: "url-proof-integrazioni-crm-erp",
    sourceFile: "url-proof-integrazioni-crm-erp.html",
  });
}
