import type { Villager } from "stardew-valley-data";
import type { GameData, VillagerProgress } from "@/types/app/game";

export interface VillagersProps {
  gameData: GameData;
}

export interface VillagerCardProps {
  villager: Villager;
  gameData: GameData;
  onClick: () => void;
}

export interface BirthdayRowProps {
  villager: Villager;
  isToday: boolean;
}

export interface VillagerDetailModalProps {
  villager: Villager;
  progress: VillagerProgress | undefined;
  spouse: string;
  onClose: () => void;
}

export interface HeartEvent {
  heart: number;
  id: number | number[] | null;
  description: string;
  details: string;
}

export interface VillagersEditDraft {
  villagers: Record<string, VillagerProgress>;
}

export interface VillagersEditStepProps {
  villagers: Record<string, VillagerProgress>;
  onChange: (villagers: Record<string, VillagerProgress>) => void;
}
