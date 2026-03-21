import type { CookingCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { craftingCardStyles } from "@/lib/utils/cardStyles";
import { CookingBadge } from "@/comps/ui/CookingBadge";

function formatSource(dish: CookingCardProps["dish"]): string {
	const src = dish.recipeSources[0];
	if (!src) return "";
	switch (src.type) {
		case "friendship":
			return `${src.villager} — ${src.hearts} hearts`;
		case "queen-of-sauce":
			return "Queen of Sauce";
		case "purchase":
			return `Buy from ${src.from}`;
		case "skill":
			return `${src.skill} Level ${src.level}`;
		case "cutscene":
			return "Special event";
		default:
			return "Starter recipe";
	}
}

export function CookingCard({ dish, learned, cooked, onClick }: CookingCardProps) {
	const { borderBg, nameColor } = craftingCardStyles(learned, cooked);
	const energy = dish.energyHealth?.energy ?? 0;
	const health = dish.energyHealth?.health ?? 0;
	const hasEnergy = energy > 0 || health > 0;

	return (
		<button
			onClick={onClick}
			className={`flex w-full cursor-pointer flex-col gap-2 rounded-xl border p-3 text-left transition-all ${borderBg}`}
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(dish.image)}
					alt={dish.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<div className="flex items-center justify-between gap-2">
						<span className={`text-sm font-bold leading-tight ${nameColor}`}>
							{dish.name}
						</span>
						<CookingBadge learned={learned} cooked={cooked} />
					</div>
					<div className="mt-0.5 text-[0.6rem] text-white/40">
						{formatSource(dish)}
					</div>
					{hasEnergy && (
						<div className="mt-1 flex items-center gap-2">
							<span className="inline-flex items-center gap-0.5">
								<img
									src={assetPath("images/misc/Energy.png")}
									alt="Energy"
									className="h-3 w-3 object-contain"
								/>
								<span className="text-[0.6rem] font-bold text-yellow-300">
									+{energy}
								</span>
							</span>
							<span className="inline-flex items-center gap-0.5">
								<img
									src={assetPath("images/misc/Health.png")}
									alt="Health"
									className="h-3 w-3 object-contain"
								/>
								<span className="text-[0.6rem] font-bold text-red-400">
									+{health}
								</span>
							</span>
						</div>
					)}
					{dish.buffs.length > 0 && (
						<div className="mt-1 flex flex-wrap gap-1">
							{dish.buffs.map((buff) => (
								<span
									key={buff.stat}
									className="rounded border border-blue-400/20 bg-blue-400/10 px-1.5 py-0.5 text-[0.55rem] font-semibold text-blue-300"
								>
									{buff.stat} {buff.value > 0 ? `+${buff.value}` : buff.value}
								</span>
							))}
						</div>
					)}
				</div>
			</div>
		</button>
	);
}
