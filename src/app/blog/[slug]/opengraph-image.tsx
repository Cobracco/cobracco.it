import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/content/blog";

export const alt = "Cobracco Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? "Cobracco Blog";
  const keywords = post?.keywords?.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0b2f6a 0%, #0f172a 60%, #061021 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#00b0ff",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
            COBRACCO
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 46 : 58,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {keywords.map((keyword) => (
            <div
              key={keyword}
              style={{
                display: "flex",
                fontSize: 22,
                padding: "8px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#cfe8ff",
              }}
            >
              {keyword}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
