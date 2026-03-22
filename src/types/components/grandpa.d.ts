import type { GrandpaResult, GrandpaScoreEntry } from "stardew-valley-data";
import type { AchievementProgress } from "@/lib/utils/achievementProgress";

export interface GrandpaHeroProps {
  result: GrandpaResult;
}

export interface CriterionProgress {
  [criterion: string]: AchievementProgress;
}

export interface GrandpaCategoryCardProps {
  category: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  entries: GrandpaScoreEntry[];
  earned: number;
  max: number;
  totalEarnings?: number;
  progress?: CriterionProgress;
}
