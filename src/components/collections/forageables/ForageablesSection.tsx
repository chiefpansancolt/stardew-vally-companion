"use client";

import { useState } from "react";
import {
	forageables,
	trees,
	collections,
	type Forageable,
	type FruitTree,
	type WildTree,
	type Season,
} from "stardew-valley-data";
import { PriceGrid } from "@/comps/ui/PriceGrid";
import { EnergyHealthGrid } from "@/comps/ui/EnergyHealthGrid";
import { SeasonBadges } from "@/comps/ui/SeasonBadges";
import { FilterPopover, FilterGroup, FilterRadio } from "@/comps/ui/FilterPopover";
import { ProfessionsButton } from "@/comps/ui/ProfessionsButton";
import { SearchField } from "@/comps/ui/SearchField";
import { ShippedBadge } from "@/comps/ui/ShippedBadge";
import { type GameData } from "@/types/app/game";
import { getActiveProfessionBonuses, getActiveKnowledgeBonuses, applyBestForageableBonus, applyBestProfessionBonus, type BonusResult } from "@/lib/utils/professionPrices";
import { assetPath } from "@/lib/utils/assetPath";

interface Props {
	gameData: GameData;
}

type SeasonFilter = "all" | Season;

const ARTISAN_USE_META: Record<string, { name: string; image: string }> = {
	honey: { name: "Honey", image: "images/artisan-goods/Honey.png" },
	wine: { name: "Wine", image: "images/artisan-goods/Wine.png" },
	juice: { name: "Juice", image: "images/artisan-goods/Juice.png" },
	pickles: { name: "Pickles", image: "images/artisan-goods/Pickles.png" },
	jelly: { name: "Jelly", image: "images/artisan-goods/Jelly.png" },
	driedMushrooms: { name: "Dried Mushrooms", image: "images/artisan-goods/Dried Mushrooms.png" },
	driedFruit: { name: "Dried Fruit", image: "images/artisan-goods/Dried Fruit.png" },
};

function ArtisanUsesRow({ artisanUses }: { artisanUses: Record<string, boolean> }) {
	const active = Object.entries(artisanUses).filter(([, v]) => v);
	if (active.length === 0) return null;
	return (
		<div className="flex flex-wrap gap-1.5">
			{active.map(([key]) => {
				const meta = ARTISAN_USE_META[key];
				if (!meta) return null;
				return (
					<div
						key={key}
						className="flex items-center gap-1 rounded-lg border border-white/12 bg-white/7 px-2 py-1"
					>
						<img src={assetPath(meta.image)} alt={meta.name} className="h-3.5 w-3.5 object-contain" />
						<span className="text-[0.65rem] font-semibold text-white/70">{meta.name}</span>
					</div>
				);
			})}
		</div>
	);
}

function ForageableCard({
	item,
	shippable,
	shipped,
	shippedCount,
	professionBonus = null,
}: {
	item: Forageable;
	shippable: boolean;
	shipped: boolean;
	shippedCount: number;
	professionBonus?: BonusResult | null;
}) {
	const hasEnergy =
		item.energyHealth &&
		(item.energyHealth.energy ?? 0) > 0;

	return (
		<div
			className={`flex flex-col gap-2.5 rounded-xl border p-3 ${
				shipped
					? "border-green-400/40 bg-green-900/20"
					: "border-white/10 bg-white/5"
			}`}
		>
			{/* Top row */}
			<div className="flex items-start gap-2.5">
				<img src={assetPath(item.image)} alt={item.name} className="h-12 w-12 shrink-0 object-contain" />
				<div className="min-w-0 flex-1">
					<div className={`text-sm font-bold ${shipped ? "text-green-300" : "text-white"}`}>
						{item.name}
					</div>
					<div className="mt-1 flex flex-wrap gap-1">
						<SeasonBadges seasons={item.seasons} />
					</div>
				</div>
				{shippable && (
					<div className="flex shrink-0 flex-col items-end gap-1">
						<ShippedBadge shippable={shippable} shipped={shipped} />
						{shipped && <span className="text-[0.6rem] text-white/60">×{shippedCount} shipped</span>}
					</div>
				)}
			</div>

			{/* Location */}
			<div className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[0.7rem] italic text-white/60">
				{item.locations}
			</div>

			{/* Price quality grid */}
			<PriceGrid price={item.sellPrice} maxQuality="iridium" shipped={shipped} professionBonus={professionBonus} />

			{/* Energy/Health */}
			{hasEnergy && (
				<EnergyHealthGrid
					energy={item.energyHealth!.energy ?? 0}
					health={item.energyHealth!.health ?? 0}
					maxQuality="iridium"
				/>
			)}

			{/* Artisan uses */}
			<ArtisanUsesRow artisanUses={item.artisanUses as unknown as Record<string, boolean>} />
		</div>
	);
}

