"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import { siteContent } from "@/content/siteContent";
import { openConsentManager } from "@/lib/consentController";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "/",
    icon: (
      <svg viewBox="0 0 448 512" className="h-4 w-4">
        <path
          fill="currentColor"
          d="M100.28 448H7.4V148.9h92.88zm-46.44-328a53.78 53.78 0 1 1 53.78-53.78 53.78 53.78 0 0 1-53.78 53.78zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.2-79.2-48.2 0-55.6 37.7-55.6 76.6V448h-92.7V148.9h89V196h1.3c12.4-23.4 42.6-48.2 87.7-48.2 93.7 0 111 61.7 111 141.9V448z"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "/",
    icon: (
      <svg viewBox="0 0 448 512" className="h-4 w-4">
        <path
          fill="currentColor"
          d="M224.1 141c-63.6 0-115 51.4-115 115 0 63.6 51.4 115 115 115 63.6 0 115-51.4 115-115 0-63.6-51.4-115-115-115zm0 190c-41.6 0-75-33.4-75-75s33.4-75 75-75 75 33.4 75 75-33.4 75-75 75zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.9-9.9-67.7-36.1-93.9-26.2-26.2-58-34.4-93.9-36.1-37-2.1-147.9-2.1-184.9 0-35.9 1.7-67.7 9.9-93.9 36.1S35.4 99.1 33.7 135c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.1 93.9 26.2 26.2 58 34.4 93.9 36.1 37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.1 26.2-26.2 34.4-58 36.1-93.9 2.1-37 2.1-147.9 0-184.9zm-48.8 224c-7.8 19.6-22.9 34.7-42.5 42.5-29.5 11.8-99.5 9.1-132.9 9.1s-103.4 2.6-132.9-9.1c-19.6-7.8-34.7-22.9-42.5-42.5-11.8-29.5-9.1-99.5-9.1-132.9s-2.6-103.4 9.1-132.9c7.8-19.6 22.9-34.7 42.5-42.5 29.5-11.8 99.5-9.1 132.9-9.1s103.4-2.6 132.9 9.1c19.6 7.8 34.7 22.9 42.5 42.5 11.8 29.5 9.1 99.5 9.1 132.9s2.7 103.4-9.1 132.9z"
        />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "/",
    icon: (
      <svg viewBox="0 0 320 512" className="h-4 w-4">
        <path
          fill="currentColor"
          d="M279.14 288l14.22-92.66h-88.91V123.1c0-25.35 12.42-50.06 52.24-50.06H295V6.26S259.67 0 225.36 0c-73.22 0-121.19 44.38-121.19 124.72v70.62H22.89V288h81.28v224h100.17V288z"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white">
      <Container className="grid gap-8 py-12 lg:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Image
              src="/logos/logo-primary.png"
              alt="Cobracco logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <p className="text-lg font-semibold">{siteContent.footer.headline}</p>
          </div>
          <p className="text-sm text-[var(--color-ink-soft)]">{siteContent.footer.copy}</p>
          <div className="text-sm text-[var(--color-ink-soft)] space-y-1">
            <p>{siteContent.footer.address}</p>
            <p>
              Preferisci contattarci? Usa la{" "}
              <Link className="text-[var(--color-ink)] underline" href="/contatti">
                pagina contatti
              </Link>{" "}
              e raccontaci il progetto.
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold">Navigazione</p>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {siteContent.navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold">Consenso & social</p>
          <button
            type="button"
            className="relative z-10 cursor-pointer pointer-events-auto text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)] underline-offset-2 hover:text-[var(--color-ink)]"
            onClick={() => openConsentManager()}
          >
            Gestisci consenso
          </button>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-soft)] transition hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
                aria-label={social.label}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
