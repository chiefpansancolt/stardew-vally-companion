"use client";

import { Card } from "flowbite-react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { professions } from "stardew-valley-data";
import { AchievementsSection } from "@/comps/character/AchievementsSection";
import { CharacterHeroCard } from "@/comps/character/CharacterHeroCard";
import { MasterySection } from "@/comps/character/MasterySection";
import { SkillsSection } from "@/comps/character/SkillsSection";
import { StardropsSection } from "@/comps/character/StardropsSection";
import { ToolsSection } from "@/comps/character/ToolsSection";

export default function CharacterPage() {
	const { activePlaythrough, updatePlaythrough } = usePlaythrough();

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
	const playthroughId = activePlaythrough.id;

	function handleToggleProfession(profId: string) {
		const allProfs = professions().get();
		const prof = allProfs.find((p) => p.id === profId);
		if (!prof) return;

		const current = gameData.professions;
		const isSelected = current.includes(profId);

		let next: string[];
		if (isSelected) {
			// Remove this profession and any lv10 children
			const childIds = allProfs.filter((p) => p.parentProfession === profId).map((p) => p.id);
			next = current.filter((id) => id !== profId && !childIds.includes(id));
		} else {
			next = [...current];
			if (prof.level === 5) {
				// Remove sibling lv5 profs for this skill and their lv10 children
				const siblings = allProfs.filter((p) => p.skill === prof.skill && p.level === 5 && p.id !== profId);
				const toRemove = new Set<string>();
				for (const sib of siblings) {
					toRemove.add(sib.id);
					allProfs.filter((p) => p.parentProfession === sib.id).forEach((p) => toRemove.add(p.id));
				}
				next = next.filter((id) => !toRemove.has(id));
			} else {
				// lv10: ensure parent lv5 is selected; remove sibling lv10s
				if (prof.parentProfession && !next.includes(prof.parentProfession)) {
					const parent = allProfs.find((p) => p.id === prof.parentProfession);
					if (parent) {
						const sibLv5 = allProfs.filter((p) => p.skill === parent.skill && p.level === 5 && p.id !== parent.id);
						const toRemove = new Set<string>();
						for (const sib of sibLv5) {
							toRemove.add(sib.id);
							allProfs.filter((p) => p.parentProfession === sib.id).forEach((p) => toRemove.add(p.id));
						}
						next = next.filter((id) => !toRemove.has(id));
						next.push(prof.parentProfession);
					}
				}
				const sibLv10 = allProfs.filter((p) => p.parentProfession === prof.parentProfession && p.id !== profId);
				next = next.filter((id) => !sibLv10.map((s) => s.id).includes(id));
			}
			next.push(profId);
		}

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
