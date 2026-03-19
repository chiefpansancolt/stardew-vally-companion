"use client";

import { collections } from "stardew-valley-data";
import type { CollectionItem } from "stardew-valley-data";
import { HiCheck, HiCollection } from "react-icons/hi";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { StatTile } from "@/comps/ui/StatTile";

interface Props {
	gameData: GameData;
}

const CHUNK_SIZE = 70; // 7 rows × 10 cols per row

function chunkArray<T>(arr: T[], size: number): T[][] {
	const result: T[][] = [];
	for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size));
	}
	return result;
}

function ItemTile({ item, complete }: { item: CollectionItem; complete: boolean }) {
	return (
		<div
			className={`relative flex flex-col items-center gap-1 rounded-md border p-1.5 transition-all ${
				complete
					? "border-green-500/40 bg-green-900/20"
					: "border-white/10 bg-white/5"
			}`}
		>
			<div className="relative">
				<img
					src={assetPath(item.image)}
					alt={item.name}
					className={`h-9 w-9 object-contain ${complete ? "" : "opacity-25 grayscale"}`}
				/>
				{complete && (
					<div className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 shadow">
						<HiCheck className="h-2.5 w-2.5 text-white" />
					</div>
				)}
			</div>
			<span
				className={`w-full text-center text-[0.55rem] font-semibold leading-tight ${
					complete ? "text-green-300" : "text-white/50"
				}`}
				style={{ wordBreak: "break-word" }}
			>
				{item.name}
			</span>
		</div>
	);
}

interface CategorySectionProps {
	title: string;
	items: CollectionItem[];
	isComplete: (item: CollectionItem) => boolean;
}

function CategorySection({ title, items, isComplete }: CategorySectionProps) {
	const completedCount = items.filter(isComplete).length;
	const chunks = chunkArray(items, CHUNK_SIZE);

	return (
		<div
			className="rounded-xl border border-secondary/60 p-5"
			style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
		>
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
					{title}
				</h3>
				<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-semibold">
					{completedCount} / {items.length}
				</span>
			</div>

			<div className="space-y-3">
				{chunks.map((chunkItems, ci) => (
					<div key={ci}>
						{ci > 0 && <div className="mb-3 border-t border-white/15" />}
						<div className="grid grid-cols-10 gap-1.5">
							{chunkItems.map((item) => (
								<ItemTile key={item.id} item={item} complete={isComplete(item)} />
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export function CollectionsOverview({ gameData }: Props) {
	const c = collections();

	const shippedItems = c.itemsShipped().get();
	const fishItems = c.fish().get();
	const artifactItems = c.artifacts().get();
	const mineralItems = c.minerals().get();
	const cookingItems = c.cooking().get();
	const craftingItems = c.crafting().get();

	const isShippedComplete = (item: CollectionItem) =>
		gameData.shipped[item.id]?.shipped === true;
	const isFishComplete = (item: CollectionItem) =>
		gameData.fishCaught.some((f) => f.id === item.id);
	const isArtifactComplete = (item: CollectionItem) =>
		gameData.artifacts[item.id]?.found === true;
	const isMineralComplete = (item: CollectionItem) =>
		gameData.minerals[item.id]?.found === true;
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
			{/* Hero summary */}
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

			{/* Per-category grids */}
			<CategorySection title="Items Shipped" items={shippedItems} isComplete={isShippedComplete} />
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
