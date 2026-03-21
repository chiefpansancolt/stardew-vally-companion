import type { ResourceCardProps as CardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { shippedCardStyles } from "@/lib/utils/cardStyles";
import { PriceGrid } from "@/comps/ui/price-grid";
import { ShippedBadge } from "@/comps/ui/ShippedBadge";

export function ResourceCard({ resource, shipped, professionBonus, onClick }: CardProps) {
	const { borderBg, nameColor } = shippedCardStyles(shipped);

	return (
		<button
			onClick={onClick}
			className={`flex w-full cursor-pointer flex-col gap-2 rounded-xl border p-3 text-left transition-all ${borderBg}`}
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(resource.image)}
					alt={resource.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<span className={`text-sm leading-tight font-bold ${nameColor}`}>
						{resource.name}
					</span>
					<div className="mt-0.5 text-[0.6rem] text-white/40">Click to see locations</div>
				</div>
				<ShippedBadge shippable shipped={shipped} />
			</div>
			<PriceGrid
				price={resource.sellPrice}
				maxQuality="normal"
				shipped={shipped}
				professionBonus={professionBonus}
			/>
		</button>
	);
}
