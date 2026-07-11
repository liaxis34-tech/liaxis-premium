import { create } from "zustand";
import { ColorName, SizeName, findVariant, VARIANTS } from "./shopify";

interface SelectionState {
  color: ColorName;
  size: SizeName;
  setColor: (color: ColorName) => void;
  setSize: (size: SizeName) => void;
  selectedVariantId: () => string;
}

export const useSelectionStore = create<SelectionState>((set, get) => ({
  color: "Bej",
  size: "M",
  setColor: (color) => set({ color }),
  setSize: (size) => set({ size }),
  selectedVariantId: () => {
    const { color, size } = get();
    return findVariant(color, size)?.id ?? VARIANTS[0].id;
  },
}));
