"use client";

import { fish, type Fish, type Season } from "stardew-valley-data";
import { useMemo, useState } from "react";
import {
	type SeasonFilter as BaseSeasonFilter,
	type CatchTypeFilter,
	type CaughtFilter,
	type DifficultyFilter,
	CollectionProps as Props,
	type WeatherFilter,
} from "@/types";
import { applyBestProfessionBonus, getActiveProfessionBonuses } from "@/lib/utils/professionPrices";
import { FilterCheckbox, FilterGroup, FilterPopover, FilterRadio, FilterSelect } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { ProfessionsButton } from "@/comps/ui/ProfessionsButton";
import { SearchField } from "@/comps/ui/SearchField";
import { FISH_CATEGORY_FILTERS } from "@/data/constants/filters";
import { FishCard } from "./cards";
import { FishDetailModal } from "./modals/FishDetailModal";

type SeasonFilter = BaseSeasonFilter | "ginger island";

const allFish = fish().get();

const uniqueLocations = Array.from(new Set(allFish.map((f) => f.location))).sort();

export function FishSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [caughtFilter, setCaughtFilter] = useState<CaughtFilter>("all");
	const [catchTypeFilter, setCatchTypeFilter] = useState<CatchTypeFilter>("all");
	const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>("all");
	const [weatherFilter, setWeatherFilter] = useState<WeatherFilter>("all");
	const [locationFilter, setLocationFilter] = useState("all");
	const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");
	const [categoryFilter, setCategoryFilter] = useState<Set<string>>(new Set());
	const [showProfessionPrices, setShowProfessionPrices] = useState(false);
	const [selectedFish, setSelectedFish] = useState<Fish | null>(null);

	function toggleCategory(id: string) {
		setCategoryFilter((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	}

	const activeProfessionBonuses = getActiveProfessionBonuses(gameData);
	const hasFishingProfession =
		activeProfessionBonuses.has("fisher") || activeProfessionBonuses.has("angler");

	const activeFilterCount = [
		caughtFilter !== "all",
		catchTypeFilter !== "all",
		seasonFilter !== "all",
		weatherFilter !== "all",
		locationFilter !== "all",
		difficultyFilter !== "all",
		categoryFilter.size > 0,
	].filter(Boolean).length;

	const filtered = useMemo(() => {
		return allFish
			.filter((f) => !search || f.name.toLowerCase().includes(search.toLowerCase()))
			.filter((f) => {
				const caught = gameData.fishCaught.some((c) => c.id === f.id);
				if (caughtFilter === "caught") return caught;
				if (caughtFilter === "not-caught") return !caught;
				return true;
			})
			.filter((f) => catchTypeFilter === "all" || f.catchType === catchTypeFilter)
			.filter((f) => seasonFilter === "all" || f.seasons.includes(seasonFilter as Season))
			.filter((f) => {
				if (weatherFilter === "all") return true;
				return f.weather === weatherFilter;
			})
			.filter((f) => locationFilter === "all" || f.location === locationFilter)
			.filter((f) => {
				if (difficultyFilter === "all") return true;
				if (f.difficulty == null) return false;
				if (difficultyFilter === "easy") return f.difficulty <= 33;
				if (difficultyFilter === "medium") return f.difficulty >= 34 && f.difficulty <= 66;
				if (difficultyFilter === "hard") return f.difficulty >= 67;
				return true;
			})
			.filter((f) => categoryFilter.size === 0 || categoryFilter.has(f.category));
	}, [
		search,
		caughtFilter,
		catchTypeFilter,
		seasonFilter,
		weatherFilter,
		locationFilter,
		difficultyFilter,
		categoryFilter,
		gameData.fishCaught,
	]);

	const caughtCount = allFish.filter((f) =>
		gameData.fishCaught.some((c) => c.id === f.id)
	).length;

	const selectedFishCaught = selectedFish
		? gameData.fishCaught.some((c) => c.id === selectedFish.id)
		: false;

	return (
		<>
			<NavySection title="Fish" badge={`${caughtCount} / ${allFish.length} caught`}>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField value={search} onChange={setSearch} placeholder="Search fish…" />
					<FilterPopover activeCount={activeFilterCount}>
						<div className="flex flex-col gap-3">
							<FilterGroup label="Caught">
								{(["all", "caught", "not-caught"] as CaughtFilter[]).map((v) => (
									<FilterRadio
										key={v}
										name="fish-caught"
										value={v}
										checked={caughtFilter === v}
										onChange={() => setCaughtFilter(v)}
									>
										{v === "all"
											? "All"
											: v === "caught"
												? "Caught"
												: "Not Caught"}
									</FilterRadio>
								))}
							</FilterGroup>
							<FilterGroup label="Catch Type">
								{(["all", "rod", "crab-pot"] as CatchTypeFilter[]).map((v) => (
									<FilterRadio
										key={v}
										name="fish-catchtype"
										value={v}
										checked={catchTypeFilter === v}
										onChange={() => setCatchTypeFilter(v)}
									>
										{v === "all" ? "All" : v === "rod" ? "Rod" : "Crab-Pot"}
									</FilterRadio>
								))}
							</FilterGroup>
							<FilterGroup label="Season">
								{(
									[
										"all",
										"spring",
										"summer",
										"fall",
										"winter",
										"ginger island",
									] as SeasonFilter[]
								).map((v) => (
									<FilterRadio
										key={v}
										name="fish-season"
										value={v}
										checked={seasonFilter === v}
										onChange={() => setSeasonFilter(v)}
									>
										{v === "all"
											? "All"
											: v === "ginger island"
												? "Ginger Island"
												: v.charAt(0).toUpperCase() + v.slice(1)}
									</FilterRadio>
								))}
							</FilterGroup>
							<FilterGroup label="Weather">
								{(["all", "sunny", "rainy", "both"] as WeatherFilter[]).map((v) => (
									<FilterRadio
										key={v}
										name="fish-weather"
										value={v}
										checked={weatherFilter === v}
										onChange={() => setWeatherFilter(v)}
									>
										{v === "all"
											? "All"
											: v === "both"
												? "Any"
												: v.charAt(0).toUpperCase() + v.slice(1)}
									</FilterRadio>
								))}
							</FilterGroup>
							<FilterSelect
								label="Location"
								value={locationFilter}
								onChange={setLocationFilter}
								options={[
									{ value: "all", label: "All Locations" },
									...uniqueLocations.map((loc) => ({ value: loc, label: loc })),
								]}
							/>
							<FilterGroup label="Difficulty">
								{(["all", "easy", "medium", "hard"] as DifficultyFilter[]).map(
									(v) => (
										<FilterRadio
											key={v}
											name="fish-difficulty"
											value={v}
											checked={difficultyFilter === v}
											onChange={() => setDifficultyFilter(v)}
										>
											{v === "all"
												? "All"
												: v === "easy"
													? "Easy (≤33)"
													: v === "medium"
														? "Medium (34–66)"
														: "Hard (≥67)"}
										</FilterRadio>
									)
								)}
							</FilterGroup>
							<FilterGroup label="Category">
								{FISH_CATEGORY_FILTERS.map(({ id, label }) => (
									<FilterCheckbox
										key={id}
										value={id}
										checked={categoryFilter.has(id)}
										onChange={() => toggleCategory(id)}
									>
										{label}
									</FilterCheckbox>
								))}
							</FilterGroup>
						</div>
					</FilterPopover>
					{hasFishingProfession && (
						<ProfessionsButton
							active={showProfessionPrices}
							onClick={() => setShowProfessionPrices(!showProfessionPrices)}
						/>
					)}
				</div>

				{filtered.length === 0 ? (
					<p className="py-8 text-center text-sm text-white/40">
						No fish match your filters.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((f) => (
							<FishCard
								key={f.id}
								fish={f}
								caught={gameData.fishCaught.some((c) => c.id === f.id)}
								professionBonus={
									showProfessionPrices && f.profession.length > 0
										? applyBestProfessionBonus(
												f.sellPrice,
												f.profession,
												activeProfessionBonuses
											)
										: null
								}
								onClick={() => setSelectedFish(f)}
							/>
						))}
					</div>
				)}
			</NavySection>

			<FishDetailModal
				fish={selectedFish}
				caught={selectedFishCaught}
				onClose={() => setSelectedFish(null)}
				activeProfessionBonuses={showProfessionPrices ? activeProfessionBonuses : null}
			/>
		</>
	);
}
