"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { AnimalDetailModalProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { capitalize, formatNumber } from "@/lib/utils/formatting";
import { FRIENDSHIP_PER_HEART, MAX_FRIENDSHIP, MAX_HEARTS } from "@/data/constants/animals";
import { NAVY_TILE } from "@/data/constants/styles";

export function AnimalDetailModal({ animal, species, onClose }: Props) {
	if (!animal) return null;

	const hearts = Math.floor(animal.friendship / FRIENDSHIP_PER_HEART);
	const pct = Math.min((animal.friendship / MAX_FRIENDSHIP) * 100, 100);
	const isMaxed = animal.friendship >= MAX_FRIENDSHIP;
	const barColor = pct >= 80 ? "bg-green-400" : pct >= 40 ? "bg-accent" : "bg-red-400";

	return (
		<Modal show onClose={onClose} dismissible size="md">
			<ModalHeader>
				<div className="flex items-center gap-3">
					{species?.image && (
						<img
							src={assetPath(species.image)}
							alt={species.name}
							className="h-14 w-14 object-contain"
						/>
					)}
					<div>
						<div
							className="text-lg font-extrabold"
							style={{ fontFamily: "var(--font-stardew-valley)" }}
						>
							{animal.name}
						</div>
						<div className="flex items-center gap-2 text-sm text-gray-500">
							<span>{species?.name ?? animal.type}</span>
							{animal.hasAnimalCracker && (
								<span className="text-highlight flex items-center gap-1 text-xs">
									<img
										src="/images/misc/Golden Animal Cracker.png"
										alt="Animal Cracker"
										className="h-4 w-4 object-contain"
									/>
									Animal Cracker
								</span>
							)}
						</div>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-4">
					<h4 className="mb-1 text-sm font-semibold text-gray-700">Friendship</h4>
					<div className="rounded-lg p-3" style={NAVY_TILE}>
						<div className="flex items-center justify-between">
							<span
								className={`text-sm font-bold ${isMaxed ? "text-green-400" : "text-white/90"}`}
							>
								{animal.friendship} / {MAX_FRIENDSHIP}
							</span>
						</div>
						<div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
							<div
								className={`h-full rounded-full ${barColor}`}
								style={{ width: `${pct}%` }}
							/>
						</div>
						<div className="mt-2 flex gap-0.5">
							{Array.from({ length: MAX_HEARTS }, (_, i) =>
								i < hearts ? (
									<FaHeart key={i} className="h-4 w-4 text-red-400" />
								) : (
									<FaRegHeart key={i} className="h-4 w-4 text-white/30" />
								)
							)}
						</div>
					</div>

					<h4 className="mb-1 text-sm font-semibold text-gray-700">Stats</h4>
					<div className="rounded-lg p-3" style={NAVY_TILE}>
						<div className="grid grid-cols-2 gap-3">
							{[
								{ label: "Age", value: `${animal.age} days` },
								{ label: "Happiness", value: String(animal.happiness) },
								{ label: "Building", value: animal.buildingType },
								{
									label: "Days to Produce",
									value: String(species?.daysToProduce ?? "—"),
								},
								{
									label: "Purchase Price",
									value: species?.purchasePrice
										? `${formatNumber(species.purchasePrice)}g`
										: "—",
								},
								{
									label: "Harvest Method",
									value: species?.harvestMethod
										? capitalize(species.harvestMethod)
										: "—",
								},
							].map((stat) => (
								<div key={stat.label}>
									<div className="text-[0.6rem] font-semibold tracking-wide text-white/40 uppercase">
										{stat.label}
									</div>
									<div className="mt-1 text-sm font-bold text-white/90">
										{stat.value}
									</div>
								</div>
							))}
						</div>
					</div>

					{species?.produce && (
						<>
							<h4 className="mb-1 text-sm font-semibold text-gray-700">Produce</h4>
							<div className="rounded-lg p-3" style={NAVY_TILE}>
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-2">
										<img
											src={assetPath(species.produce.image)}
											alt={species.produce.name}
											className="h-8 w-8 object-contain"
										/>
										<div className="flex-1">
											<div className="text-xs font-semibold text-white/85">
												{species.produce.name}
											</div>
											<div className="text-[0.6rem] text-white/80">
												Base produce
											</div>
										</div>
										<div className="text-highlight text-xs font-bold">
											{species.produce.sellPrice}g
										</div>
									</div>
									{species.deluxeProduce && (
										<div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-2">
											<img
												src={assetPath(species.deluxeProduce.image)}
												alt={species.deluxeProduce.name}
												className="h-8 w-8 object-contain"
											/>
											<div className="flex-1">
												<div className="text-xs font-semibold text-white/85">
													{species.deluxeProduce.name}
												</div>
												<div className="text-[0.6rem] text-white/80">
													Deluxe produce
												</div>
											</div>
											<div className="text-highlight text-xs font-bold">
												{species.deluxeProduce.sellPrice}g
											</div>
										</div>
									)}
								</div>
							</div>
						</>
					)}
				</div>
			</ModalBody>
		</Modal>
	);
}
