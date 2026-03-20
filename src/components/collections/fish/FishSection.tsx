"use client";

import { fish, type Fish, type Season } from "stardew-valley-data";
import { useState, useMemo } from "react";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { PriceGrid } from "@/comps/ui/PriceGrid";
import { ShippedBadge } from "@/comps/ui/ShippedBadge";
import { SeasonBadges } from "@/comps/ui/SeasonBadges";
import { ProfessionsButton } from "@/comps/ui/ProfessionsButton";
import { SearchField } from "@/comps/ui/SearchField";
import { FilterPopover, FilterGroup, FilterRadio, FilterSelect } from "@/comps/ui/FilterPopover";
import { FishDetailModal } from "./modals/FishDetailModal";
import {
	getActiveProfessionBonuses,
	applyBestProfessionBonus,
} from "@/lib/utils/professionPrices";

interface Props {
	gameData: GameData;
}

type CaughtFilter = "all" | "caught" | "not-caught";
type CatchTypeFilter = "all" | "rod" | "crab-pot";
type SeasonFilter = Season | "all";
type WeatherFilter = "all" | "sunny" | "rainy" | "both";
type DifficultyFilter = "all" | "easy" | "medium" | "hard";

const WEATHER_LABELS: Record<string, string> = {
	sunny: "Sunny",
	rainy: "Rainy",
	both: "Any",
};

const allFish = fish().get();

const uniqueLocations = Array.from(new Set(allFish.map((f) => f.location))).sort();

function DifficultyBar({ value }: { value: number }) {
	const level = value <= 33 ? "easy" : value <= 66 ? "medium" : "hard";
	const color =
		level === "easy" ? "#4a7c31" : level === "medium" ? "#c0963a" : "#ef4444";
	const textColor =
		level === "easy" ? "text-green-400" : level === "medium" ? "text-yellow-400" : "text-red-400";
	return (
		<div className="flex items-center gap-2">
			<span className="w-11 shrink-0 text-right text-[0.55rem] font-semibold tracking-wide text-white/40 uppercase">
				Diff.
			</span>
			<div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
				<div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
			</div>
			<span className={`w-6 shrink-0 text-right text-[0.65rem] font-bold ${textColor}`}>
				{value}
			</span>
		</div>
	);
}

interface FishCardProps {
	fish: Fish;
	caught: boolean;
	professionBonus?: ReturnType<typeof applyBestProfessionBonus>;
	onClick: () => void;
}

function FishCard({ fish, caught, professionBonus = null, onClick }: FishCardProps) {
	const isRod = fish.catchType === "rod";

	return (
		<button
			onClick={onClick}
			className={`flex w-full cursor-pointer flex-col gap-2 rounded-xl border p-3 text-left transition-all ${
				caught ? "border-green-500/40 bg-green-900/20" : "border-white/10 bg-white/5"
			}`}
		>
			{/* Top row */}
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(fish.image)}
					alt={fish.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<span
						className={`text-sm font-bold leading-tight ${caught ? "text-green-300" : "text-white"}`}
					>
						{fish.name}
					</span>
					<div className="mt-1 flex flex-wrap gap-1">
						{fish.seasons.length === 0 ? (
							<span className="rounded bg-white/10 px-1.5 py-0.5 text-[0.55rem] font-semibold text-white/60">
								All Seasons
							</span>
						) : (
							<SeasonBadges seasons={fish.seasons} />
						)}
					</div>
				</div>
				<ShippedBadge shippable={true} shipped={caught} label="Caught" notLabel="Not Caught" />
			</div>

			{/* Catch type + location */}
			<div className="flex flex-wrap items-center gap-1">
				<span
					className={`rounded px-1.5 py-0.5 text-[0.6rem] font-semibold ${
						isRod
							? "bg-accent/15 text-accent border border-accent/25"
							: "border border-blue-400/25 bg-blue-400/15 text-blue-300"
					}`}
				>
					{isRod ? "Rod" : "Crab-Pot"}
				</span>
				<span className="text-[0.6rem] text-white/80">{fish.location}</span>
			</div>

			{/* Weather + time (rod only) */}
			{isRod && (fish.weather || fish.time) && (
				<div className="flex flex-wrap gap-1.5">
					{fish.weather && (
						<span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.6rem] font-semibold text-white/60">
							{WEATHER_LABELS[fish.weather] ?? fish.weather}
						</span>
					)}
					{fish.time && (
						<span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.6rem] font-semibold text-white/60">
							{fish.time}
						</span>
					)}
				</div>
			)}

			{/* Difficulty bar (rod only) */}
			{isRod && fish.difficulty != null && (
				<DifficultyBar value={fish.difficulty} />
			)}

			{/* Price grid */}
			<PriceGrid
				price={fish.sellPrice}
				maxQuality={fish.maxQuality}
				shipped={caught}
				professionBonus={professionBonus}
			/>
		</button>
	);
}

