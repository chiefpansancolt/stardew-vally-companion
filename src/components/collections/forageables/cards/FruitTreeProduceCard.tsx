import type { FruitTreeProduceCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { shippedCardStyles } from "@/lib/utils/cardStyles";
import { EnergyHealthGrid } from "@/comps/ui/energy-health-grid";
import { PriceGrid } from "@/comps/ui/price-grid";
import { SeasonBadges } from "@/comps/ui/SeasonBadges";
import { StatusBadge } from "@/comps/ui/StatusBadge";
import { ArtisanUsesRow } from "./ArtisanUsesRow";

export function FruitTreeProduceCard({
	tree,
	shipped,
	shippedCount,
	professionBonus = null,
}: FruitTreeProduceCardProps) {
	const p = tree.produce;
	const { borderBg, nameColor } = shippedCardStyles(shipped);
	const hasEnergy = p.energyHealth && (p.energyHealth.energy ?? 0) > 0;

	return (
		<div className={`flex flex-col gap-2.5 rounded-xl border p-3 ${borderBg}`}>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(p.image)}
					alt={p.name}
					className="h-12 w-12 shrink-0 object-contain"
				/>
				<div className="min-w-0 flex-1">
					<div className={`text-sm font-bold ${nameColor}`}>{p.name}</div>
					<div className="mt-1 flex flex-wrap items-center gap-1">
						<SeasonBadges seasons={tree.seasons} />
						<span className="text-[0.65rem] text-white/60">{tree.name}</span>
					</div>
				</div>
				<div className="flex shrink-0 flex-col items-end gap-1">
					<StatusBadge
						status={shipped ? "success" : "inactive"}
						label={shipped ? "Shipped" : "Not Shipped"}
					/>
					{shipped && (
						<span className="text-[0.6rem] text-white/60">×{shippedCount}</span>
					)}
				</div>
			</div>

			<PriceGrid
				price={p.sellPrice}
				maxQuality="iridium"
				shipped={shipped}
				professionBonus={professionBonus}
			/>

			{hasEnergy && (
				<EnergyHealthGrid
					energy={p.energyHealth!.energy ?? 0}
					health={p.energyHealth!.health ?? 0}
					maxQuality="iridium"
				/>
			)}

			<ArtisanUsesRow artisanUses={p.artisanUses as unknown as Record<string, boolean>} />
		</div>
	);
}
