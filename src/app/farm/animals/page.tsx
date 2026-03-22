"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { AnimalsHero } from "@/comps/farm/animals/AnimalsHero";
import { FarmAnimalsSection } from "@/comps/farm/animals/FarmAnimalsSection";
import { PetsSection } from "@/comps/farm/animals/PetsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function AnimalsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="animals" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Animals</h1>
				<p className="mt-1 text-gray-600">
					Your farm animals, pets, and buildings
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<AnimalsHero gameData={activePlaythrough.data} />
				<FarmAnimalsSection gameData={activePlaythrough.data} />
				<PetsSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
