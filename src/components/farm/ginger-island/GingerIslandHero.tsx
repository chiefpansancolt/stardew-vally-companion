"use client";

import { jojaParrotCalculator } from "stardew-valley-data";
import { GiPalmTree } from "react-icons/gi";
import type { CollectionProps as Props } from "@/types";
import { formatNumber } from "@/lib/utils/formatting";
import { ISLAND_UPGRADES } from "@/data/constants/gingerIsland";
import { StatTile } from "@/comps/ui/StatTile";

const parrot = jojaParrotCalculator();

export function GingerIslandHero({ gameData }: Props) {
	const walnutsFound =
		gameData.goldenWalnutsFound > 0
			? gameData.goldenWalnutsFound
			: Object.keys(gameData.goldenWalnuts).length;
	const upgradesUnlocked = ISLAND_UPGRADES.filter((u) => gameData.islandUpgrades[u.id]).length;
	const walnutsSpent = ISLAND_UPGRADES.filter((u) => gameData.islandUpgrades[u.id]).reduce(
		(sum, u) => sum + u.cost,
		0
	);
	const walnutsAvailable = Math.max(0, walnutsFound - walnutsSpent);
	const parrotCost = parrot.cost(walnutsFound);

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<GiPalmTree className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Ginger Island</div>
					<div className="mt-0.5 text-sm text-gray-500">
						Island upgrades, golden walnuts, and parrot calculator
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
			>
				<StatTile
					label="Walnuts Found"
					value={walnutsFound}
					valueColor={walnutsFound >= parrot.total ? "text-green-600" : "text-accent"}
					suffix={`/ ${parrot.total}`}
				/>
				<StatTile
					label="Upgrades"
					value={upgradesUnlocked}
					valueColor={
						upgradesUnlocked === ISLAND_UPGRADES.length
							? "text-green-600"
							: "text-accent"
					}
					suffix={`/ ${ISLAND_UPGRADES.length}`}
				/>
				<StatTile
					label="Available to Spend"
					value={walnutsFound >= parrot.total ? "Complete" : walnutsAvailable}
					valueColor="text-green-600"
				/>
				<StatTile
					label="Parrot Cost"
					value={`${formatNumber(parrotCost)}g`}
					valueColor={parrotCost === 0 ? "text-green-600" : "text-accent"}
				/>
			</div>
		</div>
	);
}
