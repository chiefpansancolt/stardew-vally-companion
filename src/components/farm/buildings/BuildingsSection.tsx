"use client";

import {
	buildings,
	houseUpgrades,
	search as searchApi,
	type SearchResult,
} from "stardew-valley-data";
import { useState } from "react";
import type { BuildingProgress, FishPondInfo, CollectionProps as Props } from "@/types";
import { FilterPopover, FilterSelect } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { BuildingCard } from "./cards";
import { BuildingDetailModal } from "./modals/BuildingDetailModal";

const allBuildings = buildings().get();
const buildingMap = new Map(allBuildings.map((b) => [b.name, b]));
const houseUpgradeList = houseUpgrades().get();

const BUILDER_OPTIONS = [
	{ value: "all", label: "All Builders" },
	{ value: "Robin", label: "Robin" },
	{ value: "Wizard", label: "Wizard" },
];

function getFishInfo(fishType: number): { name: string; image: string | null } {
	const results = searchApi(String(fishType));
	const match = results.find((r: SearchResult) => r.id === String(fishType));
	return {
		name: match?.name ?? `Fish #${fishType}`,
		image: match?.image ?? null,
	};
}

function buildFishPondMap(fishPonds: Props["gameData"]["fishPonds"]): Map<string, FishPondInfo> {
	const map = new Map<string, FishPondInfo>();
	for (const fp of fishPonds) {
		const info = getFishInfo(fp.fishType);
		map.set(fp.buildingId, {
			name: info.name,
			image: info.image,
			currentOccupants: fp.currentOccupants,
			maxOccupants: fp.maxOccupants,
		});
	}
	return map;
}

export function BuildingsSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [builderFilter, setBuilderFilter] = useState("all");
	const [selectedBuilding, setSelectedBuilding] = useState<BuildingProgress | null>(null);

	const fishPondInfoMap = buildFishPondMap(gameData.fishPonds);

	const houseLevel = gameData.character.houseUpgradeLevel;
	const houseData =
		houseUpgradeList.find((h) => h.tier === houseLevel + 1) ?? houseUpgradeList[0];
	const farmhouseBuilding = {
		id: houseData.id,
		name: houseData.name,
		description: houseData.description,
		builder: "Robin" as const,
		buildCost: houseData.cost,
		buildDays: 3,
		materials: houseData.materials.map((m) => ({ ...m, id: "" })),
		upgradeFrom: houseData.prerequisite,
		magical: false,
		image: houseData.image,
	};

	const allPlayerBuildings = gameData.buildings.map((b) => {
		if (b.type === "Farmhouse") {
			return { ...b, type: houseData.name };
		}
		return b;
	});

	const filtered = allPlayerBuildings
		.filter((b) => {
			if (!search) return true;
			const q = search.toLowerCase();
			if (b.type.toLowerCase().includes(q)) return true;
			const fp = fishPondInfoMap.get(b.id);
			return fp ? fp.name.toLowerCase().includes(q) : false;
		})
		.filter((b) => {
			if (builderFilter === "all") return true;
			const data = getBuildingData(b);
			return data?.builder === builderFilter;
		});

	const activeFilterCount = [builderFilter !== "all"].filter(Boolean).length;

	const getAnimalsForBuilding = (buildingId: string) =>
		gameData.animals.filter((a) => a.buildingId === buildingId);

	function getBuildingData(b: BuildingProgress) {
		if (b.type === houseData.name) return farmhouseBuilding;
		return buildingMap.get(b.type);
	}

	const selectedData = selectedBuilding ? getBuildingData(selectedBuilding) : undefined;
	const selectedAnimals = selectedBuilding ? getAnimalsForBuilding(selectedBuilding.id) : [];
	const selectedFishPond = selectedBuilding
		? fishPondInfoMap.get(selectedBuilding.id)
		: undefined;

	return (
		<>
			<NavySection title="Buildings" badge={`${allPlayerBuildings.length} buildings`}>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField
						value={search}
						onChange={setSearch}
						placeholder="Search buildings…"
					/>
					<FilterPopover activeCount={activeFilterCount}>
						<div className="flex flex-col gap-3">
							<FilterSelect
								label="Builder"
								value={builderFilter}
								onChange={setBuilderFilter}
								options={BUILDER_OPTIONS}
							/>
						</div>
					</FilterPopover>
				</div>

				{filtered.length === 0 ? (
					<p className="py-8 text-center text-sm text-white/40">
						{allPlayerBuildings.length === 0
							? "No buildings yet."
							: "No buildings match your filters."}
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((b, i) => (
							<BuildingCard
								key={`${b.id}-${i}`}
								building={b}
								buildingData={getBuildingData(b)}
								animals={getAnimalsForBuilding(b.id)}
								fishPond={fishPondInfoMap.get(b.id)}
								onClick={() => setSelectedBuilding(b)}
							/>
						))}
					</div>
				)}
			</NavySection>

			<BuildingDetailModal
				building={selectedBuilding}
				buildingData={selectedData}
				animals={selectedAnimals}
				fishPond={selectedFishPond}
				onClose={() => setSelectedBuilding(null)}
			/>
		</>
	);
}
