import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "esempi",
    slug: "erp-crm-non-si-parlano",
    sourceFile: "erp-crm-non-si-parlano.html",
  });
}
