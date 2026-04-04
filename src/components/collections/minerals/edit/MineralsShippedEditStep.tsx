"use client";

import { type BarItem, minerals, type OreItem, type ResourceItem } from "stardew-valley-data";
import type { MineralsShippedEditStepProps } from "@/types";
import { ShippedItemsEditStep } from "@/comps/collections/edit/ShippedItemsEditStep";

const ores = minerals().ores().get() as OreItem[];
const bars = minerals().bars().get() as BarItem[];
const resources = minerals().resources().get() as ResourceItem[];

const MINING_ITEMS = [
	...ores.map((x) => ({ id: x.id, name: x.name, image: x.image })),
	...bars.map((x) => ({ id: x.id, name: x.name, image: x.image })),
	...resources.map((x) => ({ id: x.id, name: x.name, image: x.image })),
];

export function MineralsShippedEditStep({ shipped, onChange }: MineralsShippedEditStepProps) {
	return <ShippedItemsEditStep items={MINING_ITEMS} shipped={shipped} onChange={onChange} />;
}
