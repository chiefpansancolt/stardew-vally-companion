import { monsters } from "stardew-valley-data";
import type { MonsterLootCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { shippedCardStyles } from "@/lib/utils/cardStyles";
import { PriceGrid } from "@/comps/ui/price-grid";
import { ShippedBadge } from "@/comps/ui/ShippedBadge";

const allMonsters = monsters().get();
const monsterNameById: Record<string, string> = Object.fromEntries(
	allMonsters.map((m) => [m.id, m.name]),
);

export function MonsterLootCard({ loot, shipped, shippable, onClick }: MonsterLootCardProps) {
	const { borderBg, nameColor } = shippedCardStyles(shippable && shipped);

	return (
		<button
			onClick={onClick}
			className={`flex w-full cursor-pointer flex-col gap-2 rounded-xl border p-3 text-left transition-all ${borderBg}`}
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(loot.image)}
					alt={loot.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<div className="flex items-center justify-between gap-2">
						<span className={`text-sm font-bold leading-tight ${nameColor}`}>
							{loot.name}
						</span>
						<ShippedBadge shippable={shippable} shipped={shipped} />
					</div>
					<div className="mt-1 flex flex-wrap gap-1">
						{loot.droppedBy.map((mId) => (
							<span
								key={mId}
								className="rounded border border-white/10 bg-white/8 px-1.5 py-0.5 text-[0.55rem] text-white/60"
							>
								{monsterNameById[mId] ?? mId}
							</span>
						))}
					</div>
				</div>
			</div>
			<PriceGrid
				price={loot.sellPrice}
				maxQuality="normal"
				shipped={shippable && shipped}
			/>
		</button>
	);
}