function FruitTreeProduceCard({
	tree,
	shipped,
	shippedCount,
	professionBonus = null,
}: {
	tree: FruitTree;
	shipped: boolean;
	shippedCount: number;
	professionBonus?: BonusResult | null;
}) {
	const p = tree.produce;
	const hasEnergy = p.energyHealth && (p.energyHealth.energy ?? 0) > 0;

	return (
		<div
			className={`flex flex-col gap-2.5 rounded-xl border p-3 ${
				shipped
					? "border-green-400/40 bg-green-900/20"
					: "border-white/10 bg-white/5"
			}`}
		>
			{/* Top row */}
			<div className="flex items-start gap-2.5">
				<img src={assetPath(p.image)} alt={p.name} className="h-12 w-12 shrink-0 object-contain" />
				<div className="min-w-0 flex-1">
					<div className={`text-sm font-bold ${shipped ? "text-green-300" : "text-white"}`}>
						{p.name}
					</div>
					<div className="mt-1 flex flex-wrap items-center gap-1">
						<SeasonBadges seasons={tree.seasons} />
						<span className="text-[0.65rem] text-white/60">{tree.name}</span>
					</div>
				</div>
				<div className="flex shrink-0 flex-col items-end gap-1">
					<ShippedBadge shippable={true} shipped={shipped} />
					{shipped && <span className="text-[0.6rem] text-white/60">×{shippedCount}</span>}
				</div>
			</div>

			{/* Price quality grid */}
			<PriceGrid price={p.sellPrice} maxQuality="iridium" shipped={shipped} professionBonus={professionBonus} />

			{/* Energy/Health */}
			{hasEnergy && (
				<EnergyHealthGrid energy={p.energyHealth!.energy ?? 0} health={p.energyHealth!.health ?? 0} maxQuality="iridium" />
			)}

			{/* Artisan uses */}
			<ArtisanUsesRow artisanUses={p.artisanUses as unknown as Record<string, boolean>} />
		</div>
	);
}

function WildTreeTapperCard({
	tree,
	shipped,
	shippedCount,
	professionBonus = null,
}: {
	tree: WildTree;
	shipped: boolean;
	shippedCount: number;
	professionBonus?: BonusResult | null;
}) {
	const t = tree.tapper!;
	const hasEnergy = t.energyHealth && (t.energyHealth.energy ?? 0) > 0;

	return (
		<div
			className={`flex flex-col gap-2.5 rounded-xl border p-3 ${
				shipped
					? "border-green-400/40 bg-green-900/20"
					: "border-white/10 bg-white/5"
			}`}
		>
			{/* Top row */}
			<div className="flex items-start gap-2.5">
				<img src={assetPath(t.image)} alt={t.name} className="h-12 w-12 shrink-0 object-contain" />
				<div className="min-w-0 flex-1">
					<div className={`text-sm font-bold ${shipped ? "text-green-300" : "text-white"}`}>
						{t.name}
					</div>
					<div className="mt-1 text-[0.65rem] text-white/60">{tree.name} tapper</div>
				</div>
				<div className="flex shrink-0 flex-col items-end gap-1">
					<ShippedBadge shippable={true} shipped={shipped} />
					{shipped && <span className="text-[0.6rem] text-white/60">×{shippedCount}</span>}
				</div>
			</div>

			{/* Single price row (tappers have no quality tiers) */}
			<PriceGrid price={t.sellPrice} maxQuality="basic" shipped={shipped} professionBonus={professionBonus} />

		{/* Single E/H row */}
		{hasEnergy && <EnergyHealthGrid energy={t.energyHealth!.energy ?? 0} health={t.energyHealth!.health ?? 0} maxQuality="basic" />}
	</div>
);
}

type ShippedFilter = "all" | "shipped" | "not-shipped" | "other";

const SEASON_ICONS: Partial<Record<Season, string>> = {
	spring: "images/misc/Spring.png",
	summer: "images/misc/Summer.png",
	fall: "images/misc/Fall.png",
	winter: "images/misc/Winter.png",
};

const SEASON_TEXT_COLORS: Partial<Record<Season, string>> = {
	spring: "text-green-400",
	summer: "text-yellow-400",
	fall: "text-orange-400",
	winter: "text-blue-400",
};

