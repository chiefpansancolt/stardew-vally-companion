"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { CraftingHero } from "@/comps/collections/crafting/CraftingHero";
import { CraftingSection } from "@/comps/collections/crafting/CraftingSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function CraftingPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="crafting" />;
	}

	return (
		<div className="p-6">
			<PageHeader
				title="Crafting"
				description="Crafting recipes, ingredients, and progress"
			/>

			<div className="flex flex-col gap-6">
				<CraftingHero gameData={activePlaythrough.data} />
				<CraftingSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
