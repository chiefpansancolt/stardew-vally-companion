import type { PetsTabProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { formatNumber } from "@/lib/utils/formatting";
import { NAVY_TILE } from "@/data/constants/styles";

export function PetsTab({ pets }: Props) {
	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
			{pets.map((p) => (
				<div key={p.id} className="rounded-lg p-3" style={NAVY_TILE}>
					<div className="flex flex-col items-center gap-2">
						<img
							src={assetPath(p.image)}
							alt={p.name}
							className="h-14 w-14 object-contain"
						/>
						<div className="text-sm font-bold text-white">
							{p.name}
							{p.variant && (
								<span className="ml-1 text-[0.6rem] text-white/40">
									#{p.variant}
								</span>
							)}
						</div>
						<div className="text-highlight text-xs font-bold">
							{formatNumber(p.purchasePrice!)}g
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
