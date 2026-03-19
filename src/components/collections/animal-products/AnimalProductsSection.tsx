"use client";

import { animals, isFarmAnimal, QualityCalculator } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";

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

const calc = new QualityCalculator();

interface ProduceCardProps {
	entry: ProduceEntry;
	shipped: boolean;
}

function ProduceCard({ entry, shipped }: ProduceCardProps) {
	const { produce, animalName, building, isDeluxe } = entry;
	const qualityPrices = calc.sellPrices(produce.sellPrice);

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
				<div className="shrink-0">
					{shipped ? (
						<span className="inline-flex items-center gap-1 rounded-full bg-green-800 px-2 py-0.5 text-[0.65rem] font-bold text-green-300">
							<HiCheck className="h-3 w-3" /> Shipped
						</span>
					) : (
						<span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] font-bold text-white/40">
							Not Shipped
						</span>
					)}
				</div>
			</div>

			{/* Sell price table */}
			<div className="grid grid-cols-4 overflow-hidden rounded-lg border border-white/10">
				<div className="flex flex-col items-center gap-0.5 border-r border-white/10 bg-white/5 px-1 py-1.5">
					<span className="text-[0.6rem] font-semibold tracking-wide text-white/40 uppercase">
						Basic
					</span>
					<span
						className={`text-xs font-bold ${shipped ? "text-green-300" : "text-white/80"}`}
					>
						{produce.sellPrice}g
					</span>
				</div>
				{qualityPrices.map(({ quality, icon, value }) => (
					<div
						key={quality}
						className="flex flex-col items-center gap-0.5 border-r border-white/10 bg-white/5 px-1 py-1.5 last:border-r-0"
					>
						<img
							src={assetPath(icon)}
							alt={quality}
							className="h-3.5 w-3.5 object-contain"
						/>
						<span
							className={`text-xs font-bold ${shipped ? "text-green-300" : "text-white/80"}`}
						>
							{value}g
						</span>
					</div>
				))}
			</div>
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
				<input
					type="text"
					placeholder="Search produce or animal…"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
				/>
				<fieldset>
					<div className="flex flex-wrap gap-2">
						{FILTERS.map(({ id, label }) => (
							<label
								key={id}
								className="group has-checked:border-accent has-checked:bg-accent relative flex cursor-pointer items-center justify-center rounded-md border border-slate-500 bg-slate-700/60 px-3 py-1.5 transition-all"
							>
								<input
									type="radio"
									name="animal-products-filter"
									value={id}
									checked={filter === id}
									onChange={() => setFilter(id)}
									className="absolute inset-0 cursor-pointer appearance-none focus:outline-none"
								/>
								<span className="text-[0.75rem] font-semibold text-slate-300 uppercase group-has-checked:text-white">
									{label}
								</span>
							</label>
						))}
					</div>
				</fieldset>
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
