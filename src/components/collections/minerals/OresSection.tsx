"use client";

import { minerals, type OreItem } from "stardew-valley-data";
import { useMemo, useState } from "react";
import { CollectionProps as Props, type ShippedFilter } from "@/types";
import { applyBestProfessionBonus, getActiveProfessionBonuses } from "@/lib/utils/professionPrices";
import { FilterGroup, FilterPopover, FilterRadio } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { ProfessionsButton } from "@/comps/ui/ProfessionsButton";
import { SearchField } from "@/comps/ui/SearchField";
import { OreCard } from "./cards";
import { OreDetailModal } from "./modals/OreDetailModal";

const allOres = minerals().ores().get() as OreItem[];

export function OresSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [shippedFilter, setShippedFilter] = useState<ShippedFilter>("all");
	const [showProfessions, setShowProfessions] = useState(false);
	const [selectedOre, setSelectedOre] = useState<OreItem | null>(null);

	const shippedCount = allOres.filter((o) => gameData.shipped[o.id]?.shipped === true).length;

	const activeBonuses = useMemo(
		() => (showProfessions ? getActiveProfessionBonuses(gameData) : new Set()),
		[showProfessions, gameData]
	);

	const filtered = useMemo(() => {
		return allOres
			.filter((o) => !search || o.name.toLowerCase().includes(search.toLowerCase()))
			.filter((o) => {
				const shipped = gameData.shipped[o.id]?.shipped === true;
				if (shippedFilter === "shipped") return shipped;
				if (shippedFilter === "not-shipped") return !shipped;
				return true;
			});
	}, [search, shippedFilter, gameData.shipped]);

	const selectedShipped = selectedOre
		? gameData.shipped[selectedOre.id]?.shipped === true
		: false;
	const selectedBonus = selectedOre
		? applyBestProfessionBonus(
				selectedOre.sellPrice,
				selectedOre.profession,
				activeBonuses as ReturnType<typeof getActiveProfessionBonuses>
			)
		: null;

	return (
		<>
			<NavySection title="Ores" badge={`${shippedCount} / ${allOres.length} shipped`}>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField value={search} onChange={setSearch} placeholder="Search ores…" />
					<FilterPopover activeCount={shippedFilter !== "all" ? 1 : 0}>
						<FilterGroup label="Shipped Status">
							{(["all", "shipped", "not-shipped"] as ShippedFilter[]).map((v) => (
								<FilterRadio
									key={v}
									name="ore-shipped"
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
						No ores match your filters.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((o) => {
							const shipped = gameData.shipped[o.id]?.shipped === true;
							const bonus = showProfessions
								? applyBestProfessionBonus(
										o.sellPrice,
										o.profession,
										activeBonuses as ReturnType<
											typeof getActiveProfessionBonuses
										>
									)
								: null;
							return (
								<OreCard
									key={o.id}
									ore={o}
									shipped={shipped}
									professionBonus={bonus}
									onClick={() => setSelectedOre(o)}
								/>
							);
						})}
					</div>
				)}
			</NavySection>

			<OreDetailModal
				ore={selectedOre}
				shipped={selectedShipped}
				professionBonus={selectedBonus}
				onClose={() => setSelectedOre(null)}
			/>
		</>
	);
}
