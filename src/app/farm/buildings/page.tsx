"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { BuildingsHero } from "@/comps/farm/buildings/BuildingsHero";
import { BuildingsSection } from "@/comps/farm/buildings/BuildingsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function BuildingsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="buildings" />;
	}

	return (
		<div className="p-6">
			<PageHeader title="Buildings" description="Farm buildings, costs, and housed animals" />

			<div className="flex flex-col gap-6">
				<BuildingsHero gameData={activePlaythrough.data} />
				<BuildingsSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
