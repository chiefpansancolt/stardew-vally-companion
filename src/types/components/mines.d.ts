import type { MineProgress } from "@/types/app/game";

export interface MinesEditDraft {
  mineProgress: MineProgress;
  monsters: Record<string, number>;
}

export interface MinesEditStepProps {
  mineProgress: MineProgress;
  onChange: (mineProgress: MineProgress) => void;
}

export interface MonsterKillsEditStepProps {
  monsters: Record<string, number>;
  onChange: (monsters: Record<string, number>) => void;
}
