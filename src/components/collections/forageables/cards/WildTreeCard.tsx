import { search } from "stardew-valley-data";
import type { WildTreeCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { SeedRow } from "@/comps/ui/SeedRow";

export function WildTreeCard({ tree, onClick }: WildTreeCardProps) {
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
					<div className="mt-1 text-[0.65rem] text-white/50">Wild Tree · Year-round</div>
				</div>
			</div>

			{tree.seedName && <SeedRow image={tree.seedImage} name={tree.seedName} />}

			{tree.tapper && (
				<div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
					{tree.tapper.image && (
						<img
							src={assetPath(tree.tapper.image)}
							alt={tree.tapper.name}
							className="h-5 w-5 object-contain"
						/>
					)}
					<div>
						<div className="text-[0.55rem] font-semibold tracking-wide text-white/80 uppercase">
							Tapper Produce
						</div>
						<div className="text-[0.75rem] font-semibold text-white/85">
							{tree.tapper.name}
						</div>
					</div>
				</div>
			)}

			{tree.choppedProduce && tree.choppedProduce.length > 0 && (
				<div className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
					<div className="mb-1 text-[0.55rem] font-semibold tracking-wide text-white/80 uppercase">
						Chopped
					</div>
					<div className="flex flex-wrap gap-1">
						{tree.choppedProduce.map((p) => {
							const img =
								p.image ?? search(p.id)?.find((r) => r.name === p.name)?.image;
							return (
								<div
									key={p.id}
									className="flex items-center gap-1 rounded bg-white/5 px-1.5 py-0.5"
								>
									{img && (
										<img
											src={assetPath(img)}
											alt={p.name}
											className="h-5 w-5 object-contain"
										/>
									)}
									<span className="text-xs text-white/70">{p.name}</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</button>
	);
}
