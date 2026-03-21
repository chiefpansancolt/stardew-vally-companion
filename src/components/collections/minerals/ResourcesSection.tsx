"use client";

import { minerals, type ResourceItem } from "stardew-valley-data";
import { useMemo, useState } from "react";
import type { CollectionProps as Props, ShippedFilter } from "@/types";
import { SHIPPED_FILTERS } from "@/data/constants/filters";
import { FilterGroup, FilterPopover, FilterRadio } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { ResourceCard } from "./cards";
import { ResourceDetailModal } from "./modals/ResourceDetailModal";

const allResources = minerals().resources().get() as ResourceItem[];

export function ResourcesSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [shippedFilter, setShippedFilter] = useState<ShippedFilter>("all");
	const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

	const shippedCount = allResources.filter(
		(r) => gameData.shipped[r.id]?.shipped === true,
	).length;

	const filtered = useMemo(() => {
		return allResources
			.filter((r) => !search || r.name.toLowerCase().includes(search.toLowerCase()))
			.filter((r) => {
				const shipped = gameData.shipped[r.id]?.shipped === true;
				if (shippedFilter === "shipped") return shipped;
				if (shippedFilter === "not-shipped") return !shipped;
				return true;
			});
	}, [search, shippedFilter, gameData.shipped]);

	const selectedShipped = selectedResource
		? gameData.shipped[selectedResource.id]?.shipped === true
		: false;

	return (
		<>
			<NavySection
				title="Resources"
				badge={`${shippedCount} / ${allResources.length} shipped`}
			>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField
						value={search}
						onChange={setSearch}
						placeholder="Search resources…"
					/>
					<FilterPopover activeCount={shippedFilter !== "all" ? 1 : 0}>
						<FilterGroup label="Shipped Status">
							{SHIPPED_FILTERS.map(({ id, label }) => (
								<FilterRadio
									key={id}
									name="resource-shipped"
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
						No resources match your filters.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((r) => (
							<ResourceCard
								key={r.id}
								resource={r}
								shipped={gameData.shipped[r.id]?.shipped === true}
								professionBonus={null}
								onClick={() => setSelectedResource(r)}
							/>
						))}
					</div>
				)}
			</NavySection>

			<ResourceDetailModal
				resource={selectedResource}
				shipped={selectedShipped}
				professionBonus={null}
				onClose={() => setSelectedResource(null)}
			/>
		</>
	);
}
