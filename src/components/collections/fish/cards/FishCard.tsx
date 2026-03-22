import { FishCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { shippedCardStyles } from "@/lib/utils/cardStyles";
import { WEATHER_LABELS } from "@/data/constants/filters";
import { PriceGrid } from "@/comps/ui/price-grid";
import { SeasonBadges } from "@/comps/ui/SeasonBadges";
import { StatusBadge } from "@/comps/ui/StatusBadge";
import { DifficultyBar } from "./DifficultyBar";

export function FishCard({ fish, caught, professionBonus = null, onClick }: FishCardProps) {
	const isRod = fish.catchType === "rod";
	const { borderBg, nameColor } = shippedCardStyles(caught);

	return (
		<button
			onClick={onClick}
			className={`flex w-full cursor-pointer flex-col gap-2 rounded-xl border p-3 text-left transition-all ${borderBg}`}
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(fish.image)}
					alt={fish.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<span className={`text-sm leading-tight font-bold ${nameColor}`}>
						{fish.name}
					</span>
					<div className="mt-1 flex flex-wrap gap-1">
						{fish.seasons.length === 0 ? (
							<span className="rounded bg-white/10 px-1.5 py-0.5 text-[0.55rem] font-semibold text-white/60">
								All Seasons
							</span>
						) : (
							<SeasonBadges seasons={fish.seasons} />
						)}
					</div>
				</div>
				<StatusBadge
					status={caught ? "success" : "inactive"}
					label={caught ? "Caught" : "Not Caught"}
				/>
			</div>

			<div className="flex flex-wrap items-center gap-1">
				<span
					className={`rounded px-1.5 py-0.5 text-[0.6rem] font-semibold ${
						isRod
							? "bg-accent/15 text-accent border-accent/25 border"
							: "border border-blue-400/25 bg-blue-400/15 text-blue-300"
					}`}
				>
					{isRod ? "Rod" : "Crab-Pot"}
				</span>
				<span className="text-[0.6rem] text-white/80">{fish.location}</span>
			</div>

			{isRod && (fish.weather || fish.time) && (
				<div className="flex flex-wrap gap-1.5">
					{fish.weather && (
						<span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.6rem] font-semibold text-white/60">
							{WEATHER_LABELS[fish.weather] ?? fish.weather}
						</span>
					)}
					{fish.time && (
						<span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.6rem] font-semibold text-white/60">
							{fish.time}
						</span>
					)}
				</div>
			)}

			{isRod && fish.difficulty != null && <DifficultyBar value={fish.difficulty} />}

			<PriceGrid
				price={fish.sellPrice}
				maxQuality={fish.maxQuality}
				shipped={caught}
				professionBonus={professionBonus}
			/>
		</button>
	);
}
