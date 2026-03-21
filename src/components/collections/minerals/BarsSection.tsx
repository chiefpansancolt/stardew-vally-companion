"use client";

import { minerals, type BarItem, type OreItem } from "stardew-valley-data";
import { useState, useMemo } from "react";
import { HiCheck } from "react-icons/hi";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { PriceGrid } from "@/comps/ui/PriceGrid";
import { SearchField } from "@/comps/ui/SearchField";
import { FilterPopover, FilterGroup, FilterRadio } from "@/comps/ui/FilterPopover";
import { ProfessionsButton } from "@/comps/ui/ProfessionsButton";
import {
	getActiveProfessionBonuses,
	applyBestProfessionBonus,
	type BonusResult,
} from "@/lib/utils/professionPrices";
import { BarDetailModal } from "./modals/BarDetailModal";

interface Props {
	gameData: GameData;
}

type ShippedFilter = "all" | "shipped" | "not-shipped";

const allBars = minerals().bars().get() as BarItem[];

const oreNameById: Record<string, string> = {};
for (const ore of minerals().ores().get() as OreItem[]) {
	oreNameById[ore.id] = ore.name;
}

function BarStatusBadge({ shipped }: { shipped: boolean }) {
	if (shipped) {
		return (
			<span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-green-500/30 bg-green-500/20 px-2 py-0.5 text-[0.6rem] font-bold text-green-300">
				<HiCheck className="h-2.5 w-2.5" /> Shipped
			</span>
		);
	}
	return (
		<span className="inline-flex shrink-0 items-center rounded-full border border-white/10 bg-white/6 px-2 py-0.5 text-[0.6rem] font-bold text-white/40">
			Not Shipped
		</span>
	);
}

interface CardProps {
	bar: BarItem;
	shipped: boolean;
	professionBonus: BonusResult | null;
	onClick: () => void;
}

function BarCard({ bar, shipped, professionBonus, onClick }: CardProps) {
	const borderBg = shipped ? "border-green-500/40 bg-green-900/20" : "border-white/10 bg-white/5";
	const nameColor = shipped ? "text-green-300" : "text-white";
	const firstRecipe = bar.smeltRecipes[0];

	return (
		<button
			onClick={onClick}
			className={`flex w-full cursor-pointer flex-col gap-2 rounded-xl border p-3 text-left transition-all ${borderBg}`}
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(bar.image)}
					alt={bar.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<span className={`text-sm font-bold leading-tight ${nameColor}`}>{bar.name}</span>
					{firstRecipe && (
						<div className="mt-0.5 text-[0.6rem] text-white/40">
							{firstRecipe.oreQty}× {oreNameById[firstRecipe.ore] ?? firstRecipe.ore} +{" "}
							{firstRecipe.coalQty}× Coal · {firstRecipe.timeMinutes} min
						</div>
					)}
				</div>
				<BarStatusBadge shipped={shipped} />
			</div>
			<PriceGrid
				price={bar.sellPrice}
				maxQuality="normal"
				shipped={shipped}
				professionBonus={professionBonus}
			/>
		</button>
	);
}

export function BarsSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [shippedFilter, setShippedFilter] = useState<ShippedFilter>("all");
	const [showProfessions, setShowProfessions] = useState(false);
	const [selectedBar, setSelectedBar] = useState<BarItem | null>(null);

	const shippedCount = allBars.filter((b) => gameData.shipped[b.id]?.shipped === true).length;

	const activeBonuses = useMemo(
		() => (showProfessions ? getActiveProfessionBonuses(gameData) : new Set()),
		[showProfessions, gameData],
	);

	const filtered = useMemo(() => {
		return allBars
			.filter((b) => !search || b.name.toLowerCase().includes(search.toLowerCase()))
			.filter((b) => {
				const shipped = gameData.shipped[b.id]?.shipped === true;
				if (shippedFilter === "shipped") return shipped;
				if (shippedFilter === "not-shipped") return !shipped;
				return true;
			});
	}, [search, shippedFilter, gameData.shipped]);

	const selectedShipped = selectedBar
		? gameData.shipped[selectedBar.id]?.shipped === true
		: false;
	const selectedBonus = selectedBar
		? applyBestProfessionBonus(
				selectedBar.sellPrice,
				selectedBar.profession,
				activeBonuses as ReturnType<typeof getActiveProfessionBonuses>,
			)
		: null;

	return (
		<>
			<div
				className="border-secondary/60 rounded-xl border p-5"
				style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
			>
				<div className="mb-4 flex items-center justify-between">
					<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
						Bars
					</h3>
					<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-semibold">
						{shippedCount} / {allBars.length} shipped
					</span>
				</div>

				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField value={search} onChange={setSearch} placeholder="Search bars…" />
					<FilterPopover activeCount={shippedFilter !== "all" ? 1 : 0}>
						<FilterGroup label="Shipped Status">
							{(["all", "shipped", "not-shipped"] as ShippedFilter[]).map((v) => (
								<FilterRadio
									key={v}
									name="bar-shipped"
									value={v}
									checked={shippedFilter === v}
									onChange={() => setShippedFilter(v)}
								>
									{v === "all" ? "All" : v === "shipped" ? "Shipped" : "Not Shipped"}
								</FilterRadio>
							))}
						</FilterGroup>
					</FilterPopover>
					<ProfessionsButton
						active={showProfessions}
						onClick={() => setShowProfessions((p) => !p)}
					/>
				</div>

				{filtered.length === 0 ? (
					<p className="py-8 text-center text-sm text-white/40">No bars match your filters.</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((b) => {
							const shipped = gameData.shipped[b.id]?.shipped === true;
							const bonus = showProfessions
								? applyBestProfessionBonus(
										b.sellPrice,
										b.profession,
										activeBonuses as ReturnType<typeof getActiveProfessionBonuses>,
									)
								: null;
							return (
								<BarCard
									key={b.id}
									bar={b}
									shipped={shipped}
									professionBonus={bonus}
									onClick={() => setSelectedBar(b)}
								/>
							);
						})}
					</div>
				)}
			</div>

			<BarDetailModal
				bar={selectedBar}
				shipped={selectedShipped}
				professionBonus={selectedBonus}
				oreNameById={oreNameById}
				onClose={() => setSelectedBar(null)}
			/>
		</>
	);
}
