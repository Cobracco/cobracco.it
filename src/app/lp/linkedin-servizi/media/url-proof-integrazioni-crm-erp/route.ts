import { promises as fs } from "node:fs";
import path from "node:path";

export async function GET() {
  const htmlPath = path.join(
    process.cwd(),
    "public",
    "linkedin",
    "url-proof-integrazioni-crm-erp.html"
  );
  const html = await fs.readFile(htmlPath, "utf8");

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
