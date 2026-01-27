import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  label: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full font-semibold tracking-wide !text-white hover:!text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

const sizes = {
  sm: "px-5 py-2 text-xs",
  md: "px-6 py-3 text-sm",
};

const variants = {
  primary:
    "bg-gradient-to-r from-[#0b2f6a] to-[#0092d6] text-white shadow-lg shadow-[rgba(11,61,145,0.45)] hover:from-[#0b2f6a] hover:to-[#0092d6] active:from-[#0b2f6a] active:to-[#0092d6]",
  secondary:
    "bg-gradient-to-r from-[#0b2f6a] to-[#0092d6] text-white shadow-lg shadow-[rgba(11,61,145,0.45)] hover:from-[#0b2f6a] hover:to-[#0092d6] active:from-[#0b2f6a] active:to-[#0092d6]",
  ghost:
    "bg-gradient-to-r from-[#0b2f6a] to-[#0092d6] text-white shadow-lg shadow-[rgba(11,61,145,0.45)] hover:from-[#0b2f6a] hover:to-[#0092d6] active:from-[#0b2f6a] active:to-[#0092d6]",
};

export default function Button({
  label,
  href,
  variant = "primary",
  size = "sm",
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = cn(baseStyles, sizes[size], variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {label}
    </button>
  );
}

