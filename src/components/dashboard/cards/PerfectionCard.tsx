"use client";

import { HiCheck } from "react-icons/hi";
import type { PerfectionCardProps } from "@/types";
import { NavySection } from "@/comps/ui/NavySection";

export function PerfectionCard({ gameData, categories, score }: PerfectionCardProps) {
	const waivers = gameData.perfectionWaiverCount;

	return (
		<NavySection title="Perfection" badge={`${score}%`}>
			<div className="mb-4 flex items-baseline gap-2">
				<span className="text-highlight text-4xl font-extrabold">{score}%</span>
				<div className="flex flex-col">
					<span className="text-[0.65rem] text-white/80">perfection score</span>
					{waivers > 0 && (
						<span className="text-highlight text-[0.6rem]">
							+{waivers}% from waivers
						</span>
					)}
				</div>
			</div>

			<div className="flex flex-col">
				{categories.map((cat) => {
					const pct = cat.total > 0 ? Math.min((cat.current / cat.total) * 100, 100) : 0;
					const isComplete = cat.current >= cat.total;
					const barColor = isComplete
						? "bg-green-400"
						: pct >= 60
							? "bg-accent"
							: "bg-red-400";

					return (
						<div
							key={cat.id}
							className="flex items-center gap-2 border-b border-white/6 py-1.5 last:border-b-0"
						>
							<div className="h-1 w-10 shrink-0 overflow-hidden rounded-full bg-white/10">
								<div
									className={`h-full rounded-full ${barColor}`}
									style={{ width: `${pct}%` }}
								/>
							</div>
							<span
								className={`flex-1 text-[0.7rem] font-semibold ${isComplete ? "text-green-300" : "text-white/80"}`}
							>
								{cat.name}
							</span>
							{isComplete ? (
								<HiCheck className="h-3.5 w-3.5 shrink-0 text-green-400" />
							) : (
								<span className="shrink-0 text-[0.6rem] text-white/80">
									{cat.current} / {cat.total}
								</span>
							)}
						</div>
					);
				})}
			</div>
		</NavySection>
	);
}
