"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { CollectionsOverview } from "@/comps/collections/overview/CollectionsOverview";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function CollectionsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="collections" />;
	}

	const gameData = activePlaythrough.data;

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Collections</h1>
				<p className="mt-1 text-gray-600">
					Track your shipped items, fish, artifacts, minerals, cooking, and crafting
					progress
				</p>
			</div>

			<CollectionsOverview gameData={gameData} />
		</div>
	);
}
