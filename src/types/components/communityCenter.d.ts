import type { ItemBundle, GoldBundle } from "stardew-valley-data";

export interface BundleCardProps {
  bundle: ItemBundle | GoldBundle;
  completedItems: Record<string, boolean>;
}
