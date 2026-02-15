import { gtagConsentDefault } from "@/lib/consent";

const GA_ID = process.env.GA_ID || process.env.NEXT_PUBLIC_GA_ID;
const GOOGLE_ADS_ID =
  process.env.GOOGLE_ADS_ID || process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const GTAG_ID = GA_ID || GOOGLE_ADS_ID;
const baseGtagSnippet =
  GTAG_ID
    ? `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent','default', ${JSON.stringify(gtagConsentDefault())});
      gtag('js', new Date());
      ${GA_ID ? `gtag('config','${GA_ID}', { anonymize_ip: true, send_page_view: false });` : ""}
      ${GOOGLE_ADS_ID ? `gtag('config','${GOOGLE_ADS_ID}');` : ""}
    `
    : "";

export default function Head() {
  return (
    <>
      {GTAG_ID ? (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: baseGtagSnippet,
            }}
          />
        </>
      ) : null}
    </>
  );
}
