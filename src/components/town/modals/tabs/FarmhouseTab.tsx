import type { FarmhouseTabProps as Props } from "@/types";
import { getMaterialImage } from "@/lib/pages/town";
import { assetPath } from "@/lib/utils/assetPath";
import { formatNumber } from "@/lib/utils/formatting";
import { NAVY_TILE } from "@/data/constants/styles";

export function FarmhouseTab({ upgrades, renovations }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{upgrades.length > 0 && (
				<>
					<h4 className="mb-1 text-sm font-semibold text-gray-700">
						Upgrades ({upgrades.length})
					</h4>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						{upgrades.map((u) => (
							<div key={u.id} className="rounded-lg p-3" style={NAVY_TILE}>
								<div className="mb-2 flex items-center gap-3">
									<img
										src={assetPath(u.image)}
										alt={u.name}
										className="h-12 w-12 shrink-0 object-contain"
									/>
									<div className="flex-1">
										<div className="text-sm font-bold text-white">{u.name}</div>
										<div className="text-[0.6rem] text-white/50">
											{u.description}
										</div>
									</div>
									{u.cost > 0 && (
										<div className="text-highlight text-sm font-bold">
											{formatNumber(u.cost)}g
										</div>
									)}
								</div>
								{u.materials.length > 0 && (
									<div className="flex flex-wrap gap-1.5">
										{u.materials.map((m) => {
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
				</>
			)}

			{renovations.length > 0 && (
				<>
					<h4 className="mb-1 text-sm font-semibold text-gray-700">
						Renovations ({renovations.length})
					</h4>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						{renovations.map((r) => (
							<div key={r.id} className="rounded-lg p-3" style={NAVY_TILE}>
								<div className="flex items-center gap-3">
									<img
										src={assetPath(r.image)}
										alt={r.name}
										className="h-12 w-12 shrink-0 object-contain"
									/>
									<div className="flex-1">
										<div className="text-sm font-bold text-white">{r.name}</div>
										<div className="text-[0.6rem] text-white/50">
											{r.description}
										</div>
									</div>
									<div className="text-highlight text-sm font-bold">
										{r.cost > 0 ? `${formatNumber(r.cost)}g` : "Free"}
									</div>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}
