import type { Skill } from "stardew-valley-data";
import type {
  CharacterInfo,
  GameData,
  MasteryProgress,
  SkillProgress,
  ToolLevels,
} from "@/types/app/game";

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

export interface CharacterEditDraft {
  character: CharacterInfo;
  toolLevels: ToolLevels;
  skills: Record<string, SkillProgress>;
  professions: string[];
  mastery: MasteryProgress;
  stardrops: Record<string, boolean>;
  achievements: string[];
}

export interface CharacterCoreEditStepProps {
  character: CharacterInfo;
  onChange: (character: CharacterInfo) => void;
}

export interface ToolsEditStepProps {
  toolLevels: ToolLevels;
  maxItems: number;
  onToolLevelsChange: (toolLevels: ToolLevels) => void;
  onMaxItemsChange: (maxItems: number) => void;
}

export interface SkillsEditStepProps {
  skills: Record<string, SkillProgress>;
  professions: string[];
  mastery: MasteryProgress;
  onSkillsChange: (skills: Record<string, SkillProgress>) => void;
  onProfessionsChange: (professions: string[]) => void;
  onMasteryChange: (mastery: MasteryProgress) => void;
}

export interface StardropsEditStepProps {
  stardrops: Record<string, boolean>;
  onChange: (stardrops: Record<string, boolean>) => void;
}

export interface AchievementsEditStepProps {
  achievements: string[];
  onChange: (achievements: string[]) => void;
}

export interface BackpackLevel {
  id: string | null;
  name: string;
  description: string;
  slots: number;
  cost: number | null;
  image: string | null;
}