export function ForageablesSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>("all");
	const [shippedFilter, setShippedFilter] = useState<ShippedFilter>("all");
	const [showProfessionPrices, setShowProfessionPrices] = useState(false);

	const activeProfessionBonuses = getActiveProfessionBonuses(gameData);
	const activeKnowledgeBonuses = getActiveKnowledgeBonuses(gameData);
	const hasBonuses = activeProfessionBonuses.has("tiller") || activeProfessionBonuses.has("tapper") || activeKnowledgeBonuses.size > 0;

	const allForageables = forageables().sortByName().get();
	const allTrees = trees().get();
	const shippableIds = new Set(collections().itemsShipped().get().map((i) => i.id));

	const activeFilterCount = [seasonFilter !== "all", shippedFilter !== "all"].filter(Boolean).length;

	const q = search.toLowerCase().trim();

	const getShipStatus = (id: string) => {
		const isShippable = shippableIds.has(id);
		const isShipped = isShippable && gameData.shipped[id]?.shipped === true;
		return { isShippable, isShipped };
	};

	const filteredForageables = allForageables.filter((f) => {
		if (q && !f.name.toLowerCase().includes(q) && !f.locations.toLowerCase().includes(q)) return false;
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
		const produceId = t.type === "fruit-tree" ? t.produce.id : t.tapper?.id ?? "";
		const name = t.type === "fruit-tree" ? t.produce.name : t.tapper?.name ?? "";
		if (q && !name.toLowerCase().includes(q) && !t.name.toLowerCase().includes(q)) return false;
		if (seasonFilter !== "all" && t.type === "fruit-tree" && !t.seasons.includes(seasonFilter)) return false;
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
		const produceId = t.type === "fruit-tree" ? t.produce.id : t.tapper?.id ?? "";
		return !forageableIds.has(produceId);
	});

	const totalShown = filteredForageables.length + dedupedTreeProduce.length;

	const RADIO_LABEL = (active: boolean) =>
		`relative flex cursor-pointer items-center rounded-md border px-2.5 py-1 transition-all ${
			active
				? "border-accent bg-accent text-white"
				: "border-white/20 bg-white/5 text-white/60 hover:border-white/40"
		}`;

	return (
		<div
			className="rounded-xl border border-secondary/60 p-5"
			style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
		>
			{/* Header */}
			<div className="mb-4 flex items-center justify-between">
				<span className="text-[0.8125rem] font-bold tracking-[0.06em] text-white uppercase">
					Forageables
				</span>
				<span className="rounded-full bg-highlight/20 px-3 py-0.5 text-[0.7rem] font-semibold text-highlight">
					{totalShown} items
				</span>
			</div>

			{/* Controls */}
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<SearchField value={search} onChange={setSearch} placeholder="Search forageables…" />
				{/* Filter popover */}
				<FilterPopover activeCount={activeFilterCount}>
					<FilterGroup label="Season">
						{(["all", "spring", "summer", "fall", "winter"] as const).map((s) => (
							<FilterRadio key={s} name="forage-season" value={s} checked={seasonFilter === s} onChange={() => setSeasonFilter(s)}>
								{s === "all" ? "All" : (
									<span className={`flex items-center gap-1 capitalize ${seasonFilter === s ? "" : SEASON_TEXT_COLORS[s]}`}>
										<img src={assetPath(SEASON_ICONS[s] ?? "")} alt={s} className="h-3.5 w-3.5 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
										{s.charAt(0).toUpperCase() + s.slice(1)}
									</span>
								)}
							</FilterRadio>
						))}
					</FilterGroup>
					<FilterGroup label="Shipped Status" className="mt-4">
						{([{id: "all", label: "All"}, {id: "shipped", label: "Shipped"}, {id: "not-shipped", label: "Not Shipped"}, {id: "other", label: "Other"}] as const).map(({id, label}) => (
							<FilterRadio key={id} name="forage-shipped" value={id} checked={shippedFilter === id} onChange={() => setShippedFilter(id)}>{label}</FilterRadio>
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

			{/* Card grid */}
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
							professionBonus={showProfessionPrices ? applyBestForageableBonus(f.sellPrice, f.profession, f.knowledge, activeProfessionBonuses, activeKnowledgeBonuses) : null}
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
								professionBonus={showProfessionPrices ? applyBestProfessionBonus(t.produce.sellPrice, t.produce.profession, activeProfessionBonuses) : null}
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
							professionBonus={showProfessionPrices ? applyBestProfessionBonus(t.tapper.sellPrice, t.tapper.profession, activeProfessionBonuses) : null}
						/>
					);
				})}
				{totalShown === 0 && (
					<div className="col-span-full py-8 text-center text-sm text-white/50">
						No forageables match your search.
					</div>
				)}
			</div>
		</div>
	);
}
