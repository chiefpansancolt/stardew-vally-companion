"use client";

import { collections, crops } from "stardew-valley-data";
import type { CropsShippedEditStepProps } from "@/types";
import { ShippedItemsEditStep } from "@/comps/collections/edit/ShippedItemsEditStep";

const shippableIds = new Set(
	collections()
		.itemsShipped()
		.get()
		.map((i) => i.id)
);

const CROP_ITEMS = crops()
	.get()
	.filter((c) => shippableIds.has(c.id))
	.map((c) => ({ id: c.id, name: c.name, image: c.image }));

export function CropsShippedEditStep({ shipped, onChange }: CropsShippedEditStepProps) {
	return <ShippedItemsEditStep items={CROP_ITEMS} shipped={shipped} onChange={onChange} />;
}
