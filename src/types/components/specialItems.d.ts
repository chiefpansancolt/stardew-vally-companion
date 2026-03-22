import type { SpecialItem } from "stardew-valley-data";

export interface SpecialItemCardProps {
  item: SpecialItem;
  acquired: boolean | null;
  onClick: () => void;
}

export interface SpecialItemDetailModalProps {
  item: SpecialItem | null;
  acquired: boolean | null;
  onClose: () => void;
}
