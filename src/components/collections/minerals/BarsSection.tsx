"use client";

import { type BarItem, minerals, type OreItem } from "stardew-valley-data";
import { useMemo, useState } from "react";
import { CollectionProps as Props, type ShippedFilter } from "@/types";
import { applyBestProfessionBonus, getActiveProfessionBonuses } from "@/lib/utils/professionPrices";
import { FilterGroup, FilterPopover, FilterRadio } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { ProfessionsButton } from "@/comps/ui/ProfessionsButton";
import { SearchField } from "@/comps/ui/SearchField";
import { BarCard } from "./cards";
import { BarDetailModal } from "./modals/BarDetailModal";

const allBars = minerals().bars().get() as BarItem[];

const oreNameById: Record<string, string> = {};
for (const ore of minerals().ores().get() as OreItem[]) {
	oreNameById[ore.id] = ore.name;
}

export function BarsSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [shippedFilter, setShippedFilter] = useState<ShippedFilter>("all");
	const [showProfessions, setShowProfessions] = useState(false);
	const [selectedBar, setSelectedBar] = useState<BarItem | null>(null);

	const shippedCount = allBars.filter((b) => gameData.shipped[b.id]?.shipped === true).length;

	const activeBonuses = useMemo(
		() => (showProfessions ? getActiveProfessionBonuses(gameData) : new Set()),
		[showProfessions, gameData]
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
				activeBonuses as ReturnType<typeof getActiveProfessionBonuses>
			)
		: null;

	return (
		<>
			<NavySection title="Bars" badge={`${shippedCount} / ${allBars.length} shipped`}>
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
									{v === "all"
										? "All"
										: v === "shipped"
											? "Shipped"
											: "Not Shipped"}
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
					<p className="py-8 text-center text-sm text-white/40">
						No bars match your filters.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((b) => {
							const shipped = gameData.shipped[b.id]?.shipped === true;
							const bonus = showProfessions
								? applyBestProfessionBonus(
										b.sellPrice,
										b.profession,
										activeBonuses as ReturnType<
											typeof getActiveProfessionBonuses
										>
									)
								: null;
							return (
								<BarCard
									key={b.id}
									bar={b}
									shipped={shipped}
									professionBonus={bonus}
									onClick={() => setSelectedBar(b)}
									oreNameById={oreNameById}
								/>
							);
						})}
					</div>
				)}
			</NavySection>

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
