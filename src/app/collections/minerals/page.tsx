"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { BarsSection } from "@/comps/collections/minerals/BarsSection";
import { GeodesSection } from "@/comps/collections/minerals/GeodesSection";
import { MineralItemsSection } from "@/comps/collections/minerals/MineralItemsSection";
import { MineralsHero } from "@/comps/collections/minerals/MineralsHero";
import { NodesSection } from "@/comps/collections/minerals/NodesSection";
import { OresSection } from "@/comps/collections/minerals/OresSection";
import { ResourcesSection } from "@/comps/collections/minerals/ResourcesSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function MineralsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="minerals" />;
	}

	return (
		<div className="p-6">
			<PageHeader title="Minerals" description="Mine collectibles — track gems, geodes, ores, bars, resources, and mining nodes" />

			<div className="flex flex-col gap-6">
				<MineralsHero gameData={activePlaythrough.data} />
				<MineralItemsSection gameData={activePlaythrough.data} />
				<GeodesSection />
				<OresSection gameData={activePlaythrough.data} />
				<BarsSection gameData={activePlaythrough.data} />
				<ResourcesSection gameData={activePlaythrough.data} />
				<NodesSection />
			</div>
		</div>
	);
}
