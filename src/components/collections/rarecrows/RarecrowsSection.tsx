"use client";

import { rarecrows } from "stardew-valley-data";
import { useMemo, useState } from "react";
import type { CollectionProps as Props } from "@/types";
import { FilterGroup, FilterPopover, FilterRadio } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { RarecrowCard } from "./cards";

const allRarecrows = rarecrows().sortByNumber().get();

const STATUS_FILTERS = [
	{ id: "all", label: "All" },
	{ id: "obtained", label: "Obtained" },
	{ id: "missing", label: "Missing" },
] as const;

type StatusFilter = (typeof STATUS_FILTERS)[number]["id"];

export function RarecrowsSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

	const obtainedCount = allRarecrows.filter((r) => gameData.rarecrows.includes(r.id)).length;

	const filtered = useMemo(() => {
		return allRarecrows
			.filter((r) => !search || r.name.toLowerCase().includes(search.toLowerCase()))
			.filter((r) => {
				if (statusFilter === "all") return true;
				const obtained = gameData.rarecrows.includes(r.id);
				return statusFilter === "obtained" ? obtained : !obtained;
			});
	}, [search, statusFilter, gameData.rarecrows]);

	const activeFilterCount = [statusFilter !== "all"].filter(Boolean).length;

	return (
		<NavySection title="Rarecrows" badge={`${obtainedCount} / ${allRarecrows.length} obtained`}>
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<SearchField value={search} onChange={setSearch} placeholder="Search rarecrows…" />
				<FilterPopover activeCount={activeFilterCount}>
					<FilterGroup label="Status">
						{STATUS_FILTERS.map(({ id, label }) => (
							<FilterRadio
								key={id}
								name="rarecrow-status"
								value={id}
								checked={statusFilter === id}
								onChange={() => setStatusFilter(id)}
							>
								{label}
							</FilterRadio>
						))}
					</FilterGroup>
				</FilterPopover>
			</div>

			{filtered.length === 0 ? (
				<p className="py-8 text-center text-sm text-white/80">
					No rarecrows match your filters.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{filtered.map((r) => (
						<RarecrowCard
							key={r.id}
							rarecrow={r}
							obtained={gameData.rarecrows.includes(r.id)}
						/>
					))}
				</div>
			)}
		</NavySection>
	);
}
