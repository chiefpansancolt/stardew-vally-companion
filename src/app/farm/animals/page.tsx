"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { AnimalsHero } from "@/comps/farm/animals/AnimalsHero";
import { FarmAnimalsSection } from "@/comps/farm/animals/FarmAnimalsSection";
import { PetsSection } from "@/comps/farm/animals/PetsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function AnimalsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="animals" />;
	}

	return (
		<div className="p-6">
			<PageHeader title="Animals" description="Your farm animals, pets, and buildings" />

			<div className="flex flex-col gap-6">
				<AnimalsHero gameData={activePlaythrough.data} />
				<FarmAnimalsSection gameData={activePlaythrough.data} />
				<PetsSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
