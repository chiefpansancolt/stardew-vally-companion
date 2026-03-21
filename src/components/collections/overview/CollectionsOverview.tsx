"use client";

import { collections } from "stardew-valley-data";
import type { CollectionItem } from "stardew-valley-data";
import { HiCollection } from "react-icons/hi";
import { CollectionProps as Props } from "@/types";
import { StatTile } from "@/comps/ui/StatTile";
import { CategorySection } from "./cards";

export function CollectionsOverview({ gameData }: Props) {
	const c = collections();

	const shippedItems = c.itemsShipped().get();
	const fishItems = c.fish().get();
	const artifactItems = c.artifacts().get();
	const mineralItems = c.minerals().get();
	const cookingItems = c.cooking().get();
	const craftingItems = c.crafting().get();

	const isShippedComplete = (item: CollectionItem) => gameData.shipped[item.id]?.shipped === true;
	const isFishComplete = (item: CollectionItem) =>
		gameData.fishCaught.some((f) => f.id === item.id);
	const isArtifactComplete = (item: CollectionItem) =>
		gameData.artifacts[item.id]?.found === true;
	const isMineralComplete = (item: CollectionItem) => gameData.minerals[item.id]?.found === true;
	const isCookingComplete = (item: CollectionItem) =>
		gameData.cookingRecipes[item.name]?.cooked === true;
	const isCraftingComplete = (item: CollectionItem) =>
		gameData.craftingRecipes[item.name]?.crafted === true;

	const shippedDone = shippedItems.filter(isShippedComplete).length;
	const fishDone = fishItems.filter(isFishComplete).length;
	const artifactDone = artifactItems.filter(isArtifactComplete).length;
	const mineralDone = mineralItems.filter(isMineralComplete).length;
	const cookingDone = cookingItems.filter(isCookingComplete).length;
	const craftingDone = craftingItems.filter(isCraftingComplete).length;

	const categoryCounts = [
		{ done: shippedDone, total: shippedItems.length },
		{ done: fishDone, total: fishItems.length },
		{ done: artifactDone, total: artifactItems.length },
		{ done: mineralDone, total: mineralItems.length },
		{ done: cookingDone, total: cookingItems.length },
		{ done: craftingDone, total: craftingItems.length },
	];
	const collectionsComplete = categoryCounts.filter((c) => c.done === c.total).length;

	const stats = [
		{ label: "Collections", value: `${collectionsComplete} / 6`, colored: true },
		{ label: "Shipped", value: `${shippedDone} / ${shippedItems.length}` },
		{ label: "Fish", value: `${fishDone} / ${fishItems.length}` },
		{ label: "Artifacts", value: `${artifactDone} / ${artifactItems.length}` },
		{ label: "Minerals", value: `${mineralDone} / ${mineralItems.length}` },
		{ label: "Cooking", value: `${cookingDone} / ${cookingItems.length}` },
		{ label: "Crafting", value: `${craftingDone} / ${craftingItems.length}` },
	];

	return (
		<div className="flex flex-col gap-6">
			<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
				<div className="mb-4 flex items-center gap-3">
					<HiCollection className="h-7 w-7 text-gray-400" />
					<div>
						<div className="text-lg font-bold text-gray-900">Collections Summary</div>
						<div className="mt-0.5 text-sm text-gray-500">
							{gameData.character.name} · {gameData.character.farmName} Farm
						</div>
					</div>
				</div>
				<div
					className="grid gap-2"
					style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
				>
					{stats.map(({ label, value, colored }) => (
						<StatTile key={label} label={label} value={value} colored={colored} />
					))}
				</div>
			</div>

			<CategorySection
				title="Items Shipped"
				items={shippedItems}
				isComplete={isShippedComplete}
			/>
			<CategorySection title="Fish Caught" items={fishItems} isComplete={isFishComplete} />
			<CategorySection
				title="Artifacts Found"
				items={artifactItems}
				isComplete={isArtifactComplete}
			/>
			<CategorySection
				title="Minerals Found"
				items={mineralItems}
				isComplete={isMineralComplete}
			/>
			<CategorySection
				title="Cooking Recipes"
				items={cookingItems}
				isComplete={isCookingComplete}
			/>
			<CategorySection
				title="Crafting Recipes"
				items={craftingItems}
				isComplete={isCraftingComplete}
			/>
		</div>
	);
}
