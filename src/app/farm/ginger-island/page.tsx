"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { GingerIslandHero } from "@/comps/farm/ginger-island/GingerIslandHero";
import { IslandUpgradesSection } from "@/comps/farm/ginger-island/IslandUpgradesSection";
import { ParrotCalculatorSection } from "@/comps/farm/ginger-island/ParrotCalculatorSection";
import { WalnutsSection } from "@/comps/farm/ginger-island/WalnutsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function GingerIslandPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="ginger island" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Ginger Island</h1>
				<p className="mt-1 text-gray-600">
					Island upgrades, golden walnuts, and parrot calculator
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<GingerIslandHero gameData={activePlaythrough.data} />
				<IslandUpgradesSection gameData={activePlaythrough.data} />
				<WalnutsSection gameData={activePlaythrough.data} />
				<ParrotCalculatorSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
