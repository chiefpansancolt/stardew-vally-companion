import type { WildTreeTapperCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { shippedCardStyles } from "@/lib/utils/cardStyles";
import { EnergyHealthGrid } from "@/comps/ui/energy-health-grid";
import { PriceGrid } from "@/comps/ui/price-grid";
import { StatusBadge } from "@/comps/ui/StatusBadge";

export function WildTreeTapperCard({
	tree,
	shipped,
	shippedCount,
	professionBonus = null,
}: WildTreeTapperCardProps) {
	const t = tree.tapper!;
	const { borderBg, nameColor } = shippedCardStyles(shipped);
	const hasEnergy = t.energyHealth && (t.energyHealth.energy ?? 0) > 0;

	return (
		<div className={`flex flex-col gap-2.5 rounded-xl border p-3 ${borderBg}`}>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(t.image)}
					alt={t.name}
					className="h-12 w-12 shrink-0 object-contain"
				/>
				<div className="min-w-0 flex-1">
					<div className={`text-sm font-bold ${nameColor}`}>{t.name}</div>
					<div className="mt-1 text-[0.65rem] text-white/60">{tree.name} tapper</div>
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
				price={t.sellPrice}
				maxQuality="basic"
				shipped={shipped}
				professionBonus={professionBonus}
			/>

			{hasEnergy && (
				<EnergyHealthGrid
					energy={t.energyHealth!.energy ?? 0}
					health={t.energyHealth!.health ?? 0}
					maxQuality="basic"
				/>
			)}
		</div>
	);
}
