import { MASTERY_LEVELS } from "stardew-valley-data";

export function getCurrentMasteryLevel(xp: number): number {
  return [...MASTERY_LEVELS].reverse().find((l) => xp >= l.totalXp)?.level ?? 0;
}
