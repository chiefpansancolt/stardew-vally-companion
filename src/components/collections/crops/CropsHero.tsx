"use client";

import { crops } from "stardew-valley-data";
import { FaSeedling } from "react-icons/fa";
import { CollectionProps as Props } from "@/types";
import { SEASONS } from "@/data/constants/seasons";
import { StatTile } from "@/comps/ui/StatTile";

export function CropsHero({ gameData }: Props) {
	const allCrops = crops().get();
	const total = allCrops.length;
	const regrowing = allCrops.filter((c) => c.regrowDays !== null).length;
	const shippedCount = allCrops.filter((c) => gameData.shipped[c.id]?.shipped === true).length;
	const shipped15 = allCrops.filter((c) => (gameData.shipped[c.id]?.count ?? 0) >= 15).length;
	const shipped300 = allCrops.filter((c) => (gameData.shipped[c.id]?.count ?? 0) >= 300).length;

	const seasonCounts = Object.values(SEASONS)
		.filter((s) => s.id !== "ginger island")
		.map((s) => ({
			...s,
			count: allCrops.filter((c) => c.seasons.includes(s.id)).length,
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

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))" }}
			>
				<StatTile label="Total Crops" value={total} />
				<StatTile label="Regrowing" value={regrowing} />
				<StatTile
					label="Shipped"
					value={shippedCount}
					valueColor="text-green-600"
					suffix={`/ ${total}`}
				/>
				<StatTile
					label="Shipped 15+"
					value={shipped15}
					valueColor="text-green-600"
					suffix={`/ ${total}`}
				/>
				<StatTile
					label="Shipped 300+"
					value={shipped300}
					valueColor="text-green-600"
					suffix={`/ ${total}`}
				/>
				{seasonCounts.map((s) => (
					<StatTile key={s.id} label={s.label} value={s.count} valueColor={s.heroColor} />
				))}
			</div>
		</div>
	);
}
