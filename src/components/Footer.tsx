"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import { siteContent } from "@/content/siteContent";
import { openConsentManager } from "@/lib/consentController";
import Button from "@/components/Button";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/cobracco",
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
    label: "GitHub",
    href: "https://github.com/Cobracco",
    icon: (
      <svg viewBox="0 0 496 512" className="h-4 w-4">
        <path
          fill="currentColor"
          d="M165.9 397.4c0 2-2.3 3.7-5.2 3.7-3.3.3-5.6-1.5-5.6-3.7 0-2 2.3-3.7 5.2-3.7 3.3-.3 5.6 1.5 5.6 3.7zm-31.1-3.5c-.7 2 1.7 4.3 4.9 5.2 3.3 1 6.9 0 7.6-2 .7-2-1.7-4.3-4.9-5.2-3.2-1-6.9 0-7.6 2zm44.2-1.7c-2.9.8-4.9 3.2-4.3 5.4.6 2.3 3.5 3.4 6.4 2.6 2.9-.9 4.9-3.3 4.3-5.4-.6-2.3-3.5-3.4-6.4-2.6zm60.2-6.2c-1.1 2.8 1.2 6.1 5.1 7.4 3.9 1.3 8 0 9.1-2.8 1.1-2.8-1.2-6.1-5.1-7.4-3.9-1.3-8 0-9.1 2.8zm-58-12.1c-2.5 1.9-2.4 5.6.4 8.3 2.8 2.6 6.9 3.1 9.4 1.2 2.5-1.9 2.4-5.6-.4-8.3-2.8-2.6-6.9-3.1-9.4-1.2zm-30.5-15.2c-2.2 2.4-1.4 6.2 1.7 8.4 3.1 2.2 7.3 2.1 9.5-.3 2.2-2.4 1.4-6.2-1.7-8.4-3.1-2.2-7.3-2.1-9.5.3zm-28.3-25c-1.3 3.1 1.9 6.9 7.1 8.4 5.2 1.6 10.5.3 11.8-2.8 1.3-3.1-1.9-6.9-7.1-8.4-5.2-1.6-10.5-.3-11.8 2.8zM248 8C111 8 0 119 0 256c0 110.2 71.6 203.8 171.1 237.2 12.5 2.3 17.1-5.4 17.1-12 0-5.9-.2-25.6-.3-46.4-69.6 15.1-84.3-29.6-84.3-29.6-11.4-28.9-27.8-36.6-27.8-36.6-22.7-15.5 1.7-15.2 1.7-15.2 25.1 1.8 38.3 25.8 38.3 25.8 22.3 38.2 58.5 27.2 72.8 20.8 2.2-16.2 8.7-27.2 15.8-33.5-55.6-6.3-114.1-27.8-114.1-123.7 0-27.3 9.8-49.6 25.8-67.1-2.6-6.3-11.2-31.7 2.4-66.1 0 0 21-6.7 68.8 25.6 20-5.6 41.5-8.4 62.8-8.5 21.3.1 42.8 2.9 62.8 8.5 47.8-32.3 68.8-25.6 68.8-25.6 13.6 34.4 5 59.8 2.4 66.1 16 17.5 25.8 39.8 25.8 67.1 0 96.1-58.6 117.3-114.3 123.5 8.9 7.7 16.8 22.9 16.8 46.2 0 33.4-.3 60.3-.3 68.6 0 6.6 4.5 14.4 17.2 12C424.4 459.8 496 366.2 496 256 496 119 385 8 248 8z"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white">
      <Container className="grid gap-8 py-10 lg:grid-cols-3">
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
          <nav aria-label="Footer" className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {siteContent.navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold">Consenso & social</p>
          <Button
            label="Gestisci consenso"
            type="button"
            size="sm"
            onClick={() => openConsentManager()}
          />
          <div className="flex flex-col gap-1 text-sm">
            <Link
              href="/trattamento-dati"
              className="text-[var(--color-ink-soft)] transition hover:text-[var(--color-ink)]"
            >
              Trattamento dei dati
            </Link>
            <Link
              href="/cookie"
              className="text-[var(--color-ink-soft)] transition hover:text-[var(--color-ink)]"
            >
              Gestione cookie
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const isExternal = social.href.startsWith("http");

              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-soft)] transition hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
