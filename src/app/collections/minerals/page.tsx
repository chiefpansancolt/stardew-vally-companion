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

export default function MineralsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="minerals" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Minerals</h1>
				<p className="mt-1 text-gray-600">
					Mine collectibles — track gems, geodes, ores, bars, resources, and mining nodes
				</p>
			</div>

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
