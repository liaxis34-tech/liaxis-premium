import { Sparkle } from "../icons/CharmIcons";

interface ReviewsEmptyStateProps {
  configured: boolean;
  align?: "center" | "start";
}

/**
 * Two honest empty states, never fake reviews:
 * - Loox/Judge.me not connected yet: tells the dev/merchant what's missing.
 * - Connected, but genuinely no reviews yet: invites the first customer review.
 */
export default function ReviewsEmptyState({ configured, align = "center" }: ReviewsEmptyStateProps) {
  return (
    <div
      className={`mx-auto flex max-w-md flex-col rounded-[2px] border border-dashed border-blush-300 bg-white/50 px-10 py-12 text-center ${
        align === "start" ? "sm:mx-0 sm:items-start sm:text-left" : "items-center"
      }`}
    >
      <Sparkle className="h-6 w-6 text-gold" />
      {configured ? (
        <>
          <p className="mt-4 font-display text-xl text-ink-deep">Your story could be first</p>
          <p className="mt-2 text-sm font-light text-ink-soft">
            Be the first to share your experience with this piece.
          </p>
        </>
      ) : (
        <>
          <p className="mt-4 font-display text-xl text-ink-deep">Reviews are on their way</p>
          <p className="mt-2 text-sm font-light text-ink-soft">
            This section connects automatically as soon as Loox (or Judge.me) is linked to the
            store — real customer ratings, photos and videos will appear here.
          </p>
        </>
      )}
    </div>
  );
}
