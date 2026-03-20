"use client";

import { useState } from "react";
import { trees, collections, search, type FruitTree, type WildTree, type Tree } from "stardew-valley-data";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { SeedRow } from "@/comps/ui/SeedRow";
import { SeasonBadges } from "@/comps/ui/SeasonBadges";
import { SearchField } from "@/comps/ui/SearchField";
import { FilterPopover, FilterGroup, FilterRadio } from "@/comps/ui/FilterPopover";
import { TreeDetailModal } from "./modals/TreeDetailModal";

interface Props {
	gameData: GameData;
}

type TreeTypeFilter = "all" | "fruit-tree" | "wild-tree";

function FruitTreeCard({
	tree,
	onClick,
}: {
	tree: FruitTree;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className="flex w-full cursor-pointer flex-col gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition-colors hover:border-white/20 hover:bg-white/10"
		>
			{/* Top row */}
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(tree.image)}
					alt={tree.name}
					className="h-12 w-12 shrink-0 object-contain"
				/>
				<div className="min-w-0 flex-1">
					<div className="text-sm font-bold text-white">{tree.name}</div>
					<div className="mt-1 flex flex-wrap gap-1">
						<SeasonBadges seasons={tree.seasons} />
					</div>
				</div>
				<span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[0.6rem] font-semibold text-white/70">
					Mature: {tree.daysToMature}d
				</span>
			</div>

			{/* Sapling row */}
			<SeedRow image={tree.saplingImage} name={tree.saplingName} prices={tree.saplingBuyPrices} />

			{/* Produce row */}
			<div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
				{tree.produce.image && (
					<img
						src={assetPath(tree.produce.image)}
						alt={tree.produce.name}
						className="h-5 w-5 object-contain"
					/>
				)}
				<div>
					<div className="text-[0.55rem] font-semibold tracking-wide text-white/80 uppercase">Produce</div>
					<div className="text-[0.75rem] font-semibold text-white/85">{tree.produce.name}</div>
				</div>
			</div>
		</button>
	);
}

function WildTreeCard({
	tree,
	onClick,
}: {
	tree: WildTree;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className="flex w-full cursor-pointer flex-col gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition-colors hover:border-white/20 hover:bg-white/10"
		>
			{/* Top row */}
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(tree.image)}
					alt={tree.name}
					className="h-12 w-12 shrink-0 object-contain"
				/>
				<div className="min-w-0 flex-1">
					<div className="text-sm font-bold text-white">{tree.name}</div>
					<div className="mt-1 text-[0.65rem] text-white/50">Wild Tree · Year-round</div>
				</div>
			</div>

					{/* Seed row */}
			{tree.seedName && <SeedRow image={tree.seedImage} name={tree.seedName} />}

			{/* Tapper produce row */}
			{tree.tapper && (
				<div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
					{tree.tapper.image && (
						<img
							src={assetPath(tree.tapper.image)}
							alt={tree.tapper.name}
							className="h-5 w-5 object-contain"
						/>
					)}
					<div>
						<div className="text-[0.55rem] font-semibold tracking-wide text-white/80 uppercase">Tapper Produce</div>
						<div className="text-[0.75rem] font-semibold text-white/85">{tree.tapper.name}</div>
					</div>
				</div>
			)}

			{/* Chopped produce */}
			{tree.choppedProduce && tree.choppedProduce.length > 0 && (
				<div className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
					<div className="mb-1 text-[0.55rem] font-semibold tracking-wide text-white/80 uppercase">Chopped</div>
					<div className="flex flex-wrap gap-1">
						{tree.choppedProduce.map((p) => {
							const img = p.image ?? search(p.id)?.find((r) => r.name === p.name)?.image;
							return (
								<div key={p.id} className="flex items-center gap-1 rounded bg-white/5 px-1.5 py-0.5">
									{img && <img src={assetPath(img)} alt={p.name} className="h-5 w-5 object-contain" />}
									<span className="text-xs text-white/70">{p.name}</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</button>
	);
}

export function TreesSection({ gameData }: Props) {
	const [typeFilter, setTypeFilter] = useState<TreeTypeFilter>("all");
	const [search, setSearch] = useState("");
	const [selectedTree, setSelectedTree] = useState<Tree | null>(null);

	const allTrees = trees().get();
	const shippableIds = new Set(collections().itemsShipped().get().map((i) => i.id));

	const q = search.toLowerCase().trim();

	const filteredFruitTrees = allTrees
		.filter((t): t is FruitTree => t.type === "fruit-tree")
		.filter((t) => !q || t.name.toLowerCase().includes(q) || t.produce.name.toLowerCase().includes(q));

	const filteredWildTrees = allTrees
		.filter((t): t is WildTree => t.type === "wild-tree")
		.filter((t) => !q || t.name.toLowerCase().includes(q) || t.tapper?.name.toLowerCase().includes(q));

	const showFruit = typeFilter === "all" || typeFilter === "fruit-tree";
	const showWild = typeFilter === "all" || typeFilter === "wild-tree";

	const activeFilterCount = [typeFilter !== "all"].filter(Boolean).length;

	return (
		<>
			<div
				className="rounded-xl border border-secondary/60 p-5"
				style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
			>
				{/* Header */}
				<div className="mb-4">
					<span className="text-[0.8125rem] font-bold tracking-[0.06em] text-white uppercase">
						Trees
					</span>
				</div>

				{/* Controls */}
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField value={search} onChange={setSearch} placeholder="Search trees…" />
					<FilterPopover activeCount={activeFilterCount}>
						<FilterGroup label="Type">
							{(["all", "fruit-tree", "wild-tree"] as const).map((key) => (
								<FilterRadio key={key} name="tree-type" value={key} checked={typeFilter === key} onChange={() => setTypeFilter(key)}>
									{key === "all" ? "All" : key === "fruit-tree" ? "Fruit Trees" : "Wild Trees"}
								</FilterRadio>
							))}
						</FilterGroup>
					</FilterPopover>
				</div>

				{/* Fruit Trees subsection */}
				{showFruit && filteredFruitTrees.length > 0 && (
					<>
						<div className="mb-3 mt-1 flex items-center gap-2">
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
								<FruitTreeCard key={t.id} tree={t} onClick={() => setSelectedTree(t)} />
							))}
						</div>
					</>
				)}

				{/* Wild Trees subsection */}
				{showWild && filteredWildTrees.length > 0 && (
					<>
						<div className={`mb-3 flex items-center gap-2 ${showFruit && filteredFruitTrees.length > 0 ? "mt-5" : "mt-1"}`}>
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
								<WildTreeCard key={t.id} tree={t} onClick={() => setSelectedTree(t)} />
							))}
						</div>
					</>
				)}

				{filteredFruitTrees.length === 0 && filteredWildTrees.length === 0 && (
					<div className="py-8 text-center text-sm text-white/50">No trees match your search.</div>
				)}
			</div>

			<TreeDetailModal
				tree={selectedTree}
				shippableIds={shippableIds}
				gameData={gameData}
				onClose={() => setSelectedTree(null)}
			/>
		</>
	);
}
