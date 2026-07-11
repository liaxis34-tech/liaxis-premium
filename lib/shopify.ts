export const SHOPIFY_DOMAIN = "y70y80-51.myshopify.com";

export type ColorName = "Bej" | "Siyah";
export type SizeName = "S" | "M" | "L" | "XL";

export interface ProductVariant {
  id: string;
  color: ColorName;
  size: SizeName;
  swatch: string;
  available: boolean;
}

export const VARIANTS: ProductVariant[] = [
  { id: "46825554509878", color: "Bej", size: "S", swatch: "#D8C39F", available: true },
  { id: "46832010526774", color: "Bej", size: "M", swatch: "#D8C39F", available: true },
  { id: "46832010559542", color: "Bej", size: "L", swatch: "#D8C39F", available: true },
  { id: "46832010592310", color: "Bej", size: "XL", swatch: "#D8C39F", available: true },
  { id: "46825554542646", color: "Siyah", size: "S", swatch: "#1A1712", available: true },
  { id: "46832010625078", color: "Siyah", size: "M", swatch: "#1A1712", available: true },
  { id: "46832010657846", color: "Siyah", size: "L", swatch: "#1A1712", available: true },
  { id: "46832010690614", color: "Siyah", size: "XL", swatch: "#1A1712", available: true },
];

export const COLORS: ColorName[] = ["Bej", "Siyah"];
export const SIZES: SizeName[] = ["S", "M", "L", "XL"];

export function findVariant(color: ColorName, size: SizeName): ProductVariant | undefined {
  return VARIANTS.find((v) => v.color === color && v.size === size);
}

export function getVariantById(id: string): ProductVariant | undefined {
  return VARIANTS.find((v) => v.id === id);
}

export function getBuyNowUrl(variantId: string): string {
  return `https://${SHOPIFY_DOMAIN}/cart/${variantId}:1`;
}

export function getAddToCartUrl(variantId: string): string {
  return `https://${SHOPIFY_DOMAIN}/cart/add?id=${variantId}&quantity=1`;
}

export function goToBuyNow(variantId: string) {
  if (typeof window !== "undefined") {
    window.location.href = getBuyNowUrl(variantId);
  }
}

export function goToAddToCart(variantId: string) {
  if (typeof window !== "undefined") {
    window.location.href = getAddToCartUrl(variantId);
  }
}
