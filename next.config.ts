import type { NextConfig } from "next";

const baseSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "geolocation=(), microphone=(), camera=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
];

const defaultCsp =
  "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com; connect-src 'self' https: https://www.google.com; frame-src https://www.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";

const linkedinDeckCsp =
  "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://cdn.tailwindcss.com https://unpkg.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https: https://www.google.com; frame-src https://www.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: defaultCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/esempi/erp-crm-non-si-parlano",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/esempi/portale-operativo-team-interni",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/esempi/automazione-flussi-uffici-clienti",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/esempi/modernizzazione-software-legacy",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/esempi/dashboard-kpi-da-dati-dispersi",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/esempi/app-business-collegata-ai-sistemi",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/esempi/ai-documenti-ticket-richieste",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/esempi/mvp-solido-servizio-digitale",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/media/cover-manifesto-servizi",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/media/pdf-5-segnali-software-su-misura",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/media/pdf-integrazioni-crm-erp-senza-caos",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/media/visual-prima-dopo-processo-manuale",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/media/visual-metodo-cobracco",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/media/pdf-modernizzare-gestionale-legacy",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/media/url-pagina-servizi",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
      {
        source: "/lp/linkedin-servizi/media/url-proof-integrazioni-crm-erp",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: linkedinDeckCsp,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
