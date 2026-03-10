import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "esempi",
    slug: "dashboard-kpi-da-dati-dispersi",
    sourceFile: "dashboard-kpi-da-dati-dispersi.html",
  });
}
