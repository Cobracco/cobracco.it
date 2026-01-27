"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { siteContent } from "@/content/siteContent";
import { cn } from "@/lib/cn";

export default function Header() {
  const pathname = usePathname();

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
        <nav aria-label="Navigazione principale" className="flex flex-wrap gap-4 text-sm">
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
        <Button label="Parla con noi" href="/contatti" variant="primary" />
      </Container>
    </header>
  );
}
