"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { siteContent } from "@/content/siteContent";
import { cn } from "@/lib/cn";

type NavigationItem = { label: string; href: string };
type NavigationGroup = {
  label: string;
  href: string;
  items?: NavigationItem[];
};

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigationGroups: NavigationGroup[] =
    siteContent.navigationGroups ??
    siteContent.navigation.map((item) => ({ label: item.label, href: item.href }));

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
          {navigationGroups.map((group) => {
            const hasItems = Boolean(group.items?.length);
            const isGroupActive =
              pathname === group.href ||
              group.items?.some((item) => pathname === item.href);

            if (!hasItems) {
              return (
                <Link
                  key={group.href}
                  href={group.href}
                  aria-current={isGroupActive ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-1 text-[var(--color-ink-soft)] transition hover:text-[var(--color-ink)]",
                    isGroupActive &&
                      "bg-white text-[var(--color-ink)] shadow-sm ring-1 ring-[var(--color-border)]"
                  )}
                >
                  {group.label}
                </Link>
              );
            }

            return (
              <div key={group.href} className="group relative">
                <Link
                  href={group.href}
                  aria-current={isGroupActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3 py-1 text-[var(--color-ink-soft)] transition hover:text-[var(--color-ink)]",
                    isGroupActive &&
                      "bg-white text-[var(--color-ink)] shadow-sm ring-1 ring-[var(--color-border)]"
                  )}
                >
                  <span>{group.label}</span>
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 text-[var(--color-ink-soft)] transition group-hover:text-[var(--color-ink)]"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"
                    />
                  </svg>
                </Link>
                <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-2xl border border-[var(--color-border)] bg-white p-2 shadow-lg opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                  {group.items?.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "block rounded-xl px-3 py-2 text-sm text-[var(--color-ink-soft)] transition hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]",
                          isActive && "bg-[var(--color-surface)] text-[var(--color-ink)]"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
        <div className="hidden xl:block">
          <Button label="Parla con noi" href="/contatti" variant="primary" size="sm" />
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
            {navigationGroups.map((group) => {
              const hasItems = Boolean(group.items?.length);
              const isGroupActive =
                pathname === group.href ||
                group.items?.some((item) => pathname === item.href);

              if (!hasItems) {
                return (
                  <Link
                    key={group.href}
                    href={group.href}
                    aria-current={isGroupActive ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-2 text-[var(--color-ink-soft)] transition hover:text-[var(--color-ink)]",
                      isGroupActive &&
                        "bg-[var(--color-surface)] text-[var(--color-ink)] shadow-sm ring-1 ring-[var(--color-border)]"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {group.label}
                  </Link>
                );
              }

              return (
                <details
                  key={group.href}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]"
                  open={isGroupActive}
                >
                  <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-[var(--color-ink)]">
                    <span className="font-medium">{group.label}</span>
                    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"
                      />
                    </svg>
                  </summary>
                  <div className="flex flex-col gap-1 px-2 pb-3">
                    <Link
                      href={group.href}
                      className={cn(
                        "rounded-xl px-3 py-2 text-[var(--color-ink-soft)] transition hover:bg-white hover:text-[var(--color-ink)]",
                        pathname === group.href && "bg-white text-[var(--color-ink)]"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Panoramica {group.label}
                    </Link>
                    {group.items?.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "rounded-xl px-3 py-2 text-[var(--color-ink-soft)] transition hover:bg-white hover:text-[var(--color-ink)]",
                            isActive && "bg-white text-[var(--color-ink)]"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </details>
              );
            })}
            <div className="pt-2">
              <Button
                label="Parla con noi"
                href="/contatti"
                variant="primary"
                size="sm"
                className="w-full justify-center"
              />
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
