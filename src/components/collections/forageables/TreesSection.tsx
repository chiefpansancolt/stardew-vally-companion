"use client";

import { collections, type FruitTree, type Tree, trees, type WildTree } from "stardew-valley-data";
import { useState } from "react";
import { CollectionProps as Props, type TreeTypeFilter } from "@/types";
import { FilterGroup, FilterPopover, FilterRadio } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { FruitTreeCard, WildTreeCard } from "./cards";
import { TreeDetailModal } from "./modals/TreeDetailModal";

export function TreesSection({ gameData }: Props) {
	const [typeFilter, setTypeFilter] = useState<TreeTypeFilter>("all");
	const [search, setSearch] = useState("");
	const [selectedTree, setSelectedTree] = useState<Tree | null>(null);

	const allTrees = trees().get();
	const shippableIds = new Set(
		collections()
			.itemsShipped()
			.get()
			.map((i) => i.id)
	);

	const q = search.toLowerCase().trim();

	const filteredFruitTrees = allTrees
		.filter((t): t is FruitTree => t.type === "fruit-tree")
		.filter(
			(t) =>
				!q || t.name.toLowerCase().includes(q) || t.produce.name.toLowerCase().includes(q)
		);

	const filteredWildTrees = allTrees
		.filter((t): t is WildTree => t.type === "wild-tree")
		.filter(
			(t) =>
				!q || t.name.toLowerCase().includes(q) || t.tapper?.name.toLowerCase().includes(q)
		);

	const showFruit = typeFilter === "all" || typeFilter === "fruit-tree";
	const showWild = typeFilter === "all" || typeFilter === "wild-tree";

	const activeFilterCount = [typeFilter !== "all"].filter(Boolean).length;

	return (
		<>
			<NavySection title="Trees">
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField value={search} onChange={setSearch} placeholder="Search trees…" />
					<FilterPopover activeCount={activeFilterCount}>
						<FilterGroup label="Type">
							{(["all", "fruit-tree", "wild-tree"] as const).map((key) => (
								<FilterRadio
									key={key}
									name="tree-type"
									value={key}
									checked={typeFilter === key}
									onChange={() => setTypeFilter(key)}
								>
									{key === "all"
										? "All"
										: key === "fruit-tree"
											? "Fruit Trees"
											: "Wild Trees"}
								</FilterRadio>
							))}
						</FilterGroup>
					</FilterPopover>
				</div>

				{showFruit && filteredFruitTrees.length > 0 && (
					<>
						<div className="mt-1 mb-3 flex items-center gap-2">
							<span className="text-[0.75rem] font-bold tracking-wide text-white/60 uppercase">
								Fruit Trees
							</span>
							<div className="h-px flex-1 bg-white/10" />
							<span className="text-[0.65rem] font-semibold text-white/40">
								{filteredFruitTrees.length} trees
							</span>
						</div>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{filteredFruitTrees.map((t) => (
								<FruitTreeCard
									key={t.id}
									tree={t}
									onClick={() => setSelectedTree(t)}
								/>
							))}
						</div>
					</>
				)}

				{showWild && filteredWildTrees.length > 0 && (
					<>
						<div
							className={`mb-3 flex items-center gap-2 ${showFruit && filteredFruitTrees.length > 0 ? "mt-5" : "mt-1"}`}
						>
							<span className="text-[0.75rem] font-bold tracking-wide text-white/60 uppercase">
								Wild Trees
							</span>
							<div className="h-px flex-1 bg-white/10" />
							<span className="text-[0.65rem] font-semibold text-white/40">
								{filteredWildTrees.length} trees
							</span>
						</div>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{filteredWildTrees.map((t) => (
								<WildTreeCard
									key={t.id}
									tree={t}
									onClick={() => setSelectedTree(t)}
								/>
							))}
						</div>
					</>
				)}

				{filteredFruitTrees.length === 0 && filteredWildTrees.length === 0 && (
					<div className="py-8 text-center text-sm text-white/50">
						No trees match your search.
					</div>
				)}
			</NavySection>

			<TreeDetailModal
				tree={selectedTree}
				shippableIds={shippableIds}
				gameData={gameData}
				onClose={() => setSelectedTree(null)}
			/>
		</>
	);
}
