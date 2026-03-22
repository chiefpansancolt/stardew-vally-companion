"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { animals, buildings, type FarmAnimal, isFarmAnimal, search } from "stardew-valley-data";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { BuildingDetailModalProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { formatNumber } from "@/lib/utils/formatting";
import { FRIENDSHIP_PER_HEART, MAX_HEARTS } from "@/data/constants/animals";
import { NAVY_TILE } from "@/data/constants/styles";

const materialImageMap = new Map<string, string>();
for (const b of buildings().get()) {
	for (const m of b.materials) {
		if (!materialImageMap.has(m.item)) {
			const match = search(m.item).find((r) => r.name === m.item);
			if (match?.image) materialImageMap.set(m.item, match.image);
		}
	}
}

const speciesMap = new Map(
	(animals().farmAnimals().get().filter(isFarmAnimal) as FarmAnimal[]).map((s) => [s.name, s])
);

export function BuildingDetailModal({
	building,
	buildingData,
	animals: housed,
	fishPond,
	onClose,
}: Props) {
	if (!building || !buildingData) return null;

	return (
		<Modal show onClose={onClose} dismissible size="2xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={assetPath(buildingData.image)}
						alt={buildingData.name}
						className="h-14 w-14 object-contain"
					/>
					<div>
						<div className="text-lg font-extrabold">{buildingData.name}</div>
						<div className="text-sm text-gray-500">{buildingData.description}</div>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-4">
					<h4 className="mb-1 text-sm font-semibold text-gray-700">Build Info</h4>
					<div className="rounded-lg p-3" style={NAVY_TILE}>
						<div className="grid grid-cols-2 gap-3">
							{[
								{ label: "Builder", value: buildingData.builder },
								{
									label: "Cost",
									value: `${formatNumber(buildingData.buildCost)}g`,
								},
								{ label: "Build Days", value: `${buildingData.buildDays} days` },
								{
									label: "Upgrades From",
									value: buildingData.upgradeFrom
										? buildingData.upgradeFrom
												.replace(/-/g, " ")
												.replace(/\b\w/g, (c) => c.toUpperCase())
										: "—",
								},
								...("animalCapacity" in buildingData && buildingData.animalCapacity
									? [
											{
												label: "Max Occupants",
												value: String(buildingData.animalCapacity),
											},
										]
									: []),
							].map((stat) => (
								<div key={stat.label}>
									<div className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
										{stat.label}
									</div>
									<div className="mt-1 text-sm font-bold text-white/90">
										{stat.value}
									</div>
								</div>
							))}
						</div>
					</div>

					<h4 className="mb-1 text-sm font-semibold text-gray-700">Materials</h4>
					<div className="rounded-lg p-3" style={NAVY_TILE}>
						<div className="grid grid-cols-2 gap-1.5">
							{buildingData.materials.map((m) => {
								const matImage = materialImageMap.get(m.item);
								return (
									<div
										key={m.item}
										className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5"
									>
										{matImage && (
											<img
												src={assetPath(matImage)}
												alt={m.item}
												className="h-6 w-6 shrink-0 object-contain"
											/>
										)}
										<span className="flex-1 text-xs font-semibold text-white/85">
											{m.item}
										</span>
										<span className="text-highlight text-xs font-bold">
											&times;{formatNumber(m.quantity)}
										</span>
									</div>
								);
							})}
						</div>
					</div>

					{housed.length > 0 && (
						<>
							<h4 className="mb-1 text-sm font-semibold text-gray-700">
								Animals ({housed.length})
							</h4>
							<div className="rounded-lg p-3" style={NAVY_TILE}>
								<div className="grid grid-cols-2 gap-1.5">
									{housed.map((a, i) => {
										const species = speciesMap.get(a.type);
										const hearts = Math.floor(
											a.friendship / FRIENDSHIP_PER_HEART
										);
										return (
											<div
												key={`${a.name}-${i}`}
												className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
											>
												{species?.image && (
													<img
														src={assetPath(species.image)}
														alt={a.type}
														className="h-8 w-8 object-contain"
													/>
												)}
												<div className="flex-1">
													<div className="text-xs font-semibold text-white/85">
														{a.name}
													</div>
													<div className="text-[0.6rem] text-white/80">
														{species?.name ?? a.type}
													</div>
												</div>
												<div className="flex gap-px">
													{Array.from({ length: MAX_HEARTS }, (_, j) =>
														j < hearts ? (
															<FaHeart
																key={j}
																className="h-2.5 w-2.5 text-red-400"
															/>
														) : (
															<FaRegHeart
																key={j}
																className="h-2.5 w-2.5 text-white/15"
															/>
														)
													)}
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</>
					)}

					{fishPond && (
						<>
							<h4 className="mb-1 text-sm font-semibold text-gray-700">Fish Pond</h4>
							<div className="rounded-lg p-3" style={NAVY_TILE}>
								<div className="flex items-center gap-3">
									{fishPond.image && (
										<img
											src={assetPath(fishPond.image)}
											alt={fishPond.name}
											className="h-10 w-10 object-contain"
										/>
									)}
									<div className="flex-1">
										<div className="text-sm font-semibold text-white/85">
											{fishPond.name}
										</div>
										<div className="text-[0.65rem] text-white/80">
											{fishPond.currentOccupants} / {fishPond.maxOccupants}{" "}
											fish
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</ModalBody>
		</Modal>
	);
}
