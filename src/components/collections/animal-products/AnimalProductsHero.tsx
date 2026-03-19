"use client";

import { animals, isFarmAnimal } from "stardew-valley-data";
import { FaEgg } from "react-icons/fa";
import { type GameData } from "@/types/app/game";
import { StatTile } from "@/comps/ui/StatTile";

interface Props {
	gameData: GameData;
}

export function AnimalProductsHero({ gameData }: Props) {
	const allAnimals = animals().farmAnimals().get().filter(isFarmAnimal);

	const allEntries = allAnimals.flatMap((a) => [
		a.produce,
		...(a.deluxeProduce ? [a.deluxeProduce] : []),
	]);

	const shippedCount = allEntries.filter((p) => gameData.shipped[p.id]?.shipped === true).length;

	const stats = [
		{ label: "Animals", value: allAnimals.length },
		{ label: "Produce Items", value: allEntries.length },
		{ label: "Shipped", value: `${shippedCount} / ${allEntries.length}`, colored: true },
	];

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<FaEgg className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Animal Products Summary</div>
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
	);
}
