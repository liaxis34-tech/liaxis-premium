import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/lib/types";
import { SIGNATURE_PRODUCT_IMAGES } from "@/lib/mock-data";

function formatPrice(amount: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(amount));
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const image = SIGNATURE_PRODUCT_IMAGES[index % SIGNATURE_PRODUCT_IMAGES.length];

  return (
    <Link href={`/product/${product.handle}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-blush-50 shadow-glass transition-shadow duration-500 group-hover:shadow-luxe">
        <Image
          src={image.src}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          sizes="(min-width: 1024px) 30vw, 46vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute bottom-4 left-4 flex translate-y-2 items-center gap-1.5 text-[11px] uppercase tracking-widest2 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View Piece
          <ArrowUpRight size={13} strokeWidth={1.6} />
        </span>
      </div>
      <h3 className="mt-5 font-display text-xl text-ink-deep">{product.title}</h3>
      <span className="mt-1 block h-px w-8 origin-left scale-x-100 bg-gold/50 transition-all duration-500 group-hover:w-14 group-hover:bg-gold" />
      <p className="mt-3 font-display text-lg text-ink-soft">{formatPrice(product.priceRange.minVariantPrice.amount)}</p>
    </Link>
  );
}
