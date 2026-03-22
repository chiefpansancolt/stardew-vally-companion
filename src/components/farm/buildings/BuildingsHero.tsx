"use client";

import { buildings } from "stardew-valley-data";
import { PiBarnFill } from "react-icons/pi";
import type { CollectionProps as Props } from "@/types";
import { StatTile } from "@/comps/ui/StatTile";

const buildingMap = new Map(
	buildings()
		.get()
		.map((b) => [b.name, b])
);

export function BuildingsHero({ gameData }: Props) {
	const totalBuildings = gameData.buildings.length;
	const totalAnimals = gameData.buildings.reduce((sum, b) => sum + b.animalCount, 0);
	const totalFish = gameData.fishPonds.reduce((sum, fp) => sum + fp.currentOccupants, 0);

	let robinCount = 0;
	let wizardCount = 0;
	for (const b of gameData.buildings) {
		const data = buildingMap.get(b.type);
		if (data?.magical) wizardCount++;
		else robinCount++;
	}

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<PiBarnFill className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Buildings</div>
					<div className="mt-0.5 text-sm text-gray-500">
						{gameData.character.farmName} Farm
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
			>
				<StatTile label="Total Buildings" value={totalBuildings} valueColor="text-accent" />
				<StatTile label="Robin Built" value={robinCount} valueColor="text-accent" />
				<StatTile label="Wizard Built" value={wizardCount} valueColor="text-accent" />
				<StatTile label="Animals Housed" value={totalAnimals} valueColor="text-accent" />
				<StatTile
					label="Fish Ponds"
					value={gameData.fishPonds.length}
					valueColor="text-accent"
				/>
				<StatTile label="Fish in Ponds" value={totalFish} valueColor="text-accent" />
			</div>
		</div>
	);
}
