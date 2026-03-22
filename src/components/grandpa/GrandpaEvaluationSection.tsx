"use client";

import { grandpaEvaluator } from "stardew-valley-data";
import { useMemo } from "react";
import type { CriterionProgress, CollectionProps as Props } from "@/types";
import { buildGrandpaInput } from "@/lib/pages/grandpa";
import {
	getAnglerProgress,
	getCCRoomProgress,
	getMuseumProgress,
	getPetFriendship,
	getShipmentProgress,
	getTotalSkillLevels,
	getVillagersAt8Hearts,
} from "@/lib/utils/achievementProgress";
import { GRANDPA_CATEGORY_META, GRANDPA_CATEGORY_ORDER } from "@/data/constants/grandpa";
import { NavySection } from "@/comps/ui/NavySection";
import { GrandpaCategoryCard } from "./cards";

export function GrandpaEvaluationSection({ gameData }: Props) {
	const result = useMemo(() => {
		const input = buildGrandpaInput(gameData);
		return grandpaEvaluator().evaluate(input);
	}, [gameData]);

	const villagersProgress = getVillagersAt8Hearts(gameData);
	const skillsProgress = getTotalSkillLevels(gameData);
	const petProgress = getPetFriendship(gameData);
	const ccProgress = getCCRoomProgress(gameData);

	const achievementProgress: CriterionProgress = {
		"Full Shipment": getShipmentProgress(gameData),
		"Master Angler": getAnglerProgress(gameData),
		"A Complete Collection": getMuseumProgress(gameData),
	};

	const friendshipProgress: CriterionProgress = {
		"5+ Villagers at 8 Hearts": { current: villagersProgress.current, total: 5 },
		"10+ Villagers at 8 Hearts": { current: villagersProgress.current, total: 10 },
		"Pet at Max Friendship": petProgress,
	};

	const skillsProgressMap: CriterionProgress = {
		"Total Skill Levels ≥30": { current: skillsProgress.current, total: 30 },
		"Total Skill Levels ≥50": { current: skillsProgress.current, total: 50 },
	};

	const ccProgressMap: CriterionProgress = {
		"Community Center Completed": { current: ccProgress.current, total: ccProgress.total },
	};

	const categories = GRANDPA_CATEGORY_ORDER.map((cat) => {
		const meta = GRANDPA_CATEGORY_META[cat];
		const entries = result.breakdown.filter((e) => e.category === cat);
		const earned = entries.reduce((sum, e) => sum + e.points, 0);
		const max = entries.reduce((sum, e) => sum + e.maxPoints, 0);
		return { cat, ...meta, entries, earned, max };
	});

	return (
		<NavySection title="Evaluation" badge={`${result.score} / ${result.maxScore} points`}>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{categories.map(({ cat, label, icon, entries, earned, max }) => (
					<GrandpaCategoryCard
						key={cat}
						category={cat}
						label={label}
						icon={icon}
						entries={entries}
						earned={earned}
						max={max}
						totalEarnings={
							cat === "earnings" ? gameData.character.totalMoneyEarned : undefined
						}
						progress={
							cat === "achievements"
								? achievementProgress
								: cat === "friendship"
									? friendshipProgress
									: cat === "skills"
										? skillsProgressMap
										: cat === "community-center"
											? ccProgressMap
											: undefined
						}
					/>
				))}
			</div>
		</NavySection>
	);
}
