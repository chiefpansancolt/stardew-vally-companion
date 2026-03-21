"use client";

import { collections, forageables, trees } from "stardew-valley-data";
import { useState } from "react";
import {
	type ShippedFilter as BaseShippedFilter,
	CollectionProps as Props,
	type SeasonFilter,
} from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import {
	applyBestForageableBonus,
	applyBestProfessionBonus,
	getActiveKnowledgeBonuses,
	getActiveProfessionBonuses,
} from "@/lib/utils/professionPrices";
import { SEASONS } from "@/data/constants/seasons";
import { FilterGroup, FilterPopover, FilterRadio } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { ProfessionsButton } from "@/comps/ui/ProfessionsButton";
import { SearchField } from "@/comps/ui/SearchField";
import { ForageableCard, FruitTreeProduceCard, WildTreeTapperCard } from "./cards";

type ShippedFilter = BaseShippedFilter | "other";

export function ForageablesSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>("all");
	const [shippedFilter, setShippedFilter] = useState<ShippedFilter>("all");
	const [showProfessionPrices, setShowProfessionPrices] = useState(false);

	const activeProfessionBonuses = getActiveProfessionBonuses(gameData);
	const activeKnowledgeBonuses = getActiveKnowledgeBonuses(gameData);
	const hasBonuses =
		activeProfessionBonuses.has("tiller") ||
		activeProfessionBonuses.has("tapper") ||
		activeKnowledgeBonuses.size > 0;

	const allForageables = forageables().sortByName().get();
	const allTrees = trees().get();
	const shippableIds = new Set(
		collections()
			.itemsShipped()
			.get()
			.map((i) => i.id)
	);

	const activeFilterCount = [seasonFilter !== "all", shippedFilter !== "all"].filter(
		Boolean
	).length;

	const q = search.toLowerCase().trim();

	const getShipStatus = (id: string) => {
		const isShippable = shippableIds.has(id);
		const isShipped = isShippable && gameData.shipped[id]?.shipped === true;
		return { isShippable, isShipped };
	};

	const filteredForageables = allForageables.filter((f) => {
		if (q && !f.name.toLowerCase().includes(q) && !f.locations.toLowerCase().includes(q))
			return false;
		if (seasonFilter !== "all" && !f.seasons.includes(seasonFilter)) return false;
		if (shippedFilter !== "all") {
			const { isShippable, isShipped } = getShipStatus(f.id);
			if (shippedFilter === "shipped" && !isShipped) return false;
			if (shippedFilter === "not-shipped" && (!isShippable || isShipped)) return false;
			if (shippedFilter === "other" && isShippable) return false;
		}
		return true;
	});

	const filteredTreeProduce = allTrees.filter((t) => {
		if (t.type === "wild-tree" && !t.tapper) return false;
		const produceId = t.type === "fruit-tree" ? t.produce.id : (t.tapper?.id ?? "");
		const name = t.type === "fruit-tree" ? t.produce.name : (t.tapper?.name ?? "");
		if (q && !name.toLowerCase().includes(q) && !t.name.toLowerCase().includes(q)) return false;
		if (seasonFilter !== "all" && t.type === "fruit-tree" && !t.seasons.includes(seasonFilter))
			return false;
		if (shippedFilter !== "all") {
			const { isShippable, isShipped } = getShipStatus(produceId);
			if (shippedFilter === "shipped" && !isShipped) return false;
			if (shippedFilter === "not-shipped" && (!isShippable || isShipped)) return false;
			if (shippedFilter === "other" && isShippable) return false;
		}
		return true;
	});

	const forageableIds = new Set(filteredForageables.map((f) => f.id));
	const dedupedTreeProduce = filteredTreeProduce.filter((t) => {
		const produceId = t.type === "fruit-tree" ? t.produce.id : (t.tapper?.id ?? "");
		return !forageableIds.has(produceId);
	});

	const totalShown = filteredForageables.length + dedupedTreeProduce.length;

	return (
		<NavySection title="Forageables" badge={`${totalShown} items`}>
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<SearchField
					value={search}
					onChange={setSearch}
					placeholder="Search forageables…"
				/>
				<FilterPopover activeCount={activeFilterCount}>
					<FilterGroup label="Season">
						{(["all", "spring", "summer", "fall", "winter"] as const).map((s) => (
							<FilterRadio
								key={s}
								name="forage-season"
								value={s}
								checked={seasonFilter === s}
								onChange={() => setSeasonFilter(s)}
							>
								{s === "all" ? (
									"All"
								) : (
									<span
										className={`flex items-center gap-1 capitalize ${seasonFilter === s ? "" : SEASONS[s]?.textColor}`}
									>
										<img
											src={assetPath(SEASONS[s]?.image ?? "")}
											alt={s}
											className="h-3.5 w-3.5 object-contain"
											onError={(e) => {
												(e.target as HTMLImageElement).style.display =
													"none";
											}}
										/>
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
								{ id: "other", label: "Other" },
							] as const
						).map(({ id, label }) => (
							<FilterRadio
								key={id}
								name="forage-shipped"
								value={id}
								checked={shippedFilter === id}
								onChange={() => setShippedFilter(id)}
							>
								{label}
							</FilterRadio>
						))}
					</FilterGroup>
				</FilterPopover>
				{hasBonuses && (
					<ProfessionsButton
						active={showProfessionPrices}
						onClick={() => setShowProfessionPrices(!showProfessionPrices)}
					/>
				)}
			</div>

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{filteredForageables.map((f) => {
					const { isShippable, isShipped } = getShipStatus(f.id);
					const count = gameData.shipped[f.id]?.count ?? 0;
					return (
						<ForageableCard
							key={f.id}
							item={f}
							shippable={isShippable}
							shipped={isShipped}
							shippedCount={count}
							professionBonus={
								showProfessionPrices
									? applyBestForageableBonus(
											f.sellPrice,
											f.profession,
											f.knowledge,
											activeProfessionBonuses,
											activeKnowledgeBonuses
										)
									: null
							}
						/>
					);
				})}
				{dedupedTreeProduce.map((t) => {
					if (t.type === "fruit-tree") {
						const { isShipped } = getShipStatus(t.produce.id);
						const count = gameData.shipped[t.produce.id]?.count ?? 0;
						return (
							<FruitTreeProduceCard
								key={t.id}
								tree={t}
								shipped={isShipped}
								shippedCount={count}
								professionBonus={
									showProfessionPrices
										? applyBestProfessionBonus(
												t.produce.sellPrice,
												t.produce.profession,
												activeProfessionBonuses
											)
										: null
								}
							/>
						);
					}
					if (!t.tapper) return null;
					const { isShippable, isShipped } = getShipStatus(t.tapper.id);
					const count = gameData.shipped[t.tapper.id]?.count ?? 0;
					return (
						<WildTreeTapperCard
							key={t.id}
							tree={t}
							shipped={isShipped}
							shippedCount={count}
							professionBonus={
								showProfessionPrices
									? applyBestProfessionBonus(
											t.tapper.sellPrice,
											t.tapper.profession,
											activeProfessionBonuses
										)
									: null
							}
						/>
					);
				})}
				{totalShown === 0 && (
					<div className="col-span-full py-8 text-center text-sm text-white/50">
						No forageables match your search.
					</div>
				)}
			</div>
		</NavySection>
	);
}
