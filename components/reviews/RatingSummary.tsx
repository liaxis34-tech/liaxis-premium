import StarRating from "./StarRating";
import type { ReviewSummary } from "@/lib/reviews";

interface RatingSummaryProps {
  summary: ReviewSummary;
  align?: "center" | "start";
}

/** Average rating, count, and a per-star breakdown bar chart — Loox-style. */
export default function RatingSummary({ summary, align = "center" }: RatingSummaryProps) {
  const items = ([5, 4, 3, 2, 1] as const).map((stars) => ({
    stars,
    count: summary.ratingBreakdown[stars],
    percent: summary.count > 0 ? (summary.ratingBreakdown[stars] / summary.count) * 100 : 0,
  }));

  return (
    <div className={`flex flex-col gap-6 sm:flex-row sm:items-center ${align === "center" ? "sm:justify-center" : ""}`}>
      <div className={`flex flex-col ${align === "center" ? "items-center" : "items-start"}`}>
        <span className="font-display text-5xl text-ink-deep">{summary.averageRating.toFixed(1)}</span>
        <StarRating rating={summary.averageRating} size={16} className="mt-2" />
        <span className="mt-2 text-sm text-ink-soft">
          {summary.count} {summary.count === 1 ? "review" : "reviews"}
        </span>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-1.5">
        {items.map((item) => (
          <div key={item.stars} className="flex items-center gap-2">
            <span className="w-3 text-right text-[11px] text-ink-faint">{item.stars}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-blush-100">
              <div className="h-full rounded-full bg-gold" style={{ width: `${item.percent}%` }} />
            </div>
            <span className="w-6 text-[11px] text-ink-faint">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
