import type { GameData } from "@/types";
import type { CategoryProgress } from "@/lib/pages/perfection";

export interface DashboardProps {
  gameData: GameData;
}

export interface PerfectionCardProps extends DashboardProps {
  categories: CategoryProgress[];
  score: number;
}
