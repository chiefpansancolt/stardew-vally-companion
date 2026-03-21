"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { ArtisanGoodsHero } from "@/comps/collections/artisan-goods/ArtisanGoodsHero";
import { ArtisanGoodsSection } from "@/comps/collections/artisan-goods/ArtisanGoodsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function ArtisanGoodsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="artisan goods" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Artisan Goods</h1>
				<p className="mt-1 text-gray-600">
					Processed goods, equipment sources, sell prices, and shipping progress
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<ArtisanGoodsHero gameData={activePlaythrough.data} />
				<ArtisanGoodsSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
