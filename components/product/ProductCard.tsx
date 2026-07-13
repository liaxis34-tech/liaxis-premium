import Link from "next/link";
import CharmCuffArt from "../ProductArt";
import { CharmKind } from "../icons/CharmIcons";
import { Product } from "@/lib/types";

function formatPrice(amount: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(amount));
}

const FALLBACK_CHARMS: CharmKind[] = ["flower", "star"];

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.handle}`} className="group block">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[2px] bg-blush-50 p-8 transition-colors duration-500 group-hover:bg-blush-100">
        <CharmCuffArt charms={FALLBACK_CHARMS} animated={false} className="transition-transform duration-700 group-hover:scale-105" />
      </div>
      <h3 className="mt-4 font-display text-lg text-ink-deep">{product.title}</h3>
      <p className="mt-1 text-sm text-ink-soft">{formatPrice(product.priceRange.minVariantPrice.amount)}</p>
    </Link>
  );
}
