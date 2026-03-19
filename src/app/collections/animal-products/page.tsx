"use client";

import { Card } from "flowbite-react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { AnimalProductsHero } from "@/comps/collections/animal-products/AnimalProductsHero";
import { AnimalProductsSection } from "@/comps/collections/animal-products/AnimalProductsSection";

export default function AnimalProductsPage() {
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
							Select or create a playthrough to view animal products.
						</p>
					</div>
				</Card>
			</div>
		);
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
