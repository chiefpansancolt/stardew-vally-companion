"use client";

import { animals, type FarmAnimal, isFarmAnimal } from "stardew-valley-data";
import { useMemo, useState } from "react";
import type { FarmAnimalProgress, CollectionProps as Props } from "@/types";
import { ANIMAL_SORT_OPTIONS, BUILDING_FILTER_OPTIONS } from "@/data/constants/animals";
import { FilterPopover, FilterSelect } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { AnimalCard } from "./cards";
import { AnimalDetailModal } from "./modals/AnimalDetailModal";

const allSpecies = animals().farmAnimals().get().filter(isFarmAnimal) as FarmAnimal[];
const speciesMap = new Map(allSpecies.map((s) => [s.name, s]));
const animalTypeOptions = [
	{ value: "all", label: "All Types" },
	...allSpecies.map((s) => ({ value: s.name, label: s.name })),
];

export function FarmAnimalsSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [typeFilter, setTypeFilter] = useState("all");
	const [buildingFilter, setBuildingFilter] = useState("all");
	const [sort, setSort] = useState("name");
	const [selectedAnimal, setSelectedAnimal] = useState<FarmAnimalProgress | null>(null);

	const filtered = useMemo(() => {
		return gameData.animals
			.filter((a) => {
				if (!search) return true;
				const q = search.toLowerCase();
				const species = speciesMap.get(a.type);
				return (
					a.name.toLowerCase().includes(q) ||
					(species?.name.toLowerCase().includes(q) ?? false)
				);
			})
			.filter((a) => typeFilter === "all" || a.type === typeFilter)
			.filter((a) => {
				if (buildingFilter === "all") return true;
				return a.buildingType.toLowerCase().includes(buildingFilter);
			})
			.sort((a, b) => {
				if (sort === "friendship") return b.friendship - a.friendship;
				if (sort === "age") return b.age - a.age;
				return a.name.localeCompare(b.name);
			});
	}, [gameData.animals, search, typeFilter, buildingFilter, sort]);

	const activeFilterCount = [typeFilter !== "all", buildingFilter !== "all"].filter(
		Boolean
	).length;

	const selectedSpecies = selectedAnimal ? speciesMap.get(selectedAnimal.type) : undefined;

	return (
		<>
			<NavySection title="Farm Animals" badge={`${gameData.animals.length} animals`}>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField
						value={search}
						onChange={setSearch}
						placeholder="Search animals…"
					/>
					<FilterPopover activeCount={activeFilterCount}>
						<div className="flex flex-col gap-3">
							<FilterSelect
								label="Type"
								value={typeFilter}
								onChange={setTypeFilter}
								options={animalTypeOptions}
							/>
							<FilterSelect
								label="Building"
								value={buildingFilter}
								onChange={setBuildingFilter}
								options={BUILDING_FILTER_OPTIONS}
							/>
							<FilterSelect
								label="Sort"
								value={sort}
								onChange={setSort}
								options={ANIMAL_SORT_OPTIONS}
							/>
						</div>
					</FilterPopover>
				</div>

				{filtered.length === 0 ? (
					<p className="py-8 text-center text-sm text-white/80">
						{gameData.animals.length === 0
							? "No farm animals yet."
							: "No animals match your filters."}
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((a, i) => (
							<AnimalCard
								key={`${a.id}-${a.name}-${i}`}
								animal={a}
								species={speciesMap.get(a.type)}
								onClick={() => setSelectedAnimal(a)}
							/>
						))}
					</div>
				)}
			</NavySection>

			<AnimalDetailModal
				animal={selectedAnimal}
				species={selectedSpecies}
				onClose={() => setSelectedAnimal(null)}
			/>
		</>
	);
}
