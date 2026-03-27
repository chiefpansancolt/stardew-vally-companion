import type { GameData } from "./game";
import type { Platform } from "@/data/constants/platforms";

export type { Platform };

export interface Playthrough {
  id: string;
  name: string;
  description?: string;
  platform?: Platform;
  createdAt: string; // ISO 8601
  lastModified: string; // ISO 8601
  data: GameData;
}

export interface AppData {
  playthroughs: Playthrough[];
  activePlaythroughId: string | null;
}
