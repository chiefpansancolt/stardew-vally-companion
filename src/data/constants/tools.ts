import type { LevelMeta, ToolLevels } from "@/types";

export const ROD_DOT_HEX: Record<number, string> = {
  0: "#86efac",
  1: "#d97706",
  2: "#60a5fa",
  3: "#c084fc",
  4: "#f0abfc",
};

export const TOOL_ENTRIES: Array<{
  key: Exclude<keyof ToolLevels, "currentlyUpgrading">;
  id: string;
}> = [
  { key: "axe", id: "axe" },
  { key: "pickaxe", id: "pickaxe" },
  { key: "hoe", id: "hoe" },
  { key: "wateringCan", id: "watering-can" },
  { key: "pan", id: "pan" },
  { key: "trashCan", id: "trash-can" },
];

export const PAN_LEVEL_OFFSET = 1;

export const LEVEL_NAMES = ["Basic", "Copper", "Steel", "Gold", "Iridium"];

export const LEVEL_META: Record<string, LevelMeta> = {
  Basic: {
    dotColor: "rgba(255,255,255,0.25)",
    textClass: "text-white/40",
    card: {
      border: "rgba(0,0,0,0.1)",
      bg: "rgba(0,0,0,0.03)",
      text: "#6b7280",
    },
  },
  Copper: {
    dotColor: "#fb923c",
    textClass: "text-orange-400",
    card: {
      border: "rgba(234,88,12,0.3)",
      bg: "rgba(234,88,12,0.06)",
      text: "#c2410c",
    },
  },
  Steel: {
    dotColor: "#93c5fd",
    textClass: "text-blue-300",
    card: {
      border: "rgba(59,130,246,0.3)",
      bg: "rgba(59,130,246,0.06)",
      text: "#1d4ed8",
    },
  },
  Gold: {
    dotColor: "#d9c97c",
    textClass: "text-highlight",
    card: {
      border: "rgba(161,116,0,0.3)",
      bg: "rgba(161,116,0,0.06)",
      text: "#92660a",
    },
  },
  Iridium: {
    dotColor: "#c084fc",
    textClass: "text-purple-400",
    card: {
      border: "rgba(126,34,206,0.3)",
      bg: "rgba(126,34,206,0.06)",
      text: "#7e22ce",
    },
  },
};
