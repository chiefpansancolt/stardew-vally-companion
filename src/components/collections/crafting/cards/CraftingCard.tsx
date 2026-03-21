import type { CraftingCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { craftingCardStyles } from "@/lib/utils/cardStyles";
import { CraftingBadge } from "@/comps/ui/CraftingBadge";

export function CraftingCard({ recipe, learned, crafted, onClick }: CraftingCardProps) {
	const { borderBg, nameColor } = craftingCardStyles(learned, crafted);

	return (
		<button
			onClick={onClick}
			className={`flex w-full cursor-pointer flex-col gap-2 rounded-xl border p-3 text-left transition-all ${borderBg}`}
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(recipe.image)}
					alt={recipe.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<div className="flex items-center justify-between gap-2">
						<span className={`text-sm font-bold leading-tight ${nameColor}`}>
							{recipe.name}
						</span>
						<CraftingBadge learned={learned} crafted={crafted} />
					</div>
					<div className="mt-0.5 text-[0.6rem] text-white/40">{recipe.source}</div>
					<div className="mt-1 flex flex-wrap gap-1">
						{recipe.ingredients.map((ing) => (
							<span
								key={ing.id}
								className="rounded border border-white/10 bg-white/8 px-1.5 py-0.5 text-[0.55rem] text-white/60"
							>
								{ing.quantity}&times; {ing.name}
							</span>
						))}
						{recipe.output.quantity > 1 && (
							<span className="rounded border border-highlight/20 bg-highlight/10 px-1.5 py-0.5 text-[0.55rem] font-semibold text-highlight">
								Makes {recipe.output.quantity}
							</span>
						)}
					</div>
				</div>
			</div>
		</button>
	);
}
