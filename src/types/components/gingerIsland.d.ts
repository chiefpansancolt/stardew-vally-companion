import type { GoldenWalnut } from "stardew-valley-data";

export interface WalnutCardProps {
  walnut: GoldenWalnut;
  found: boolean;
}

export type WalnutLocationFilter = "all" | string;
export type WalnutStatusFilter = "all" | "found" | "not-found";
