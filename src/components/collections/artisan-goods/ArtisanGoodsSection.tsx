"use client";

import { Button } from "flowbite-react";
import {
	type ArtisanGood,
	artisanGoods,
	collections,
	search,
} from "stardew-valley-data";
import { PriceGrid } from "@/comps/ui/PriceGrid";
import { EnergyHealthGrid } from "@/comps/ui/EnergyHealthGrid";
import { SearchField } from "@/comps/ui/SearchField";
import { FilterPopover, FilterGroup, FilterRadio } from "@/comps/ui/FilterPopover";
import { useState } from "react";
import { ShippedBadge } from "@/comps/ui/ShippedBadge";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { PriceFormulaModal } from "./modals/PriceFormulaModal";

interface Props {
	gameData: GameData;
}

type ShippedFilter = "all" | "shipped" | "not-shipped" | "not-applicable";

const FILTERS: { id: ShippedFilter; label: string }[] = [
	{ id: "all", label: "All" },
	{ id: "shipped", label: "Shipped" },
	{ id: "not-shipped", label: "Not Shipped" },
	{ id: "not-applicable", label: "Other" },
];

const shippableIds = new Set(
	collections()
		.itemsShipped()
		.get()
		.map((x) => x.id)
);

const EQUIPMENT_IMAGES: Record<string, string> = {
	"Bee House": "images/craftable/artisan-equipment/Bee House.png",
	"Cheese Press": "images/craftable/artisan-equipment/Cheese Press.png",
	Dehydrator: "images/craftable/artisan-equipment/Dehydrator.png",
	"Fish Smoker": "images/craftable/artisan-equipment/Fish Smoker.png",
	Keg: "images/craftable/artisan-equipment/Keg.png",
	Loom: "images/craftable/artisan-equipment/Loom.png",
	"Mayonnaise Machine": "images/craftable/artisan-equipment/Mayonnaise Machine.png",
	"Oil Maker": "images/craftable/artisan-equipment/Oil Maker.png",
	"Preserves Jar": "images/craftable/artisan-equipment/Preserves Jar.png",
	Tapper: "images/craftable/refining-equipment/Tapper.png",
};

// Pre-build image lookup for all ingredient IDs across all artisan goods
// Validates that the search result name matches the ingredient name to avoid
// wrong icons when an ID maps to a different item (e.g. Sturgeon Roe ID 723 = Oyster).
const ingredientImageMap: Record<string, string> = {};
for (const good of artisanGoods().get()) {
	for (const ingredient of good.ingredients) {
		if (ingredient.id && !(ingredient.id in ingredientImageMap)) {
			const results = search(ingredient.id);
			const match = results.find(
				(r) => r.name.toLowerCase() === ingredient.name.toLowerCase()
			);
			if (match) {
				ingredientImageMap[ingredient.id] = match.image;
			}
		}
	}
}

interface GoodCardProps {
	good: ArtisanGood;
	shipped: boolean;
	shippable: boolean;
	onCalculate: () => void;
}

