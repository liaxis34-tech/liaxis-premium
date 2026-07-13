import type { CharmKind } from "@/components/icons/CharmIcons";
import type { Product } from "./types";

// Placeholder catalog used until a Shopify store is connected (see lib/shopify.ts).
// Shape matches the Storefront API types in lib/types.ts one-for-one, so swapping
// this out for a live `getProduct` / `getAllProducts` call is a drop-in change.

export interface CharmOption {
  id: string;
  kind: CharmKind;
  name: string;
  meaning: string;
  description: string;
  price: number;
}

export const CHARM_OPTIONS: CharmOption[] = [
  {
    id: "charm-flower",
    kind: "flower",
    name: "Flower Charm",
    meaning: "Love",
    description: "A hand-set blossom for the love you carry with you.",
    price: 18,
  },
  {
    id: "charm-star",
    kind: "star",
    name: "Star Charm",
    meaning: "Dreams",
    description: "A faceted star for the dreams you're chasing.",
    price: 18,
  },
  {
    id: "charm-moon",
    kind: "moon",
    name: "Moon Charm",
    meaning: "New Beginnings",
    description: "A crescent moon for every new chapter.",
    price: 20,
  },
  {
    id: "charm-gem",
    kind: "gem",
    name: "Gemstone Charm",
    meaning: "Memories",
    description: "A faceted gem to hold a memory close.",
    price: 24,
  },
];

export const SIGNATURE_PRODUCT_HANDLE = "signature-charm-ear-cuff";
export const SIGNATURE_BASE_PRICE = 58;

// Real product photography for the signature ear cuff.
export const SIGNATURE_PRODUCT_IMAGES = [
  { src: "/images/hero-petals.webp", alt: "Charmora signature charm ear cuff floating amid falling petals" },
  { src: "/images/product-clean.webp", alt: "Charmora signature charm ear cuff" },
  { src: "/images/product-glass.webp", alt: "Charmora signature charm ear cuff resting on glass panels" },
  { src: "/images/lifestyle-worn.webp", alt: "Charmora signature charm ear cuff worn close up" },
  { src: "/images/community-hold.webp", alt: "Charmora signature charm ear cuff held up to the camera" },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "gid://shopify/Product/1",
    handle: SIGNATURE_PRODUCT_HANDLE,
    title: "Signature Charm Ear Cuff",
    description:
      "A 14k gold-plated ear cuff designed to carry your story. Choose up to four charms — flower, star, moon or gemstone — and build a combination that's uniquely yours. No piercing required.",
    descriptionHtml:
      "<p>A 14k gold-plated ear cuff designed to carry your story. Choose up to four charms — flower, star, moon or gemstone — and build a combination that's uniquely yours. No piercing required.</p>",
    images: [],
    variants: [
      {
        id: "gid://shopify/ProductVariant/1",
        title: "Default",
        availableForSale: true,
        price: { amount: "58.00", currencyCode: "USD" },
        compareAtPrice: { amount: "72.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Title", value: "Default" }],
        image: null,
      },
    ],
    options: [{ id: "opt-1", name: "Title", values: ["Default"] }],
    priceRange: {
      minVariantPrice: { amount: "58.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "58.00", currencyCode: "USD" },
    },
    tags: ["ear-cuff", "customizable", "bestseller"],
    collections: ["charm-jewelry"],
  },
  {
    id: "gid://shopify/Product/2",
    handle: "charm-chain-bracelet",
    title: "Charm Chain Bracelet",
    description: "A dainty gold chain bracelet ready for your charms.",
    descriptionHtml: "<p>A dainty gold chain bracelet ready for your charms.</p>",
    images: [],
    variants: [
      {
        id: "gid://shopify/ProductVariant/2",
        title: "Default",
        availableForSale: true,
        price: { amount: "64.00", currencyCode: "USD" },
        compareAtPrice: null,
        selectedOptions: [{ name: "Title", value: "Default" }],
        image: null,
      },
    ],
    options: [{ id: "opt-2", name: "Title", values: ["Default"] }],
    priceRange: {
      minVariantPrice: { amount: "64.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "64.00", currencyCode: "USD" },
    },
    tags: ["bracelet", "customizable"],
    collections: ["charm-jewelry"],
  },
  {
    id: "gid://shopify/Product/3",
    handle: "story-pendant-necklace",
    title: "Story Pendant Necklace",
    description: "A fine gold necklace with a single pendant setting for one meaningful charm.",
    descriptionHtml:
      "<p>A fine gold necklace with a single pendant setting for one meaningful charm.</p>",
    images: [],
    variants: [
      {
        id: "gid://shopify/ProductVariant/3",
        title: "Default",
        availableForSale: true,
        price: { amount: "72.00", currencyCode: "USD" },
        compareAtPrice: null,
        selectedOptions: [{ name: "Title", value: "Default" }],
        image: null,
      },
    ],
    options: [{ id: "opt-3", name: "Title", values: ["Default"] }],
    priceRange: {
      minVariantPrice: { amount: "72.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "72.00", currencyCode: "USD" },
    },
    tags: ["necklace", "customizable"],
    collections: ["charm-jewelry"],
  },
  {
    id: "gid://shopify/Product/4",
    handle: "charm-huggie-earrings",
    title: "Charm Huggie Earrings",
    description: "Petite huggie hoops with two removable charm loops.",
    descriptionHtml: "<p>Petite huggie hoops with two removable charm loops.</p>",
    images: [],
    variants: [
      {
        id: "gid://shopify/ProductVariant/4",
        title: "Default",
        availableForSale: true,
        price: { amount: "54.00", currencyCode: "USD" },
        compareAtPrice: null,
        selectedOptions: [{ name: "Title", value: "Default" }],
        image: null,
      },
    ],
    options: [{ id: "opt-4", name: "Title", values: ["Default"] }],
    priceRange: {
      minVariantPrice: { amount: "54.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "54.00", currencyCode: "USD" },
    },
    tags: ["earrings", "customizable"],
    collections: ["charm-jewelry"],
  },
];

export function getMockProduct(handle: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.handle === handle);
}
