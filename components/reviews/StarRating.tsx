import { Star } from "lucide-react";
import clsx from "clsx";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

/** Renders a 5-star row, supporting fractional ratings (e.g. 4.3) for summary use. */
export default function StarRating({ rating, size = 14, className }: StarRatingProps) {
  return (
    <div className={clsx("flex gap-0.5 text-gold", className)} role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fillAmount = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} strokeWidth={1.3} className="absolute inset-0 text-gold/40" />
            {fillAmount > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillAmount * 100}%` }}>
                <Star size={size} strokeWidth={1.3} fill="currentColor" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
