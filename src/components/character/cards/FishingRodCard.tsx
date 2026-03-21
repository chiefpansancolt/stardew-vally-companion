import { tools } from "stardew-valley-data";
import type { FishingRodCardProps, RodData } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { ROD_DOT_HEX } from "@/data/constants/tools";

export function FishingRodCard({ levelIndex, onClick }: FishingRodCardProps) {
	const rod = tools().fishingRods().first() as unknown as RodData | undefined;
	if (!rod) return null;
	const lvl = rod.levels[levelIndex];
	const imgSrc = lvl?.image ? assetPath(lvl.image) : null;
	const isUpgraded = levelIndex > 1;

	return (
		<button
			onClick={onClick}
			className={`hover:border-accent/40 hover:bg-accent/10 flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all ${
				isUpgraded ? "border-accent/40 bg-accent/10" : "border-white/10 bg-white/5"
			}`}
		>
			{imgSrc ? (
				<img src={imgSrc} alt={lvl?.name} className="h-10 w-10 object-contain" />
			) : (
				<div className="h-10 w-10 rounded-lg bg-white/10" />
			)}
			<div className="text-xs font-bold text-white">{rod.name}</div>
			<span
				className={`text-[0.625rem] font-bold ${isUpgraded ? "text-accent/80" : "text-white/60"}`}
			>
				{lvl?.name ?? "None"}
			</span>
			<div className="flex gap-1.5">
				{rod.levels.map((_, i) => (
					<div
						key={i}
						className="h-2.5 w-2.5 rounded-full transition-all"
						style={{
							backgroundColor:
								i <= levelIndex
									? (ROD_DOT_HEX[i] ?? "rgba(255,255,255,0.25)")
									: "rgba(255,255,255,0.1)",
						}}
					/>
				))}
			</div>
		</button>
	);
}
