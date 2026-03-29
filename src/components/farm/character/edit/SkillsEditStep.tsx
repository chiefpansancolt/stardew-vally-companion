"use client";

import { MASTERY_LEVELS, professions, skills } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { SkillsEditStepProps } from "@/types";
import type { MasteryProgress, SkillProgress } from "@/types/app/game";
import { toggleProfession } from "@/lib/pages/character";
import { assetPath } from "@/lib/utils/assetPath";

const allSkills = skills().get();
const allProfessions = professions().get();
const MAX_MASTERY_XP = MASTERY_LEVELS[MASTERY_LEVELS.length - 1]?.totalXp ?? 100_000;

const INPUT =
	"w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

const SKILL_LEVELS = Array.from({ length: 11 }, (_, i) => i);

export function SkillsEditStep({
	skills: initialSkills,
	professions: initialProfessions,
	mastery: initialMastery,
	onSkillsChange,
	onProfessionsChange,
	onMasteryChange,
}: SkillsEditStepProps) {
	const [localSkills, setLocalSkills] = useState<Record<string, SkillProgress>>(initialSkills);
	const [localProfessions, setLocalProfessions] = useState<string[]>(initialProfessions);
	const [localMastery, setLocalMastery] = useState<MasteryProgress>(initialMastery);

	function setSkill(skillId: string, level: number) {
		const skillData = allSkills.find((s) => s.id === skillId);
		const xp = level === 0 ? 0 : (skillData?.levels[level - 1]?.totalXp ?? 0);
		const next = { ...localSkills, [skillId]: { level, xp } };
		setLocalSkills(next);
		onSkillsChange(next);
	}

	function handleProfessionClick(profId: string) {
		const next = toggleProfession(profId, localProfessions, allProfessions);
		setLocalProfessions(next);
		onProfessionsChange(next);
	}

	function toggleMastery(skillId: string) {
		const nextUnlocked = localMastery.unlocked.includes(skillId)
			? localMastery.unlocked.filter((id) => id !== skillId)
			: [...localMastery.unlocked, skillId];
		const next = { ...localMastery, unlocked: nextUnlocked };
		setLocalMastery(next);
		onMasteryChange(next);
	}

	return (
		<div className="space-y-6">
			<div className="space-y-4">
				{allSkills.map((skill) => {
					const progress = localSkills[skill.id] ?? { level: 0, xp: 0 };
					const lv5Profs = allProfessions.filter(
						(p) => p.skill.toLowerCase() === skill.id && p.level === 5
					);
					const lv10Profs = allProfessions.filter(
						(p) => p.skill.toLowerCase() === skill.id && p.level === 10
					);
					const selectedLv5 = lv5Profs.find((p) => localProfessions.includes(p.id));
					const lv10ForSelected = lv10Profs.filter(
						(p) => p.parentProfession === selectedLv5?.id
					);

					return (
						<div
							key={skill.id}
							className="rounded-xl border border-gray-200 bg-gray-50 p-4"
						>
							<div className="mb-3 flex items-center gap-2">
								<img
									src={assetPath(skill.image)}
									alt={skill.name}
									className="h-7 w-7 object-contain"
								/>
								<span className="text-sm font-bold text-gray-800">
									{skill.name}
								</span>
							</div>

							<div className="mb-3">
								<p className="mb-1 text-[0.65rem] font-semibold text-gray-500 uppercase">
									Level
								</p>
								<div className="flex flex-wrap gap-1">
									{SKILL_LEVELS.map((lvl) => (
										<button
											key={lvl}
											type="button"
											onClick={() => setSkill(skill.id, lvl)}
											className={`h-7 w-7 rounded-full text-xs font-bold transition-colors ${
												progress.level === lvl
													? "bg-primary text-white"
													: "border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
											}`}
										>
											{lvl}
										</button>
									))}
								</div>
							</div>

							{progress.level >= 5 && (
								<div className="mb-2">
									<p className="mb-1.5 text-[0.65rem] font-semibold text-gray-500 uppercase">
										Level 5 Profession
									</p>
									<div className="grid grid-cols-2 gap-2">
										{lv5Profs.map((prof) => {
											const active = localProfessions.includes(prof.id);
											return (
												<button
													key={prof.id}
													type="button"
													onClick={() => handleProfessionClick(prof.id)}
													className={`flex items-start gap-2 rounded-lg border p-2.5 text-left transition-colors ${
														active
															? "border-primary/40 bg-primary/5"
															: "border-gray-200 bg-white hover:border-gray-300"
													}`}
												>
													<div
														className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
															active
																? "border-primary bg-primary"
																: "border-gray-300"
														}`}
													>
														{active && (
															<HiCheck className="h-2.5 w-2.5 text-white" />
														)}
													</div>
													<div>
														<div
															className={`text-xs font-bold ${active ? "text-primary" : "text-gray-700"}`}
														>
															{prof.name}
														</div>
														<div className="mt-0.5 text-[0.6rem] leading-snug text-gray-500">
															{prof.description}
														</div>
													</div>
												</button>
											);
										})}
									</div>
								</div>
							)}

							{progress.level >= 10 && selectedLv5 && (
								<div>
									<p className="mb-1.5 text-[0.65rem] font-semibold text-gray-500 uppercase">
										Level 10 Profession
										<span className="ml-1 font-normal text-gray-400 normal-case">
											(from {selectedLv5.name})
										</span>
									</p>
									<div className="grid grid-cols-2 gap-2">
										{lv10ForSelected.map((prof) => {
											const active = localProfessions.includes(prof.id);
											return (
												<button
													key={prof.id}
													type="button"
													onClick={() => handleProfessionClick(prof.id)}
													className={`flex items-start gap-2 rounded-lg border p-2.5 text-left transition-colors ${
														active
															? "border-primary/40 bg-primary/5"
															: "border-gray-200 bg-white hover:border-gray-300"
													}`}
												>
													<div
														className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
															active
																? "border-primary bg-primary"
																: "border-gray-300"
														}`}
													>
														{active && (
															<HiCheck className="h-2.5 w-2.5 text-white" />
														)}
													</div>
													<div>
														<div
															className={`text-xs font-bold ${active ? "text-primary" : "text-gray-700"}`}
														>
															{prof.name}
														</div>
														<div className="mt-0.5 text-[0.6rem] leading-snug text-gray-500">
															{prof.description}
														</div>
													</div>
												</button>
											);
										})}
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>

			<div>
				<p className="mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase">
					Mastery
				</p>
				<p className="mb-3 text-[0.7rem] text-gray-400">
					Max {MAX_MASTERY_XP.toLocaleString()} XP
				</p>
				<div className="mb-3 max-w-xs">
					<label className="mb-1 block text-[0.65rem] font-semibold text-gray-500 uppercase">
						Mastery XP
					</label>
					<input
						type="number"
						min={0}
						max={MAX_MASTERY_XP}
						value={localMastery.masteryXp}
						onChange={(e) => {
							const next = { ...localMastery, masteryXp: Number(e.target.value) };
							setLocalMastery(next);
							onMasteryChange(next);
						}}
						className={INPUT}
					/>
				</div>
				<div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
					{allSkills.map((skill) => {
						const unlocked = localMastery.unlocked.includes(skill.id);
						return (
							<button
								key={skill.id}
								type="button"
								onClick={() => toggleMastery(skill.id)}
								className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-colors ${
									unlocked
										? "border-accent/40 bg-accent/5"
										: "border-gray-200 bg-gray-50 hover:border-gray-300"
								}`}
							>
								<img
									src={assetPath(skill.image)}
									alt={skill.name}
									className="h-8 w-8 object-contain"
								/>
								<span
									className={`text-[0.65rem] font-bold ${unlocked ? "text-accent" : "text-gray-600"}`}
								>
									{skill.name}
								</span>
								{unlocked ? (
									<span className="bg-accent/20 text-accent inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[0.55rem] font-bold">
										<HiCheck className="h-2.5 w-2.5" /> Mastered
									</span>
								) : (
									<span className="inline-flex items-center gap-0.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-[0.55rem] font-bold text-gray-500">
										<HiLockClosed className="h-2.5 w-2.5" /> Locked
									</span>
								)}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
