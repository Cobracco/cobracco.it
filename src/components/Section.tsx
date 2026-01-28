import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export default function Section({
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section className={cn("py-6 sm:py-8 mb-2 sm:mb-4", className)}>
      <div className="space-y-3">
        {title ? (
          <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
        ) : null}
        {description ? (
          <p className="max-w-3xl text-base text-[var(--color-ink-soft)] sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </section>
  );
}

