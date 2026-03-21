import { maps } from "stardew-valley-data";

const allMaps = maps().get();

export const FARM_TYPES = allMaps.map((map, index) => ({
  value: Number.isFinite(Number(map.id)) ? Number(map.id) : index,
  label: map.name,
}));

export const FARM_TYPE_LABELS: Record<number, string> = Object.fromEntries(
  FARM_TYPES.map((ft) => [ft.value, ft.label]),
);
