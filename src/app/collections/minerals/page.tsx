"use client";

import { Card } from "flowbite-react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { MineralsHero } from "@/comps/collections/minerals/MineralsHero";
import { MineralItemsSection } from "@/comps/collections/minerals/MineralItemsSection";
import { GeodesSection } from "@/comps/collections/minerals/GeodesSection";
import { OresSection } from "@/comps/collections/minerals/OresSection";
import { BarsSection } from "@/comps/collections/minerals/BarsSection";
import { NodesSection } from "@/comps/collections/minerals/NodesSection";

export default function MineralsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return (
			<div className="p-6">
				<Card className="py-16 text-center">
					<div className="mx-auto max-w-md">
						<h2 className="mb-2 text-xl font-semibold text-gray-700">
							No Active Playthrough
						</h2>
						<p className="text-gray-500">
							Select or create a playthrough to view minerals.
						</p>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Minerals</h1>
				<p className="mt-1 text-gray-600">
					Mine collectibles — track gems, geodes, ores, bars, and mining nodes
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<MineralsHero gameData={activePlaythrough.data} />
				<MineralItemsSection gameData={activePlaythrough.data} />
				<GeodesSection />
				<OresSection gameData={activePlaythrough.data} />
				<BarsSection gameData={activePlaythrough.data} />
				<NodesSection />
			</div>
		</div>
	);
}
