"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { GingerIslandHero } from "@/comps/farm/ginger-island/GingerIslandHero";
import { IslandUpgradesSection } from "@/comps/farm/ginger-island/IslandUpgradesSection";
import { ParrotCalculatorSection } from "@/comps/farm/ginger-island/ParrotCalculatorSection";
import { WalnutsSection } from "@/comps/farm/ginger-island/WalnutsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function GingerIslandPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="ginger island" />;
	}

	return (
		<div className="p-6">
			<PageHeader
				title="Ginger Island"
				description="Island upgrades, golden walnuts, and parrot calculator"
			/>

			<div className="flex flex-col gap-6">
				<GingerIslandHero gameData={activePlaythrough.data} />
				<IslandUpgradesSection gameData={activePlaythrough.data} />
				<WalnutsSection gameData={activePlaythrough.data} />
				<ParrotCalculatorSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
