"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { CookingHero } from "@/comps/collections/cooking/CookingHero";
import { CookingSection } from "@/comps/collections/cooking/CookingSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function CookingPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="cooking" />;
	}

	return (
		<div className="p-6">
			<PageHeader
				title="Cooking"
				description="Cooking recipes, ingredients, buffs, and progress"
			/>

			<div className="flex flex-col gap-6">
				<CookingHero gameData={activePlaythrough.data} />
				<CookingSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
