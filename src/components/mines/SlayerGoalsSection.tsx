"use client";

import { monsterSlayerGoals } from "stardew-valley-data";
import type { CollectionProps as Props } from "@/types";
import { getGoalKillCount } from "@/lib/pages/mines";
import { NavySection } from "@/comps/ui/NavySection";
import { SlayerGoalCard } from "./cards";

const allGoals = monsterSlayerGoals().sortByKillTarget().get();

export function SlayerGoalsSection({ gameData }: Props) {
	const completeCount = allGoals.filter(
		(g) => getGoalKillCount(g, gameData.monsters) >= g.killTarget
	).length;

	return (
		<NavySection title="Slayer Goals" badge={`${completeCount} / ${allGoals.length} complete`}>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{allGoals.map((goal) => (
					<SlayerGoalCard
						key={goal.id}
						goal={goal}
						killCount={getGoalKillCount(goal, gameData.monsters)}
					/>
				))}
			</div>
		</NavySection>
	);
}
