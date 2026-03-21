"use client";

import { collections, monsterLoot } from "stardew-valley-data";
import { FaSkull } from "react-icons/fa";
import type { CollectionProps as Props } from "@/types";
import { StatTile } from "@/comps/ui/StatTile";

const allLoot = monsterLoot().get();
const shippableIds = new Set(
	collections()
		.itemsShipped()
		.get()
		.map((i) => i.id)
);
const shippableLoot = allLoot.filter((l) => shippableIds.has(l.id));

export function MonsterLootHero({ gameData }: Props) {
	const shippedCount = shippableLoot.filter(
		(l) => gameData.shipped[l.id]?.shipped === true
	).length;

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<FaSkull className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Monster Loot Summary</div>
					<div className="mt-0.5 text-sm text-gray-500">
						{gameData.character.name} · {gameData.character.farmName} Farm
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))" }}
			>
				<StatTile label="Total Loot Items" value={allLoot.length} />
				<StatTile
					label="Items Shipped"
					value={shippedCount}
					valueColor="text-green-600"
					suffix={`/ ${shippableLoot.length}`}
				/>
			</div>
		</div>
	);
}
