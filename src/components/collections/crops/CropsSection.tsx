"use client";

import { type Crop, crops, type Season } from "stardew-valley-data";
import { PriceGrid } from "@/comps/ui/PriceGrid";
import { SeedRow } from "@/comps/ui/SeedRow";
import { EnergyHealthGrid } from "@/comps/ui/EnergyHealthGrid";
import { useState } from "react";
import { ShippedBadge } from "@/comps/ui/ShippedBadge";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { SeasonBadges } from "@/comps/ui/SeasonBadges";
import { FilterPopover, FilterGroup, FilterRadio } from "@/comps/ui/FilterPopover";
import { SearchField } from "@/comps/ui/SearchField";
import { CropDetailModal } from "./modals/CropDetailModal";

interface Props {
	gameData: GameData;
}

type ShippedFilter = "all" | "shipped" | "not-shipped";
type RegrowthFilter = "all" | "regrowing" | "non-regrowing";
type TraitFilter = "all" | "yes" | "no";


const SEASON_COLORS: Partial<Record<Season, string>> = {
	spring: "text-green-400",
	summer: "text-yellow-400",
	fall: "text-orange-400",
	winter: "text-blue-400",
};

interface CropCardProps {
	crop: Crop;
	shipped: boolean;
	shippedCount: number;
	onClick: () => void;
}

function CropCard({ crop, shipped, shippedCount, onClick }: CropCardProps) {
	const hasEnergy =
		crop.energyHealth &&
		!crop.energyHealth.poison &&
		((crop.energyHealth.energy ?? 0) > 0 || (crop.energyHealth.health ?? 0) > 0);

	const extraHarvest =
		crop.harvestQuantity.min > 1 || crop.harvestQuantity.max > 1
			? crop.harvestQuantity.min === crop.harvestQuantity.max
				? `×${crop.harvestQuantity.min}`
				: `×${crop.harvestQuantity.min}–${crop.harvestQuantity.max}`
			: null;

	return (
		<div
			className={`flex cursor-pointer flex-col gap-2.5 rounded-xl border p-3 transition-all hover:brightness-110 ${
				shipped
					? "border-green-500/40 bg-green-900/20"
					: "border-white/10 bg-white/5"
			}`}
			onClick={onClick}
		>
			{/* Top row */}
			<div className="flex items-start gap-3">
				<div className="shrink-0">
					{crop.image ? (
						<img
							src={assetPath(crop.image)}
							alt={crop.name}
							className="h-12 w-12 object-contain"
						/>
					) : (
						<div className="h-12 w-12" />
					)}
				</div>
				<div className="min-w-0 flex-1">
					<span
						className={`text-sm font-bold leading-tight ${
							shipped ? "text-green-300" : "text-white"
						}`}
					>
						{crop.name}
					</span>
					<div className="mt-1 flex flex-wrap gap-1">
						<SeasonBadges seasons={crop.seasons} />
					</div>
				</div>
				{/* Badge area */}
				<div className="flex shrink-0 flex-col items-end gap-1">
					<ShippedBadge shippable={true} shipped={shipped} />
					{shipped && shippedCount > 0 && (
						<span className="text-[0.6rem] text-white/80">×{shippedCount} shipped</span>
					)}
					{crop.giant && (
						<span className="rounded-full bg-purple-900/50 px-2 py-0.5 text-[0.6rem] font-semibold text-purple-300">
							Giant
						</span>
					)}
					{crop.trellis && (
						<span className="rounded-full bg-amber-900/50 px-2 py-0.5 text-[0.6rem] font-semibold text-amber-300">
							Trellis
						</span>
					)}
				</div>
			</div>

			{/* Seed row */}
		<SeedRow
				image={crop.seedImage}
				name={crop.seedName}
				prices={crop.seedBuyPrices}
				emptyLabel="No shop"
			/>

			{/* Grow row */}
			<div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
				<span className="flex items-center gap-1">
					<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">Grow</span>
					<span className="text-[0.75rem] font-bold text-white/85">{crop.growDays}d</span>
				</span>
				{crop.regrowDays !== null && (
					<>
						<span className="text-[0.75rem] text-white/85">|</span>
						<span className="flex items-center gap-1">
							<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">Regrow</span>
							<span className="text-[0.75rem] font-bold text-white/85">{crop.regrowDays}d</span>
						</span>
					</>
				)}
				{extraHarvest && (
					<>
						<span className="text-[0.75rem] text-white/85">|</span>
						<span className="flex items-center gap-1">
							<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">Harvest</span>
							<span className="text-[0.75rem] font-bold text-white/85">{extraHarvest}</span>
						</span>
					</>
				)}
			</div>

			{/* Price */}
			<PriceGrid price={crop.cropSellPrice} maxQuality={crop.maxQuality} shipped={shipped} />

			{/* Energy/Health */}
		{hasEnergy && (
			<EnergyHealthGrid
				energy={crop.energyHealth!.energy ?? 0}
				health={crop.energyHealth!.health ?? 0}
				maxQuality={crop.maxQuality}
			/>
		)}
		</div>
	);
}

