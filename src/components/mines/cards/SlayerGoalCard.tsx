import { monsters } from "stardew-valley-data";
import { HiCheck } from "react-icons/hi";
import type { SlayerGoalCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";

const allMonsters = monsters().get();

export function SlayerGoalCard({ goal, killCount }: SlayerGoalCardProps) {
	const isComplete = killCount >= goal.killTarget;
	const pct = Math.min(100, Math.round((killCount / goal.killTarget) * 100));

	const borderBg = isComplete
		? "border-green-500/40 bg-green-900/20"
		: "border-white/10 bg-white/5";

	return (
		<div className={`flex flex-col gap-2.5 rounded-xl border p-3 ${borderBg}`}>
			<div className="flex items-start gap-3">
				{goal.reward.image ? (
					<img
						src={assetPath(goal.reward.image)}
						alt={goal.reward.name}
						className="h-10 w-10 shrink-0 rounded-lg object-contain"
					/>
				) : (
					<div className="h-10 w-10 shrink-0 rounded-lg bg-white/10" />
				)}
				<div className="min-w-0 flex-1">
					<div className="flex items-center justify-between gap-2">
						<span
							className={`text-sm font-bold ${isComplete ? "text-green-300" : "text-white"}`}
						>
							{goal.name}
						</span>
						{isComplete ? (
							<span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-[0.6rem] font-bold text-green-300">
								<HiCheck className="h-2.5 w-2.5" /> Complete
							</span>
						) : (
							<span className="shrink-0 text-[0.7rem] font-semibold text-white/80">
								{killCount.toLocaleString()} / {goal.killTarget.toLocaleString()}
							</span>
						)}
					</div>
					<div className="mt-0.5 text-[0.6rem] text-white/80">
						Reward: {goal.reward.name}
					</div>
				</div>
			</div>

			<div className="flex flex-wrap gap-1">
				{goal.monsters.map((name) => {
					const m = allMonsters.find((mon) => mon.name === name || mon.id === name);
					return m ? (
						<img
							key={name}
							src={assetPath(m.image)}
							alt={name}
							title={name}
							className="h-5 w-5 rounded object-contain"
						/>
					) : (
						<span
							key={name}
							className="rounded bg-white/10 px-1 py-0.5 text-[0.5rem] text-white/50"
						>
							{name}
						</span>
					);
				})}
			</div>

			<div className="h-1.5 overflow-hidden rounded-full bg-white/15">
				<div
					className={`h-full rounded-full transition-all ${isComplete ? "bg-green-400" : "bg-accent"}`}
					style={{ width: `${pct}%` }}
				/>
			</div>
		</div>
	);
}
