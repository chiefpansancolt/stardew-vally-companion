"use client";

import { Card } from "flowbite-react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { BirthdaysSection } from "@/comps/villagers/BirthdaysSection";
import { VillagersHeroCard } from "@/comps/villagers/VillagersHeroCard";
import { VillagersSection } from "@/comps/villagers/VillagersSection";

export default function VillagersPage() {
	const { activePlaythrough } = usePlaythrough();
	console.log("Active Playthrough: ", activePlaythrough);

	if (!activePlaythrough) {
		return (
			<div className="p-6">
				<Card className="py-16 text-center">
					<div className="mx-auto max-w-md">
						<h2 className="mb-2 text-xl font-semibold text-gray-700">
							No Active Playthrough
						</h2>
						<p className="text-gray-500">
							Select or create a playthrough to view villager details.
						</p>
					</div>
				</Card>
			</div>
		);
	}

	const gameData = activePlaythrough.data;

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Villagers</h1>
				<p className="mt-1 text-gray-600">
					Friendships, heart events, birthdays, and gift preferences
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<VillagersHeroCard gameData={gameData} />
				<VillagersSection gameData={gameData} />
				<BirthdaysSection gameData={gameData} />
			</div>
		</div>
	);
}
