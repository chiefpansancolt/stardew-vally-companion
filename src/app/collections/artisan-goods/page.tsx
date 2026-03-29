"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { ArtisanGoodsHero } from "@/comps/collections/artisan-goods/ArtisanGoodsHero";
import { ArtisanGoodsSection } from "@/comps/collections/artisan-goods/ArtisanGoodsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function ArtisanGoodsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="artisan goods" />;
	}

	return (
		<div className="p-6">
			<PageHeader
				title="Artisan Goods"
				description="Processed goods, equipment sources, sell prices, and shipping progress"
			/>

			<div className="flex flex-col gap-6">
				<ArtisanGoodsHero gameData={activePlaythrough.data} />
				<ArtisanGoodsSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
