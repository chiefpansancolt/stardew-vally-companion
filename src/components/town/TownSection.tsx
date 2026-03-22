"use client";

import { type GameLocation, locations } from "stardew-valley-data";
import { useState } from "react";
import { NavySection } from "@/comps/ui/NavySection";
import { LocationCard } from "./cards";
import { LocationDetailModal } from "./modals/LocationDetailModal";

const allLocations = locations().get();
const categories = [...new Set(allLocations.map((l) => l.category))];
const locationsByCategory = new Map<string, GameLocation[]>();
for (const cat of categories) {
	locationsByCategory.set(
		cat,
		allLocations.filter((l) => l.category === cat)
	);
}

export function TownSection() {
	const [selectedLocation, setSelectedLocation] = useState<GameLocation | null>(null);

	return (
		<>
			<div className="flex flex-col gap-6">
				{categories.map((cat) => {
					const locs = locationsByCategory.get(cat) ?? [];
					return (
						<NavySection
							key={cat}
							title={cat}
							badge={`${locs.length} location${locs.length !== 1 ? "s" : ""}`}
						>
							<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
								{locs.map((loc) => (
									<LocationCard
										key={loc.id}
										location={loc}
										hasShop={!!loc.shop}
										onClick={() => setSelectedLocation(loc)}
									/>
								))}
							</div>
						</NavySection>
					);
				})}
			</div>

			<LocationDetailModal
				location={selectedLocation}
				onClose={() => setSelectedLocation(null)}
			/>
		</>
	);
}
