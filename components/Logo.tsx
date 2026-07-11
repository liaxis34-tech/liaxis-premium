import clsx from "clsx";

interface LogoProps {
  className?: string;
  tone?: "ink" | "ivory";
}

export function Logo({ className, tone = "ink" }: LogoProps) {
  return (
    <span
      className={clsx(
        "font-display tracking-[0.2em]",
        tone === "ink" ? "text-ink" : "text-ivory",
        className
      )}
    >
      LIAXIS
    </span>
  );
}

interface MonogramProps {
  className?: string;
  tone?: "dark" | "light";
}

export function Monogram({ className, tone = "dark" }: MonogramProps) {
  const bg = tone === "dark" ? "#1A1712" : "#FAF7F1";
  const ring = "#B08D57";
  const letter = tone === "dark" ? "#E7D4AC" : "#8A6A3E";

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="LIAXIS"
    >
      <circle cx="32" cy="32" r="31" fill={bg} />
      <circle cx="32" cy="32" r="24" fill="none" stroke={ring} strokeWidth="1.2" />
      <circle cx="32" cy="32" r="27.5" fill="none" stroke={ring} strokeWidth="0.6" opacity="0.6" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontStyle="italic"
        fontSize="30"
        fill={letter}
      >
        L
      </text>
    </svg>
  );
}

export default Logo;
