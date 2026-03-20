"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { type Crop, QualityCalculator } from "stardew-valley-data";
import { HiCheck } from "react-icons/hi";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";

interface Props {
	crop: Crop | null;
	gameData: GameData;
	onClose: () => void;
}

const calc = new QualityCalculator();

const ARTISAN_USE_META: Record<string, { name: string; image: string }> = {
	honey: { name: "Honey", image: "images/artisan-goods/Honey.png" },
	wine: { name: "Wine", image: "images/artisan-goods/Wine.png" },
	juice: { name: "Juice", image: "images/artisan-goods/Juice.png" },
	pickles: { name: "Pickles", image: "images/artisan-goods/Pickles.png" },
	jelly: { name: "Jelly", image: "images/artisan-goods/Jelly.png" },
	driedMushrooms: { name: "Dried Mushrooms", image: "images/artisan-goods/Dried Mushrooms.png" },
	driedFruit: { name: "Dried Fruit", image: "images/artisan-goods/Dried Fruit.png" },
};

const SEASON_LABELS: Record<string, string> = {
	spring: "Spring",
	summer: "Summer",
	fall: "Fall",
	winter: "Winter",
};

const NAVY_TILE = {
	background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)",
	border: "1px solid rgba(43,58,103,0.6)",
} as const;

export function CropDetailModal({ crop, gameData, onClose }: Props) {
	if (!crop) return null;

	const shipped = gameData.shipped[crop.id]?.shipped === true;
	const shippedCount = gameData.shipped[crop.id]?.count ?? 0;
	const seasonLabel = crop.seasons.map((s) => SEASON_LABELS[s] ?? s).join(", ");

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
					{shipped && (
						<span className="ml-2 inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[0.65rem] font-bold text-green-700">
							<HiCheck className="h-3 w-3" /> Shipped
						</span>
					)}
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-4">
					{/* Seed row */}
					<div
						className="flex items-center justify-between rounded-xl p-3"
						style={NAVY_TILE}
					>
						<div className="flex items-center gap-2">
							{crop.seedImage && (
								<img
									src={assetPath(crop.seedImage)}
									alt={crop.seedName}
									className="h-6 w-6 object-contain"
								/>
							)}
							<span className="text-sm font-semibold text-white/85">
								{crop.seedName}
							</span>
						</div>
						{crop.seedBuyPrices.length > 0 && (
							<div className="flex gap-4">
								{crop.seedBuyPrices.map((bp) => (
									<div key={bp.place} className="flex flex-col items-end">
										<span className="text-[0.55rem] font-semibold tracking-wide text-white/80 uppercase">
											{bp.place}
										</span>
										<span className="text-sm font-bold text-accent">
											{bp.price}g
										</span>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Info chips */}
					<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
						{[
							{ label: "Grow", value: `${crop.growDays}d` },
							{ label: "Regrow", value: crop.regrowDays ? `${crop.regrowDays}d` : "—" },
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

					{/* Sell price */}
					{crop.maxQuality === "iridium" ? (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">
								Sell Price
							</div>
							<div className="grid grid-cols-4 overflow-hidden rounded-xl border border-white/10">
								<div
									className="flex flex-col items-center gap-0.5 border-r border-white/10 px-1 py-2"
									style={NAVY_TILE}
								>
									<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
										Basic
									</span>
									<span className="text-xs font-bold text-white/85">
										{crop.cropSellPrice}g
									</span>
								</div>
								{calc.sellPrices(crop.cropSellPrice).map(({ quality, icon, value }) => (
									<div
										key={quality}
										className="flex flex-col items-center gap-0.5 border-r border-white/10 px-1 py-2 last:border-r-0"
										style={NAVY_TILE}
									>
										<img
											src={assetPath(icon)}
											alt={quality}
											className="h-3.5 w-3.5 object-contain"
										/>
										<span className="text-xs font-bold text-white/85">
											{value}g
										</span>
									</div>
								))}
							</div>
						</div>
					) : (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">
								Sell Price
							</div>
							<div
								className="flex items-center justify-between rounded-xl px-3 py-2"
								style={NAVY_TILE}
							>
								<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
									Price
								</span>
								<span className="text-sm font-bold text-white/85">
									{crop.cropSellPrice}g
								</span>
							</div>
						</div>
					)}

					{/* Energy & Health */}
					{hasEnergy && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">
								Energy &amp; Health
							</div>
							{crop.maxQuality === "iridium" ? (
								<div className="grid grid-cols-4 overflow-hidden rounded-xl border border-white/10">
									<div
										className="flex flex-col items-center gap-1.5 border-r border-white/10 px-2 py-2.5"
										style={NAVY_TILE}
									>
										<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
											Basic
										</span>
										<div className="flex gap-1.5">
											<span className="inline-flex items-center gap-1">
												<img src={assetPath("images/misc/Energy.png")} alt="Energy" className="h-4 w-4 object-contain" />
												<span className="text-xs font-bold text-yellow-300">+{crop.energyHealth!.energy}</span>
											</span>
											<span className="inline-flex items-center gap-1">
												<img src={assetPath("images/misc/Health.png")} alt="Health" className="h-4 w-4 object-contain" />
												<span className="text-xs font-bold text-red-400">+{crop.energyHealth!.health}</span>
											</span>
										</div>
									</div>
									{calc
										.energyHealth(crop.energyHealth!.energy ?? 0, crop.energyHealth!.health ?? 0)
										.map(({ quality, icon, energy, health }) => (
											<div
												key={quality}
												className="flex flex-col items-center gap-1.5 border-r border-white/10 px-2 py-2.5 last:border-r-0"
												style={NAVY_TILE}
											>
												<img src={assetPath(icon)} alt={quality} className="h-4 w-4 object-contain" />
												<div className="flex gap-1.5">
													<span className="inline-flex items-center gap-1">
														<img src={assetPath("images/misc/Energy.png")} alt="Energy" className="h-4 w-4 object-contain" />
														<span className="text-xs font-bold text-yellow-300">+{energy}</span>
													</span>
													<span className="inline-flex items-center gap-1">
														<img src={assetPath("images/misc/Health.png")} alt="Health" className="h-4 w-4 object-contain" />
														<span className="text-xs font-bold text-red-400">+{health}</span>
													</span>
												</div>
											</div>
										))}
								</div>
							) : (
								<div
									className="flex items-center gap-4 rounded-xl px-3 py-2"
									style={NAVY_TILE}
								>
									<span className="inline-flex items-center gap-1.5">
										<img src={assetPath("images/misc/Energy.png")} alt="Energy" className="h-4 w-4 object-contain" />
										<span className="text-sm font-bold text-yellow-300">+{crop.energyHealth!.energy}</span>
									</span>
									<span className="inline-flex items-center gap-1.5">
										<img src={assetPath("images/misc/Health.png")} alt="Health" className="h-4 w-4 object-contain" />
										<span className="text-sm font-bold text-red-400">+{crop.energyHealth!.health}</span>
									</span>
								</div>
							)}
						</div>
					)}

					{/* Growth stages */}
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
											<span className="text-[0.6rem] text-white/80">{stage.name}</span>
										</div>
										{i < crop.stages.length - 1 && (
											<span className="mb-3 text-white/30">›</span>
										)}
									</div>
								))}
							</div>
						</div>
					)}

					{/* Artisan uses */}
					{crop.artisanUses && Object.entries(crop.artisanUses).some(([, v]) => v) && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">
								Artisan Uses
							</div>
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
