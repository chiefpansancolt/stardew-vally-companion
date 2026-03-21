"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { FishHero } from "@/comps/collections/fish/FishHero";
import { FishSection } from "@/comps/collections/fish/FishSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function FishPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="fish" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Fish</h1>
				<p className="mt-1 text-gray-600">
					All catchable fish with locations, seasons, difficulty, and sell prices
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<FishHero gameData={activePlaythrough.data} />
				<FishSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
