"use client";

import { professions, type Skill, skills } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { SkillDetailModal } from "./modals/SkillDetailModal";

interface Props {
	gameData: GameData;
	onToggleProfession?: (profId: string) => void;
}

function computeXpBarPercent(skill: Skill, currentXp: number, currentLevel: number): number {
	if (currentLevel >= 10) return 100;
	if (currentLevel === 0) {
		const nextTotal = skill.levels[0]?.totalXp ?? 1;
		return Math.min(100, (currentXp / nextTotal) * 100);
	}
	const prevTotal = skill.levels[currentLevel - 1]?.totalXp ?? 0;
	const nextTotal = skill.levels[currentLevel]?.totalXp ?? prevTotal + 1;
	return Math.min(100, ((currentXp - prevTotal) / (nextTotal - prevTotal)) * 100);
}

function xpLabel(skill: Skill, currentXp: number, currentLevel: number): string {
	if (currentLevel >= 10) return `${currentXp.toLocaleString()} XP`;
	const nextTotal = skill.levels[currentLevel]?.totalXp ?? 0;
	return `${currentXp.toLocaleString()} / ${nextTotal.toLocaleString()} XP`;
}

interface SkillCardProps {
	skillData: Skill;
	progress: { level: number; xp: number };
	professionIds: string[];
	onClick: () => void;
}

function SkillCard({ skillData, progress, professionIds, onClick }: SkillCardProps) {
	const { level, xp } = progress;
	const maxed = level >= 10;
	const barPercent = computeXpBarPercent(skillData, xp, level);

	const allProfs = professions()
		.bySkill(skillData.name as "Farming" | "Mining" | "Foraging" | "Fishing" | "Combat")
		.get();
	const lv5Chosen = allProfs.find((p) => p.level === 5 && professionIds.includes(p.id));
	const lv10Chosen = allProfs.find((p) => p.level === 10 && professionIds.includes(p.id));

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={onClick}
			onKeyDown={(e) => e.key === "Enter" && onClick()}
			className="group hover:border-accent/40 cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 transition-colors"
		>
			{/* Header */}
			<div className="mb-2.5 flex items-center gap-2">
				<img
					src={assetPath(skillData.image)}
					alt={skillData.name}
					className="h-9 w-9 shrink-0 object-contain"
				/>
				<span className="text-sm font-bold text-white">{skillData.name}</span>
			</div>

			{/* Level + XP */}
			<div className="mb-1 flex items-baseline justify-between">
				<span
					className={`text-[2rem] leading-none font-extrabold ${maxed ? "text-highlight" : "text-accent"}`}
				>
					{level}
				</span>
				<span className="text-[0.675rem] text-white/70">
					{xpLabel(skillData, xp, level)}
				</span>
			</div>

			{/* XP bar */}
			<div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/15">
				<div
					className={`h-full rounded-full transition-all ${maxed ? "from-highlight bg-linear-to-r to-yellow-300" : "from-accent bg-linear-to-r to-yellow-400"}`}
					style={{ width: `${barPercent}%` }}
				/>
			</div>

			{/* Professions */}
			<div className="border-t border-white/10 pt-2.5">
				<div className="mb-1 text-[0.625rem] font-bold tracking-wide text-white/65 uppercase">
					Level 5
				</div>
				<div className="mb-2">
					{lv5Chosen ? (
						<span className="border-accent/30 bg-accent/15 text-accent inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[0.6875rem] font-semibold">
							<HiCheck className="h-3 w-3" /> {lv5Chosen.name}
						</span>
					) : (
						<span className="inline-flex items-center gap-1 rounded-md border border-dashed border-white/15 bg-white/5 px-2 py-0.5 text-[0.6875rem] text-white/60">
							<HiLockClosed className="h-3 w-3 text-red-500" /> Reach Lv.5
						</span>
					)}
				</div>
				<div className="mb-1 text-[0.625rem] font-bold tracking-wide text-white/65 uppercase">
					Level 10
				</div>
				<div>
					{lv10Chosen ? (
						<span className="border-accent/30 bg-accent/15 text-accent inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[0.6875rem] font-semibold">
							<HiCheck className="h-3 w-3" /> {lv10Chosen.name}
						</span>
					) : (
						<span className="inline-flex items-center gap-1 rounded-md border border-dashed border-white/15 bg-white/5 px-2 py-0.5 text-[0.6875rem] text-white/60">
							<HiLockClosed className="h-3 w-3 text-red-500" /> Reach Lv.10
						</span>
					)}
				</div>
			</div>

			<div className="mt-2 text-center text-[0.6rem] text-white/40 opacity-0 transition-opacity group-hover:opacity-100">
				Click for level details
			</div>
		</div>
	);
}

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
