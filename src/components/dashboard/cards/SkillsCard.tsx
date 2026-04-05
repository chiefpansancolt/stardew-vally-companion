"use client";

import { tools } from "stardew-valley-data";
import type { DashboardProps, RodData } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { LEVEL_NAMES, PAN_LEVEL_OFFSET, TOOL_ENTRIES } from "@/data/constants/tools";
import { NavySection } from "@/comps/ui/NavySection";

const SKILLS = [
	{ key: "farming", label: "Farming", image: "/images/skills/Farming.png" },
	{ key: "fishing", label: "Fishing", image: "/images/skills/Fishing.png" },
	{ key: "foraging", label: "Foraging", image: "/images/skills/Foraging.png" },
	{ key: "mining", label: "Mining", image: "/images/skills/Mining.png" },
	{ key: "combat", label: "Combat", image: "/images/skills/Combat.png" },
] as const;

const TOOL_LABEL: Record<string, string> = {
	wateringCan: "Watering Can",
	trashCan: "Trash Can",
};

const LEVEL_COLORS: Record<string, string> = {
	Basic: "text-white/80",
	Copper: "text-orange-400",
	Steel: "text-blue-300",
	Gold: "text-highlight",
	Iridium: "text-purple-400",
};

const rodData = tools().fishingRods().first() as RodData | undefined;

export function SkillsCard({ gameData }: DashboardProps) {
	const totalLevel = SKILLS.reduce(
		(sum, s) => sum + Math.min(gameData.skills[s.key]?.level ?? 0, 10),
		0
	);

	const rodLevelIndex = gameData.toolLevels.fishingRod;
	const rodLevel = rodData?.levels[rodLevelIndex];
	const rodName = rodLevel?.name ?? "None";
	const rodImgSrc = rodLevel?.image ? assetPath(rodLevel.image) : null;

	return (
		<NavySection title="Skills & Tools" badge={`${totalLevel} / 50`}>
			<div className="flex flex-col">
				{SKILLS.map(({ key, label, image }) => {
					const level = Math.min(gameData.skills[key]?.level ?? 0, 10);
					const pct = (level / 10) * 100;
					const isMastered = gameData.mastery.unlocked.includes(key);
					const barColor = level === 10 ? "bg-green-400" : "bg-accent";
					const nameColor = level === 10 ? "text-green-300" : "text-white/80";

					return (
						<div
							key={key}
							className="flex items-center gap-3 border-b border-white/6 py-2 last:border-b-0"
						>
							<img
								src={image}
								alt={label}
								className="h-4 w-4 shrink-0 object-contain"
							/>
							<span
								className={`w-16 shrink-0 text-[0.75rem] font-semibold ${nameColor}`}
							>
								{label}
							</span>
							<div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
								<div
									className={`h-full rounded-full ${barColor}`}
									style={{ width: `${pct}%` }}
								/>
							</div>
							<span
								className={`w-6 shrink-0 text-right text-[0.75rem] font-bold ${nameColor}`}
							>
								{level}
							</span>
							{isMastered ? (
								<span className="border-highlight/30 bg-highlight/15 text-highlight flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[0.5rem] font-bold">
									M
								</span>
							) : (
								<span className="h-5 w-5 shrink-0" />
							)}
						</div>
					);
				})}
			</div>

			<div className="mt-3 flex flex-wrap gap-2 border-t border-white/8 pt-3">
				{TOOL_ENTRIES.map(({ key, id }) => {
					const level = gameData.toolLevels[key];
					const levelName = LEVEL_NAMES[key === "pan" ? level + PAN_LEVEL_OFFSET : level] ?? "Basic";
					const color = LEVEL_COLORS[levelName] ?? "text-white/80";
					const label = TOOL_LABEL[key] ?? key.charAt(0).toUpperCase() + key.slice(1);
					const imgSrc = `/images/tools/${id}/${levelName === "Basic" ? label.replace(" ", " ") : levelName + " " + label}.png`;
					return (
						<div
							key={id}
							className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1"
						>
							<span className="text-[0.65rem] font-semibold text-white/80 capitalize">
								{label}
							</span>
							<span className={`text-[0.6rem] font-bold ${color}`}>{levelName}</span>
						</div>
					);
				})}
				<div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1">
					{rodImgSrc && (
						<img src={rodImgSrc} alt={rodName} className="h-4 w-4 object-contain" />
					)}
					<span className="text-[0.65rem] font-semibold text-white/80">Fishing Rod</span>
					<span
						className={`text-[0.6rem] font-bold ${rodLevelIndex >= 2 ? "text-accent" : "text-white/80"}`}
					>
						{rodName}
					</span>
				</div>
			</div>
		</NavySection>
	);
}
