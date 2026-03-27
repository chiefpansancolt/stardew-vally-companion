"use client";

import { professions } from "stardew-valley-data";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { toggleProfession } from "@/lib/pages/character";
import { AchievementsSection } from "@/comps/farm/character/AchievementsSection";
import { CharacterHeroCard } from "@/comps/farm/character/CharacterHeroCard";
import { MasterySection } from "@/comps/farm/character/MasterySection";
import { SkillsSection } from "@/comps/farm/character/SkillsSection";
import { StardropsSection } from "@/comps/farm/character/StardropsSection";
import { ToolsSection } from "@/comps/farm/character/ToolsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

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
			<PageHeader title="Character" description="Your farmer's profile, skills, and progression" />

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
