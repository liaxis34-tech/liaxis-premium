import { BadgeCheck } from "lucide-react";
import StarRating from "./StarRating";
import ReviewMedia from "./ReviewMedia";
import type { Review } from "@/lib/reviews";

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
}

export default function ReviewCard({ review }: { review: Review }) {
  const date = formatDate(review.createdAt);

  return (
    <div className="rounded-[2px] border border-blush-200 bg-white p-7">
      <StarRating rating={review.rating} size={13} />
      {review.title && <p className="mt-3 font-display text-lg text-ink-deep">{review.title}</p>}
      <p className="mt-2 text-sm font-light leading-relaxed text-ink-soft">{review.body}</p>

      <ReviewMedia media={review.media} authorName={review.author} />

      <div className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-ink-faint">
        <span>{review.author}</span>
        {review.verifiedBuyer && (
          <span className="flex items-center gap-1 text-gold-dark" title="Verified buyer">
            <BadgeCheck size={13} strokeWidth={1.5} />
            Verified
          </span>
        )}
        {date && <span className="text-ink-faint/70">· {date}</span>}
      </div>
    </div>
  );
}
