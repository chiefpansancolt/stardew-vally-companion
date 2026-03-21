"use client";

import { fish } from "stardew-valley-data";
import { FaFish } from "react-icons/fa";
import { CollectionProps as Props } from "@/types";
import { SEASONS } from "@/data/constants/seasons";
import { StatTile } from "@/comps/ui/StatTile";

const allFish = fish().get();

export function FishHero({ gameData }: Props) {
	const total = allFish.length;
	const caughtCount = allFish.filter((f) =>
		gameData.fishCaught.some((c) => c.id === f.id)
	).length;
	const rodCount = allFish.filter((f) => f.catchType === "rod").length;
	const crabPotCount = allFish.filter((f) => f.catchType === "crab-pot").length;

	const seasonCounts = Object.values(SEASONS)
		.filter((s) => s.id !== "ginger island")
		.map((s) => ({
			...s,
			count: allFish.filter((f) => f.seasons.includes(s.id)).length,
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
				<StatTile
					label="Caught"
					value={caughtCount}
					valueColor="text-green-600"
					suffix={`/ ${total}`}
				/>
				<StatTile label="Rod Fish" value={rodCount} accent />
				<StatTile label="Crab-Pot" value={crabPotCount} />
				{seasonCounts.map((s) => (
					<StatTile key={s.id} label={s.label} value={s.count} valueColor={s.heroColor} />
				))}
			</div>
		</div>
	);
}
