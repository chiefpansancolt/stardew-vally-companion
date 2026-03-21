import type { FruitTreeCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { SeasonBadges } from "@/comps/ui/SeasonBadges";
import { SeedRow } from "@/comps/ui/SeedRow";

export function FruitTreeCard({ tree, onClick }: FruitTreeCardProps) {
	return (
		<button
			onClick={onClick}
			className="flex w-full cursor-pointer flex-col gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition-colors hover:border-white/20 hover:bg-white/10"
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(tree.image)}
					alt={tree.name}
					className="h-12 w-12 shrink-0 object-contain"
				/>
				<div className="min-w-0 flex-1">
					<div className="text-sm font-bold text-white">{tree.name}</div>
					<div className="mt-1 flex flex-wrap gap-1">
						<SeasonBadges seasons={tree.seasons} />
					</div>
				</div>
				<span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[0.6rem] font-semibold text-white/70">
					Mature: {tree.daysToMature}d
				</span>
			</div>

			<SeedRow
				image={tree.saplingImage}
				name={tree.saplingName}
				prices={tree.saplingBuyPrices}
			/>

			<div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
				{tree.produce.image && (
					<img
						src={assetPath(tree.produce.image)}
						alt={tree.produce.name}
						className="h-5 w-5 object-contain"
					/>
				)}
				<div>
					<div className="text-[0.55rem] font-semibold tracking-wide text-white/80 uppercase">
						Produce
					</div>
					<div className="text-[0.75rem] font-semibold text-white/85">
						{tree.produce.name}
					</div>
				</div>
			</div>
		</button>
	);
}
