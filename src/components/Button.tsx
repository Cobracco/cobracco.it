import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  label: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

const variants = {
  primary:
    "bg-gradient-to-r from-[#0b3d91] to-[#00b0ff] text-white shadow-lg shadow-[rgba(11,61,145,0.4)]",
  secondary:
    "border border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:border-slate-300",
  ghost:
    "text-[var(--color-ink)] hover:bg-[rgba(15,118,110,0.08)]",
};

export default function Button({
  label,
  href,
  variant = "primary",
  className,
  type = "button",
}: ButtonProps) {
  const classes = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {label}
    </button>
  );
}

