"use client";

import { type Crop, crops, type Season } from "stardew-valley-data";
import { useState } from "react";
import {
	CollectionProps as Props,
	type RegrowthFilter,
	type ShippedFilter,
	type TraitFilter,
} from "@/types";
import { applyBestProfessionBonus, getActiveProfessionBonuses } from "@/lib/utils/professionPrices";
import { SEASONS } from "@/data/constants/seasons";
import { FilterGroup, FilterPopover, FilterRadio } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { ProfessionsButton } from "@/comps/ui/ProfessionsButton";
import { SearchField } from "@/comps/ui/SearchField";
import { CropCard } from "./cards";
import { CropDetailModal } from "./modals/CropDetailModal";

export function CropsSection({ gameData }: Props) {
	const [searchText, setSearchText] = useState("");
	const [seasonFilter, setSeasonFilter] = useState<Season | "all">("all");
	const [shippedFilter, setShippedFilter] = useState<ShippedFilter>("all");
	const [regrowthFilter, setRegrowthFilter] = useState<RegrowthFilter>("all");
	const [trellisFilter, setTrellisFilter] = useState<TraitFilter>("all");
	const [giantFilter, setGiantFilter] = useState<TraitFilter>("all");
	const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
	const [showProfessionPrices, setShowProfessionPrices] = useState(false);

	const activeProfessionBonuses = getActiveProfessionBonuses(gameData);
	const hasProfessions = activeProfessionBonuses.has("tiller");

	const allCrops = crops().get();
	const shippedCount = allCrops.filter((c) => gameData.shipped[c.id]?.shipped === true).length;

	const activeFilterCount = [
		seasonFilter !== "all",
		shippedFilter !== "all",
		regrowthFilter !== "all",
		trellisFilter !== "all",
		giantFilter !== "all",
	].filter(Boolean).length;

	const filtered = allCrops
		.filter((c) => !searchText || c.name.toLowerCase().includes(searchText.toLowerCase()))
		.filter((c) => seasonFilter === "all" || c.seasons.includes(seasonFilter))
		.filter((c) => {
			const shipped = gameData.shipped[c.id]?.shipped === true;
			if (shippedFilter === "shipped") return shipped;
			if (shippedFilter === "not-shipped") return !shipped;
			return true;
		})
		.filter((c) => {
			if (regrowthFilter === "regrowing") return c.regrowDays !== null;
			if (regrowthFilter === "non-regrowing") return c.regrowDays === null;
			return true;
		})
		.filter((c) => {
			if (trellisFilter === "yes") return c.trellis;
			if (trellisFilter === "no") return !c.trellis;
			return true;
		})
		.filter((c) => {
			if (giantFilter === "yes") return c.giant;
			if (giantFilter === "no") return !c.giant;
			return true;
		});

	return (
		<>
			<NavySection title="Crops" badge={`${shippedCount} / ${allCrops.length} shipped`}>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField
						value={searchText}
						onChange={setSearchText}
						placeholder="Search crops…"
					/>
					<FilterPopover activeCount={activeFilterCount}>
						<FilterGroup label="Season">
							{(["all", "spring", "summer", "fall", "winter"] as const).map((s) => (
								<FilterRadio
									key={s}
									name="crop-season"
									value={s}
									checked={seasonFilter === s}
									onChange={() => setSeasonFilter(s)}
								>
									{s === "all" ? (
										"All"
									) : (
										<span
											className={`capitalize ${seasonFilter === s ? "" : SEASONS[s]?.textColor}`}
										>
											{s.charAt(0).toUpperCase() + s.slice(1)}
										</span>
									)}
								</FilterRadio>
							))}
						</FilterGroup>
						<FilterGroup label="Shipped Status" className="mt-4">
							{(
								[
									{ id: "all", label: "All" },
									{ id: "shipped", label: "Shipped" },
									{ id: "not-shipped", label: "Not Shipped" },
								] as const
							).map(({ id, label }) => (
								<FilterRadio
									key={id}
									name="crop-shipped"
									value={id}
									checked={shippedFilter === id}
									onChange={() => setShippedFilter(id)}
								>
									{label}
								</FilterRadio>
							))}
						</FilterGroup>
						<FilterGroup label="Regrowth" className="mt-4">
							{(
								[
									{ id: "all", label: "All" },
									{ id: "regrowing", label: "Regrowing" },
									{ id: "non-regrowing", label: "Non-Regrowing" },
								] as const
							).map(({ id, label }) => (
								<FilterRadio
									key={id}
									name="crop-regrowth"
									value={id}
									checked={regrowthFilter === id}
									onChange={() => setRegrowthFilter(id)}
								>
									{label}
								</FilterRadio>
							))}
						</FilterGroup>
						<FilterGroup label="Trellis" className="mt-4">
							{(
								[
									{ id: "all", label: "All" },
									{ id: "yes", label: "Trellis" },
									{ id: "no", label: "No Trellis" },
								] as const
							).map(({ id, label }) => (
								<FilterRadio
									key={id}
									name="crop-trellis"
									value={id}
									checked={trellisFilter === id}
									onChange={() => setTrellisFilter(id)}
								>
									{label}
								</FilterRadio>
							))}
						</FilterGroup>
						<FilterGroup label="Giant" className="mt-4">
							{(
								[
									{ id: "all", label: "All" },
									{ id: "yes", label: "Giant" },
									{ id: "no", label: "No Giant" },
								] as const
							).map(({ id, label }) => (
								<FilterRadio
									key={id}
									name="crop-giant"
									value={id}
									checked={giantFilter === id}
									onChange={() => setGiantFilter(id)}
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
					<p className="py-8 text-center text-sm text-white/80">
						No crops match your filters.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((crop) => (
							<CropCard
								key={crop.id}
								crop={crop}
								shipped={gameData.shipped[crop.id]?.shipped === true}
								shippedCount={gameData.shipped[crop.id]?.count ?? 0}
								professionBonus={
									showProfessionPrices
										? applyBestProfessionBonus(
												crop.cropSellPrice,
												crop.profession,
												activeProfessionBonuses
											)
										: null
								}
								onClick={() => setSelectedCrop(crop)}
							/>
						))}
					</div>
				)}
			</NavySection>

			<CropDetailModal
				crop={selectedCrop}
				gameData={gameData}
				onClose={() => setSelectedCrop(null)}
			/>
		</>
	);
}
