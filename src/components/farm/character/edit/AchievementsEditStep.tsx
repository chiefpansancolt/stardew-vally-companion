"use client";

import { achievements } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { AchievementsEditStepProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";

const allAchievements = achievements().get();

export function AchievementsEditStep({
	achievements: initialAchievements,
	onChange,
}: AchievementsEditStepProps) {
	const [local, setLocal] = useState(initialAchievements);

	function toggle(id: string) {
		const next = local.includes(id) ? local.filter((a) => a !== id) : [...local, id];
		setLocal(next);
		onChange(next);
	}

	return (
		<div>
			<div className="mb-4 flex items-center justify-between">
				<p className="text-xs font-bold tracking-wide text-gray-500 uppercase">
					Achievements
				</p>
				<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
					{local.length} / {allAchievements.length} earned
				</span>
			</div>
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
				{allAchievements.map((achievement) => {
					const isEarned = local.includes(achievement.id);
					const imgSrc = achievement.icon ?? achievement.image;
					return (
						<button
							key={achievement.id}
							type="button"
							onClick={() => toggle(achievement.id)}
							className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
								isEarned
									? "border-highlight/40 bg-highlight/5 hover:bg-highlight/10"
									: "border-gray-200 bg-gray-50 hover:border-gray-300"
							}`}
						>
							<img
								src={assetPath(imgSrc)}
								alt={achievement.name}
								className="mt-0.5 h-8 w-8 shrink-0 object-contain"
							/>
							<div className="min-w-0 flex-1">
								<div
									className={`mb-0.5 text-xs font-bold ${isEarned ? "text-highlight" : "text-gray-700"}`}
									style={isEarned ? { filter: "brightness(0.75)" } : undefined}
								>
									{achievement.name}
								</div>
								<div className="mb-1.5 text-[0.625rem] leading-snug text-gray-500">
									{achievement.description}
								</div>
								{isEarned ? (
									<span
										className="bg-highlight/20 text-highlight inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] font-bold"
										style={{ filter: "brightness(0.75)" }}
									>
										<HiCheck className="h-3 w-3" /> Earned
									</span>
								) : (
									<span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[0.625rem] font-bold text-gray-500">
										<HiLockClosed className="h-3 w-3" /> Not Earned
									</span>
								)}
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
