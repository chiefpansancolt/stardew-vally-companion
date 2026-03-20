"use client";

import { animals, isFarmAnimal } from "stardew-valley-data";
import { useState } from "react";
import { ShippedBadge } from "@/comps/ui/ShippedBadge";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { PriceGrid } from "@/comps/ui/PriceGrid";
import { SearchField } from "@/comps/ui/SearchField";
import { FilterPopover, FilterGroup, FilterRadio } from "@/comps/ui/FilterPopover";

interface Props {
	gameData: GameData;
}

interface ProduceEntry {
	produce: { id: string; name: string; sellPrice: number; image: string };
	animalName: string;
	building: string;
	isDeluxe: boolean;
}

type ShippedFilter = "all" | "shipped" | "not-shipped";

const FILTERS: { id: ShippedFilter; label: string }[] = [
	{ id: "all", label: "All" },
	{ id: "shipped", label: "Shipped" },
	{ id: "not-shipped", label: "Not Shipped" },
];

interface ProduceCardProps {
	entry: ProduceEntry;
	shipped: boolean;
}

function ProduceCard({ entry, shipped }: ProduceCardProps) {
	const { produce, animalName, building, isDeluxe } = entry;

	return (
		<div
			className={`flex flex-col gap-3 rounded-xl border p-3 transition-all ${
				shipped ? "border-green-500/40 bg-green-900/20" : "border-white/10 bg-white/5"
			}`}
		>
			{/* Top row: image + name + badge */}
			<div className="flex items-start gap-3">
				<img
					src={assetPath(produce.image)}
					alt={produce.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<div className="flex flex-wrap items-center gap-1.5">
						<span
							className={`text-sm leading-tight font-bold ${
								shipped ? "text-green-300" : "text-white"
							}`}
						>
							{produce.name}
						</span>
						{isDeluxe && (
							<span className="bg-accent/20 text-accent rounded-full px-1.5 py-0.5 text-[0.6rem] font-bold uppercase">
								Deluxe
							</span>
						)}
					</div>
					<div className="mt-0.5 text-[0.7rem] text-white/50">
						{animalName} · {building}
					</div>
				</div>
				<ShippedBadge shippable={true} shipped={shipped} />
			</div>

			{/* Sell price table */}
			<PriceGrid price={produce.sellPrice} maxQuality="iridium" shipped={shipped} />
		</div>
	);
}

export function AnimalProductsSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState<ShippedFilter>("all");

	const allAnimals = animals().farmAnimals().get().filter(isFarmAnimal);

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

	const shippedCount = allEntries.filter(
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
			const shipped = gameData.shipped[e.produce.id]?.shipped === true;
			if (filter === "shipped") return shipped;
			if (filter === "not-shipped") return !shipped;
			return true;
		});

	return (
		<div
			className="border-secondary/60 rounded-xl border p-5"
			style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
		>
			{/* Header */}
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
					Animal Products
				</h3>
				<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-semibold">
					{shippedCount} / {allEntries.length} shipped
				</span>
			</div>

			{/* Controls */}
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<SearchField value={search} onChange={setSearch} placeholder="Search produce or animal…" />
				<FilterPopover activeCount={filter !== "all" ? 1 : 0}>
					<FilterGroup label="Shipped Status">
						{FILTERS.map(({ id, label }) => (
							<FilterRadio key={id} name="animal-products-filter" value={id} checked={filter === id} onChange={() => setFilter(id)}>
								{label}
							</FilterRadio>
						))}
					</FilterGroup>
				</FilterPopover>
			</div>

			{/* Grid */}
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
						/>
					))}
				</div>
			)}
		</div>
	);
}
