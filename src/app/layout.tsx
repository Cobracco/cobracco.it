import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentBanner from "@/components/ConsentBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PageView from "@/components/PageView";
import AdsClickTracker from "@/components/AdsClickTracker";
import ChunkErrorRecovery from "@/components/ChunkErrorRecovery";
import { siteContent } from "@/content/siteContent";
import { gtagConsentDefault } from "@/lib/consent";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.brand.siteUrl),
  title: {
    default: siteContent.brand.name,
    template: "%s | Cobracco",
  },
  description: siteContent.brand.description,
  keywords: [...siteContent.seo.primaryKeywords],
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon-2026.png",
  },
  openGraph: {
    title: siteContent.brand.name,
    description: siteContent.brand.description,
    url: siteContent.brand.siteUrl,
    siteName: siteContent.brand.name,
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/logos/logo-primary.png",
        width: 1200,
        height: 630,
        alt: `${siteContent.brand.name} - sviluppo software`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.brand.name,
    description: siteContent.brand.description,
    images: ["/logos/logo-primary.png"],
  },
  alternates: {
    languages: {
      it: "/",
    },
  },
};

const DEFAULT_GA_ID = "G-G3QT8YJTBB";
const CONSENT_COOKIE_NAME = "cobracco_consent";
const GA_ID =
  process.env.GA_ID || process.env.NEXT_PUBLIC_GA_ID || DEFAULT_GA_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const GTAG_ID = GA_ID || GOOGLE_ADS_ID;
const gtagInlineScript = GTAG_ID
  ? `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent','default', ${JSON.stringify(gtagConsentDefault())});
      (function syncConsentFromCookie() {
        var match = document.cookie.match(/(?:^|;\\s*)${CONSENT_COOKIE_NAME}=(accepted|rejected)(?:;|$)/);
        if (!match) return;
        if (match[1] === "accepted") {
          gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted'
          });
        } else {
          gtag('consent', 'update', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
        }
      })();
      gtag('js', new Date());
      ${
        GA_ID
          ? `gtag('config','${GA_ID}', { anonymize_ip: true, send_page_view: false });`
          : ""
      }
      ${GOOGLE_ADS_ID ? `gtag('config','${GOOGLE_ADS_ID}');` : ""}
    `
  : "";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteContent.brand.name,
  url: siteContent.brand.siteUrl,
  email: siteContent.footer.email,
  telephone: siteContent.footer.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Roma",
    addressCountry: "IT",
  },
  areaServed: "IT",
  sameAs: [
    "https://www.linkedin.com/company/cobracco",
    "https://github.com/Cobracco",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteContent.brand.name,
  url: siteContent.brand.siteUrl,
  inLanguage: "it-IT",
  description: siteContent.brand.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {GTAG_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
              strategy="beforeInteractive"
            />
            <Script id="gtag-bootstrap" strategy="beforeInteractive">
              {gtagInlineScript}
            </Script>
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <Header />
        <ChunkErrorRecovery />
        <GoogleAnalytics gaId={GA_ID} googleAdsId={GOOGLE_ADS_ID} />
        <PageView />
        <AdsClickTracker />
        <main>{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
