"use client";

import { crops } from "stardew-valley-data";
import { FaSeedling } from "react-icons/fa";
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

export function CropsHero({ gameData }: Props) {
	const allCrops = crops().get();
	const total = allCrops.length;
	const regrowing = allCrops.filter((c) => c.regrowDays !== null).length;
	const shippedCount = allCrops.filter(
		(c) => gameData.shipped[c.id]?.shipped === true
	).length;
	const shipped15 = allCrops.filter(
		(c) => (gameData.shipped[c.id]?.count ?? 0) >= 15
	).length;
	const shipped300 = allCrops.filter(
		(c) => (gameData.shipped[c.id]?.count ?? 0) >= 300
	).length;

	const seasonCounts = SEASONS.map((s) => ({
		...s,
		count: allCrops.filter((c) => c.seasons.includes(s.key)).length,
	}));

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<FaSeedling className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Crops Summary</div>
					<div className="mt-0.5 text-sm text-gray-500">
						{gameData.character.name} · {gameData.character.farmName} Farm
					</div>
				</div>
			</div>

			{/* All tiles in one row */}
			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))" }}
			>
				<StatTile label="Total Crops" value={total} />
				<StatTile label="Regrowing" value={regrowing} />
				<StatTile label="Shipped" value={`${shippedCount} / ${total}`} colored />
				<StatTile label="Shipped 15+" value={`${shipped15} / ${total}`} colored />
				<StatTile label="Shipped 300+" value={`${shipped300} / ${total}`} colored />
				{seasonCounts.map((s) => (
					<div key={s.key} className="bg-surface rounded-lg border border-[#d6d0bc] px-3 py-2">
						<div className="text-[0.675rem] font-semibold tracking-wide text-gray-500 uppercase">
							{s.label}
						</div>
						<div className={`mt-0.5 text-[0.9375rem] font-bold ${s.color}`}>
							{s.count}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
