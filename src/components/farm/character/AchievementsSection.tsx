"use client";

import { achievements } from "stardew-valley-data";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import { type CharacterProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { NavySection } from "@/comps/ui/NavySection";

export function AchievementsSection({ gameData }: Props) {
	const allAchievements = achievements().get();
	const earnedCount = allAchievements.filter((a) => gameData.achievements.includes(a.id)).length;

	return (
		<NavySection
			title="Achievements"
			badge={`${earnedCount} / ${allAchievements.length} earned`}
		>
			<div
				className="grid gap-3"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
			>
				{allAchievements.map((achievement) => {
					const earned = gameData.achievements.includes(achievement.id);
					const imgSrc = achievement.icon ?? achievement.image;
					return (
						<div
							key={achievement.id}
							className={`flex items-start gap-3 rounded-xl border p-3 transition-all ${
								earned
									? "border-highlight/40 bg-highlight/10"
									: "border-white/10 bg-white/5"
							}`}
						>
							<img
								src={assetPath(imgSrc)}
								alt={achievement.name}
								className="mt-0.5 h-10 w-10 shrink-0 rounded-lg object-contain"
							/>
							<div className="min-w-0 flex-1">
								<div
									className={`mb-0.5 text-[0.75rem] leading-tight font-bold ${earned ? "text-highlight" : "text-white/80"}`}
								>
									{achievement.name}
								</div>
								<div className="mb-1.5 text-[0.625rem] leading-snug text-white/70">
									{achievement.description}
								</div>
								{earned ? (
									<span className="bg-highlight/20 text-highlight inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] font-bold">
										<HiCheck className="h-3 w-3" /> Earned
									</span>
								) : (
									<span className="inline-flex items-center gap-1 rounded-full bg-white/[0.07] px-2 py-0.5 text-[0.625rem] font-bold text-white/60">
										<HiLockClosed className="h-3 w-3 text-red-500" /> Locked
									</span>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</NavySection>
	);
}
