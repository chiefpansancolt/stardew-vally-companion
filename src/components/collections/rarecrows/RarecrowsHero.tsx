"use client";

import { rarecrows } from "stardew-valley-data";
import { GiScarecrow } from "react-icons/gi";
import type { CollectionProps as Props } from "@/types";
import { StatTile } from "@/comps/ui/StatTile";

const allRarecrows = rarecrows().sortByNumber().get();
const total = allRarecrows.length;

export function RarecrowsHero({ gameData }: Props) {
	const obtained = allRarecrows.filter((r) => gameData.rarecrows.includes(r.id)).length;

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<GiScarecrow className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Rarecrows</div>
					<div className="mt-0.5 text-sm text-gray-500">
						{gameData.character.name} · {gameData.character.farmName} Farm
					</div>
				</div>
			</div>
			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
			>
				<StatTile
					label="Obtained"
					value={obtained}
					valueColor={obtained === total ? "text-green-600" : "text-accent"}
					suffix={`/ ${total}`}
				/>
				<StatTile
					label="Remaining"
					value={total - obtained}
					valueColor={total - obtained === 0 ? "text-green-600" : "text-accent"}
				/>
			</div>
		</div>
	);
}
