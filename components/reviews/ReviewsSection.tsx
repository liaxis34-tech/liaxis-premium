import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";
import RatingSummary from "./RatingSummary";
import ReviewCard from "./ReviewCard";
import ReviewPhotoGallery from "./ReviewPhotoGallery";
import ReviewsEmptyState from "./ReviewsEmptyState";
import { getProductReviews, getReviewSummary, isReviewsConfigured } from "@/lib/reviews";

interface ReviewsSectionProps {
  productHandle: string;
  /** Renders its own SectionLabel + heading + centered rating summary. Set false when the
   *  caller already renders a heading nearby (e.g. homepage social-proof layout). */
  showHeading?: boolean;
  label?: string;
  heading?: string;
  limit?: number;
  className?: string;
}

/**
 * The Charmora review section — star ratings, customer photos/videos, review
 * text and names, sourced from Loox (or Judge.me) via lib/reviews.ts. Shows
 * nothing fabricated: renders a provider-aware empty state until real
 * reviews exist.
 */
export default async function ReviewsSection({
  productHandle,
  showHeading = true,
  label = "Reviews",
  heading = "What customers are saying",
  limit,
  className,
}: ReviewsSectionProps) {
  const [summary, allReviews, configured] = await Promise.all([
    getReviewSummary(productHandle),
    getProductReviews(productHandle),
    Promise.resolve(isReviewsConfigured()),
  ]);
  const reviews = limit ? allReviews.slice(0, limit) : allReviews;

  return (
    <div className={className}>
      {showHeading && (
        <Reveal className="text-center">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-light text-ink-deep md:text-4xl">{heading}</h2>
        </Reveal>
      )}

      {summary.count > 0 && (
        <Reveal delay={0.1} className={showHeading ? "mt-8 flex justify-center" : "flex justify-center"}>
          <RatingSummary summary={summary} />
        </Reveal>
      )}

      {reviews.length > 0 ? (
        <>
          <Reveal delay={0.15} className="mt-12">
            <ReviewPhotoGallery reviews={reviews} />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal key={review.id} delay={i * 0.06}>
                <ReviewCard review={review} />
              </Reveal>
            ))}
          </div>
        </>
      ) : (
        <Reveal delay={0.1} className="mt-12">
          <ReviewsEmptyState configured={configured} />
        </Reveal>
      )}
    </div>
  );
}
