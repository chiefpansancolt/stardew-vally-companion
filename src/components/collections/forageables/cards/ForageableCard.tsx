import type { ForageableCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { shippedCardStyles } from "@/lib/utils/cardStyles";
import { EnergyHealthGrid } from "@/comps/ui/energy-health-grid";
import { PriceGrid } from "@/comps/ui/price-grid";
import { SeasonBadges } from "@/comps/ui/SeasonBadges";
import { StatusBadge } from "@/comps/ui/StatusBadge";
import { ArtisanUsesRow } from "./ArtisanUsesRow";

export function ForageableCard({
	item,
	shippable,
	shipped,
	shippedCount,
	professionBonus = null,
}: ForageableCardProps) {
	const { borderBg, nameColor } = shippedCardStyles(shipped);
	const hasEnergy = item.energyHealth && (item.energyHealth.energy ?? 0) > 0;

	return (
		<div className={`flex flex-col gap-2.5 rounded-xl border p-3 ${borderBg}`}>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(item.image)}
					alt={item.name}
					className="h-12 w-12 shrink-0 object-contain"
				/>
				<div className="min-w-0 flex-1">
					<div className={`text-sm font-bold ${nameColor}`}>{item.name}</div>
					<div className="mt-1 flex flex-wrap gap-1">
						<SeasonBadges seasons={item.seasons} />
					</div>
				</div>
				{shippable && (
					<div className="flex shrink-0 flex-col items-end gap-1">
						<StatusBadge
							status={shipped ? "success" : "inactive"}
							label={shipped ? "Shipped" : "Not Shipped"}
						/>
						{shipped && (
							<span className="text-[0.6rem] text-white/60">
								×{shippedCount} shipped
							</span>
						)}
					</div>
				)}
			</div>

			<div className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[0.7rem] text-white/60 italic">
				{item.locations}
			</div>

			<PriceGrid
				price={item.sellPrice}
				maxQuality="iridium"
				shipped={shipped}
				professionBonus={professionBonus}
			/>

			{hasEnergy && (
				<EnergyHealthGrid
					energy={item.energyHealth!.energy ?? 0}
					health={item.energyHealth!.health ?? 0}
					maxQuality="iridium"
				/>
			)}

			<ArtisanUsesRow artisanUses={item.artisanUses as unknown as Record<string, boolean>} />
		</div>
	);
}
