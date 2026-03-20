"use client";

import { forageables, trees, collections } from "stardew-valley-data";
import { GiMushroom } from "react-icons/gi";
import { type GameData } from "@/types/app/game";
import { StatTile } from "@/comps/ui/StatTile";

interface Props {
	gameData: GameData;
}

const SEASONS = [
	{ key: "spring" as const, label: "Spring", color: "text-green-600" },
	{ key: "summer" as const, label: "Summer", color: "text-yellow-600" },
	{ key: "fall" as const, label: "Fall", color: "text-orange-600" },
	{ key: "winter" as const, label: "Winter", color: "text-blue-500" },
];

export function ForageablesHero({ gameData }: Props) {
	const allForageables = forageables().get();
	const allTrees = trees().get();
	const fruitTrees = trees().fruitTrees().get();
	const wildTrees = trees().wildTrees().get();

	const shippableIds = new Set(collections().itemsShipped().get().map((i) => i.id));

	const seasonCounts = SEASONS.map((s) => ({
		...s,
		count: allForageables.filter((f) => f.seasons.includes(s.key)).length,
	}));

	const forageableIdSet = new Set(allForageables.map((f) => f.id));
	const treeProduceIds = allTrees
		.filter((t) => (t.type === "wild-tree" ? !!t.tapper : true))
		.map((t) => (t.type === "fruit-tree" ? t.produce.id : t.tapper!.id))
		.filter((id) => !forageableIdSet.has(id));
	const allUniqueIds = [...allForageables.map((f) => f.id), ...treeProduceIds];

	const shippableUniqueIds = allUniqueIds.filter((id) => shippableIds.has(id));
	const shippedCount = shippableUniqueIds.filter((id) => gameData.shipped[id]?.shipped === true).length;


	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<GiMushroom className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">
						Forageables &amp; Trees Summary
					</div>
					<div className="mt-0.5 text-sm text-gray-500">
						{gameData.character.name} · {gameData.character.farmName} Farm
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))" }}
			>
				<StatTile label="Forageables" value={allUniqueIds.length} />
				<StatTile label="Total Trees" value={allTrees.length} />
				<StatTile label="Fruit Trees" value={fruitTrees.length} />
				<StatTile label="Wild Trees" value={wildTrees.length} />
				<StatTile
					label="Shipped"
					value={shippedCount}
					valueColor="text-green-600"
					suffix={`/ ${shippableUniqueIds.length}`}
				/>
				{seasonCounts.map((s) => (
					<StatTile key={s.key} label={s.label} value={s.count} valueColor={s.color} />
				))}
			</div>
		</div>
	);
}
