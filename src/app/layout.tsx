import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentBanner from "@/components/ConsentBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PageView from "@/components/PageView";
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
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: siteContent.brand.name,
    description: siteContent.brand.description,
    url: siteContent.brand.siteUrl,
    siteName: siteContent.brand.name,
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
    languages: {
      it: "/",
    },
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const defaultConsent = gtagConsentDefault();
const baseGtagSnippet =
  GA_ID
    ? `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent','default', ${JSON.stringify(defaultConsent)});
      gtag('js', new Date());
      gtag('config','${GA_ID}', { anonymize_ip: true, send_page_view: false });
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
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {GA_ID ? (
          <>
            <Script id="gtag-base" strategy="beforeInteractive">
              {baseGtagSnippet}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="beforeInteractive"
            />
          </>
        ) : null}
        <Header />
        <GoogleAnalytics gaId={GA_ID} />
        <PageView />
        <main>{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
