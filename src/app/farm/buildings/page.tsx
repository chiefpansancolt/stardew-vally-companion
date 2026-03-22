"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { BuildingsHero } from "@/comps/farm/buildings/BuildingsHero";
import { BuildingsSection } from "@/comps/farm/buildings/BuildingsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function BuildingsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="buildings" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Buildings</h1>
				<p className="mt-1 text-gray-600">Farm buildings, costs, and housed animals</p>
			</div>

			<div className="flex flex-col gap-6">
				<BuildingsHero gameData={activePlaythrough.data} />
				<BuildingsSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
