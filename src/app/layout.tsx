import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteContent } from "@/content/siteContent";

const manrope = Manrope({
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
};

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
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
