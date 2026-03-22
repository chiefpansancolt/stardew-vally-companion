import type { ProduceCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { shippedCardStyles } from "@/lib/utils/cardStyles";
import { PriceGrid } from "@/comps/ui/price-grid";
import { StatusBadge } from "@/comps/ui/StatusBadge";

export function ProduceCard({ entry, shipped, professionBonus = null }: ProduceCardProps) {
	const { produce, animalName, building, isDeluxe } = entry;
	const { borderBg, nameColor } = shippedCardStyles(shipped);

	return (
		<div className={`flex flex-col gap-3 rounded-xl border p-3 transition-all ${borderBg}`}>
			<div className="flex items-start gap-3">
				<img
					src={assetPath(produce.image)}
					alt={produce.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<div className="flex flex-wrap items-center gap-1.5">
						<span className={`text-sm leading-tight font-bold ${nameColor}`}>
							{produce.name}
						</span>
						{isDeluxe && (
							<span className="bg-accent/20 text-accent rounded-full px-1.5 py-0.5 text-[0.6rem] font-bold uppercase">
								Deluxe
							</span>
						)}
					</div>
					<div className="mt-0.5 text-[0.7rem] text-white/50">
						{animalName} · {building}
					</div>
				</div>
				<StatusBadge status={shipped ? "success" : "inactive"} label={shipped ? "Shipped" : "Not Shipped"} />
			</div>

			<PriceGrid
				price={produce.sellPrice}
				maxQuality="iridium"
				shipped={shipped}
				professionBonus={professionBonus}
			/>
		</div>
	);
}
