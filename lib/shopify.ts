export const SHOPIFY_DOMAIN = "charmora-7675.myshopify.com";

export type CharmId = "flower" | "star" | "gem" | "moon";

export interface Charm {
  id: CharmId;
  name: string;
  meaning: string;
  description: string;
  color: string;
}

// Charm options for the Signature Ear Cuff's builder — the only product
// with swappable charms. Every other cuff in the collection ships as a
// fixed, finished design.
export const CHARMS: Charm[] = [
  {
    id: "flower",
    name: "Flower",
    meaning: "Love",
    description: "For the love you carry — given, received, or still growing.",
    color: "#C17862",
  },
  {
    id: "star",
    name: "Star",
    meaning: "Dreams",
    description: "For the dreams you're chasing and the ones still ahead.",
    color: "#B08D57",
  },
  {
    id: "gem",
    name: "Blue Gem",
    meaning: "Memories",
    description: "For the moments you never want to forget.",
    color: "#6E8FB8",
  },
  {
    id: "moon",
    name: "Moon",
    meaning: "New Beginnings",
    description: "For every chapter you're brave enough to start.",
    color: "#8A6A3E",
  },
];

export const MAX_CHARMS = 3;

export function getCharm(id: CharmId): Charm {
  return CHARMS.find((c) => c.id === id) ?? CHARMS[0];
}

export type Metal = "gold" | "silver";

export interface Product {
  id: string;
  name: string;
  metal: Metal;
  price: number;
  currency: string;
  images: string[];
  hasCharmBuilder: boolean;
  meaningLabel: string;
  meaningText: string;
  description: string;
  // Empty until the real Shopify variant is created for this design —
  // goToCheckout() falls back to a "not yet available" state instead of
  // building a broken checkout link.
  variantId: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "signature",
    name: "Signature Ear Cuff",
    metal: "gold",
    price: 148,
    currency: "USD",
    images: ["/images/product-studio.webp", "/images/product-petals.webp"],
    hasCharmBuilder: true,
    meaningLabel: "Your Story",
    meaningText: "Choose up to three charms and make it yours.",
    description:
      "A single, sculpted hoop in 14k gold vermeil, designed to hold up to three charms at once.",
    variantId: "45238204268679",
  },
  {
    id: "starfish-trail",
    name: "Starfish Trail Cuff",
    metal: "silver",
    price: 118,
    currency: "USD",
    images: ["/images/product-starfish-trail.webp"],
    hasCharmBuilder: false,
    meaningLabel: "Wonder",
    meaningText: "For the ones who find magic in the small, scattered things.",
    description:
      "Five hand-finished starfish trail along a sterling silver climber, cast to catch the light from every angle.",
    variantId: "",
  },
  {
    id: "butterfly",
    name: "Butterfly Cuff",
    metal: "silver",
    price: 128,
    currency: "USD",
    images: ["/images/product-butterfly.webp"],
    hasCharmBuilder: false,
    meaningLabel: "Transformation",
    meaningText: "For every version of you it took to become who you are.",
    description:
      "Three sterling silver butterflies in flight, finished with a pavé-set crystal trail at the lobe.",
    variantId: "",
  },
  {
    id: "gem-fringe-gold",
    name: "Gem Fringe Cuff — Gold",
    metal: "gold",
    price: 168,
    currency: "USD",
    images: ["/images/product-gem-fringe-gold.webp"],
    hasCharmBuilder: false,
    meaningLabel: "Brilliance",
    meaningText: "For the light you bring into a room without trying.",
    description:
      "A fringe of textured studs and a cluster of mixed gemstones, cast in 14k gold vermeil.",
    variantId: "",
  },
  {
    id: "gem-fringe-silver",
    name: "Gem Fringe Cuff — Silver",
    metal: "silver",
    price: 138,
    currency: "USD",
    images: ["/images/product-gem-fringe-silver.webp"],
    hasCharmBuilder: false,
    meaningLabel: "Brilliance",
    meaningText: "For the light you bring into a room without trying.",
    description:
      "A fringe of textured studs and a cluster of mixed gemstones, cast in sterling silver.",
    variantId: "",
  },
  {
    id: "pearl-blossom",
    name: "Pearl Blossom Cuff",
    metal: "gold",
    price: 158,
    currency: "USD",
    images: ["/images/product-pearl-blossom.webp"],
    hasCharmBuilder: false,
    meaningLabel: "Grace",
    meaningText: "For the quiet confidence that never needs to raise its voice.",
    description:
      "A hand-finished gold vermeil blossom set with cultured pearls, with two pearl studs climbing the lobe.",
    variantId: "",
  },
];

export function getProduct(id: string): Product {
  return PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];
}

export function formatPrice(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function buildCharmNote(charmIds: CharmId[]): string {
  return charmIds.map((id) => getCharm(id).name).join(", ") || "No charms selected";
}

// Adds a product's variant to the Shopify cart and sends the customer
// straight to checkout (return_to=/checkout). For the Signature Ear Cuff,
// the chosen charms ride along as a line item property. Returns null when
// the product has no real variant configured yet.
export function getCheckoutUrl(product: Product, charmIds: CharmId[] = []): string | null {
  if (!product.variantId) return null;
  let url = `https://${SHOPIFY_DOMAIN}/cart/${product.variantId}:1?return_to=/checkout`;
  if (product.hasCharmBuilder) {
    url += `&properties[Charms]=${encodeURIComponent(buildCharmNote(charmIds))}`;
  }
  return url;
}

export function goToCheckout(product: Product, charmIds: CharmId[] = []): boolean {
  const url = getCheckoutUrl(product, charmIds);
  if (url && typeof window !== "undefined") {
    window.location.href = url;
    return true;
  }
  return false;
}
