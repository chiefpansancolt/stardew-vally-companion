"use client";

import { artisanGoods, collections } from "stardew-valley-data";
import { FaCheese } from "react-icons/fa";
import { type GameData } from "@/types/app/game";
import { StatTile } from "@/comps/ui/StatTile";

interface Props {
	gameData: GameData;
}

export function ArtisanGoodsHero({ gameData }: Props) {
	const allGoods = artisanGoods().get();
	const shippableIds = new Set(
		collections()
			.itemsShipped()
			.get()
			.map((x) => x.id)
	);
	const shippableGoods = allGoods.filter((g) => shippableIds.has(g.id));

	const equipmentTypes = new Set(allGoods.map((g) => g.equipment)).size;
	const shippedCount = shippableGoods.filter(
		(g) => gameData.shipped[g.id]?.shipped === true
	).length;

	const stats = [
		{ label: "Equipment Types", value: equipmentTypes },
		{ label: "Artisan Goods", value: allGoods.length },
		{ label: "Shipped", value: `${shippedCount} / ${shippableGoods.length}`, colored: true },
	];

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<FaCheese className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Artisan Goods Summary</div>
					<div className="mt-0.5 text-sm text-gray-500">
						{gameData.character.name} · {gameData.character.farmName} Farm
					</div>
				</div>
			</div>
			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
			>
				{stats.map(({ label, value, colored }) => (
					<StatTile key={label} label={label} value={value} colored={colored} />
				))}
			</div>
		</div>
	);
}
