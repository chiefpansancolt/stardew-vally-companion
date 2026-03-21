import type { Skill } from "stardew-valley-data";
import type { GameData } from "@/types/app/game";

export interface CharacterProps {
  gameData: GameData;
}

export interface SkillsSectionProps extends CharacterProps {
  onToggleProfession?: (profId: string) => void;
}

export interface SkillCardProps {
  skillData: Skill;
  progress: { level: number; xp: number };
  professionIds: string[];
  onClick: () => void;
}

export interface SkillDetailModalProps {
  skill: Skill;
  currentLevel: number;
  chosenProfessionIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onToggleProfession?: (profId: string) => void;
}

export interface LevelBlockProps {
  skill: Skill;
  levelNum: number;
  reached: boolean;
  chosenProfessionIds: string[];
  onToggleProfession?: (profId: string) => void;
}

export interface ToolCardProps {
  toolId: string;
  level: number;
  onClick: () => void;
}

export interface FishingRodCardProps {
  levelIndex: number;
  onClick: () => void;
}

export interface BackpackCardProps {
  maxItems: number;
  onClick: () => void;
}

export interface ToolModalState {
  toolId: string;
  currentLevel: number;
}

export type RodLevel = {
  name: string;
  image: string;
  cost: number | null;
  fishingLevelRequired: number | null;
  bait: boolean;
  tackleSlots: number;
  canEnchant: boolean;
  obtain: string;
  description: string;
};

export type RodData = {
  id: string;
  type: string;
  name: string;
  description: string;
  canEnchant: boolean;
  levels: RodLevel[];
};

export interface BackpackLevel {
  id: string | null;
  name: string;
  description: string;
  slots: number;
  cost: number | null;
  image: string | null;
}
