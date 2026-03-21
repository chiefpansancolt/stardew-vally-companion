"use client";

import { cooking, type CookedDish } from "stardew-valley-data";
import { useMemo, useState } from "react";
import type { CollectionProps as Props, CookingStatusFilter, CookingSourceFilter } from "@/types";
import { COOKING_STATUS_FILTERS, COOKING_SOURCE_FILTERS } from "@/data/constants/filters";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { FilterPopover, FilterGroup, FilterRadio } from "@/comps/ui/filter-popover";
import { CookingCard } from "./cards";
import { CookingDetailModal } from "./modals/CookingDetailModal";

const allDishes = cooking().sortByName().get();

export function CookingSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<CookingStatusFilter>("all");
	const [sourceFilter, setSourceFilter] = useState<CookingSourceFilter>("all");
	const [selectedDish, setSelectedDish] = useState<CookedDish | null>(null);

	const cookedCount = allDishes.filter(
		(d) => gameData.cookingRecipes[d.name]?.cooked === true,
	).length;

	const filtered = useMemo(() => {
		return allDishes
			.filter((d) => !search || d.name.toLowerCase().includes(search.toLowerCase()))
			.filter((d) => {
				const progress = gameData.cookingRecipes[d.name];
				const learned = progress?.learned === true;
				const cooked = progress?.cooked === true;
				if (statusFilter === "cooked") return cooked;
				if (statusFilter === "learned") return learned && !cooked;
				if (statusFilter === "not-learned") return !learned;
				return true;
			})
			.filter((d) => {
				if (sourceFilter === "all") return true;
				return d.recipeSources.some((s) => s.type === sourceFilter);
			});
	}, [search, statusFilter, sourceFilter, gameData.cookingRecipes]);

	const activeFilterCount = [statusFilter !== "all", sourceFilter !== "all"].filter(Boolean).length;

	const selectedLearned = selectedDish
		? gameData.cookingRecipes[selectedDish.name]?.learned === true
		: false;
	const selectedCooked = selectedDish
		? gameData.cookingRecipes[selectedDish.name]?.cooked === true
		: false;

	return (
		<>
			<NavySection
				title="Cooking Recipes"
				badge={`${cookedCount} / ${allDishes.length} cooked`}
			>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField value={search} onChange={setSearch} placeholder="Search recipes…" />
					<FilterPopover activeCount={activeFilterCount}>
						<div className="flex flex-col gap-3">
							<FilterGroup label="Status">
								{COOKING_STATUS_FILTERS.map(({ id, label }) => (
									<FilterRadio
										key={id}
										name="cooking-status"
										value={id}
										checked={statusFilter === id}
										onChange={() => setStatusFilter(id)}
									>
										{label}
									</FilterRadio>
								))}
							</FilterGroup>
							<FilterGroup label="Source">
								{COOKING_SOURCE_FILTERS.map(({ id, label }) => (
									<FilterRadio
										key={id}
										name="cooking-source"
										value={id}
										checked={sourceFilter === id}
										onChange={() => setSourceFilter(id)}
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
						No recipes match your filters.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((dish) => {
							const progress = gameData.cookingRecipes[dish.name];
							return (
								<CookingCard
									key={dish.id}
									dish={dish}
									learned={progress?.learned === true}
									cooked={progress?.cooked === true}
									onClick={() => setSelectedDish(dish)}
								/>
							);
						})}
					</div>
				)}
			</NavySection>

			<CookingDetailModal
				dish={selectedDish}
				learned={selectedLearned}
				cooked={selectedCooked}
				onClose={() => setSelectedDish(null)}
			/>
		</>
	);
}
