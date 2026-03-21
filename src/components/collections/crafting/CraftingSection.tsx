"use client";

import { crafting, type CraftingRecipe } from "stardew-valley-data";
import { useState } from "react";
import type { CraftingStatusFilter, CollectionProps as Props } from "@/types";
import { CRAFTING_CATEGORIES } from "@/data/constants/crafting";
import { CRAFTING_STATUS_FILTERS } from "@/data/constants/filters";
import { FilterGroup, FilterPopover, FilterRadio } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { CraftingCard } from "./cards";
import { CraftingDetailModal } from "./modals/CraftingDetailModal";

const allRecipes = crafting().sortByName().get();

const recipesByCategory: Record<string, CraftingRecipe[]> = {};
for (const cat of CRAFTING_CATEGORIES) {
	recipesByCategory[cat] = allRecipes.filter((r) => r.category === cat);
}

export function CraftingSection({ gameData }: Props) {
	const [selectedRecipe, setSelectedRecipe] = useState<CraftingRecipe | null>(null);

	const selectedLearned = selectedRecipe
		? gameData.craftingRecipes[selectedRecipe.name]?.learned === true
		: false;
	const selectedCrafted = selectedRecipe
		? gameData.craftingRecipes[selectedRecipe.name]?.crafted === true
		: false;

	return (
		<>
			{CRAFTING_CATEGORIES.map((category) => (
				<CategorySection
					key={category}
					category={category}
					recipes={recipesByCategory[category]}
					gameData={gameData}
					onSelectRecipe={setSelectedRecipe}
				/>
			))}

			<CraftingDetailModal
				recipe={selectedRecipe}
				learned={selectedLearned}
				crafted={selectedCrafted}
				onClose={() => setSelectedRecipe(null)}
			/>
		</>
	);
}

function CategorySection({
	category,
	recipes,
	gameData,
	onSelectRecipe,
}: {
	category: string;
	recipes: CraftingRecipe[];
	gameData: Props["gameData"];
	onSelectRecipe: (recipe: CraftingRecipe) => void;
}) {
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<CraftingStatusFilter>("all");

	const craftedCount = recipes.filter(
		(r) => gameData.craftingRecipes[r.name]?.crafted === true
	).length;

	const filtered = recipes.filter((r) => {
		if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false;
		const progress = gameData.craftingRecipes[r.name];
		const learned = progress?.learned === true;
		const crafted = progress?.crafted === true;
		if (statusFilter === "crafted") return crafted;
		if (statusFilter === "learned") return learned && !crafted;
		if (statusFilter === "not-learned") return !learned;
		return true;
	});

	const activeFilterCount = statusFilter !== "all" ? 1 : 0;

	return (
		<NavySection title={category} badge={`${craftedCount} / ${recipes.length} crafted`}>
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<SearchField value={search} onChange={setSearch} placeholder="Search recipes…" />
				<FilterPopover activeCount={activeFilterCount}>
					<FilterGroup label="Status">
						{CRAFTING_STATUS_FILTERS.map(({ id, label }) => (
							<FilterRadio
								key={id}
								name={`crafting-${category}-status`}
								value={id}
								checked={statusFilter === id}
								onChange={() => setStatusFilter(id)}
							>
								{label}
							</FilterRadio>
						))}
					</FilterGroup>
				</FilterPopover>
			</div>

			{filtered.length === 0 ? (
				<p className="py-8 text-center text-sm text-white/40">
					No recipes match your filters.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{filtered.map((recipe) => {
						const progress = gameData.craftingRecipes[recipe.name];
						return (
							<CraftingCard
								key={recipe.id}
								recipe={recipe}
								learned={progress?.learned === true}
								crafted={progress?.crafted === true}
								onClick={() => onSelectRecipe(recipe)}
							/>
						);
					})}
				</div>
			)}
		</NavySection>
	);
}
