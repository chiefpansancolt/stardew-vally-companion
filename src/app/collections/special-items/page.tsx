"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { SpecialItemsHero } from "@/comps/collections/special-items/SpecialItemsHero";
import { SpecialItemsSection } from "@/comps/collections/special-items/SpecialItemsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function SpecialItemsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="special items" />;
	}

	return (
		<div className="p-6">
			<PageHeader title="Special Items" description="Powers, books, and mastery unlocks" />

			<div className="flex flex-col gap-6">
				<SpecialItemsHero gameData={activePlaythrough.data} />
				<SpecialItemsSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
