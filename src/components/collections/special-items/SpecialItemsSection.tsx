"use client";

import { type SpecialItem, specialItems } from "stardew-valley-data";
import { useMemo, useState } from "react";
import type {
	CollectionProps as Props,
	SpecialItemStatusFilter,
	SpecialItemTypeFilter,
} from "@/types";
import { isSpecialItemAcquired } from "@/lib/pages/special-items";
import { SPECIAL_ITEM_STATUS_FILTERS, SPECIAL_ITEM_TYPE_FILTERS } from "@/data/constants/filters";
import { FilterGroup, FilterPopover, FilterRadio, FilterSelect } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { SpecialItemCard } from "./cards";
import { SpecialItemDetailModal } from "./modals/SpecialItemDetailModal";

const allItems = specialItems().get();
const trackableItems = allItems.filter((i) => i.type !== "skill-book");

export function SpecialItemsSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [typeFilter, setTypeFilter] = useState<SpecialItemTypeFilter>("all");
	const [statusFilter, setStatusFilter] = useState<SpecialItemStatusFilter>("all");
	const [selectedItem, setSelectedItem] = useState<SpecialItem | null>(null);

	const totalAcquired = allItems.filter((i) => {
		const acq = isSpecialItemAcquired(i, gameData);
		return acq === true;
	}).length;

	const filtered = useMemo(() => {
		return allItems
			.filter((i) => !search || i.name.toLowerCase().includes(search.toLowerCase()))
			.filter((i) => typeFilter === "all" || i.type === typeFilter)
			.filter((i) => {
				if (statusFilter === "all") return true;
				const acq = isSpecialItemAcquired(i, gameData);
				if (acq === null) return true;
				return statusFilter === "acquired" ? acq : !acq;
			});
	}, [search, typeFilter, statusFilter, gameData]);

	const activeFilterCount = [typeFilter !== "all", statusFilter !== "all"].filter(Boolean).length;

	const selectedAcquired = selectedItem ? isSpecialItemAcquired(selectedItem, gameData) : null;

	return (
		<>
			<NavySection
				title="Special Items"
				badge={`${totalAcquired} / ${trackableItems.length} collected`}
			>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField value={search} onChange={setSearch} placeholder="Search items…" />
					<FilterPopover activeCount={activeFilterCount}>
						<div className="flex flex-col gap-3">
							<FilterSelect
								label="Type"
								value={typeFilter}
								onChange={(v) => setTypeFilter(v as SpecialItemTypeFilter)}
								options={SPECIAL_ITEM_TYPE_FILTERS.map((f) => ({
									value: f.id,
									label: f.label,
								}))}
							/>
							<FilterGroup label="Status">
								{SPECIAL_ITEM_STATUS_FILTERS.map(({ id, label }) => (
									<FilterRadio
										key={id}
										name="special-item-status"
										value={id}
										checked={statusFilter === id}
										onChange={() => setStatusFilter(id)}
									>
										{label}
									</FilterRadio>
								))}
							</FilterGroup>
						</div>
					</FilterPopover>
				</div>

				{filtered.length === 0 ? (
					<p className="py-8 text-center text-sm text-white/40">
						No items match your filters.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((item) => (
							<SpecialItemCard
								key={item.id}
								item={item}
								acquired={isSpecialItemAcquired(item, gameData)}
								onClick={() => setSelectedItem(item)}
							/>
						))}
					</div>
				)}
			</NavySection>

			<SpecialItemDetailModal
				item={selectedItem}
				acquired={selectedAcquired}
				onClose={() => setSelectedItem(null)}
			/>
		</>
	);
}
