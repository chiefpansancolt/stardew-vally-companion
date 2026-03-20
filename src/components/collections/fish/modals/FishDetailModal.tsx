"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { type Fish, type ProfessionBonus } from "stardew-valley-data";
import { assetPath } from "@/lib/utils/assetPath";
import { PriceGrid } from "@/comps/ui/PriceGrid";
import { EnergyHealthGrid } from "@/comps/ui/EnergyHealthGrid";
import { SeasonBadges } from "@/comps/ui/SeasonBadges";
import { applyBestProfessionBonus } from "@/lib/utils/professionPrices";

const NAVY_TILE = {
	background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)",
	border: "1px solid rgba(43,58,103,0.6)",
} as const;

const WEATHER_LABELS: Record<string, string> = {
	sunny: "Sunny",
	rainy: "Rainy",
	both: "Any",
};

interface Props {
	fish: Fish | null;
	caught: boolean;
	onClose: () => void;
	activeProfessionBonuses?: Set<ProfessionBonus> | null;
}

export function FishDetailModal({ fish, caught, onClose, activeProfessionBonuses = null }: Props) {
	if (!fish) return null;

	const isRod = fish.catchType === "rod";
	const hasEnergy =
		fish.energyHealth &&
		((fish.energyHealth.energy ?? 0) > 0 || (fish.energyHealth.health ?? 0) > 0);

	const professionBonus =
		activeProfessionBonuses && fish.profession.length > 0
			? applyBestProfessionBonus(fish.sellPrice, fish.profession, activeProfessionBonuses)
			: null;

	const difficultyLevel =
		fish.difficulty != null
			? fish.difficulty <= 33
				? "Easy"
				: fish.difficulty <= 66
					? "Medium"
					: "Hard"
			: null;

	const difficultyColor =
		difficultyLevel === "Easy"
			? "text-green-400"
			: difficultyLevel === "Medium"
				? "text-yellow-400"
				: "text-red-400";

	const difficultyBarColor =
		difficultyLevel === "Easy"
			? "#4a7c31"
			: difficultyLevel === "Medium"
				? "#c0963a"
				: "#ef4444";

	return (
		<Modal show={!!fish} onClose={onClose} dismissible size="2xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={assetPath(fish.image)}
						alt={fish.name}
						className="h-14 w-14 object-contain"
					/>
					<div>
						<div className="flex items-center gap-2">
							<span className="text-lg font-extrabold">{fish.name}</span>
							{caught && (
								<span className="rounded-full bg-green-100 px-2 py-0.5 text-[0.65rem] font-bold text-green-700">
									✓ Caught
								</span>
							)}
						</div>
						<div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
							<span
								className={`rounded px-1.5 py-0.5 text-[0.65rem] font-semibold ${
									isRod
										? "bg-amber-100 text-amber-700"
										: "bg-blue-100 text-blue-700"
								}`}
							>
								{isRod ? "Rod" : "Crab-Pot"}
							</span>
							<span>{fish.location}</span>
						</div>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-4">
					{/* Info chips */}
					<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
						<div className="flex flex-col items-center rounded-xl px-3 py-2.5" style={NAVY_TILE}>
							<span className="text-[0.6rem] font-semibold tracking-wide text-white/50 uppercase">
								Seasons
							</span>
							<div className="mt-1 flex gap-1">
								{fish.seasons.length === 0 ? (
									<span className="text-sm font-bold text-white/85">All</span>
								) : (
									<SeasonBadges seasons={fish.seasons} />
								)}
							</div>
						</div>
						{fish.location && (
							<div className="flex flex-col items-center rounded-xl px-3 py-2.5" style={NAVY_TILE}>
								<span className="text-[0.6rem] font-semibold tracking-wide text-white/50 uppercase">
									Location
								</span>
								<span className="mt-0.5 text-center text-sm font-bold text-white/85">
									{fish.location}
								</span>
							</div>
						)}
						{isRod && fish.weather && (
							<div className="flex flex-col items-center rounded-xl px-3 py-2.5" style={NAVY_TILE}>
								<span className="text-[0.6rem] font-semibold tracking-wide text-white/50 uppercase">
									Weather
								</span>
								<span className="mt-0.5 text-sm font-bold text-white/85">
									{WEATHER_LABELS[fish.weather] ?? fish.weather}
								</span>
							</div>
						)}
						{isRod && fish.time && (
							<div className="flex flex-col items-center rounded-xl px-3 py-2.5" style={NAVY_TILE}>
								<span className="text-[0.6rem] font-semibold tracking-wide text-white/50 uppercase">
									Time
								</span>
								<span className="mt-0.5 text-sm font-bold text-white/85">{fish.time}</span>
							</div>
						)}
					</div>

					{/* Difficulty bar (rod only) */}
					{isRod && fish.difficulty != null && (
						<div className="flex items-center gap-3 rounded-xl px-4 py-3" style={NAVY_TILE}>
							<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase" style={{ width: 60, flexShrink: 0 }}>
								Difficulty
							</span>
							<div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
								<div
									className="h-full rounded-full"
									style={{
										width: `${fish.difficulty}%`,
										background: difficultyBarColor,
									}}
								/>
							</div>
							<span className={`text-sm font-bold ${difficultyColor}`} style={{ width: 28, textAlign: "right", flexShrink: 0 }}>
								{fish.difficulty}
							</span>
						</div>
					)}

					{/* Sell price */}
					<div>
						<div className="mb-2 text-sm font-bold text-gray-900">Sell Price</div>
						<PriceGrid
							price={fish.sellPrice}
							maxQuality={fish.maxQuality}
							variant="modal"
							professionBonus={professionBonus}
						/>
					</div>

					{/* Energy & Health */}
					{hasEnergy && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">Energy &amp; Health</div>
							<EnergyHealthGrid
								energy={fish.energyHealth!.energy ?? 0}
								health={fish.energyHealth!.health ?? 0}
								maxQuality={fish.maxQuality}
								variant="modal"
							/>
						</div>
					)}

					{/* Properties */}
					{(fish.roe !== null || fish.canSmoke) && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">Properties</div>
							<div className="flex flex-wrap gap-2">
								{fish.roe !== null && (
									<div
										className="flex items-center gap-2 rounded-xl px-3 py-2"
										style={NAVY_TILE}
									>
										<span className="text-xs font-semibold text-purple-300">
											Produces {fish.roe === "caviar" ? "Caviar" : "Roe"}
										</span>
									</div>
								)}
								{fish.canSmoke && (
									<div
										className="flex items-center gap-2 rounded-xl px-3 py-2"
										style={NAVY_TILE}
									>
										<span className="text-xs font-semibold text-gray-400">
											Smokeable
										</span>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Fish Pond */}
					{fish.fishPond && fish.fishPond.produce.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">Fish Pond</div>
							<div className="flex flex-col gap-2">
								{fish.fishPond.produce.map((p, i) => (
									<div
										key={i}
										className="flex items-center justify-between rounded-xl px-3 py-2"
										style={NAVY_TILE}
									>
										<span className="text-sm font-semibold text-white/85">{p.product}</span>
										<span className="text-[0.65rem] text-white/80">
											{p.minPopulation === 0
												? "Any population"
												: `Population ≥ ${p.minPopulation}`}
										</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</ModalBody>
		</Modal>
	);
}
