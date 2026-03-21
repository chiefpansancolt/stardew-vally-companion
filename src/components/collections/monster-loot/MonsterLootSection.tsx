"use client";

import { collections, monsterLoot, type MonsterLoot } from "stardew-valley-data";
import { useMemo, useState } from "react";
import type { CollectionProps as Props, ShippedFilter } from "@/types";
import { SHIPPED_FILTERS } from "@/data/constants/filters";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { FilterPopover, FilterGroup, FilterRadio } from "@/comps/ui/filter-popover";
import { MonsterLootCard } from "./cards";
import { MonsterLootDetailModal } from "./modals/MonsterLootDetailModal";

const allLoot = monsterLoot().get();
const shippableIds = new Set(
	collections().itemsShipped().get().map((i) => i.id),
);
const shippableLoot = allLoot.filter((l) => shippableIds.has(l.id));

export function MonsterLootSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [shippedFilter, setShippedFilter] = useState<ShippedFilter>("all");
	const [selectedLoot, setSelectedLoot] = useState<MonsterLoot | null>(null);

	const shippedCount = shippableLoot.filter(
		(l) => gameData.shipped[l.id]?.shipped === true,
	).length;

	const filtered = useMemo(() => {
		return allLoot
			.filter((l) => !search || l.name.toLowerCase().includes(search.toLowerCase()))
			.filter((l) => {
				const isShippable = shippableIds.has(l.id);
				const shipped = gameData.shipped[l.id]?.shipped === true;
				if (shippedFilter === "shipped") return isShippable && shipped;
				if (shippedFilter === "not-shipped") return !isShippable || !shipped;
				return true;
			});
	}, [search, shippedFilter, gameData.shipped]);

	const selectedShipped = selectedLoot
		? gameData.shipped[selectedLoot.id]?.shipped === true
		: false;
	const selectedShippable = selectedLoot ? shippableIds.has(selectedLoot.id) : false;

	return (
		<>
			<NavySection
				title="Monster Loot"
				badge={`${shippedCount} / ${shippableLoot.length} shipped`}
			>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField value={search} onChange={setSearch} placeholder="Search loot…" />
					<FilterPopover activeCount={shippedFilter !== "all" ? 1 : 0}>
						<FilterGroup label="Shipped Status">
							{SHIPPED_FILTERS.map(({ id, label }) => (
								<FilterRadio
									key={id}
									name="loot-shipped"
									value={id}
									checked={shippedFilter === id}
									onChange={() => setShippedFilter(id)}
								>
									{label}
								</FilterRadio>
							))}
						</FilterGroup>
					</FilterPopover>
				</div>

				{filtered.length === 0 ? (
					<p className="py-8 text-center text-sm text-white/40">
						No loot items match your filters.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((l) => (
							<MonsterLootCard
								key={l.id}
								loot={l}
								shipped={gameData.shipped[l.id]?.shipped === true}
								shippable={shippableIds.has(l.id)}
								onClick={() => setSelectedLoot(l)}
							/>
						))}
					</div>
				)}
			</NavySection>

			<MonsterLootDetailModal
				loot={selectedLoot}
				shipped={selectedShipped}
				shippable={selectedShippable}
				onClose={() => setSelectedLoot(null)}
			/>
		</>
	);
}
