"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { SpecialItemsHero } from "@/comps/collections/special-items/SpecialItemsHero";
import { SpecialItemsSection } from "@/comps/collections/special-items/SpecialItemsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function SpecialItemsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="special items" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Special Items</h1>
				<p className="mt-1 text-gray-600">Powers, books, and mastery unlocks</p>
			</div>

			<div className="flex flex-col gap-6">
				<SpecialItemsHero gameData={activePlaythrough.data} />
				<SpecialItemsSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
