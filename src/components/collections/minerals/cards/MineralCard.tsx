import type { MineralCardProps as CardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { museumCardStyles } from "@/lib/utils/cardStyles";
import { MuseumBadge } from "@/comps/ui/MuseumBadge";
import { PriceGrid } from "@/comps/ui/price-grid";

export function MineralCard({
	mineral,
	donated,
	found,
	geodeNames,
	professionBonus,
	onClick,
}: CardProps) {
	const { borderBg, nameColor } = museumCardStyles(donated, found);

	return (
		<button
			onClick={onClick}
			className={`flex w-full cursor-pointer flex-col gap-2 rounded-xl border p-3 text-left transition-all ${borderBg}`}
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(mineral.image)}
					alt={mineral.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<span className={`text-sm leading-tight font-bold ${nameColor}`}>
						{mineral.name}
					</span>
					<div className="mt-0.5 text-[0.6rem] text-white/40">Click to see locations</div>
				</div>
				<MuseumBadge donated={donated} found={found} />
			</div>

			{geodeNames.length > 0 && (
				<div className="flex flex-wrap gap-1">
					{geodeNames.map((name) => (
						<span
							key={name}
							className="rounded-full border border-white/15 bg-white/8 px-2 py-0.5 text-[0.55rem] font-semibold text-white/55"
						>
							{name}
						</span>
					))}
				</div>
			)}

			<PriceGrid
				price={mineral.sellPrice}
				maxQuality="normal"
				shipped={donated}
				professionBonus={professionBonus}
			/>
		</button>
	);
}
