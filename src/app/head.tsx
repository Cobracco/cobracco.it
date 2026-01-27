import { gtagConsentDefault } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const baseGtagSnippet =
  GA_ID
    ? `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent','default', ${JSON.stringify(gtagConsentDefault())});
      gtag('js', new Date());
      gtag('config','${GA_ID}', { anonymize_ip: true, send_page_view: false });
    `
    : "";

export default function Head() {
  return (
    <>
      {GA_ID ? (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
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
