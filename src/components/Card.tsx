import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  title: string;
  text?: string;
  children?: ReactNode;
  className?: string;
};

export default function Card({ title, text, children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm",
        className
      )}
    >
      <h3 className="break-words text-xl font-semibold">{title}</h3>
      {text ? (
        <p className="mt-3 text-sm text-[var(--color-ink-soft)]">{text}</p>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
