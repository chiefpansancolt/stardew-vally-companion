"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { MinesHero } from "@/comps/mines/MinesHero";
import { MonstersSection } from "@/comps/mines/MonstersSection";
import { SlayerGoalsSection } from "@/comps/mines/SlayerGoalsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function MinesPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="mines & monsters" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Mines & Monsters</h1>
				<p className="mt-1 text-gray-600">
					Mine progress, slayer goals, and monster bestiary
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<MinesHero gameData={activePlaythrough.data} />
				<SlayerGoalsSection gameData={activePlaythrough.data} />
				<MonstersSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
