"use client";

import { professions } from "stardew-valley-data";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { toggleProfession } from "@/lib/pages/character";
import { AchievementsSection } from "@/comps/character/AchievementsSection";
import { CharacterHeroCard } from "@/comps/character/CharacterHeroCard";
import { MasterySection } from "@/comps/character/MasterySection";
import { SkillsSection } from "@/comps/character/SkillsSection";
import { StardropsSection } from "@/comps/character/StardropsSection";
import { ToolsSection } from "@/comps/character/ToolsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function CharacterPage() {
	const { activePlaythrough, updatePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="character data" />;
	}

	const gameData = activePlaythrough.data;
	const playthroughId = activePlaythrough.id;

	function handleToggleProfession(profId: string) {
		const next = toggleProfession(profId, gameData.professions, professions().get());
		updatePlaythrough(playthroughId, {
			data: { ...gameData, professions: next },
		});
	}

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
				<SkillsSection gameData={gameData} onToggleProfession={handleToggleProfession} />
				<MasterySection gameData={gameData} />
				<StardropsSection gameData={gameData} />
				<AchievementsSection gameData={gameData} />
			</div>
		</div>
	);
}
