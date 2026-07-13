import clsx from "clsx";

/** Soft golden light reflections used to warm up section backgrounds. */
export default function GoldLight({ className }: { className?: string }) {
  return (
    <div className={clsx("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute -top-24 left-1/4 h-72 w-72 animate-sparkle rounded-full bg-gold-light/25 blur-3xl" />
      <div
        className="absolute bottom-0 right-1/4 h-96 w-96 animate-sparkle rounded-full bg-gold/15 blur-3xl"
        style={{ animationDelay: "1.5s" }}
      />
    </div>
  );
}
