"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { MonsterLootHero } from "@/comps/collections/monster-loot/MonsterLootHero";
import { MonsterLootSection } from "@/comps/collections/monster-loot/MonsterLootSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function MonsterLootPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="monster loot" />;
	}

	return (
		<div className="p-6">
			<PageHeader
				title="Monster Loot"
				description="Items dropped by monsters and shipping progress"
			/>

			<div className="flex flex-col gap-6">
				<MonsterLootHero gameData={activePlaythrough.data} />
				<MonsterLootSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
