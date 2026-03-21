import type { Bundle, GoldBundle, ItemBundle } from "stardew-valley-data";

export function isItemOrGoldBundle(
  bundle: Bundle,
): bundle is ItemBundle | GoldBundle {
  return bundle.type === "items" || bundle.type === "gold";
}
