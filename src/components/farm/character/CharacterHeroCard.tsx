"use client";

import { Modal, ModalBody } from "flowbite-react";
import { maps } from "stardew-valley-data";
import { useState } from "react";
import { HiHome } from "react-icons/hi";
import { type CharacterProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { formatTimePlayed } from "@/lib/utils/formatting";
import { SEASONS } from "@/data/constants/seasons";
import { StatTile } from "@/comps/ui/StatTile";

export function CharacterHeroCard({ gameData }: Props) {
	const [mapOpen, setMapOpen] = useState(false);
	const { character } = gameData;
	const mapData = maps().find(String(character.farmType));
	const farmIcon = mapData ? assetPath(mapData.icon) : null;
	const farmImage = mapData ? assetPath(mapData.image) : null;
	const { season, day, year } = character.currentDate;
	const seasonMeta = SEASONS[season];
	const seasonLabel = seasonMeta?.label ?? season;

	return (
		<>
			<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
				<div className="flex flex-wrap gap-5">
					<div className="shrink-0">
						{farmIcon ? (
							<button
								onClick={() => setMapOpen(true)}
								className="group relative block cursor-pointer"
								title="View farm map"
							>
								<img
									src={farmIcon}
									alt={mapData?.name ?? "Farm"}
									className="h-20 w-20 rounded-xl object-contain transition-opacity group-hover:opacity-70"
								/>
								<div className="absolute inset-0 flex items-end justify-center rounded-xl pb-1 opacity-0 transition-opacity group-hover:opacity-100">
									<span className="rounded bg-black/60 px-1.5 py-0.5 text-[0.6rem] font-semibold text-white">
										View Map
									</span>
								</div>
							</button>
						) : (
							<div className="bg-primary flex h-20 w-20 items-center justify-center rounded-xl border-2 border-[#c5b898]">
								<HiHome className="h-8 w-8 text-white" />
							</div>
						)}
					</div>

					<div className="min-w-40 flex-1">
						<div className="text-[1.75rem] leading-none font-extrabold text-gray-900">
							{character.name || "Unknown Farmer"}
						</div>
						<div className="text-secondary mt-1 text-base font-semibold">
							{character.farmName ? `${character.farmName} Farm` : "Unknown Farm"}
						</div>
						<div
							className="mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.8125rem] font-semibold"
							style={{ background: "#d9c97c", color: "#6b4c1a" }}
						>
							{seasonMeta && (
								<img
									src={assetPath(seasonMeta.image)}
									alt={seasonLabel}
									className="inline h-4 w-4"
								/>
							)}{" "}
							{seasonLabel} {day}, Year {year}
						</div>
					</div>

					<div className="grid min-w-65 flex-2 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
						<StatTile label="Gender" value={character.gender || "—"} />
						<StatTile label="Favorite Thing" value={character.favoriteThing || "—"} />
						<StatTile
							label="House Level"
							value={`${character.houseUpgradeLevel} / 3`}
						/>
						<StatTile label="Version" value={character.gameVersion || "—"} />
						<StatTile label="Money" value={`${character.money.toLocaleString()}g`} />
						<StatTile
							label="Total Earned"
							value={`${character.totalMoneyEarned.toLocaleString()}g`}
						/>
						<StatTile label="Max Health" value={character.maxHealth.toString()} />
						<StatTile label="Max Energy" value={character.maxEnergy.toString()} />
						<StatTile label="Luck" value={character.luckLevel.toFixed(2)} />
						<StatTile label="Total Days" value={character.totalDaysPlayed.toString()} />
						<StatTile
							label="Time Played"
							value={formatTimePlayed(character.millisecondsPlayed)}
						/>
						<StatTile label="Spouse" value={character.spouse || "—"} />
					</div>
				</div>
			</div>

			{farmImage && (
				<Modal show={mapOpen} onClose={() => setMapOpen(false)} dismissible size="4xl">
					<ModalBody className="p-2">
						<img
							src={farmImage}
							alt={mapData?.name ?? "Farm Map"}
							className="w-full rounded-lg object-contain"
						/>
					</ModalBody>
				</Modal>
			)}
		</>
	);
}
