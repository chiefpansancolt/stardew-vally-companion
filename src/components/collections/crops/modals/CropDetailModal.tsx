"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { CropDetailModalProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { ARTISAN_USE_META } from "@/data/constants/artisanGoods";
import { SEASONS } from "@/data/constants/seasons";
import { NAVY_TILE } from "@/data/constants/styles";
import { EnergyHealthGrid } from "@/comps/ui/energy-health-grid";
import { PriceGrid } from "@/comps/ui/price-grid";
import { SeedRow } from "@/comps/ui/SeedRow";
import { StatusBadge } from "@/comps/ui/StatusBadge";

export function CropDetailModal({ crop, gameData, onClose }: Props) {
	if (!crop) return null;

	const shipped = gameData.shipped[crop.id]?.shipped === true;
	const shippedCount = gameData.shipped[crop.id]?.count ?? 0;
	const seasonLabel = crop.seasons.map((s) => SEASONS[s]?.label ?? s).join(", ");

	const hasEnergy =
		crop.energyHealth &&
		!crop.energyHealth.poison &&
		((crop.energyHealth.energy ?? 0) > 0 || (crop.energyHealth.health ?? 0) > 0);

	return (
		<Modal show={!!crop} onClose={onClose} dismissible size="2xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					{crop.image ? (
						<img
							src={assetPath(crop.image)}
							alt={crop.name}
							className="h-14 w-14 object-contain"
						/>
					) : (
						<div className="h-10 w-10 rounded-lg bg-white/10" />
					)}
					<div>
						<div className="text-lg font-extrabold">{crop.name}</div>
						<div className="text-sm text-gray-500">{seasonLabel}</div>
					</div>
					<StatusBadge status={shipped ? "success" : "inactive"} label={shipped ? "Shipped" : "Not Shipped"} />
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-4">
					<SeedRow
						image={crop.seedImage}
						name={crop.seedName}
						prices={crop.seedBuyPrices}
						variant="modal"
					/>

					<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
						{[
							{ label: "Grow", value: `${crop.growDays}d` },
							{
								label: "Regrow",
								value: crop.regrowDays ? `${crop.regrowDays}d` : "—",
							},
							{ label: "Farming XP", value: crop.farmingXP ?? "—" },
							{
								label: "Shipped",
								value: shipped ? `×${shippedCount}` : "Not Shipped",
							},
						].map(({ label, value }) => (
							<div
								key={label}
								className="flex flex-col items-center rounded-xl px-3 py-2.5"
								style={NAVY_TILE}
							>
								<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
									{label}
								</span>
								<span className="mt-0.5 text-sm font-bold text-white/85">
									{value}
								</span>
							</div>
						))}
					</div>

					<div>
						<div className="mb-2 text-sm font-bold text-gray-900">Sell Price</div>
						<PriceGrid
							price={crop.cropSellPrice}
							maxQuality={crop.maxQuality}
							variant="modal"
						/>
					</div>

					{hasEnergy && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">
								Energy &amp; Health
							</div>
							<EnergyHealthGrid
								energy={crop.energyHealth!.energy ?? 0}
								health={crop.energyHealth!.health ?? 0}
								maxQuality={crop.maxQuality}
								variant="modal"
							/>
						</div>
					)}

					{crop.stages && crop.stages.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">
								Growth Stages
							</div>
							<div className="flex flex-wrap items-end gap-1">
								{crop.stages.map((stage, i) => (
									<div key={i} className="flex items-end gap-1">
										<div
											className="flex flex-col items-center gap-1.5 rounded-xl px-3 py-3"
											style={NAVY_TILE}
										>
											{stage.image ? (
												<img
													src={assetPath(stage.image)}
													alt={stage.name}
													className="h-14 w-14 object-contain"
												/>
											) : (
												<div className="h-14 w-14" />
											)}
											<span className="text-[0.6rem] text-white/80">
												{stage.name}
											</span>
										</div>
										{i < crop.stages.length - 1 && (
											<span className="mb-3 text-white/30">›</span>
										)}
									</div>
								))}
							</div>
						</div>
					)}

					{crop.artisanUses && Object.entries(crop.artisanUses).some(([, v]) => v) && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">Artisan Uses</div>
							<div className="flex flex-wrap gap-2">
								{Object.entries(crop.artisanUses)
									.filter(([, v]) => v)
									.map(([key]) => {
										const meta = ARTISAN_USE_META[key];
										if (!meta) return null;
										return (
											<div
												key={key}
												className="flex items-center gap-2 rounded-xl px-3 py-2"
												style={NAVY_TILE}
											>
												<img
													src={assetPath(meta.image)}
													alt={meta.name}
													className="h-6 w-6 object-contain"
												/>
												<span className="text-xs font-semibold text-white/85">
													{meta.name}
												</span>
											</div>
										);
									})}
							</div>
						</div>
					)}
				</div>
			</ModalBody>
		</Modal>
	);
}
