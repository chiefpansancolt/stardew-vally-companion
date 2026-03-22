import type { FossilCollectionsTabProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { NAVY_TILE } from "@/data/constants/styles";

export function FossilCollectionsTab({ collections }: Props) {
	return (
		<div className="flex flex-col gap-3">
			{collections.map((collection) => (
				<div key={collection.id} className="rounded-lg p-3" style={NAVY_TILE}>
					<div className="mb-2 flex items-center justify-between">
						<span className="text-sm font-bold text-white">{collection.name}</span>
						<div className="flex items-center gap-2">
							<span className="bg-highlight/20 text-highlight rounded-full px-2 py-0.5 text-[0.6rem] font-bold">
								{collection.reward.goldenWalnuts} walnuts
							</span>
							{collection.reward.item && (
								<div className="flex items-center gap-1">
									<img
										src={assetPath(collection.reward.item.image)}
										alt={collection.reward.item.name}
										className="h-5 w-5 object-contain"
									/>
									<span className="text-[0.6rem] font-semibold text-green-300">
										{collection.reward.item.name}
									</span>
								</div>
							)}
						</div>
					</div>
					<div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
						{collection.donations.map((d) => (
							<div
								key={d.id}
								className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5"
							>
								<img
									src={assetPath(d.image)}
									alt={d.name}
									className="h-7 w-7 shrink-0 object-contain"
								/>
								<span className="flex-1 truncate text-[0.7rem] font-semibold text-white/85">
									{d.name}
								</span>
								{d.quantity > 1 && (
									<span className="text-[0.6rem] font-bold text-white/50">
										&times;{d.quantity}
									</span>
								)}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
