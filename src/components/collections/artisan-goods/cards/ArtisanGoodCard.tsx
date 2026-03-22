import { Button } from "flowbite-react";
import type { ArtisanGoodCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { shippedCardStyles } from "@/lib/utils/cardStyles";
import { EQUIPMENT_IMAGES } from "@/data/constants/artisanGoods";
import { EnergyHealthGrid } from "@/comps/ui/energy-health-grid";
import { PriceGrid } from "@/comps/ui/price-grid";
import { StatusBadge } from "@/comps/ui/StatusBadge";

export function ArtisanGoodCard({
	good,
	shipped,
	shippable,
	professionBonus = null,
	onCalculate,
	ingredientImageMap,
}: ArtisanGoodCardProps) {
	const { borderBg, nameColor } = shippedCardStyles(shippable && shipped);

	return (
		<div className={`flex flex-col gap-3 rounded-xl border p-3 transition-all ${borderBg}`}>
			<div className="flex items-start gap-3">
				<img
					src={assetPath(good.image)}
					alt={good.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<span className={`text-sm leading-tight font-bold ${nameColor}`}>
						{good.name}
					</span>
					<div className="mt-1 flex items-center gap-1.5">
						{EQUIPMENT_IMAGES[good.equipment] && (
							<img
								src={assetPath(EQUIPMENT_IMAGES[good.equipment])}
								alt={good.equipment}
								className="h-5 w-5 object-contain"
							/>
						)}
						<span className="text-xs text-white/80">{good.equipment}</span>
					</div>
					{good.ingredients.length > 0 && (
						<div className="mt-1.5 flex flex-wrap gap-1.5">
							{good.ingredients.map((ingredient, idx) => {
								const imgPath = ingredient.id
									? ingredientImageMap[ingredient.id]
									: undefined;
								return (
									<span
										key={idx}
										className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1"
									>
										{imgPath && (
											<img
												src={assetPath(imgPath)}
												alt={ingredient.name}
												className="h-5 w-5 object-contain"
											/>
										)}
										<span className="text-xs text-white/80">
											{ingredient.name}
										</span>
									</span>
								);
							})}
						</div>
					)}
				</div>
				{shippable && (
					<StatusBadge
						status={shipped ? "success" : "inactive"}
						label={shipped ? "Shipped" : "Not Shipped"}
					/>
				)}
			</div>

			{good.sellPrice !== null ? (
				<PriceGrid
					price={good.sellPrice}
					maxQuality={good.maxQuality}
					shipped={shippable && shipped}
					professionBonus={professionBonus}
				/>
			) : (
				<div className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
					<span className="text-[0.7rem] text-white/70 italic">
						{good.sellPriceFormula}
					</span>
					<Button size="xxs" color="accent" onClick={onCalculate} className="shrink-0">
						Calculate
					</Button>
				</div>
			)}

			{good.energyHealth && (
				<EnergyHealthGrid
					energy={good.energyHealth.energy ?? 0}
					health={good.energyHealth.health ?? 0}
					maxQuality={good.maxQuality}
					poison={good.energyHealth.poison ?? false}
				/>
			)}

			{good.buffs && good.buffs.length > 0 && (
				<div className="flex flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
					{good.buffs.map((buff, i) => (
						<span key={i} className="inline-flex items-center gap-1.5">
							<img
								src={assetPath(`images/misc/${buff.stat}.png`)}
								alt={buff.stat}
								className="h-4 w-4 object-contain"
								onError={(e) => {
									(e.target as HTMLImageElement).style.display = "none";
								}}
							/>
							<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
								{buff.stat}
							</span>
							<span
								className={`text-xs font-bold ${buff.value > 0 ? "text-green-400" : "text-red-400"}`}
							>
								{buff.value > 0 ? "+" : ""}
								{buff.value}
							</span>
						</span>
					))}
					{good.buffDuration && (
						<span className="ml-auto text-[0.65rem] text-white/40">
							{good.buffDuration}s
						</span>
					)}
				</div>
			)}
		</div>
	);
}
