import type { GrandpaCategory } from "stardew-valley-data";
import type { IconType } from "react-icons";
import {
  HiAcademicCap,
  HiCurrencyDollar,
  HiHeart,
  HiHome,
  HiMap,
  HiStar,
} from "react-icons/hi";

interface GrandpaCategoryMeta {
  label: string;
  icon: IconType;
}

export const GRANDPA_CATEGORY_META: Record<
  GrandpaCategory,
  GrandpaCategoryMeta
> = {
  earnings: { label: "Earnings", icon: HiCurrencyDollar },
  skills: { label: "Skills", icon: HiAcademicCap },
  achievements: { label: "Achievements", icon: HiStar },
  friendship: { label: "Friendship", icon: HiHeart },
  "community-center": { label: "Community Center", icon: HiHome },
  exploration: { label: "Exploration", icon: HiMap },
};

export const GRANDPA_CATEGORY_ORDER: GrandpaCategory[] = [
  "earnings",
  "skills",
  "achievements",
  "friendship",
  "community-center",
  "exploration",
];

export const CANDLE_THRESHOLDS: { candle: number; points: number }[] = [
  { candle: 1, points: 0 },
  { candle: 2, points: 4 },
  { candle: 3, points: 8 },
  { candle: 4, points: 12 },
];

export const EARNINGS_TIERS: { threshold: number; label: string }[] = [
  { threshold: 50_000, label: "50,000g" },
  { threshold: 100_000, label: "100,000g" },
  { threshold: 200_000, label: "200,000g" },
  { threshold: 300_000, label: "300,000g" },
  { threshold: 500_000, label: "500,000g" },
  { threshold: 750_000, label: "750,000g" },
  { threshold: 1_000_000, label: "1,000,000g" },
];
