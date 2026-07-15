// Charmora sells exactly one product: the Signature Ear Cuff. There are no
// color/size variants — the only customization is which charms are attached.
export const STORE_CONFIGURED = true;
export const SHOPIFY_DOMAIN = "charmora-7675.myshopify.com";
export const VARIANT_ID = "45238204268679";

export const PRODUCT_NAME = "Charmora Signature Ear Cuff";
export const PRODUCT_PRICE = 148;
export const PRODUCT_CURRENCY = "USD";

export type CharmId = "flower" | "star" | "gem" | "moon";

export interface Charm {
  id: CharmId;
  name: string;
  meaning: string;
  description: string;
  color: string;
}

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

export function formatPrice(amount: number = PRODUCT_PRICE): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: PRODUCT_CURRENCY,
    maximumFractionDigits: 0,
  }).format(amount);
}

function buildCharmNote(charmIds: CharmId[]): string {
  return charmIds.map((id) => getCharm(id).name).join(", ") || "No charms selected";
}

// Adds the Signature Ear Cuff variant to the Shopify cart and sends the
// customer straight to checkout (return_to=/checkout), with the chosen
// charms attached as a line item property. Every purchase action on the
// site — Buy Now or Add to Bag — uses this same permalink.
function getCheckoutUrl(charmIds: CharmId[]): string {
  const note = encodeURIComponent(buildCharmNote(charmIds));
  return `https://${SHOPIFY_DOMAIN}/cart/${VARIANT_ID}:1?return_to=/checkout&properties[Charms]=${note}`;
}

export function getBuyNowUrl(charmIds: CharmId[]): string {
  return getCheckoutUrl(charmIds);
}

export function getAddToCartUrl(charmIds: CharmId[]): string {
  return getCheckoutUrl(charmIds);
}

export function goToBuyNow(charmIds: CharmId[]) {
  if (typeof window !== "undefined") {
    window.location.href = getCheckoutUrl(charmIds);
  }
}

export function goToAddToCart(charmIds: CharmId[]) {
  if (typeof window !== "undefined") {
    window.location.href = getCheckoutUrl(charmIds);
  }
}
