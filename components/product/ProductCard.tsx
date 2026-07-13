import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { SIGNATURE_PRODUCT_IMAGES } from "@/lib/mock-data";

function formatPrice(amount: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(amount));
}

export default function ProductCard({ product }: { product: Product }) {
  const image = SIGNATURE_PRODUCT_IMAGES[0];

  return (
    <Link href={`/product/${product.handle}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-[2px] bg-blush-50">
        <Image
          src={image.src}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 22vw, 46vw"
        />
      </div>
      <h3 className="mt-4 font-display text-lg text-ink-deep">{product.title}</h3>
      <p className="mt-1 text-sm text-ink-soft">{formatPrice(product.priceRange.minVariantPrice.amount)}</p>
    </Link>
  );
}