function ArtisanGoodCard({ good, shipped, shippable, onCalculate }: GoodCardProps) {
	return (
		<div
			className={`flex flex-col gap-3 rounded-xl border p-3 transition-all ${
				shippable && shipped
					? "border-green-500/40 bg-green-900/20"
					: "border-white/10 bg-white/5"
			}`}
		>
			{/* Top row: image + name + badge */}
			<div className="flex items-start gap-3">
				<img
					src={assetPath(good.image)}
					alt={good.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<span
						className={`text-sm leading-tight font-bold ${
							shippable && shipped ? "text-green-300" : "text-white"
						}`}
					>
						{good.name}
					</span>
					<div className="mt-1 flex items-center gap-1.5">
						{EQUIPMENT_IMAGES[good.equipment] && (
							<img
								src={assetPath(EQUIPMENT_IMAGES[good.equipment])}
								alt={good.equipment}
								className="h-5 w-5 object-contain"
							/>
						)}
						<span className="text-xs text-white/80">{good.equipment}</span>
					</div>
					{good.ingredients.length > 0 && (
						<div className="mt-1.5 flex flex-wrap gap-1.5">
							{good.ingredients.map((ingredient, idx) => {
								const imgPath = ingredient.id
									? ingredientImageMap[ingredient.id]
									: undefined;
								return (
									<span
										key={idx}
										className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1"
									>
										{imgPath && (
											<img
												src={assetPath(imgPath)}
												alt={ingredient.name}
												className="h-5 w-5 object-contain"
											/>
										)}
										<span className="text-xs text-white/80">
											{ingredient.name}
										</span>
									</span>
								);
							})}
						</div>
					)}
				</div>
				<ShippedBadge shippable={shippable} shipped={shipped} />
			</div>

			{/* Price display */}
			{good.sellPrice !== null ? (
				<PriceGrid price={good.sellPrice} maxQuality={good.maxQuality} shipped={shippable && shipped} />
			) : (
				<div className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
					<span className="text-[0.7rem] text-white/70 italic">
						{good.sellPriceFormula}
					</span>
					<Button size="xxs" color="accent" onClick={onCalculate} className="shrink-0">
						Calculate
					</Button>
				</div>
			)}

			{/* Health / Energy / Poison */}
			{good.energyHealth && (
				<EnergyHealthGrid
					energy={good.energyHealth.energy ?? 0}
					health={good.energyHealth.health ?? 0}
					maxQuality={good.maxQuality}
					poison={good.energyHealth.poison ?? false}
				/>
			)}

			{/* Buffs */}
			{good.buffs && good.buffs.length > 0 && (
				<div className="flex flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
					{good.buffs.map((buff, i) => (
						<span key={i} className="inline-flex items-center gap-1.5">
							<img
								src={assetPath(`images/misc/${buff.stat}.png`)}
								alt={buff.stat}
								className="h-4 w-4 object-contain"
								onError={(e) => {
									(e.target as HTMLImageElement).style.display = "none";
								}}
							/>
							<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
								{buff.stat}
							</span>
							<span
								className={`text-xs font-bold ${buff.value > 0 ? "text-green-400" : "text-red-400"}`}
							>
								{buff.value > 0 ? "+" : ""}
								{buff.value}
							</span>
						</span>
					))}
					{good.buffDuration && (
						<span className="ml-auto text-[0.65rem] text-white/40">
							{good.buffDuration}s
						</span>
					)}
				</div>
			)}
		</div>
	);
}

export function ArtisanGoodsSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState<ShippedFilter>("all");
	const [modalGood, setModalGood] = useState<ArtisanGood | null>(null);

	const allGoods = artisanGoods().get();
	const shippableGoods = allGoods.filter((g) => shippableIds.has(g.id));
	const shippedCount = shippableGoods.filter(
		(g) => gameData.shipped[g.id]?.shipped === true
	).length;

	const filtered = allGoods
		.filter((g) => {
			if (!search) return true;
			const q = search.toLowerCase();
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
			<div
				className="border-secondary/60 rounded-xl border p-5"
				style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
			>
				{/* Header */}
				<div className="mb-4 flex items-center justify-between">
					<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
						Artisan Goods
					</h3>
					<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-semibold">
						{shippedCount} / {shippableGoods.length} shipped
					</span>
				</div>

				{/* Controls */}
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField value={search} onChange={setSearch} placeholder="Search by name, equipment, or ingredient…" />
					<FilterPopover activeCount={filter !== "all" ? 1 : 0}>
						<FilterGroup label="Shipped Status">
							{FILTERS.map(({ id, label }) => (
								<FilterRadio key={id} name="artisan-goods-filter" value={id} checked={filter === id} onChange={() => setFilter(id)}>
									{label}
								</FilterRadio>
							))}
						</FilterGroup>
					</FilterPopover>
				</div>

				{/* Grid */}
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
								onCalculate={() => setModalGood(good)}
							/>
						))}
					</div>
				)}
			</div>

			{modalGood && (
				<PriceFormulaModal
					key={modalGood?.id}
					good={modalGood}
					onClose={() => setModalGood(null)}
				/>
			)}
		</>
	);
}
