"use client";

import { Card } from "flowbite-react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { AchievementsSection } from "@/comps/character/AchievementsSection";
import { CharacterHeroCard } from "@/comps/character/CharacterHeroCard";
import { MasterySection } from "@/comps/character/MasterySection";
import { SkillsSection } from "@/comps/character/SkillsSection";
import { StardropsSection } from "@/comps/character/StardropsSection";
import { ToolsSection } from "@/comps/character/ToolsSection";

export default function CharacterPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return (
			<div className="p-6">
				<Card className="py-16 text-center">
					<div className="mx-auto max-w-md">
						<h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
							No Active Playthrough
						</h2>
						<p className="text-gray-500 dark:text-gray-400">
							Select or create a playthrough to view character details.
						</p>
					</div>
				</Card>
			</div>
		);
	}

	const gameData = activePlaythrough.data;

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Character</h1>
				<p className="mt-1 text-gray-600 dark:text-gray-400">
					Your farmer&apos;s profile, skills, and progression
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<CharacterHeroCard gameData={gameData} />
				<ToolsSection gameData={gameData} />
				<SkillsSection gameData={gameData} />
				<MasterySection gameData={gameData} />
				<StardropsSection gameData={gameData} />
				<AchievementsSection gameData={gameData} />
			</div>
		</div>
	);
}