export function CropsSection({ gameData }: Props) {
	const [searchText, setSearchText] = useState("");
	const [seasonFilter, setSeasonFilter] = useState<Season | "all">("all");
	const [shippedFilter, setShippedFilter] = useState<ShippedFilter>("all");
	const [regrowthFilter, setRegrowthFilter] = useState<RegrowthFilter>("all");
	const [trellisFilter, setTrellisFilter] = useState<TraitFilter>("all");
	const [giantFilter, setGiantFilter] = useState<TraitFilter>("all");
	const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

	const allCrops = crops().get();
	const shippedCount = allCrops.filter(
		(c) => gameData.shipped[c.id]?.shipped === true
	).length;

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
			<div
				className="border-secondary/60 rounded-xl border p-5"
				style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
			>
				{/* Header */}
				<div className="mb-4 flex items-center justify-between">
					<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
						Crops
					</h3>
					<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-semibold">
						{shippedCount} / {allCrops.length} shipped
					</span>
				</div>

				{/* Controls */}
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField value={searchText} onChange={setSearchText} placeholder="Search crops…" />
					{/* Filter popover */}
					<FilterPopover activeCount={activeFilterCount}>
						<FilterGroup label="Season">
							{(["all", "spring", "summer", "fall", "winter"] as const).map((s) => (
								<FilterRadio key={s} name="crop-season" value={s} checked={seasonFilter === s} onChange={() => setSeasonFilter(s)}>
									{s === "all" ? "All" : (
										<span className={`capitalize ${seasonFilter === s ? "" : SEASON_COLORS[s]}`}>
											{s.charAt(0).toUpperCase() + s.slice(1)}
										</span>
									)}
								</FilterRadio>
							))}
						</FilterGroup>
						<FilterGroup label="Shipped Status" className="mt-4">
							{([{id: "all", label: "All"}, {id: "shipped", label: "Shipped"}, {id: "not-shipped", label: "Not Shipped"}] as const).map(({id, label}) => (
								<FilterRadio key={id} name="crop-shipped" value={id} checked={shippedFilter === id} onChange={() => setShippedFilter(id)}>{label}</FilterRadio>
							))}
						</FilterGroup>
						<FilterGroup label="Regrowth" className="mt-4">
							{([{id: "all", label: "All"}, {id: "regrowing", label: "Regrowing"}, {id: "non-regrowing", label: "Non-Regrowing"}] as const).map(({id, label}) => (
								<FilterRadio key={id} name="crop-regrowth" value={id} checked={regrowthFilter === id} onChange={() => setRegrowthFilter(id)}>{label}</FilterRadio>
							))}
						</FilterGroup>
						<FilterGroup label="Trellis" className="mt-4">
							{([{id: "all", label: "All"}, {id: "yes", label: "Trellis"}, {id: "no", label: "No Trellis"}] as const).map(({id, label}) => (
								<FilterRadio key={id} name="crop-trellis" value={id} checked={trellisFilter === id} onChange={() => setTrellisFilter(id)}>{label}</FilterRadio>
							))}
						</FilterGroup>
						<FilterGroup label="Giant" className="mt-4">
							{([{id: "all", label: "All"}, {id: "yes", label: "Giant"}, {id: "no", label: "No Giant"}] as const).map(({id, label}) => (
								<FilterRadio key={id} name="crop-giant" value={id} checked={giantFilter === id} onChange={() => setGiantFilter(id)}>{label}</FilterRadio>
							))}
						</FilterGroup>
					</FilterPopover>
			</div>

			{/* Grid */}
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
								onClick={() => setSelectedCrop(crop)}
							/>
						))}
					</div>
				)}
			</div>

			<CropDetailModal
				crop={selectedCrop}
				gameData={gameData}
				onClose={() => setSelectedCrop(null)}
			/>
		</>
	);
}
