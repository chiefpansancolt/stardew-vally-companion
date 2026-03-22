import type { CraftingCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { craftingCardStyles } from "@/lib/utils/cardStyles";
import { StatusBadge } from "@/comps/ui/StatusBadge";

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
						<span className={`text-sm leading-tight font-bold ${nameColor}`}>
							{recipe.name}
						</span>
						{crafted ? (
							<StatusBadge status="success" label="Crafted" />
						) : learned ? (
							<StatusBadge status="warning" label="Learned" />
						) : (
							<StatusBadge status="inactive" label="Not Learned" />
						)}
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
							<span className="border-highlight/20 bg-highlight/10 text-highlight rounded border px-1.5 py-0.5 text-[0.55rem] font-semibold">
								Makes {recipe.output.quantity}
							</span>
						)}
					</div>
				</div>
			</div>
		</button>
	);
}
