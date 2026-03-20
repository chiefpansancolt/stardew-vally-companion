"use client";

import { Card } from "flowbite-react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { FishHero } from "@/comps/collections/fish/FishHero";
import { FishSection } from "@/comps/collections/fish/FishSection";

export default function FishPage() {
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
							Select or create a playthrough to view fish.
						</p>
					</div>
				</Card>
			</div>
		);
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
