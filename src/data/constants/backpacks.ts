import { type Backpack, tools } from "stardew-valley-data";
import type { BackpackLevel } from "@/types";

const STARTER_BACKPACK: BackpackLevel = {
  id: null,
  name: "Basic Backpack",
  description: "Your starting backpack. Holds 12 items.",
  slots: 12,
  cost: null,
  image: null,
};

export const BACKPACK_LEVELS: BackpackLevel[] = [
  STARTER_BACKPACK,
  ...(tools().backpacks().get() as Backpack[]).map((bp) => ({
    id: bp.id,
    name: bp.name,
    description: bp.description,
    slots: bp.slots,
    cost: bp.cost,
    image: bp.image,
  })),
];
