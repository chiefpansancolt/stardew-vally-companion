import { professions } from "stardew-valley-data";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { SkillCardProps } from "@/types";
import { computeXpBarPercent, xpLabel } from "@/lib/pages/character";
import { assetPath } from "@/lib/utils/assetPath";

export function SkillCard({ skillData, progress, professionIds, onClick }: SkillCardProps) {
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
			<div className="mb-2.5 flex items-center gap-2">
				<img
					src={assetPath(skillData.image)}
					alt={skillData.name}
					className="h-9 w-9 shrink-0 object-contain"
				/>
				<span className="text-sm font-bold text-white">{skillData.name}</span>
			</div>

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

			<div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/15">
				<div
					className={`h-full rounded-full transition-all ${maxed ? "from-highlight bg-linear-to-r to-yellow-300" : "from-accent bg-linear-to-r to-yellow-400"}`}
					style={{ width: `${barPercent}%` }}
				/>
			</div>

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
