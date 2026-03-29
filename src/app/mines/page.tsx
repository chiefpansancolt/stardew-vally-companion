"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { MinesHero } from "@/comps/mines/MinesHero";
import { MonstersSection } from "@/comps/mines/MonstersSection";
import { SlayerGoalsSection } from "@/comps/mines/SlayerGoalsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function MinesPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="mines & monsters" />;
	}

	return (
		<div className="p-6">
			<PageHeader
				title="Mines & Monsters"
				description="Mine progress, slayer goals, and monster bestiary"
			/>

			<div className="flex flex-col gap-6">
				<MinesHero gameData={activePlaythrough.data} />
				<SlayerGoalsSection gameData={activePlaythrough.data} />
				<MonstersSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
