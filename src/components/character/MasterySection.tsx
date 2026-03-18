"use client";

import { MASTERY_LEVELS, skills } from "stardew-valley-data";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";

interface Props {
	gameData: GameData;
}

const MAX_MASTERY_XP = MASTERY_LEVELS[MASTERY_LEVELS.length - 1]?.totalXp ?? 100_000;

function getCurrentMasteryLevel(xp: number): number {
	return [...MASTERY_LEVELS].reverse().find((l) => xp >= l.totalXp)?.level ?? 0;
}

export function MasterySection({ gameData }: Props) {
	const { masteryXp, unlocked } = gameData.mastery;
	const currentLevel = getCurrentMasteryLevel(masteryXp);
	const barPercent = Math.min(100, (masteryXp / MAX_MASTERY_XP) * 100);
	const allSkills = skills().get();
	const masteredCount = allSkills.filter((s) => unlocked.includes(s.id)).length;

	return (
		<div
			className="border-secondary/60 rounded-xl border p-5"
			style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
		>
			{/* Header */}
			<div className="mb-1 flex items-center justify-between">
				<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
					Mastery
				</h3>
				<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-semibold">
					{masteredCount} / {allSkills.length} Mastered
				</span>
			</div>
			<div className="mb-4 text-[0.75rem] text-blue-300">
				{masteryXp.toLocaleString()} / {MAX_MASTERY_XP.toLocaleString()} XP · Level{" "}
				{currentLevel}
			</div>

			{/* Mastery XP bar */}
			<div className="mb-5 h-2 overflow-hidden rounded-full bg-white/15">
				<div
					className="from-highlight h-full rounded-full bg-linear-to-r to-yellow-300 transition-all"
					style={{ width: `${barPercent}%` }}
				/>
			</div>

			{/* Skill mastery cards */}
			<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
				{allSkills.map((skill) => {
					const mastered = unlocked.includes(skill.id);
					return (
						<div
							key={skill.id}
							className={`rounded-xl border p-3 transition-all ${
								mastered
									? "border-accent/40 bg-accent/10"
									: "border-white/10 bg-white/5"
							}`}
						>
							{/* Skill header */}
							<div className="mb-2 flex items-center gap-2">
								<img
									src={assetPath(skill.image)}
									alt={skill.name}
									className="h-9 w-9 shrink-0 object-contain"
								/>
								<span
									className={`text-xs font-bold ${mastered ? "text-accent" : "text-white/80"}`}
								>
									{skill.name}
								</span>
							</div>

							{/* Mastered pill */}
							<div className="mb-2.5">
								{mastered ? (
									<span className="bg-accent/20 text-accent inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] font-bold">
										<HiCheck className="h-3 w-3" /> Mastered
									</span>
								) : (
									<span className="inline-flex items-center gap-1 rounded-full bg-white/[0.07] px-2 py-0.5 text-[0.625rem] font-bold text-white/60">
										<HiLockClosed className="h-3 w-3 text-red-500" /> Not
										Mastered
									</span>
								)}
							</div>

							{/* Mastery perks */}
							<div className="flex flex-col divide-y divide-white/6">
								{skill.mastery.unlocks.map((unlock) => (
									<div key={unlock.name} className="py-1 first:pt-0 last:pb-0">
										<div
											className={`text-[0.625rem] leading-tight font-semibold ${mastered ? "text-white/90" : "text-white/65"}`}
										>
											{unlock.name}
										</div>
										<div
											className={`text-[0.5625rem] leading-snug ${mastered ? "text-white/70" : "text-white/50"}`}
										>
											{unlock.description}
										</div>
									</div>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
