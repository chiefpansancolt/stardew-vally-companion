import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { GrandpaCategoryCardProps as Props } from "@/types";
import type { AchievementProgress } from "@/lib/utils/achievementProgress";
import { EARNINGS_TIERS } from "@/data/constants/grandpa";

interface CriterionRow {
	label: string;
	earned: boolean;
	partial: boolean;
	points: string;
	progress?: AchievementProgress;
}

function buildRows(
	category: string,
	entries: Props["entries"],
	totalEarnings: number,
	progress?: Props["progress"]
): CriterionRow[] {
	if (category === "earnings") {
		return EARNINGS_TIERS.map((tier) => {
			const earned = totalEarnings >= tier.threshold;
			return {
				label: `Earn ${tier.label}`,
				earned,
				partial: false,
				points: earned ? "1 / 1" : "0 / 1",
				progress: !earned ? { current: totalEarnings, total: tier.threshold } : undefined,
			};
		});
	}

	return entries.map((entry) => {
		const fulfilled = entry.points === entry.maxPoints && entry.maxPoints > 0;
		const partial = entry.points > 0 && entry.points < entry.maxPoints;
		return {
			label: entry.criterion.replace(/≥/g, ""),
			earned: fulfilled,
			partial,
			points: `${entry.points} / ${entry.maxPoints}`,
			progress: !fulfilled ? progress?.[entry.criterion] : undefined,
		};
	});
}

export function GrandpaCategoryCard({
	category,
	label,
	icon: Icon,
	entries,
	earned,
	max,
	totalEarnings,
	progress,
}: Props) {
	const isComplete = earned === max && max > 0;
	const pct = max > 0 ? Math.min((earned / max) * 100, 100) : 0;
	const rows = buildRows(category, entries, totalEarnings ?? 0, progress);

	return (
		<div className="rounded-lg border border-white/10 bg-white/5 p-4">
			<div className="mb-3 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Icon className="h-5 w-5 text-white/60" />
					<span className="text-sm font-semibold text-white">{label}</span>
				</div>
				<span
					className={`text-sm font-bold ${isComplete ? "text-green-400" : "text-white/70"}`}
				>
					{earned} / {max}
				</span>
			</div>

			<div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/10">
				<div
					className={`h-full rounded-full transition-all ${isComplete ? "bg-green-400" : "bg-accent"}`}
					style={{ width: `${pct}%` }}
				/>
			</div>

			<div className="flex flex-col gap-1.5">
				{rows.map((row) => {
					const progressPct = row.progress
						? Math.min((row.progress.current / row.progress.total) * 100, 100)
						: 0;

					return (
						<div
							key={row.label}
							className={`rounded-md px-2.5 py-1.5 ${
								row.earned
									? "bg-green-400/10"
									: row.partial
										? "bg-accent/10"
										: "bg-white/5"
							}`}
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									{row.earned ? (
										<HiCheck className="h-3.5 w-3.5 text-green-400" />
									) : (
										<HiLockClosed className="h-3.5 w-3.5 text-white/30" />
									)}
									<span
										className={`text-xs ${
											row.earned
												? "font-medium text-green-300"
												: row.partial
													? "text-accent font-medium"
													: "text-white/40"
										}`}
									>
										{row.label}
									</span>
								</div>
								<span
									className={`text-xs font-semibold ${
										row.earned
											? "text-green-400"
											: row.partial
												? "text-accent"
												: "text-white/30"
									}`}
								>
									{row.points}
								</span>
							</div>
							{row.progress && !row.earned && (
								<div className="mt-1.5 flex items-center gap-2">
									<div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
										<div
											className="bg-accent/60 h-full rounded-full"
											style={{ width: `${progressPct}%` }}
										/>
									</div>
									<span className="text-[0.625rem] text-white/40">
										{row.progress.current.toLocaleString()} /{" "}
										{row.progress.total.toLocaleString()}
									</span>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
