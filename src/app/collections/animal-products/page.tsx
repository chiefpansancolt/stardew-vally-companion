"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { AnimalProductsHero } from "@/comps/collections/animal-products/AnimalProductsHero";
import { AnimalProductsSection } from "@/comps/collections/animal-products/AnimalProductsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function AnimalProductsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="animal products" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Animal Products</h1>
				<p className="mt-1 text-gray-600">
					Farm animal produce, quality sell prices, and shipping progress
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<AnimalProductsHero gameData={activePlaythrough.data} />
				<AnimalProductsSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
