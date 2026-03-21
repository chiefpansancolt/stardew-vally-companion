import type { NodeCardProps as CardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";

export function NodeCard({ node, onClick, itemNameById }: CardProps) {
	return (
		<button
			onClick={onClick}
			className="flex w-full cursor-pointer flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition-all"
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(node.image)}
					alt={node.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<span className="text-sm leading-tight font-bold text-white">{node.name}</span>
					<div className="mt-0.5 text-[0.6rem] text-white/40">
						Click for drops &amp; locations
					</div>
				</div>
				<span className="border-highlight/30 bg-highlight/15 text-highlight inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[0.6rem] font-bold">
					+{node.miningXP} XP
				</span>
			</div>

			{node.drops.length > 0 && (
				<div className="flex flex-wrap gap-1">
					{node.drops.slice(0, 3).map((drop, i) => {
						const name = itemNameById[drop.item] ?? drop.item;
						return (
							<span
								key={i}
								className="rounded-md border border-white/12 bg-white/7 px-2 py-0.5 text-[0.6rem] font-medium text-white/65"
							>
								{name} ×{drop.quantity}
							</span>
						);
					})}
					{node.drops.length > 3 && (
						<span className="rounded-md border border-white/12 bg-white/7 px-2 py-0.5 text-[0.6rem] font-medium text-white/40">
							+{node.drops.length - 3} more
						</span>
					)}
				</div>
			)}
		</button>
	);
}
