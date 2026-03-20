"use client";

import { Card } from "flowbite-react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { ForageablesHero } from "@/comps/collections/forageables/ForageablesHero";
import { ForageablesSection } from "@/comps/collections/forageables/ForageablesSection";
import { TreesSection } from "@/comps/collections/forageables/TreesSection";

export default function ForageablesPage() {
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
							Select or create a playthrough to view forageables.
						</p>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Forageables</h1>
				<p className="mt-1 text-gray-600">
					Wild-gathered items, tree produce, and tapper goods with sell prices and artisan uses.
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<ForageablesHero gameData={activePlaythrough.data} />
				<ForageablesSection gameData={activePlaythrough.data} />
				<TreesSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
