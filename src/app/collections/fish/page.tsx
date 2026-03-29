"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { FishHero } from "@/comps/collections/fish/FishHero";
import { FishSection } from "@/comps/collections/fish/FishSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function FishPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="fish" />;
	}

	return (
		<div className="p-6">
			<PageHeader
				title="Fish"
				description="All catchable fish with locations, seasons, difficulty, and sell prices"
			/>

			<div className="flex flex-col gap-6">
				<FishHero gameData={activePlaythrough.data} />
				<FishSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
