"use client";

import {
	collections,
	forageables,
	type FruitTree,
	trees,
	type WildTree,
} from "stardew-valley-data";
import type { ForageablesShippedEditStepProps } from "@/types";
import { ShippedItemsEditStep } from "@/comps/collections/edit/ShippedItemsEditStep";

const shippableIds = new Set(
	collections()
		.itemsShipped()
		.get()
		.map((i) => i.id)
);

const allTrees = trees().get();
const fruitTrees = allTrees.filter((t): t is FruitTree => t.type === "fruit-tree");
const wildTrees = allTrees.filter((t): t is WildTree => t.type === "wild-tree");

const FORAGEABLE_ITEMS = [
	...forageables()
		.sortByName()
		.get()
		.filter((f) => shippableIds.has(f.id))
		.map((f) => ({ id: f.id, name: f.name, image: f.image })),
	...fruitTrees
		.filter((t) => shippableIds.has(t.produce.id))
		.map((t) => ({ id: t.produce.id, name: t.produce.name, image: t.produce.image })),
	...wildTrees
		.filter((t) => t.tapper != null && shippableIds.has(t.tapper.id))
		.map((t) => ({ id: t.tapper!.id, name: t.tapper!.name, image: t.tapper!.image })),
];

export function ForageablesShippedEditStep({ shipped, onChange }: ForageablesShippedEditStepProps) {
	return <ShippedItemsEditStep items={FORAGEABLE_ITEMS} shipped={shipped} onChange={onChange} />;
}
