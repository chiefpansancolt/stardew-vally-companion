"use client";

import { type GeodeContainer, type MineralItem, minerals } from "stardew-valley-data";
import { useMemo, useState } from "react";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { GeodeCard } from "./cards";
import { GeodeDetailModal } from "./modals/GeodeDetailModal";

const allGeodes = minerals().geodes().get() as GeodeContainer[];

const geodeContents: Record<string, MineralItem[]> = {};
for (const geode of allGeodes) {
	geodeContents[geode.id] = minerals()
		.fromGeode(geode.name)
		.mineralItems()
		.get() as MineralItem[];
}

export function GeodesSection() {
	const [search, setSearch] = useState("");
	const [selectedGeode, setSelectedGeode] = useState<GeodeContainer | null>(null);

	const filtered = useMemo(
		() =>
			allGeodes.filter((g) => !search || g.name.toLowerCase().includes(search.toLowerCase())),
		[search]
	);

	const selectedContents = selectedGeode ? (geodeContents[selectedGeode.id] ?? null) : null;

	return (
		<>
			<NavySection title="Geodes" badge={`${allGeodes.length} types`}>
				<div className="mb-4 flex">
					<SearchField value={search} onChange={setSearch} placeholder="Search geodes…" />
				</div>

				{filtered.length === 0 ? (
					<p className="py-8 text-center text-sm text-white/40">
						No geodes match your search.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((g) => (
							<GeodeCard
								key={g.id}
								geode={g}
								contents={geodeContents[g.id] ?? []}
								onClick={() => setSelectedGeode(g)}
							/>
						))}
					</div>
				)}
			</NavySection>

			<GeodeDetailModal
				geode={selectedGeode}
				fallbackContents={selectedContents}
				onClose={() => setSelectedGeode(null)}
			/>
		</>
	);
}
