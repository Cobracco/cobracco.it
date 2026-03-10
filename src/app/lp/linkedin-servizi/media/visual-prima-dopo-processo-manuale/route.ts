import { buildLinkedInSlidesResponse } from "../../_lib/slideDeck";

export async function GET() {
  return buildLinkedInSlidesResponse({
    section: "media",
    slug: "visual-prima-dopo-processo-manuale",
    sourceFile: "visual-prima-dopo-processo-manuale.html",
  });
}
