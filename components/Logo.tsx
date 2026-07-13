import clsx from "clsx";

interface LogoMarkProps {
  className?: string;
}

/** The Charmora icon mark: gold swirl + sparkle with a blush blossom, echoing the brand lockup. */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Charmora">
      <defs>
        <linearGradient id="logomark-gold" x1="20" y1="6" x2="52" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F7E9BE" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AC8A26" />
        </linearGradient>
        <linearGradient id="logomark-blush" x1="8" y1="24" x2="30" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4E8E9" />
          <stop offset="100%" stopColor="#C99A9D" />
        </linearGradient>
      </defs>
      <path
        d="M31 8C27 8 24 11 24 15C24 19.5 28 21.5 31 24.5C34.5 21 38 18.5 38 14C38 10.5 35 8 31 8Z"
        fill="none"
        stroke="url(#logomark-gold)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M38 22C41 25.5 41 31 37.5 34C34.5 36.5 30 36 27.5 33"
        fill="none"
        stroke="url(#logomark-gold)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M44 22C44.6 25.8 45.4 26.6 49 27C45.4 27.4 44.6 28.2 44 32C43.4 28.2 42.6 27.4 39 27C42.6 26.6 43.4 25.8 44 22Z"
        fill="url(#logomark-gold)"
      />
      <g fill="url(#logomark-blush)" stroke="#B98487" strokeWidth="0.4">
        <path d="M27 30C27 30 24.5 25 27 21C29.5 25 27 30 27 30Z" />
        <path d="M27 30C27 30 32.5 27.5 36 29.5C32.5 32.5 27 30 27 30Z" />
        <path d="M27 30C27 30 30 35.5 28 39C24.5 36.5 27 30 27 30Z" />
        <path d="M27 30C27 30 21.5 32.5 18 30.5C21.5 27.5 27 30 27 30Z" />
      </g>
      <circle cx="27" cy="30" r="1.6" fill="#D4AF37" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  tone?: "ink" | "white";
  markClassName?: string;
  showSubline?: boolean;
}

export default function Logo({ className, tone = "ink", markClassName, showSubline = false }: LogoProps) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={clsx("h-6 w-6 shrink-0 md:h-7 md:w-7", markClassName)} />
      <span className="flex flex-col leading-none">
        <span
          className={clsx(
            "font-display text-xl tracking-[0.18em] md:text-2xl",
            tone === "ink" ? "text-blush-700" : "text-white"
          )}
        >
          CHARMORA
        </span>
        {showSubline && (
          <span
            className={clsx(
              "mt-1.5 text-[9px] font-medium uppercase tracking-widest2",
              tone === "ink" ? "text-ink-faint" : "text-white/70"
            )}
          >
            Fine Jewellery
          </span>
        )}
      </span>
    </span>
  );
}
