"use client";

import { type Crop, crops, QualityCalculator } from "stardew-valley-data";
import { useState, useRef, useEffect } from "react";
import { HiCheck, HiAdjustments } from "react-icons/hi";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { CropDetailModal } from "./modals/CropDetailModal";

interface Props {
	gameData: GameData;
}

type Season = "spring" | "summer" | "fall" | "winter";
type ShippedFilter = "all" | "shipped" | "not-shipped";
type RegrowthFilter = "all" | "regrowing" | "non-regrowing";
type TraitFilter = "all" | "yes" | "no";

const calc = new QualityCalculator();

const SEASON_ICONS: Record<Season, string> = {
	spring: "images/misc/Spring.png",
	summer: "images/misc/Summer.png",
	fall: "images/misc/Fall.png",
	winter: "images/misc/Winter.png",
};

const SEASON_COLORS: Record<Season, string> = {
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
	const cheapestSeed =
		crop.seedBuyPrices.length > 0
			? Math.min(...crop.seedBuyPrices.map((b) => b.price))
			: null;

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
						{crop.seasons.map((s) => (
							<img
								key={s}
								src={assetPath(SEASON_ICONS[s as Season])}
								alt={s}
								className="h-4 w-4 object-contain"
								onError={(e) => {
									(e.target as HTMLImageElement).style.display = "none";
								}}
							/>
						))}
					</div>
				</div>
				{/* Badge area */}
				<div className="flex shrink-0 flex-col items-end gap-1">
					{shipped ? (
						<span className="inline-flex items-center gap-1 rounded-full bg-green-800 px-2 py-0.5 text-[0.65rem] font-bold text-green-300">
							<HiCheck className="h-3 w-3" /> Shipped
						</span>
					) : (
						<span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] font-bold text-white/80">
							Not Shipped
						</span>
					)}
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
			<div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
				<div className="flex items-center gap-1.5">
					{crop.seedImage ? (
						<img
							src={assetPath(crop.seedImage)}
							alt={crop.seedName}
							className="h-5 w-5 object-contain"
						/>
					) : (
						<div className="h-5 w-5" />
					)}
					<span className="text-xs text-white">{crop.seedName}</span>
				</div>
				{crop.seedBuyPrices.length > 0 && (
					<div className="flex gap-3">
						{crop.seedBuyPrices.map((bp) => (
							<div key={bp.place} className="flex flex-col items-end">
								<span className="text-[0.5rem] font-semibold tracking-wide text-white/80 uppercase">
									{bp.place}
								</span>
								<span className="text-[0.7rem] font-bold text-accent">{bp.price}g</span>
							</div>
						))}
					</div>
				)}
				{cheapestSeed === null && (
					<span className="text-[0.65rem] text-white/80">No shop</span>
				)}
			</div>

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
			{crop.maxQuality === "iridium" ? (
				<div className="grid grid-cols-4 overflow-hidden rounded-lg border border-white/10">
					<div className="flex flex-col items-center gap-0.5 border-r border-white/10 bg-white/5 px-1 py-1.5">
						<span className="text-[0.55rem] font-semibold tracking-wide text-white uppercase">
							Basic
						</span>
						<span className={`text-xs font-bold ${shipped ? "text-green-300" : "text-white/80"}`}>
							{crop.cropSellPrice}g
						</span>
					</div>
					{calc.sellPrices(crop.cropSellPrice).map(({ quality, icon, value }) => (
						<div
							key={quality}
							className="flex flex-col items-center gap-0.5 border-r border-white/10 bg-white/5 px-1 py-1.5 last:border-r-0"
						>
							<img
								src={assetPath(icon)}
								alt={quality}
								className="h-3.5 w-3.5 object-contain"
							/>
							<span className={`text-xs font-bold ${shipped ? "text-green-300" : "text-white/80"}`}>
								{value}g
							</span>
						</div>
					))}
				</div>
			) : (
				<div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
					<span className="text-[0.6rem] font-semibold tracking-wide text-white/50 uppercase">
						Price
					</span>
					<span className={`text-xs font-bold ${shipped ? "text-green-300" : "text-white/80"}`}>
						{crop.cropSellPrice}g
					</span>
				</div>
			)}

			{/* Energy/Health */}
			{hasEnergy && (
				<div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
					<span className="inline-flex items-center gap-1">
						<img
							src={assetPath("images/misc/Energy.png")}
							alt="Energy"
							className="h-3.5 w-3.5 object-contain"
						/>
						<span className="text-xs font-semibold text-yellow-300">
							+{crop.energyHealth!.energy}
						</span>
					</span>
					<span className="inline-flex items-center gap-1">
						<img
							src={assetPath("images/misc/Health.png")}
							alt="Health"
							className="h-3.5 w-3.5 object-contain"
						/>
						<span className="text-xs font-semibold text-red-400">
							+{crop.energyHealth!.health}
						</span>
					</span>
				</div>
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
	const [popoverOpen, setPopoverOpen] = useState(false);
	const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
	const popoverRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
				setPopoverOpen(false);
			}
		}
		if (popoverOpen) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [popoverOpen]);

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
					<input
						type="search"
						placeholder="Search crops…"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						className="flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white placeholder:text-white/80 focus:border-white/40 focus:outline-none"
					/>
					{/* Filter popover */}
					<div className="relative" ref={popoverRef}>
						<button
							onClick={() => setPopoverOpen((o) => !o)}
							className="relative flex cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/15"
						>
							<HiAdjustments className="h-4 w-4" />
							Filters
							{activeFilterCount > 0 && (
								<span className="bg-accent absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[0.6rem] font-bold text-white">
									{activeFilterCount}
								</span>
							)}
						</button>
						{popoverOpen && (
							<div
								className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-white/10 p-4 shadow-xl"
								style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
							>
								{/* Season filter */}
								<div className="mb-4">
									<div className="mb-2 text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
										Season
									</div>
									<div className="flex flex-wrap gap-1.5">
										{(["all", "spring", "summer", "fall", "winter"] as const).map((s) => (
											<label
												key={s}
												className={`group relative flex cursor-pointer items-center rounded-md border px-2.5 py-1 transition-all ${
													seasonFilter === s
														? "border-accent bg-accent text-white"
														: "border-white/20 bg-white/5 text-white/60 hover:border-white/40"
												}`}
											>
												<input
													type="radio"
													name="crop-season"
													value={s}
													checked={seasonFilter === s}
													onChange={() => setSeasonFilter(s)}
													className="absolute inset-0 cursor-pointer appearance-none"
												/>
												{s === "all" ? (
													<span className="text-[0.7rem] font-semibold capitalize">All</span>
												) : (
													<span className={`flex items-center gap-1 text-[0.7rem] font-semibold capitalize ${seasonFilter === s ? "" : SEASON_COLORS[s]}`}>
														<img
															src={assetPath(SEASON_ICONS[s])}
															alt={s}
															className="h-3.5 w-3.5 object-contain"
															onError={(e) => {
																(e.target as HTMLImageElement).style.display = "none";
															}}
														/>
														{s.charAt(0).toUpperCase() + s.slice(1)}
													</span>
												)}
											</label>
										))}
									</div>
								</div>
								{/* Shipped filter */}
								<div className="mb-4">
									<div className="mb-2 text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
										Shipped Status
									</div>
									<div className="flex flex-wrap gap-1.5">
										{(
											[
												{ id: "all", label: "All" },
												{ id: "shipped", label: "Shipped" },
												{ id: "not-shipped", label: "Not Shipped" },
											] as const
										).map(({ id, label }) => (
											<label
												key={id}
												className={`relative flex cursor-pointer items-center rounded-md border px-2.5 py-1 transition-all ${
													shippedFilter === id
														? "border-accent bg-accent text-white"
														: "border-white/20 bg-white/5 text-white/60 hover:border-white/40"
												}`}
											>
												<input
													type="radio"
													name="crop-shipped"
													value={id}
													checked={shippedFilter === id}
													onChange={() => setShippedFilter(id)}
													className="absolute inset-0 cursor-pointer appearance-none"
												/>
												<span className="text-[0.7rem] font-semibold">{label}</span>
											</label>
										))}
									</div>
								</div>
								{/* Regrowth filter */}
								<div>
									<div className="mb-2 text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
										Regrowth
									</div>
									<div className="flex flex-wrap gap-1.5">
										{(
											[
												{ id: "all", label: "All" },
												{ id: "regrowing", label: "Regrowing" },
												{ id: "non-regrowing", label: "Non-Regrowing" },
											] as const
										).map(({ id, label }) => (
											<label
												key={id}
												className={`relative flex cursor-pointer items-center rounded-md border px-2.5 py-1 transition-all ${
													regrowthFilter === id
														? "border-accent bg-accent text-white"
														: "border-white/20 bg-white/5 text-white/60 hover:border-white/40"
												}`}
											>
												<input
													type="radio"
													name="crop-regrowth"
													value={id}
													checked={regrowthFilter === id}
													onChange={() => setRegrowthFilter(id)}
													className="absolute inset-0 cursor-pointer appearance-none"
												/>
												<span className="text-[0.7rem] font-semibold">{label}</span>
											</label>
										))}
									</div>
								</div>
								{/* Trellis filter */}
								<div className="mt-4">
									<div className="mb-2 text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
										Trellis
									</div>
									<div className="flex flex-wrap gap-1.5">
										{(
											[
												{ id: "all", label: "All" },
												{ id: "yes", label: "Trellis" },
												{ id: "no", label: "No Trellis" },
											] as const
										).map(({ id, label }) => (
											<label
												key={id}
												className={`relative flex cursor-pointer items-center rounded-md border px-2.5 py-1 transition-all ${
													trellisFilter === id
														? "border-accent bg-accent text-white"
														: "border-white/20 bg-white/5 text-white/60 hover:border-white/80"
												}`}
											>
												<input
													type="radio"
													name="crop-trellis"
													value={id}
													checked={trellisFilter === id}
													onChange={() => setTrellisFilter(id)}
													className="absolute inset-0 cursor-pointer appearance-none"
												/>
												<span className="text-[0.7rem] font-semibold">{label}</span>
											</label>
										))}
									</div>
								</div>
								{/* Giant filter */}
								<div className="mt-4">
									<div className="mb-2 text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
										Giant
									</div>
									<div className="flex flex-wrap gap-1.5">
										{(
											[
												{ id: "all", label: "All" },
												{ id: "yes", label: "Giant" },
												{ id: "no", label: "No Giant" },
											] as const
										).map(({ id, label }) => (
											<label
												key={id}
												className={`relative flex cursor-pointer items-center rounded-md border px-2.5 py-1 transition-all ${
													giantFilter === id
														? "border-accent bg-accent text-white"
														: "border-white/20 bg-white/5 text-white/60 hover:border-white/80"
												}`}
											>
												<input
													type="radio"
													name="crop-giant"
													value={id}
													checked={giantFilter === id}
													onChange={() => setGiantFilter(id)}
													className="absolute inset-0 cursor-pointer appearance-none"
												/>
												<span className="text-[0.7rem] font-semibold">{label}</span>
											</label>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
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
