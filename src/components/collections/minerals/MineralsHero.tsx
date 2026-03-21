"use client";

import { type MineralItem, minerals } from "stardew-valley-data";
import { FaGem } from "react-icons/fa";
import { CollectionProps as Props } from "@/types";
import { StatTile } from "@/comps/ui/StatTile";

const allMineralItems = minerals().mineralItems().get() as MineralItem[];
const total = allMineralItems.length;

const allOres = minerals().ores().get();
const totalOres = allOres.length;

const allBars = minerals().bars().get();
const totalBars = allBars.length;

const allResources = minerals().resources().get();
const totalResources = allResources.length;

const totalGeodes = minerals().geodes().get().length;
const totalNodes = minerals().nodes().get().length;

export function MineralsHero({ gameData }: Props) {
	const foundCount = allMineralItems.filter(
		(m) => gameData.minerals[m.id]?.found === true
	).length;
	const donatedCount = allMineralItems.filter(
		(m) => gameData.minerals[m.id]?.donated === true
	).length;
	const oresShipped = allOres.filter((o) => gameData.shipped[o.id]?.shipped === true).length;
	const barsShipped = allBars.filter((b) => gameData.shipped[b.id]?.shipped === true).length;
	const resourcesShipped = allResources.filter(
		(r) => gameData.shipped[r.id]?.shipped === true
	).length;

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<FaGem className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Minerals Summary</div>
					<div className="mt-0.5 text-sm text-gray-500">
						{gameData.character.name} · {gameData.character.farmName} Farm
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
			>
				<StatTile label="Total Minerals" value={total} />
				<StatTile
					label="Minerals Found"
					value={foundCount}
					valueColor="text-accent"
					suffix={`/ ${total}`}
				/>
				<StatTile
					label="Minerals Donated"
					value={donatedCount}
					valueColor="text-green-600"
					suffix={`/ ${total}`}
				/>
				<StatTile label="Total Ores" value={totalOres} />
				<StatTile
					label="Ores Shipped"
					value={oresShipped}
					valueColor="text-accent"
					suffix={`/ ${totalOres}`}
				/>
				<StatTile label="Total Bars" value={totalBars} />
				<StatTile
					label="Bars Shipped"
					value={barsShipped}
					valueColor="text-accent"
					suffix={`/ ${totalBars}`}
				/>
				<StatTile label="Total Resources" value={totalResources} />
				<StatTile
					label="Resources Shipped"
					value={resourcesShipped}
					valueColor="text-accent"
					suffix={`/ ${totalResources}`}
				/>
				<StatTile label="Total Geodes" value={totalGeodes} />
				<StatTile label="Total Nodes" value={totalNodes} />
			</div>
		</div>
	);
}
