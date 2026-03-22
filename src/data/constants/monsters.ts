import { monsters } from "stardew-valley-data";

const allMonsters = monsters().get();

export const MONSTER_LOCATIONS: string[] = [
  ...new Set(allMonsters.flatMap((m) => m.locations)),
].sort();
