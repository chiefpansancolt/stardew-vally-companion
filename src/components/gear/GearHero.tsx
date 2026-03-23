"use client";

import { LuSwords } from "react-icons/lu";
import { GEAR_COUNTS } from "@/data/constants/gear";
import { StatTile } from "@/comps/ui/StatTile";

export function GearHero() {
	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<LuSwords className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Gear & Equipment</div>
					<div className="mt-0.5 text-sm text-gray-500">
						Complete equipment reference guide
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))" }}
			>
				<StatTile label="Weapons" value={GEAR_COUNTS.weapons} valueColor="text-accent" />
				<StatTile label="Footwear" value={GEAR_COUNTS.footwear} valueColor="text-accent" />
				<StatTile label="Rings" value={GEAR_COUNTS.rings} valueColor="text-accent" />
				<StatTile label="Hats" value={GEAR_COUNTS.hats} valueColor="text-accent" />
				<StatTile label="Trinkets" value={GEAR_COUNTS.trinkets} valueColor="text-accent" />
				<StatTile label="Bait" value={GEAR_COUNTS.bait} valueColor="text-accent" />
				<StatTile label="Tackle" value={GEAR_COUNTS.tackle} valueColor="text-accent" />
				<StatTile label="Total" value={GEAR_COUNTS.total} valueColor="text-accent" />
			</div>
		</div>
	);
}
