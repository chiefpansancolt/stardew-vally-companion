import type { GoldenWalnut } from "stardew-valley-data";

export interface WalnutCardProps {
  walnut: GoldenWalnut;
  found: boolean;
}

export type WalnutLocationFilter = "all" | string;
export type WalnutStatusFilter = "all" | "found" | "not-found";

export interface GingerIslandEditDraft {
  islandUpgrades: Record<string, boolean>;
  goldenWalnuts: Record<string, number>;
  goldenWalnutsFound: number;
}

export interface IslandUpgradesEditStepProps {
  islandUpgrades: Record<string, boolean>;
  goldenWalnutsFound: number;
  onUpgradesChange: (islandUpgrades: Record<string, boolean>) => void;
  onFoundChange: (goldenWalnutsFound: number) => void;
}

export interface WalnutsEditStepProps {
  goldenWalnuts: Record<string, number>;
  onChange: (goldenWalnuts: Record<string, number>) => void;
}
