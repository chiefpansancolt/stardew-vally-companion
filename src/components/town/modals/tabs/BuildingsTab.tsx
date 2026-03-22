import type { BuildingsTabProps as Props } from "@/types";
import { getMaterialImage } from "@/lib/pages/town";
import { assetPath } from "@/lib/utils/assetPath";
import { formatNumber } from "@/lib/utils/formatting";
import { NAVY_TILE } from "@/data/constants/styles";

export function BuildingsTab({ buildings }: Props) {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{buildings.map((b) => (
				<div key={b.id} className="rounded-lg p-3" style={NAVY_TILE}>
					<div className="mb-2 flex items-center gap-3">
						<img
							src={assetPath(b.image)}
							alt={b.name}
							className="h-12 w-12 shrink-0 object-contain"
						/>
						<div className="flex-1">
							<div className="text-sm font-bold text-white">{b.name}</div>
							<div className="text-[0.6rem] text-white/50">{b.description}</div>
						</div>
						<div className="text-right">
							<div className="text-highlight text-sm font-bold">
								{formatNumber(b.buildCost)}g
							</div>
							<div className="text-[0.6rem] text-white/40">{b.buildDays} days</div>
						</div>
					</div>
					{b.materials.length > 0 && (
						<div className="flex flex-wrap gap-1.5">
							{b.materials.map((m) => {
								const matImage = getMaterialImage(m.item);
								return (
									<div
										key={m.item}
										className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1"
									>
										{matImage && (
											<img
												src={assetPath(matImage)}
												alt={m.item}
												className="h-5 w-5 object-contain"
											/>
										)}
										<span className="text-[0.65rem] font-semibold text-white/80">
											{m.item}
										</span>
										<span className="text-highlight text-[0.6rem] font-bold">
											&times;{formatNumber(m.quantity)}
										</span>
									</div>
								);
							})}
						</div>
					)}
				</div>
			))}
		</div>
	);
}
