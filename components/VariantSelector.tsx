"use client";

import clsx from "clsx";
import { Check } from "lucide-react";
import { useSelectionStore } from "@/lib/store";
import { COLORS, SIZES, findVariant } from "@/lib/shopify";

interface VariantSelectorProps {
  compact?: boolean;
}

export default function VariantSelector({ compact = false }: VariantSelectorProps) {
  const { color, size, setColor, setSize } = useSelectionStore();

  return (
    <div className={clsx("flex flex-col", compact ? "gap-3" : "gap-6")}>
      <div className="flex flex-col gap-3">
        <span className="text-[11px] uppercase tracking-widest2 text-ink/60">
          Renk — <span className="text-ink">{color}</span>
        </span>
        <div className="flex items-center gap-3">
          {COLORS.map((c) => {
            const variant = findVariant(c, size);
            const active = c === color;
            return (
              <button
                key={c}
                type="button"
                aria-label={c}
                disabled={!variant?.available}
                onClick={() => setColor(c)}
                className={clsx(
                  "relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300",
                  active
                    ? "border-gold ring-2 ring-gold/40 ring-offset-2 ring-offset-ivory"
                    : "border-ink/15 hover:border-ink/40"
                )}
              >
                <span
                  className="h-7 w-7 rounded-full border border-ink/10"
                  style={{ backgroundColor: c === "Bej" ? "#D8C39F" : "#1A1712" }}
                />
                {active && (
                  <Check
                    size={13}
                    strokeWidth={2.5}
                    className={clsx(
                      "absolute",
                      c === "Bej" ? "text-ink" : "text-ivory"
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-[11px] uppercase tracking-widest2 text-ink/60">
          Beden — <span className="text-ink">{size}</span>
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {SIZES.map((s) => {
            const variant = findVariant(color, s);
            const active = s === size;
            return (
              <button
                key={s}
                type="button"
                disabled={!variant?.available}
                onClick={() => setSize(s)}
                className={clsx(
                  "flex h-11 min-w-[2.75rem] items-center justify-center border px-3 text-xs uppercase tracking-wider transition-all duration-300",
                  active
                    ? "border-ink bg-ink text-ivory"
                    : "border-ink/20 text-ink/80 hover:border-ink",
                  !variant?.available && "cursor-not-allowed opacity-30"
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
