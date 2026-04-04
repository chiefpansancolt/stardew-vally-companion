"use client";

import { artisanGoods, collections } from "stardew-valley-data";
import type { ArtisanGoodsShippedEditStepProps } from "@/types";
import { ShippedItemsEditStep } from "@/comps/collections/edit/ShippedItemsEditStep";

const shippableIds = new Set(
	collections()
		.itemsShipped()
		.get()
		.map((i) => i.id)
);

const ARTISAN_ITEMS = artisanGoods()
	.get()
	.filter((g) => shippableIds.has(g.id))
	.map((g) => ({ id: g.id, name: g.name, image: g.image }));

export function ArtisanGoodsShippedEditStep({
	shipped,
	onChange,
}: ArtisanGoodsShippedEditStepProps) {
	return <ShippedItemsEditStep items={ARTISAN_ITEMS} shipped={shipped} onChange={onChange} />;
}
