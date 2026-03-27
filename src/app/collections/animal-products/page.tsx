"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { AnimalProductsHero } from "@/comps/collections/animal-products/AnimalProductsHero";
import { AnimalProductsSection } from "@/comps/collections/animal-products/AnimalProductsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function AnimalProductsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="animal products" />;
	}

	return (
		<div className="p-6">
			<PageHeader title="Animal Products" description="Farm animal produce, quality sell prices, and shipping progress" />

			<div className="flex flex-col gap-6">
				<AnimalProductsHero gameData={activePlaythrough.data} />
				<AnimalProductsSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
