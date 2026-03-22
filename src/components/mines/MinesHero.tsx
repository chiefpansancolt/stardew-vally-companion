"use client";

import { monsterSlayerGoals } from "stardew-valley-data";
import { GiCrossedSwords } from "react-icons/gi";
import type { CollectionProps as Props } from "@/types";
import { getGoalKillCount } from "@/lib/pages/mines";
import { StatTile } from "@/comps/ui/StatTile";

const allGoals = monsterSlayerGoals().get();

export function MinesHero({ gameData }: Props) {
	const { mineProgress, monsters: monsterKills } = gameData;

	const totalSlain = Object.values(monsterKills).reduce((sum, count) => sum + count, 0);
	const goalsComplete = allGoals.filter(
		(g) => getGoalKillCount(g, monsterKills) >= g.killTarget
	).length;

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<GiCrossedSwords className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Mines & Monsters</div>
					<div className="mt-0.5 text-sm text-gray-500">
						{gameData.character.name} · {gameData.character.farmName} Farm
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
			>
				<StatTile label="Mine Depth" value={mineProgress.deepestMineLevel} />
				<StatTile label="Skull Cavern" value={mineProgress.deepestSkullCavernLevel} />
				<StatTile
					label="Rusty Key"
					value={mineProgress.hasRustyKey ? "Yes" : "No"}
					valueColor={mineProgress.hasRustyKey ? "text-green-600" : "text-gray-400"}
				/>
				<StatTile
					label="Skull Key"
					value={mineProgress.hasSkullKey ? "Yes" : "No"}
					valueColor={mineProgress.hasSkullKey ? "text-green-600" : "text-gray-400"}
				/>
				<StatTile
					label="Slayer Goals"
					value={goalsComplete}
					valueColor="text-green-600"
					suffix={`/ ${allGoals.length}`}
				/>
				<StatTile
					label="Total Slain"
					value={totalSlain.toLocaleString()}
					valueColor="text-accent"
				/>
			</div>
		</div>
	);
}
