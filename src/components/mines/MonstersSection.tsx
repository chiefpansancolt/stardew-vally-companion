"use client";

import { type Monster, monsters } from "stardew-valley-data";
import { useMemo, useState } from "react";
import type { MonsterTypeFilter, CollectionProps as Props } from "@/types";
import { getMonsterKillCount } from "@/lib/pages/mines";
import { MONSTER_TYPE_FILTERS } from "@/data/constants/filters";
import { MONSTER_LOCATIONS } from "@/data/constants/monsters";
import { FilterGroup, FilterPopover, FilterRadio, FilterSelect } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { MonsterCard } from "./cards";
import { MonsterDetailModal } from "./modals/MonsterDetailModal";

const allMonsters = monsters()
	.get()
	.sort((a, b) => a.name.localeCompare(b.name));

export function MonstersSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [locationFilter, setLocationFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState<MonsterTypeFilter>("all");
	const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);

	const totalSlain = Object.values(gameData.monsters).reduce((sum, c) => sum + c, 0);

	const filtered = useMemo(() => {
		return allMonsters
			.filter((m) => !search || m.name.toLowerCase().includes(search.toLowerCase()))
			.filter((m) => {
				if (locationFilter === "all") return true;
				return m.locations.includes(locationFilter);
			})
			.filter((m) => {
				if (typeFilter === "standard") return !m.dangerous;
				if (typeFilter === "dangerous") return m.dangerous;
				return true;
			});
	}, [search, locationFilter, typeFilter]);

	const activeFilterCount = [locationFilter !== "all", typeFilter !== "all"].filter(
		Boolean
	).length;

	const selectedKillCount = selectedMonster
		? getMonsterKillCount(selectedMonster, gameData.monsters)
		: 0;

	return (
		<>
			<NavySection title="Monsters" badge={`${totalSlain.toLocaleString()} slain`}>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField
						value={search}
						onChange={setSearch}
						placeholder="Search monsters…"
					/>
					<FilterPopover activeCount={activeFilterCount}>
						<div className="flex flex-col gap-3">
							<FilterSelect
								label="Location"
								value={locationFilter}
								onChange={setLocationFilter}
								options={[
									{ value: "all", label: "All Locations" },
									...MONSTER_LOCATIONS.map((loc) => ({ value: loc, label: loc })),
								]}
							/>
							<FilterGroup label="Type">
								{MONSTER_TYPE_FILTERS.map(({ id, label }) => (
									<FilterRadio
										key={id}
										name="monster-type"
										value={id}
										checked={typeFilter === id}
										onChange={() => setTypeFilter(id)}
									>
										{label}
									</FilterRadio>
								))}
							</FilterGroup>
						</div>
					</FilterPopover>
				</div>

				{filtered.length === 0 ? (
					<p className="py-8 text-center text-sm text-white/40">
						No monsters match your filters.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((m) => (
							<MonsterCard
								key={m.id}
								monster={m}
								killCount={getMonsterKillCount(m, gameData.monsters)}
								onClick={() => setSelectedMonster(m)}
							/>
						))}
					</div>
				)}
			</NavySection>

			<MonsterDetailModal
				monster={selectedMonster}
				killCount={selectedKillCount}
				onClose={() => setSelectedMonster(null)}
			/>
		</>
	);
}
