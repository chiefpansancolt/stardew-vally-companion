import { type Villager } from "stardew-valley-data";

/** Compute the effective heart cap based on relationship status */
export function effectiveMaxHearts(
  villager: Villager,
  isMarried: boolean,
  status: string,
): number {
  if (isMarried) {
    return (
      villager.hearts.max +
      villager.hearts.bouquetIncrease +
      villager.hearts.spouseIncrease
    );
  }
  if (status.toLowerCase() === "dating") {
    return villager.hearts.max + villager.hearts.bouquetIncrease;
  }
  return villager.hearts.max;
}
