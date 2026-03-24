"use client";

import { HiCheck, HiX } from "react-icons/hi";
import type { DashboardProps } from "@/types";
import { getGoalKillCount } from "@/lib/pages/mines";
import { DASHBOARD_DATA } from "@/data/constants/dashboard";
import { NavySection } from "@/comps/ui/NavySection";

const { allGoals } = DASHBOARD_DATA;
const MAX_MINE_LEVEL = 120;

export function MinesCard({ gameData }: DashboardProps) {
	const { mineProgress, monsters } = gameData;
	const minePct = Math.min((mineProgress.deepestMineLevel / MAX_MINE_LEVEL) * 100, 100);
	const slayerComplete = allGoals.filter(
		(g) => getGoalKillCount(g, monsters) >= g.killTarget
	).length;

	return (
		<NavySection
			title="Mines & Monsters"
			badge={`${slayerComplete} / ${allGoals.length} slayer goals`}
		>
			<div className="flex flex-col">
				<div className="flex items-center gap-3 border-b border-white/6 py-2">
					<span className="w-32 shrink-0 text-[0.75rem] font-semibold text-white/80">
						Mine Depth
					</span>
					<div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
						<div
							className="h-full rounded-full bg-blue-400"
							style={{ width: `${minePct}%` }}
						/>
					</div>
					<span
						className={`w-16 shrink-0 text-right text-[0.7rem] font-bold ${mineProgress.deepestMineLevel >= MAX_MINE_LEVEL ? "text-green-300" : "text-white/80"}`}
					>
						{mineProgress.deepestMineLevel} / {MAX_MINE_LEVEL}
					</span>
				</div>

				<div className="flex items-center gap-3 border-b border-white/6 py-2">
					<span className="w-32 shrink-0 text-[0.75rem] font-semibold text-white/80">
						Skull Cavern
					</span>
					<div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
						<div
							className="h-full rounded-full bg-purple-400"
							style={{
								width: `${Math.min((mineProgress.deepestSkullCavernLevel / 100) * 100, 100)}%`,
							}}
						/>
					</div>
					<span className="w-16 shrink-0 text-right text-[0.7rem] font-bold text-white/80">
						{mineProgress.deepestSkullCavernLevel}
					</span>
				</div>

				<div className="flex items-center gap-3 border-b border-white/6 py-2">
					<span className="w-32 shrink-0 text-[0.75rem] font-semibold text-white/80">
						Keys
					</span>
					<div className="flex gap-2">
						<span
							className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold ${
								mineProgress.hasRustyKey
									? "border-green-400/25 bg-green-400/10 text-green-300"
									: "border-white/10 bg-white/5 text-white/80"
							}`}
						>
							{mineProgress.hasRustyKey ? (
								<HiCheck className="mr-1 inline h-3 w-3" />
							) : (
								<HiX className="mr-1 inline h-3 w-3" />
							)}
							Rusty Key
						</span>
						<span
							className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold ${
								mineProgress.hasSkullKey
									? "border-green-400/25 bg-green-400/10 text-green-300"
									: "border-white/10 bg-white/5 text-white/80"
							}`}
						>
							{mineProgress.hasSkullKey ? (
								<HiCheck className="mr-1 inline h-3 w-3" />
							) : (
								<HiX className="mr-1 inline h-3 w-3" />
							)}
							Skull Key
						</span>
					</div>
				</div>
			</div>

			<div className="mt-3 border-t border-white/8 pt-3">
				<div className="mb-2 text-[0.65rem] font-semibold tracking-wide text-white/80 uppercase">
					Monster Slayer Goals
				</div>
				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					{allGoals.map((goal) => {
						const done = getGoalKillCount(goal, monsters) >= goal.killTarget;
						return (
							<div key={goal.id} className="flex items-center gap-1.5">
								{done ? (
									<HiCheck className="h-3 w-3 shrink-0 text-green-400" />
								) : (
									<HiX className="h-3 w-3 shrink-0 text-white/80" />
								)}
								<span
									className={`text-[0.7rem] font-semibold ${done ? "text-green-300" : "text-white/80"}`}
								>
									{goal.name}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</NavySection>
	);
}
