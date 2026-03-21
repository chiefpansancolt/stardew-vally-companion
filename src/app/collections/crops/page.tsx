"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { CropsHero } from "@/comps/collections/crops/CropsHero";
import { CropsSection } from "@/comps/collections/crops/CropsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function CropsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="crops" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Crops</h1>
				<p className="mt-1 text-gray-600">
					Plantable crops, grow times, sell prices, and shipping progress
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<CropsHero gameData={activePlaythrough.data} />
				<CropsSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
