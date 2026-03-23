"use client";

import { bundles, type JojaBundle } from "stardew-valley-data";
import { FaBuilding } from "react-icons/fa";
import type { CollectionProps as Props } from "@/types";
import { formatNumber } from "@/lib/utils/formatting";
import { StatTile } from "@/comps/ui/StatTile";

const jojaBundles = bundles().jojaBundles().get() as JojaBundle[];
const totalCost = jojaBundles.reduce((sum, b) => sum + b.goldCost, 0);

export function JojaHero({ gameData }: Props) {
	const purchased = jojaBundles.filter((b) => gameData.joja.developments[b.id]).length;
	const purchasedCost = jojaBundles
		.filter((b) => gameData.joja.developments[b.id])
		.reduce((sum, b) => sum + b.goldCost, 0);
	const remainingCost = totalCost - purchasedCost;

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<FaBuilding className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Joja Development</div>
					<div className="mt-0.5 text-sm text-gray-500">
						Community development projects
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
			>
				<StatTile
					label="Projects Complete"
					value={purchased}
					valueColor={purchased === jojaBundles.length ? "text-green-600" : "text-accent"}
					suffix={`/ ${jojaBundles.length}`}
				/>
				<StatTile
					label="Total Invested"
					value={`${formatNumber(purchasedCost)}g`}
					valueColor="text-accent"
				/>
				<StatTile
					label="Remaining Cost"
					value={`${formatNumber(remainingCost)}g`}
					valueColor={remainingCost === 0 ? "text-green-600" : "text-accent"}
				/>
			</div>
		</div>
	);
}
