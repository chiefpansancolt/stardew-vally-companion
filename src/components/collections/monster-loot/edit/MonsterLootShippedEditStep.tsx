"use client";

import { collections, monsterLoot } from "stardew-valley-data";
import type { MonsterLootShippedEditStepProps } from "@/types";
import { ShippedItemsEditStep } from "@/comps/collections/edit/ShippedItemsEditStep";

const shippableIds = new Set(
	collections()
		.itemsShipped()
		.get()
		.map((i) => i.id)
);

const LOOT_ITEMS = monsterLoot()
	.get()
	.filter((l) => shippableIds.has(l.id))
	.map((l) => ({ id: l.id, name: l.name, image: l.image }));

export function MonsterLootShippedEditStep({ shipped, onChange }: MonsterLootShippedEditStepProps) {
	return <ShippedItemsEditStep items={LOOT_ITEMS} shipped={shipped} onChange={onChange} />;
}
