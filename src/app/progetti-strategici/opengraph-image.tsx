import { ImageResponse } from "next/og";
import { siteContent } from "@/content/siteContent";

export const alt = "Progetti strategici Cobracco";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const projectNames = siteContent.pages.progettiStrategici.projects.items.map(
    (project) => project.title
  );

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
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          Progetti strategici
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {projectNames.map((name) => (
            <div
              key={name}
              style={{
                display: "flex",
                fontSize: 24,
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#cfe8ff",
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
