import clsx from "clsx";

interface LogoProps {
  className?: string;
  tone?: "ink" | "cream";
}

export function Logo({ className, tone = "ink" }: LogoProps) {
  return (
    <span
      className={clsx(
        "font-display tracking-[0.2em]",
        tone === "ink" ? "text-ink" : "text-cream",
        className
      )}
    >
      Charmora
    </span>
  );
}

interface MonogramProps {
  className?: string;
  tone?: "dark" | "light";
}

export function Monogram({ className, tone = "dark" }: MonogramProps) {
  const bg = tone === "dark" ? "#121110" : "#FFFFFF";
  const ring = tone === "dark" ? "#D9BE8F" : "#B08D57";
  const charm = tone === "dark" ? "#CBA872" : "#8A6A3E";

  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Charmora">
      <circle cx="32" cy="32" r="31" fill={bg} />
      <path
        d="M40 20a12 12 0 1 0 0 24"
        fill="none"
        stroke={ring}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="28" cy="44" r="3.4" fill={charm} />
    </svg>
  );
}

export default Logo;
