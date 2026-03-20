"use client";

import { fish } from "stardew-valley-data";
import { FaFish } from "react-icons/fa";
import { type GameData } from "@/types/app/game";
import { StatTile } from "@/comps/ui/StatTile";

interface Props {
	gameData: GameData;
}

const allFish = fish().get();

const SEASONS = [
	{ key: "spring" as const, label: "Spring", color: "text-green-600" },
	{ key: "summer" as const, label: "Summer", color: "text-yellow-600" },
	{ key: "fall" as const, label: "Fall", color: "text-orange-600" },
	{ key: "winter" as const, label: "Winter", color: "text-blue-500" },
];

export function FishHero({ gameData }: Props) {
	const total = allFish.length;
	const caughtCount = allFish.filter((f) =>
		gameData.fishCaught.some((c) => c.id === f.id)
	).length;
	const rodCount = allFish.filter((f) => f.catchType === "rod").length;
	const crabPotCount = allFish.filter((f) => f.catchType === "crab-pot").length;

	const seasonCounts = SEASONS.map((s) => ({
		...s,
		count: allFish.filter((f) => f.seasons.includes(s.key)).length,
	}));

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<FaFish className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Fish Summary</div>
					<div className="mt-0.5 text-sm text-gray-500">
						{gameData.character.name} · {gameData.character.farmName} Farm
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))" }}
			>
				<StatTile label="Total Fish" value={total} />
				<StatTile label="Caught" value={caughtCount} valueColor="text-green-600" suffix={`/ ${total}`} />
				<StatTile label="Rod Fish" value={rodCount} accent />
				<StatTile label="Crab-Pot" value={crabPotCount} />
				{seasonCounts.map((s) => (
					<StatTile key={s.key} label={s.label} value={s.count} valueColor={s.color} />
				))}
			</div>
		</div>
	);
}
