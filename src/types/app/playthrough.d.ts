import type { GameData } from "./game";

export interface Playthrough {
  id: string;
  name: string;
  description?: string;
  createdAt: string; // ISO 8601
  lastModified: string; // ISO 8601
  data: GameData;
}

export interface AppData {
  playthroughs: Playthrough[];
  activePlaythroughId: string | null;
}
