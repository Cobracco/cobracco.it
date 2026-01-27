"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { siteContent } from "@/content/siteContent";
import { cn } from "@/lib/cn";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold">
          <Image
            src="/logos/logo-primary.png"
            alt="Cobracco logo"
            width={56}
            height={56}
            className="h-14 w-14"
            priority
          />
          <span>{siteContent.brand.name}</span>
        </Link>
        <nav
          aria-label="Navigazione principale"
          className="hidden flex-wrap gap-4 text-sm xl:flex"
        >
          {siteContent.navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-1 text-[var(--color-ink-soft)] transition hover:text-[var(--color-ink)]",
                  isActive &&
                    "bg-white text-[var(--color-ink)] shadow-sm ring-1 ring-[var(--color-border)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden xl:block">
          <Button label="Parla con noi" href="/contatti" variant="primary" />
        </div>
        <button
          type="button"
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-accent)] shadow-sm xl:hidden"
          aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.7 2.88 18.29 9.17 12 2.88 5.71 4.29 4.3l6.3 6.29 6.29-6.29z"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <path
                fill="currentColor"
                d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
              />
            </svg>
          )}
        </button>
      </Container>
      {isOpen ? (
        <div id="mobile-menu" className="border-t border-[var(--color-border)] bg-white xl:hidden">
          <Container className="flex flex-col gap-3 py-4 text-sm">
            {siteContent.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 text-[var(--color-ink-soft)] transition hover:text-[var(--color-ink)]",
                    isActive &&
                      "bg-[var(--color-surface)] text-[var(--color-ink)] shadow-sm ring-1 ring-[var(--color-border)]"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Button
                label="Parla con noi"
                href="/contatti"
                variant="primary"
                className="w-full justify-center"
              />
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
