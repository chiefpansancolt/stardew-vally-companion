"use client";

import { animals, isFarmAnimal } from "stardew-valley-data";
import { useState } from "react";
import { type ProduceEntry, CollectionProps as Props, type ShippedFilter as BaseShippedFilter } from "@/types";
import { applyBestProfessionBonus, getActiveProfessionBonuses } from "@/lib/utils/professionPrices";
import { SHIPPED_FILTERS } from "@/data/constants/filters";

type ShippedFilter = BaseShippedFilter | "not-applicable";

const FILTERS = [...SHIPPED_FILTERS, { id: "not-applicable" as const, label: "Other" }];
import { FilterGroup, FilterPopover, FilterRadio } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { ProfessionsButton } from "@/comps/ui/ProfessionsButton";
import { SearchField } from "@/comps/ui/SearchField";
import { ProduceCard } from "./cards";

export function AnimalProductsSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState<ShippedFilter>("all");
	const [showProfessionPrices, setShowProfessionPrices] = useState(false);

	const activeProfessionBonuses = getActiveProfessionBonuses(gameData);
	const hasProfessions = activeProfessionBonuses.has("rancher");

	const allAnimals = animals().farmAnimals().get().filter(isFarmAnimal);

	const EXCLUDED_FROM_SHIPPING = new Set(["928", "107"]); // Golden Egg, Dinosaur Egg

	const allEntries: ProduceEntry[] = allAnimals.flatMap((a) => [
		{ produce: a.produce, animalName: a.name, building: a.building, isDeluxe: false },
		...(a.deluxeProduce
			? [
					{
						produce: a.deluxeProduce,
						animalName: a.name,
						building: a.building,
						isDeluxe: true,
					},
				]
			: []),
	]);

	const shippableEntries = allEntries.filter((e) => !EXCLUDED_FROM_SHIPPING.has(e.produce.id));
	const shippedCount = shippableEntries.filter(
		(e) => gameData.shipped[e.produce.id]?.shipped === true
	).length;

	const filtered = allEntries
		.filter((e) => {
			if (!search) return true;
			const q = search.toLowerCase();
			return (
				e.produce.name.toLowerCase().includes(q) || e.animalName.toLowerCase().includes(q)
			);
		})
		.filter((e) => {
			const shippable = !EXCLUDED_FROM_SHIPPING.has(e.produce.id);
			if (filter === "all") return true;
			if (filter === "not-applicable") return !shippable;
			if (!shippable) return false;
			const shipped = gameData.shipped[e.produce.id]?.shipped === true;
			if (filter === "shipped") return shipped;
			if (filter === "not-shipped") return !shipped;
			return true;
		});

	return (
		<NavySection
			title="Animal Products"
			badge={`${shippedCount} / ${shippableEntries.length} shipped`}
		>
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<SearchField
					value={search}
					onChange={setSearch}
					placeholder="Search produce or animal…"
				/>
				<FilterPopover activeCount={filter !== "all" ? 1 : 0}>
					<FilterGroup label="Shipped Status">
						{FILTERS.map(({ id, label }) => (
							<FilterRadio
								key={id}
								name="animal-products-filter"
								value={id}
								checked={filter === id}
								onChange={() => setFilter(id)}
							>
								{label}
							</FilterRadio>
						))}
					</FilterGroup>
				</FilterPopover>
				{hasProfessions && (
					<ProfessionsButton
						active={showProfessionPrices}
						onClick={() => setShowProfessionPrices(!showProfessionPrices)}
					/>
				)}
			</div>

			{filtered.length === 0 ? (
				<p className="py-8 text-center text-sm text-white/40">
					No produce items match your search.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{filtered.map((entry) => (
						<ProduceCard
							key={`${entry.animalName}-${entry.produce.id}-${entry.isDeluxe}`}
							entry={entry}
							shipped={gameData.shipped[entry.produce.id]?.shipped === true}
							shippable={!EXCLUDED_FROM_SHIPPING.has(entry.produce.id)}
							professionBonus={
								showProfessionPrices
									? applyBestProfessionBonus(
											entry.produce.sellPrice,
											entry.produce.profession,
											activeProfessionBonuses
										)
									: null
							}
						/>
					))}
				</div>
			)}
		</NavySection>
	);
}
