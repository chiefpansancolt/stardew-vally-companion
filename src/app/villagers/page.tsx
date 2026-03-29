"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";
import { BirthdaysSection } from "@/comps/villagers/BirthdaysSection";
import { VillagersHeroCard } from "@/comps/villagers/VillagersHeroCard";
import { VillagersSection } from "@/comps/villagers/VillagersSection";

export default function VillagersPage() {
	const { activePlaythrough } = usePlaythrough();
	console.log("Active Playthrough: ", activePlaythrough);

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="villagers" />;
	}

	const gameData = activePlaythrough.data;

	return (
		<div className="p-6">
			<PageHeader
				title="Villagers"
				description="Friendships, heart events, birthdays, and gift preferences"
			/>

			<div className="flex flex-col gap-6">
				<VillagersHeroCard gameData={gameData} />
				<VillagersSection gameData={gameData} />
				<BirthdaysSection gameData={gameData} />
			</div>
		</div>
	);
}
