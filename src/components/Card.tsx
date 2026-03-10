import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  title: string;
  text?: string;
  children?: ReactNode;
  className?: string;
};

function getIconForTitle(title: string) {
  const normalized = title.toLowerCase();
  const iconClassName =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm";

  if (
    normalized.includes("ai") ||
    normalized.includes("assistenti") ||
    normalized.includes("automazione")
  ) {
    return (
      <span className={iconClassName} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
          <path d="M12 3v3" />
          <path d="M5.64 5.64l2.12 2.12" />
          <path d="M3 12h3" />
          <path d="M5.64 18.36l2.12-2.12" />
          <path d="M12 21v-3" />
          <path d="M18.36 18.36l-2.12-2.12" />
          <path d="M21 12h-3" />
          <path d="M18.36 5.64l-2.12 2.12" />
          <circle cx="12" cy="12" r="4.5" />
        </svg>
      </span>
    );
  }

  if (
    normalized.includes("app") ||
    normalized.includes("mobile") ||
    normalized.includes("web")
  ) {
    return (
      <span className={iconClassName} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
          <rect x="6.5" y="2.75" width="11" height="18.5" rx="2.5" />
          <path d="M10 6h4" />
          <path d="M11 18.25h2" />
        </svg>
      </span>
    );
  }

  if (
    normalized.includes("api") ||
    normalized.includes("integraz") ||
    normalized.includes("crm") ||
    normalized.includes("erp")
  ) {
    return (
      <span className={iconClassName} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
          <circle cx="6" cy="12" r="2.25" />
          <circle cx="18" cy="6" r="2.25" />
          <circle cx="18" cy="18" r="2.25" />
          <path d="M8.1 11.1l7.8-4.2" />
          <path d="M8.1 12.9l7.8 4.2" />
        </svg>
      </span>
    );
  }

  if (
    normalized.includes("sicurezza") ||
    normalized.includes("security") ||
    normalized.includes("guardrail")
  ) {
    return (
      <span className={iconClassName} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
          <path d="M12 3l7 3v5c0 4.4-2.8 8.4-7 10-4.2-1.6-7-5.6-7-10V6l7-3z" />
          <path d="M9.75 12l1.5 1.5 3-3.5" />
        </svg>
      </span>
    );
  }

  if (
    normalized.includes("data") ||
    normalized.includes("analytics") ||
    normalized.includes("kpi") ||
    normalized.includes("bi")
  ) {
    return (
      <span className={iconClassName} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
          <path d="M4 19.25h16" />
          <path d="M7 16V9.5" />
          <path d="M12 16V5.5" />
          <path d="M17 16v-3.5" />
        </svg>
      </span>
    );
  }

  if (
    normalized.includes("metodo") ||
    normalized.includes("process") ||
    normalized.includes("discovery") ||
    normalized.includes("delivery") ||
    normalized.includes("piano")
  ) {
    return (
      <span className={iconClassName} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
          <path d="M5 6.75h14" />
          <path d="M5 12h9" />
          <path d="M5 17.25h14" />
          <circle cx="17.5" cy="12" r="1.75" />
        </svg>
      </span>
    );
  }

  if (
    normalized.includes("supporto") ||
    normalized.includes("team") ||
    normalized.includes("partner")
  ) {
    return (
      <span className={iconClassName} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
          <circle cx="9" cy="9" r="2.5" />
          <circle cx="16.5" cy="10.5" r="2" />
          <path d="M4.75 18c.8-2.3 2.85-3.75 5.25-3.75S14.45 15.7 15.25 18" />
          <path d="M14.8 18c.45-1.55 1.8-2.55 3.45-2.55 1.13 0 2.15.47 2.88 1.3" />
        </svg>
      </span>
    );
  }

  return (
    <span className={iconClassName} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
        <rect x="4" y="5" width="16" height="14" rx="3" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </svg>
    </span>
  );
}

export default function Card({ title, text, children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {getIconForTitle(title)}
        <h3 className="break-words pt-1 text-xl font-semibold">{title}</h3>
      </div>
      {text ? (
        <p className="mt-3 text-sm text-[var(--color-ink-soft)]">{text}</p>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
