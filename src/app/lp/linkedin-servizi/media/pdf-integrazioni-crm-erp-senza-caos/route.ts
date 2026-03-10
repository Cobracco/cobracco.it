import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "media",
    slug: "pdf-integrazioni-crm-erp-senza-caos",
    sourceFile: "pdf-integrazioni-crm-erp-senza-caos.html",
  });
}
