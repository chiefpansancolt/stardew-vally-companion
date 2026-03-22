import type { CropCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { shippedCardStyles } from "@/lib/utils/cardStyles";
import { EnergyHealthGrid } from "@/comps/ui/energy-health-grid";
import { PriceGrid } from "@/comps/ui/price-grid";
import { SeasonBadges } from "@/comps/ui/SeasonBadges";
import { SeedRow } from "@/comps/ui/SeedRow";
import { StatusBadge } from "@/comps/ui/StatusBadge";

export function CropCard({
	crop,
	shipped,
	shippedCount,
	professionBonus = null,
	onClick,
}: CropCardProps) {
	const { borderBg, nameColor } = shippedCardStyles(shipped);
	const hasEnergy =
		crop.energyHealth &&
		!crop.energyHealth.poison &&
		((crop.energyHealth.energy ?? 0) > 0 || (crop.energyHealth.health ?? 0) > 0);

	const extraHarvest =
		crop.harvestQuantity.min > 1 || crop.harvestQuantity.max > 1
			? crop.harvestQuantity.min === crop.harvestQuantity.max
				? `×${crop.harvestQuantity.min}`
				: `×${crop.harvestQuantity.min}–${crop.harvestQuantity.max}`
			: null;

	return (
		<div
			className={`flex cursor-pointer flex-col gap-2.5 rounded-xl border p-3 transition-all hover:brightness-110 ${borderBg}`}
			onClick={onClick}
		>
			<div className="flex items-start gap-3">
				<div className="shrink-0">
					{crop.image ? (
						<img
							src={assetPath(crop.image)}
							alt={crop.name}
							className="h-12 w-12 object-contain"
						/>
					) : (
						<div className="h-12 w-12" />
					)}
				</div>
				<div className="min-w-0 flex-1">
					<span className={`text-sm leading-tight font-bold ${nameColor}`}>
						{crop.name}
					</span>
					<div className="mt-1 flex flex-wrap gap-1">
						<SeasonBadges seasons={crop.seasons} />
					</div>
				</div>
				<div className="flex shrink-0 flex-col items-end gap-1">
					<StatusBadge status={shipped ? "success" : "inactive"} label={shipped ? "Shipped" : "Not Shipped"} />
					{shipped && shippedCount > 0 && (
						<span className="text-[0.6rem] text-white/80">×{shippedCount} shipped</span>
					)}
					{crop.giant && (
						<span className="rounded-full bg-purple-900/50 px-2 py-0.5 text-[0.6rem] font-semibold text-purple-300">
							Giant
						</span>
					)}
					{crop.trellis && (
						<span className="rounded-full bg-amber-900/50 px-2 py-0.5 text-[0.6rem] font-semibold text-amber-300">
							Trellis
						</span>
					)}
				</div>
			</div>

			<SeedRow
				image={crop.seedImage}
				name={crop.seedName}
				prices={crop.seedBuyPrices}
				emptyLabel="No shop"
			/>

			<div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
				<span className="flex items-center gap-1">
					<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
						Grow
					</span>
					<span className="text-[0.75rem] font-bold text-white/85">{crop.growDays}d</span>
				</span>
				{crop.regrowDays !== null && (
					<>
						<span className="text-[0.75rem] text-white/85">|</span>
						<span className="flex items-center gap-1">
							<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
								Regrow
							</span>
							<span className="text-[0.75rem] font-bold text-white/85">
								{crop.regrowDays}d
							</span>
						</span>
					</>
				)}
				{extraHarvest && (
					<>
						<span className="text-[0.75rem] text-white/85">|</span>
						<span className="flex items-center gap-1">
							<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
								Harvest
							</span>
							<span className="text-[0.75rem] font-bold text-white/85">
								{extraHarvest}
							</span>
						</span>
					</>
				)}
			</div>

			<PriceGrid
				price={crop.cropSellPrice}
				maxQuality={crop.maxQuality}
				shipped={shipped}
				professionBonus={professionBonus}
			/>

			{hasEnergy && (
				<EnergyHealthGrid
					energy={crop.energyHealth!.energy ?? 0}
					health={crop.energyHealth!.health ?? 0}
					maxQuality={crop.maxQuality}
				/>
			)}
		</div>
	);
}
