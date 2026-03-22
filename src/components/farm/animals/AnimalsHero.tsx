"use client";

import { GiChicken } from "react-icons/gi";
import type { CollectionProps as Props } from "@/types";
import { MAX_FRIENDSHIP } from "@/data/constants/animals";
import { StatTile } from "@/comps/ui/StatTile";

export function AnimalsHero({ gameData }: Props) {
	const animalCount = gameData.animals.length;
	const buildingCount = gameData.buildings.length;
	const petCount = gameData.pets.length;
	const crackerCount = gameData.animals.filter((a) => a.hasAnimalCracker).length;

	const avgFriendship =
		animalCount > 0
			? Math.round(gameData.animals.reduce((sum, a) => sum + a.friendship, 0) / animalCount)
			: 0;

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<GiChicken className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Animals</div>
					<div className="mt-0.5 text-sm text-gray-500">
						{gameData.character.farmName} Farm
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
			>
				<StatTile label="Farm Animals" value={animalCount} valueColor="text-accent" />
				<StatTile label="Buildings" value={buildingCount} valueColor="text-accent" />
				<StatTile label="Pets" value={petCount} valueColor="text-accent" />
				<StatTile
					label="Avg Friendship"
					value={avgFriendship}
					valueColor={avgFriendship >= MAX_FRIENDSHIP ? "text-green-600" : "text-accent"}
					suffix={`/ ${MAX_FRIENDSHIP}`}
				/>
				<StatTile label="Animal Crackers" value={crackerCount} valueColor="text-accent" />
			</div>
		</div>
	);
}
