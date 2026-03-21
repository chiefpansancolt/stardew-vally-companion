"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { MonsterLootHero } from "@/comps/collections/monster-loot/MonsterLootHero";
import { MonsterLootSection } from "@/comps/collections/monster-loot/MonsterLootSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function MonsterLootPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="monster loot" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Monster Loot</h1>
				<p className="mt-1 text-gray-600">
					Items dropped by monsters and shipping progress
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<MonsterLootHero gameData={activePlaythrough.data} />
				<MonsterLootSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