export function FishSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [caughtFilter, setCaughtFilter] = useState<CaughtFilter>("all");
	const [catchTypeFilter, setCatchTypeFilter] = useState<CatchTypeFilter>("all");
	const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>("all");
	const [weatherFilter, setWeatherFilter] = useState<WeatherFilter>("all");
	const [locationFilter, setLocationFilter] = useState("all");
	const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");
	const [showProfessionPrices, setShowProfessionPrices] = useState(false);
	const [selectedFish, setSelectedFish] = useState<Fish | null>(null);

	const activeProfessionBonuses = getActiveProfessionBonuses(gameData);
	const hasFishingProfession =
		activeProfessionBonuses.has("fisher") || activeProfessionBonuses.has("angler");

	const activeFilterCount = [
		caughtFilter !== "all",
		catchTypeFilter !== "all",
		seasonFilter !== "all",
		weatherFilter !== "all",
		locationFilter !== "all",
		difficultyFilter !== "all",
	].filter(Boolean).length;

	const filtered = useMemo(() => {
		return allFish
			.filter((f) => !search || f.name.toLowerCase().includes(search.toLowerCase()))
			.filter((f) => {
				const caught = gameData.fishCaught.some((c) => c.id === f.id);
				if (caughtFilter === "caught") return caught;
				if (caughtFilter === "not-caught") return !caught;
				return true;
			})
			.filter((f) => catchTypeFilter === "all" || f.catchType === catchTypeFilter)
			.filter((f) => seasonFilter === "all" || f.seasons.includes(seasonFilter as Season))
			.filter((f) => {
				if (weatherFilter === "all") return true;
				return f.weather === weatherFilter;
			})
			.filter((f) => locationFilter === "all" || f.location === locationFilter)
			.filter((f) => {
				if (difficultyFilter === "all") return true;
				if (f.difficulty == null) return false;
				if (difficultyFilter === "easy") return f.difficulty <= 33;
				if (difficultyFilter === "medium") return f.difficulty >= 34 && f.difficulty <= 66;
				if (difficultyFilter === "hard") return f.difficulty >= 67;
				return true;
			});
	}, [search, caughtFilter, catchTypeFilter, seasonFilter, weatherFilter, locationFilter, difficultyFilter, gameData.fishCaught]);

	const caughtCount = allFish.filter((f) =>
		gameData.fishCaught.some((c) => c.id === f.id)
	).length;

	const selectedFishCaught = selectedFish
		? gameData.fishCaught.some((c) => c.id === selectedFish.id)
		: false;

	return (
		<>
			<div
				className="border-secondary/60 rounded-xl border p-5"
				style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
			>
				{/* Header */}
				<div className="mb-4 flex items-center justify-between">
					<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
						Fish
					</h3>
					<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-semibold">
						{caughtCount} / {allFish.length} caught
					</span>
				</div>

				{/* Controls */}
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField value={search} onChange={setSearch} placeholder="Search fish…" />
					<FilterPopover activeCount={activeFilterCount}>
						<div className="flex flex-col gap-3">
							<FilterGroup label="Caught">
								{(["all", "caught", "not-caught"] as CaughtFilter[]).map((v) => (
									<FilterRadio
										key={v}
										name="fish-caught"
										value={v}
										checked={caughtFilter === v}
										onChange={() => setCaughtFilter(v)}
									>
										{v === "all" ? "All" : v === "caught" ? "Caught" : "Not Caught"}
									</FilterRadio>
								))}
							</FilterGroup>
							<FilterGroup label="Catch Type">
								{(["all", "rod", "crab-pot"] as CatchTypeFilter[]).map((v) => (
									<FilterRadio
										key={v}
										name="fish-catchtype"
										value={v}
										checked={catchTypeFilter === v}
										onChange={() => setCatchTypeFilter(v)}
									>
										{v === "all" ? "All" : v === "rod" ? "Rod" : "Crab-Pot"}
									</FilterRadio>
								))}
							</FilterGroup>
							<FilterGroup label="Season">
								{(["all", "spring", "summer", "fall", "winter", "ginger island"] as SeasonFilter[]).map((v) => (
									<FilterRadio
										key={v}
										name="fish-season"
										value={v}
										checked={seasonFilter === v}
										onChange={() => setSeasonFilter(v)}
									>
										{v === "all" ? "All" : v === "ginger island" ? "Ginger Island" : v.charAt(0).toUpperCase() + v.slice(1)}
									</FilterRadio>
								))}
							</FilterGroup>
							<FilterGroup label="Weather">
								{(["all", "sunny", "rainy", "both"] as WeatherFilter[]).map((v) => (
									<FilterRadio
										key={v}
										name="fish-weather"
										value={v}
										checked={weatherFilter === v}
										onChange={() => setWeatherFilter(v)}
									>
										{v === "all" ? "All" : v === "both" ? "Any" : v.charAt(0).toUpperCase() + v.slice(1)}
									</FilterRadio>
								))}
							</FilterGroup>
							<FilterSelect
								label="Location"
								value={locationFilter}
								onChange={setLocationFilter}
								options={[
									{ value: "all", label: "All Locations" },
									...uniqueLocations.map((loc) => ({ value: loc, label: loc })),
								]}
							/>
							<FilterGroup label="Difficulty">
								{(["all", "easy", "medium", "hard"] as DifficultyFilter[]).map((v) => (
									<FilterRadio
										key={v}
										name="fish-difficulty"
										value={v}
										checked={difficultyFilter === v}
										onChange={() => setDifficultyFilter(v)}
									>
										{v === "all"
											? "All"
											: v === "easy"
												? "Easy (≤33)"
												: v === "medium"
													? "Medium (34–66)"
													: "Hard (≥67)"}
									</FilterRadio>
								))}
							</FilterGroup>
						</div>
					</FilterPopover>
					{hasFishingProfession && (
						<ProfessionsButton
							active={showProfessionPrices}
							onClick={() => setShowProfessionPrices(!showProfessionPrices)}
						/>
					)}
				</div>

				{/* Grid */}
				{filtered.length === 0 ? (
					<p className="py-8 text-center text-sm text-white/40">
						No fish match your filters.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((f) => (
							<FishCard
								key={f.id}
								fish={f}
								caught={gameData.fishCaught.some((c) => c.id === f.id)}
								professionBonus={
									showProfessionPrices && f.profession.length > 0
										? applyBestProfessionBonus(f.sellPrice, f.profession, activeProfessionBonuses)
										: null
								}
								onClick={() => setSelectedFish(f)}
							/>
						))}
					</div>
				)}
			</div>

			<FishDetailModal
				fish={selectedFish}
				caught={selectedFishCaught}
				onClose={() => setSelectedFish(null)}
				activeProfessionBonuses={showProfessionPrices ? activeProfessionBonuses : null}
			/>
		</>
	);
}
