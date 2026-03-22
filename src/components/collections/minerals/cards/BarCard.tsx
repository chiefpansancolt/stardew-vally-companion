import type { BarCardProps as CardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { shippedCardStyles } from "@/lib/utils/cardStyles";
import { PriceGrid } from "@/comps/ui/price-grid";
import { StatusBadge } from "@/comps/ui/StatusBadge";

export function BarCard({ bar, shipped, professionBonus, onClick, oreNameById }: CardProps) {
	const { borderBg, nameColor } = shippedCardStyles(shipped);
	const firstRecipe = bar.smeltRecipes[0];

	return (
		<button
			onClick={onClick}
			className={`flex w-full cursor-pointer flex-col gap-2 rounded-xl border p-3 text-left transition-all ${borderBg}`}
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(bar.image)}
					alt={bar.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<span className={`text-sm leading-tight font-bold ${nameColor}`}>
						{bar.name}
					</span>
					{firstRecipe && (
						<div className="mt-0.5 text-[0.6rem] text-white/40">
							{firstRecipe.oreQty}× {oreNameById[firstRecipe.ore] ?? firstRecipe.ore}{" "}
							+ {firstRecipe.coalQty}× Coal · {firstRecipe.timeMinutes} min
						</div>
					)}
				</div>
				<StatusBadge
					status={shipped ? "success" : "inactive"}
					label={shipped ? "Shipped" : "Not Shipped"}
				/>
			</div>
			<PriceGrid
				price={bar.sellPrice}
				maxQuality="normal"
				shipped={shipped}
				professionBonus={professionBonus}
			/>
		</button>
	);
}
