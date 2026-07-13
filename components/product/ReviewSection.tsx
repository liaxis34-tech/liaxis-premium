import { Star } from "lucide-react";
import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";
import { Sparkle } from "../icons/CharmIcons";
import { getProductReviews, getReviewSummary } from "@/lib/reviews";

export default async function ReviewSection({ productHandle }: { productHandle: string }) {
  const [summary, reviews] = await Promise.all([
    getReviewSummary(productHandle),
    getProductReviews(productHandle),
  ]);

  return (
    <section id="reviews" className="border-t border-blush-100 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <Reveal className="text-center">
          <SectionLabel>Reviews</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-light text-ink-deep md:text-4xl">
            What customers are saying
          </h2>
          {summary.count > 0 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill={i < Math.round(summary.averageRating) ? "currentColor" : "none"} strokeWidth={1.3} />
                ))}
              </div>
              <span className="text-sm text-ink-soft">
                {summary.averageRating.toFixed(1)} from {summary.count} reviews
              </span>
            </div>
          )}
        </Reveal>

        {reviews.length > 0 ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-[2px] border border-blush-200 p-6">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={1.3} />
                  ))}
                </div>
                <p className="mt-3 text-sm font-light leading-relaxed text-ink-soft">{review.body}</p>
                <p className="mt-3 text-[11px] uppercase tracking-widest2 text-ink-faint">{review.author}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-12 flex max-w-md flex-col items-center rounded-[2px] border border-dashed border-blush-300 px-10 py-12 text-center">
            <Sparkle className="h-5 w-5 text-gold" />
            <p className="mt-3 font-display text-lg text-ink-deep">No reviews yet</p>
            <p className="mt-2 text-sm font-light text-ink-soft">
              Be the first to share your experience with this piece.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
