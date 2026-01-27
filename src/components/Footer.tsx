import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import { siteContent } from "@/content/siteContent";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white">
      <Container className="grid gap-8 py-12 lg:grid-cols-[2fr_1fr]">
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
          <p className="text-sm text-[var(--color-ink-soft)]">
            {siteContent.footer.copy}
          </p>
          <div className="text-sm text-[var(--color-ink-soft)]">
            <p>{siteContent.footer.address}</p>
            <p>{siteContent.footer.email}</p>
            <p>{siteContent.footer.phone}</p>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold">Navigazione</p>
          <nav aria-label="Footer" className="grid gap-2 text-sm">
            {siteContent.navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
