import type { JojaBundle } from "stardew-valley-data";
import type { JojaProgress } from "@/types/app/game";

export interface JojaDevCardProps {
  development: JojaBundle;
  purchased: boolean;
}

export interface JojaEditDraft {
  joja: JojaProgress;
}

export interface JojaEditStepProps {
  joja: JojaProgress;
  onChange: (joja: JojaProgress) => void;
}
