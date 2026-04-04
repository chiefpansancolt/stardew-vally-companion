"use client";

import { animals, isFarmAnimal } from "stardew-valley-data";
import type { AnimalProductsShippedEditStepProps } from "@/types";
import { ShippedItemsEditStep } from "@/comps/collections/edit/ShippedItemsEditStep";

const EXCLUDED_FROM_SHIPPING = new Set(["928", "107"]); // Golden Egg, Dinosaur Egg

const seen = new Set<string>();
const ANIMAL_ITEMS = animals()
	.farmAnimals()
	.get()
	.filter(isFarmAnimal)
	.flatMap((a) => [
		{ id: a.produce.id, name: a.produce.name, image: a.produce.image },
		...(a.deluxeProduce
			? [
					{
						id: a.deluxeProduce.id,
						name: a.deluxeProduce.name,
						image: a.deluxeProduce.image,
					},
				]
			: []),
	])
	.filter((item) => {
		if (EXCLUDED_FROM_SHIPPING.has(item.id) || seen.has(item.id)) return false;
		seen.add(item.id);
		return true;
	});

export function AnimalProductsShippedEditStep({
	shipped,
	onChange,
}: AnimalProductsShippedEditStepProps) {
	return <ShippedItemsEditStep items={ANIMAL_ITEMS} shipped={shipped} onChange={onChange} />;
}
