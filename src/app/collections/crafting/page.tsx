"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { CraftingHero } from "@/comps/collections/crafting/CraftingHero";
import { CraftingSection } from "@/comps/collections/crafting/CraftingSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function CraftingPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="crafting" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Crafting</h1>
				<p className="mt-1 text-gray-600">
					Crafting recipes, ingredients, and progress
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<CraftingHero gameData={activePlaythrough.data} />
				<CraftingSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
