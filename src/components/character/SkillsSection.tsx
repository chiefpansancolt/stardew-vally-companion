"use client";

import { type Skill, skills } from "stardew-valley-data";
import { useState } from "react";
import { type SkillsSectionProps as Props } from "@/types";
import { SkillCard } from "./cards";
import { SkillDetailModal } from "./modals/SkillDetailModal";

export function SkillsSection({ gameData, onToggleProfession }: Props) {
	const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
	const allSkills = skills().get();
	const totalLevels = allSkills.reduce((sum, s) => sum + (gameData.skills[s.id]?.level ?? 0), 0);

	return (
		<>
			<div
				className="border-secondary/60 rounded-xl border p-5"
				style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
			>
				<div className="mb-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
							Skills &amp; Professions
						</h3>
						<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-bold">
							{totalLevels} / 50
						</span>
					</div>
					<span className="text-[0.7rem] text-white/50">
						Click a skill for level details
					</span>
				</div>
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
			</div>

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
