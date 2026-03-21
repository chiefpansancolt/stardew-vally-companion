import type { Season } from "stardew-valley-data";
import type { BonusResult } from "@/lib/utils/professionPrices";

export interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: "dark" | "light";
}

export interface StatTileProps {
  label: string;
  value: string | number;
  colored?: boolean;
  accent?: boolean;
  valueColor?: string;
  suffix?: string | number;
}

export interface ShippedBadgeProps {
  shippable: boolean;
  shipped: boolean;
  count?: number;
  label?: string;
  notLabel?: string;
}

export interface FilterPopoverProps {
  activeCount: number;
  children: React.ReactNode;
}

export interface FilterGroupProps {
  label: string;
  className?: string;
  children: React.ReactNode;
}

export interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export interface FilterRadioProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}

export interface SeasonBadgesProps {
  seasons: Season[];
}

export interface ProfessionsButtonProps {
  active: boolean;
  onClick: () => void;
}

export interface IridiumRowProps {
  price: number;
  label: string;
  valueColor: string;
  isModal: boolean;
}

export interface PriceGridProps {
  price: number;
  maxQuality: string;
  shipped?: boolean;
  variant?: "card" | "modal";
  professionBonus?: BonusResult | null;
  professionBonuses?: BonusResult[];
}

export interface EHPairProps {
  energy: number;
  health: number;
  iconSize: string;
  textSize: string;
}

export interface EnergyHealthGridProps {
  energy: number;
  health: number;
  maxQuality: string;
  variant?: "card" | "modal";
  poison?: boolean;
}

export interface MuseumBadgeProps {
  donated: boolean;
  found: boolean;
}

export interface BuyPrice {
  place: string;
  price: number;
}

export interface SeedRowProps {
  image?: string | null;
  name: string;
  prices?: BuyPrice[];
  variant?: "card" | "modal";
  emptyLabel?: string;
}

export interface NavySectionProps {
  title: string;
  badge?: string;
  children: React.ReactNode;
}

export interface NoPlaythroughFallbackProps {
  feature: string;
}
