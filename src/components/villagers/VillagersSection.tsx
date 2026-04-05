"use client";

import { type Villager, villagers } from "stardew-valley-data";
import { useState } from "react";
import type { MarriageFilter, VillagersProps as Props, SeasonFilter } from "@/types";
import { effectiveMaxHearts } from "@/lib/utils/villagerHearts";
import { MARRIAGE_FILTERS, SEASON_FILTERS } from "@/data/constants/filters";
import { FilterGroup, FilterPopover, FilterRadio } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { VillagerCard } from "./cards";
import { VillagerDetailModal } from "./modals/VillagerDetailModal";

export function VillagersSection({ gameData }: Props) {
	const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>("all");
	const [typeFilter, setMarriageFilter] = useState<MarriageFilter>("all");
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState<Villager | null>(null);

	const allVillagers = villagers().sortByName().get();
	const q = search.toLowerCase().trim();
	const displayed = allVillagers.filter((v) => {
		if (q && !v.name.toLowerCase().includes(q)) return false;
		if (seasonFilter !== "all" && v.birthday.season !== seasonFilter) return false;
		if (typeFilter === "marriageable" && !v.marriageable) return false;
		if (typeFilter === "non-marriageable" && v.marriageable) return false;
		return true;
	});

	const maxHeartsCount = allVillagers.filter((v) => {
		const p = gameData.villagers[v.name];
		if (!p) return false;
		const married = gameData.character.spouse === v.name;
		return p.hearts >= effectiveMaxHearts(v, married, p.status.toLowerCase());
	}).length;

	return (
		<>
			<NavySection
				title="Villagers"
				badge={`${maxHeartsCount} / ${allVillagers.length} max hearts`}
			>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField
						value={search}
						onChange={setSearch}
						placeholder="Search villagers…"
					/>
					<FilterPopover
						activeCount={
							[seasonFilter !== "all", typeFilter !== "all"].filter(Boolean).length
						}
					>
						<FilterGroup label="Birthday Season">
							{SEASON_FILTERS.map(({ id, label }) => (
								<FilterRadio
									key={id}
									name="villager-season"
									value={id}
									checked={seasonFilter === id}
									onChange={() => setSeasonFilter(id)}
								>
									{label}
								</FilterRadio>
							))}
						</FilterGroup>
						<FilterGroup label="Marriage Candidates" className="mt-4">
							{MARRIAGE_FILTERS.map(({ id, label }) => (
								<FilterRadio
									key={id}
									name="villager-type"
									value={id}
									checked={typeFilter === id}
									onChange={() => setMarriageFilter(id)}
								>
									{label}
								</FilterRadio>
							))}
						</FilterGroup>
					</FilterPopover>
				</div>

				<div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
					{displayed.map((villager) => (
						<VillagerCard
							key={villager.id}
							villager={villager}
							gameData={gameData}
							onClick={() => setSelected(villager)}
						/>
					))}
				</div>
			</NavySection>

			{selected && (
				<VillagerDetailModal
					villager={selected}
					progress={gameData.villagers[selected.name]}
					spouse={gameData.character.spouse}
					onClose={() => setSelected(null)}
				/>
			)}
		</>
	);
}
