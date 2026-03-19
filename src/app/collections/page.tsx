"use client";

import { Card } from "flowbite-react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { CollectionsOverview } from "@/comps/collections/CollectionsOverview";

export default function CollectionsPage() {
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
							Select or create a playthrough to view your collections.
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
