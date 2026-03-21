"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { CookingHero } from "@/comps/collections/cooking/CookingHero";
import { CookingSection } from "@/comps/collections/cooking/CookingSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function CookingPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="cooking" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Cooking</h1>
				<p className="mt-1 text-gray-600">
					Cooking recipes, ingredients, buffs, and progress
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<CookingHero gameData={activePlaythrough.data} />
				<CookingSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
