import type { GoldBundle, ItemBundle } from "stardew-valley-data";
import type { CommunityCenterProgress } from "@/types/app/game";

export interface BundleCardProps {
  bundle: ItemBundle | GoldBundle;
  completedItems: Record<string, boolean>;
}

export interface CommunityCenterEditDraft {
  bundles: Record<string, Record<string, boolean>>;
  communityCenter: CommunityCenterProgress;
}

export interface BundleRoomEditStepProps {
  room: string;
  bundles: Record<string, Record<string, boolean>>;
  roomComplete: boolean;
  onBundlesChange: (bundles: Record<string, Record<string, boolean>>) => void;
  onRoomCompleteChange: (complete: boolean) => void;
}
