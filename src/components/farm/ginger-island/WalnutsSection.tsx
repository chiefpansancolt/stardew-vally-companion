"use client";

import { goldenWalnuts } from "stardew-valley-data";
import { useState } from "react";
import type { CollectionProps as Props, WalnutLocationFilter, WalnutStatusFilter } from "@/types";
import { WALNUT_LOCATIONS } from "@/data/constants/gingerIsland";
import { FilterGroup, FilterPopover, FilterRadio, FilterSelect } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { WalnutCard } from "./cards";

const allWalnuts = goldenWalnuts().get();

export function WalnutsSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [locationFilter, setLocationFilter] = useState<WalnutLocationFilter>("all");
	const [statusFilter, setStatusFilter] = useState<WalnutStatusFilter>("all");

	const foundCount = Object.keys(gameData.goldenWalnuts).length;

	const filtered = allWalnuts
		.filter((w) => {
			if (!search) return true;
			const q = search.toLowerCase();
			return w.name.toLowerCase().includes(q) || w.hint.toLowerCase().includes(q);
		})
		.filter((w) => locationFilter === "all" || w.location === locationFilter)
		.filter((w) => {
			if (statusFilter === "all") return true;
			const found = !!gameData.goldenWalnuts[w.id];
			return statusFilter === "found" ? found : !found;
		});

	const activeFilterCount = [locationFilter !== "all", statusFilter !== "all"].filter(
		Boolean
	).length;

	return (
		<NavySection title="Golden Walnuts" badge={`${foundCount} / ${allWalnuts.length} found`}>
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<SearchField value={search} onChange={setSearch} placeholder="Search walnuts…" />
				<FilterPopover activeCount={activeFilterCount}>
					<div className="flex flex-col gap-3">
						<FilterSelect
							label="Location"
							value={locationFilter}
							onChange={(v) => setLocationFilter(v as WalnutLocationFilter)}
							options={[
								{ value: "all", label: "All Locations" },
								...WALNUT_LOCATIONS.map((l) => ({ value: l, label: l })),
							]}
						/>
						<FilterGroup label="Status">
							{[
								{ id: "all" as const, label: "All" },
								{ id: "found" as const, label: "Found" },
								{ id: "not-found" as const, label: "Not Found" },
							].map(({ id, label }) => (
								<FilterRadio
									key={id}
									name="walnut-status"
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
					No walnuts match your filters.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{filtered.map((w) => (
						<WalnutCard key={w.id} walnut={w} found={!!gameData.goldenWalnuts[w.id]} />
					))}
				</div>
			)}
		</NavySection>
	);
}
