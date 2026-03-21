"use client";

import { type ArtisanGood, artisanGoods, collections } from "stardew-valley-data";
import { useState } from "react";
import { type ShippedFilter as BaseShippedFilter, CollectionProps as Props } from "@/types";
import { applyBestProfessionBonus, getActiveProfessionBonuses } from "@/lib/utils/professionPrices";
import { INGREDIENT_IMAGE_MAP } from "@/data/constants/artisanGoods";
import { SHIPPED_FILTERS } from "@/data/constants/filters";
import { FilterGroup, FilterPopover, FilterRadio } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { ProfessionsButton } from "@/comps/ui/ProfessionsButton";
import { SearchField } from "@/comps/ui/SearchField";
import { ArtisanGoodCard } from "./cards";
import { PriceFormulaModal } from "./modals/PriceFormulaModal";

type ShippedFilter = BaseShippedFilter | "not-applicable";

const FILTERS = [...SHIPPED_FILTERS, { id: "not-applicable" as const, label: "Other" }];

const shippableIds = new Set(
	collections()
		.itemsShipped()
		.get()
		.map((x) => x.id)
);

export function ArtisanGoodsSection({ gameData }: Props) {
	const [searchText, setSearchText] = useState("");
	const [filter, setFilter] = useState<ShippedFilter>("all");
	const [modalGood, setModalGood] = useState<ArtisanGood | null>(null);
	const [showProfessionPrices, setShowProfessionPrices] = useState(false);

	const activeProfessionBonuses = getActiveProfessionBonuses(gameData);
	const hasProfessions =
		activeProfessionBonuses.has("artisan") || activeProfessionBonuses.has("tapper");

	const allGoods = artisanGoods().get();
	const shippableGoods = allGoods.filter((g) => shippableIds.has(g.id));
	const shippedCount = shippableGoods.filter(
		(g) => gameData.shipped[g.id]?.shipped === true
	).length;

	const filtered = allGoods
		.filter((g) => {
			if (!searchText) return true;
			const q = searchText.toLowerCase();
			return (
				g.name.toLowerCase().includes(q) ||
				g.equipment.toLowerCase().includes(q) ||
				g.ingredients.some((i) => i.name.toLowerCase().includes(q))
			);
		})
		.filter((g) => {
			if (filter === "all") return true;
			if (filter === "not-applicable") return !shippableIds.has(g.id);
			if (!shippableIds.has(g.id)) return false;
			const shipped = gameData.shipped[g.id]?.shipped === true;
			if (filter === "shipped") return shipped;
			if (filter === "not-shipped") return !shipped;
			return true;
		});

	return (
		<>
			<NavySection
				title="Artisan Goods"
				badge={`${shippedCount} / ${shippableGoods.length} shipped`}
			>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField
						value={searchText}
						onChange={setSearchText}
						placeholder="Search by name, equipment, or ingredient…"
					/>
					<FilterPopover activeCount={filter !== "all" ? 1 : 0}>
						<FilterGroup label="Shipped Status">
							{FILTERS.map(({ id, label }) => (
								<FilterRadio
									key={id}
									name="artisan-goods-filter"
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
						No artisan goods match your search.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((good) => (
							<ArtisanGoodCard
								key={good.id}
								good={good}
								shipped={gameData.shipped[good.id]?.shipped === true}
								shippable={shippableIds.has(good.id)}
								professionBonus={
									showProfessionPrices && good.sellPrice !== null
										? applyBestProfessionBonus(
												good.sellPrice,
												good.profession,
												activeProfessionBonuses
											)
										: null
								}
								onCalculate={() => setModalGood(good)}
								ingredientImageMap={INGREDIENT_IMAGE_MAP}
							/>
						))}
					</div>
				)}
			</NavySection>

			{modalGood && (
				<PriceFormulaModal
					key={modalGood?.id}
					good={modalGood}
					onClose={() => setModalGood(null)}
					activeProfessionBonuses={showProfessionPrices ? activeProfessionBonuses : null}
				/>
			)}
		</>
	);
}
