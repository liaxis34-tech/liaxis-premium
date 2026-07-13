import { SVGProps } from "react";

interface CharmIconProps extends SVGProps<SVGSVGElement> {
  id?: string;
}

/** Five-petal blossom charm — represents Love. */
export function FlowerCharm({ id = "flower", ...props }: CharmIconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <defs>
        <linearGradient id={`${id}-fill`} x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4E8E9" />
          <stop offset="55%" stopColor="#D9B6B8" />
          <stop offset="100%" stopColor="#B98487" />
        </linearGradient>
      </defs>
      <g stroke="#9C666A" strokeWidth="0.6" fill={`url(#${id}-fill)`}>
        <path d="M24 24C24 24 21 14 24 8C27 14 24 24 24 24Z" />
        <path d="M24 24C24 24 33 20 39 23C33 27 24 24 24 24Z" />
        <path d="M24 24C24 24 30 33 27 40C22 35 24 24 24 24Z" />
        <path d="M24 24C24 24 15 27 9 24C15 20 24 24 24 24Z" />
        <path d="M24 24C24 24 32 33 30 39C24 37 24 24 24 24Z" transform="rotate(38 24 24)" />
      </g>
      <circle cx="24" cy="24" r="3.4" fill="#D4AF37" />
    </svg>
  );
}

/** Four-point sparkle star — represents Dreams. */
export function StarCharm({ id = "star", ...props }: CharmIconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <defs>
        <linearGradient id={`${id}-fill`} x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F7E9BE" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AC8A26" />
        </linearGradient>
      </defs>
      <path
        d="M24 4C24.8 14.6 25.9 16.9 34.5 21.5C42.6 25.9 43.2 22.1 24 44C24 33.4 22.9 30.9 14.5 26.5C6.4 22.1 5.8 25.9 24 4Z"
        fill={`url(#${id}-fill)`}
        stroke="#AC8A26"
        strokeWidth="0.5"
        transform="rotate(0 24 24)"
      />
      <path d="M24 2C25 14 26 15 38 24C26 33 25 34 24 46C23 34 22 33 10 24C22 15 23 14 24 2Z" fill={`url(#${id}-fill)`} />
    </svg>
  );
}

/** Crescent moon charm — represents New Beginnings. */
export function MoonCharm({ id = "moon", ...props }: CharmIconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <defs>
        <linearGradient id={`${id}-fill`} x1="10" y1="6" x2="38" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F7E9BE" />
          <stop offset="55%" stopColor="#E6CB74" />
          <stop offset="100%" stopColor="#AC8A26" />
        </linearGradient>
      </defs>
      <path
        d="M30 6C22.5 8 17 15.2 17 24C17 32.8 22.5 40 30 42C19.6 43.6 9 35.8 9 24C9 12.2 19.6 4.4 30 6Z"
        fill={`url(#${id}-fill)`}
        stroke="#AC8A26"
        strokeWidth="0.5"
      />
      <circle cx="33" cy="14" r="1.6" fill="#D4AF37" />
      <circle cx="37" cy="22" r="1" fill="#D4AF37" />
    </svg>
  );
}

/** Faceted gemstone charm — represents Memories. */
export function GemCharm({ id = "gem", ...props }: CharmIconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <defs>
        <linearGradient id={`${id}-fill`} x1="8" y1="10" x2="40" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDF8F8" />
          <stop offset="45%" stopColor="#E4C7C9" />
          <stop offset="100%" stopColor="#B98487" />
        </linearGradient>
      </defs>
      <path
        d="M14 10H34L42 20L24 42L6 20L14 10Z"
        fill={`url(#${id}-fill)`}
        stroke="#9C666A"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <path d="M14 10L20 20L24 10" stroke="#9C666A" strokeWidth="0.5" opacity="0.7" />
      <path d="M34 10L28 20L24 10" stroke="#9C666A" strokeWidth="0.5" opacity="0.7" />
      <path d="M6 20H42" stroke="#9C666A" strokeWidth="0.5" opacity="0.7" />
      <path d="M20 20L24 42M28 20L24 42" stroke="#9C666A" strokeWidth="0.5" opacity="0.6" />
    </svg>
  );
}

/** Simple 4-point sparkle, used as a decorative accent (not a charm option). */
export function Sparkle({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 0C12.6 6.4 13.6 7.4 20 8C13.6 8.6 12.6 9.6 12 16C11.4 9.6 10.4 8.6 4 8C10.4 7.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

export const CHARM_ICONS = {
  flower: FlowerCharm,
  star: StarCharm,
  moon: MoonCharm,
  gem: GemCharm,
} as const;

export type CharmKind = keyof typeof CHARM_ICONS;
