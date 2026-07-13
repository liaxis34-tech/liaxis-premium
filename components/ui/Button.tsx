"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  children,
  className,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden px-8 py-4 text-[11px] md:text-xs uppercase tracking-widest2 font-medium transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed",
        fullWidth && "w-full",
        variant === "primary" &&
          "bg-ink-deep text-white hover:bg-gold-dark border border-ink-deep hover:border-gold-dark",
        variant === "secondary" &&
          "bg-transparent text-ink-deep border border-ink-deep/30 hover:border-ink-deep hover:bg-ink-deep/5",
        variant === "ghost" &&
          "bg-transparent text-white border border-white/50 hover:bg-white hover:text-ink-deep",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
