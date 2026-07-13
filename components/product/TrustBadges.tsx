import { Gem, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const BADGES = [
  { icon: Truck, label: "Free US Shipping $75+" },
  { icon: RotateCcw, label: "30-Day Returns" },
  { icon: ShieldCheck, label: "Secure Checkout" },
  { icon: Gem, label: "Hypoallergenic" },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-4 border-y border-blush-200 py-6 sm:grid-cols-4">
      {BADGES.map((badge) => (
        <div key={badge.label} className="flex flex-col items-center gap-2 text-center">
          <badge.icon size={18} strokeWidth={1.3} className="text-gold-dark" />
          <span className="text-[10px] uppercase tracking-widest2 text-ink-soft">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
