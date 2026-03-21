"use client";

import { crafting } from "stardew-valley-data";
import { FaHammer } from "react-icons/fa";
import type { CollectionProps as Props } from "@/types";
import { StatTile } from "@/comps/ui/StatTile";

const allRecipes = crafting().get();

export function CraftingHero({ gameData }: Props) {
	const total = allRecipes.length;
	const learnedCount = allRecipes.filter(
		(r) => gameData.craftingRecipes[r.name]?.learned === true
	).length;
	const craftedCount = allRecipes.filter(
		(r) => gameData.craftingRecipes[r.name]?.crafted === true
	).length;

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<FaHammer className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Crafting Summary</div>
					<div className="mt-0.5 text-sm text-gray-500">
						{gameData.character.name} · {gameData.character.farmName} Farm
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))" }}
			>
				<StatTile label="Total Recipes" value={total} />
				<StatTile
					label="Recipes Learned"
					value={learnedCount}
					valueColor="text-accent"
					suffix={`/ ${total}`}
				/>
				<StatTile
					label="Recipes Crafted"
					value={craftedCount}
					valueColor="text-green-600"
					suffix={`/ ${total}`}
				/>
			</div>
		</div>
	);
}
