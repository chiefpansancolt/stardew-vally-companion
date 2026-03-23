import type { GoldBundle, ItemBundle } from "stardew-valley-data";

export interface BundleCardProps {
  bundle: ItemBundle | GoldBundle;
  completedItems: Record<string, boolean>;
}
