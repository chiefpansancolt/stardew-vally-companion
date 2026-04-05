"use client";

import { type Skill, skills } from "stardew-valley-data";
import { useState } from "react";
import { type SkillsSectionProps as Props } from "@/types";
import { NavySection } from "@/comps/ui/NavySection";
import { SkillCard } from "./cards";
import { SkillDetailModal } from "./modals/SkillDetailModal";

export function SkillsSection({ gameData, onToggleProfession }: Props) {
	const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
	const allSkills = skills().get();
	const totalLevels = allSkills.reduce((sum, s) => sum + (gameData.skills[s.id]?.level ?? 0), 0);

	return (
		<>
			<NavySection title="Skills & Professions" badge={`${totalLevels} / 50`}>
				<p className="-mt-2 mb-4 text-[0.7rem] text-white/50">
					Click a skill for level details
				</p>
				<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
					{allSkills.map((skillData) => {
						const progress = gameData.skills[skillData.id] ?? { level: 0, xp: 0 };
						return (
							<SkillCard
								key={skillData.id}
								skillData={skillData}
								progress={progress}
								professionIds={gameData.professions}
								onClick={() => setSelectedSkill(skillData)}
							/>
						);
					})}
				</div>
			</NavySection>

			{selectedSkill && (
				<SkillDetailModal
					skill={selectedSkill}
					currentLevel={gameData.skills[selectedSkill.id]?.level ?? 0}
					chosenProfessionIds={gameData.professions}
					isOpen={true}
					onClose={() => setSelectedSkill(null)}
					onToggleProfession={onToggleProfession}
				/>
			)}
		</>
	);
}
