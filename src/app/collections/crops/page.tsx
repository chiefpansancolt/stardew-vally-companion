"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { CropsHero } from "@/comps/collections/crops/CropsHero";
import { CropsSection } from "@/comps/collections/crops/CropsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function CropsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="crops" />;
	}

	return (
		<div className="p-6">
			<PageHeader
				title="Crops"
				description="Plantable crops, grow times, sell prices, and shipping progress"
			/>

			<div className="flex flex-col gap-6">
				<CropsHero gameData={activePlaythrough.data} />
				<CropsSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
