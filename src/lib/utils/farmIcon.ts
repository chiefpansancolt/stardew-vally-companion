import { maps } from "stardew-valley-data";
import { assetPath } from "./assetPath";

export function getFarmIcon(farmType: number): string {
  const farmMap = maps().find(String(farmType));
  return assetPath(farmMap?.icon ?? "");
}
