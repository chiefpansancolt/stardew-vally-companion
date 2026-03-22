"use client";

import type { CollectionProps as Props } from "@/types";
import { NavySection } from "@/comps/ui/NavySection";
import { PetCard } from "./cards";

export function PetsSection({ gameData }: Props) {
	if (gameData.pets.length === 0) return null;

	return (
		<NavySection title="Pets" badge={`${gameData.pets.length} pet${gameData.pets.length !== 1 ? "s" : ""}`}>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{gameData.pets.map((pet, i) => (
					<PetCard key={`${pet.name}-${i}`} pet={pet} />
				))}
			</div>
		</NavySection>
	);
}
