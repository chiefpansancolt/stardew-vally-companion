"use client";

import { TabItem, Tabs } from "flowbite-react";
import { GEAR_COUNTS } from "@/data/constants/gear";
import { NAVY_TILE } from "@/data/constants/styles";
import { GearHero } from "@/comps/gear/GearHero";
import {
	BaitTab,
	FootwearTab,
	HatsTab,
	RingsTab,
	TackleTab,
	TrinketsTab,
	WeaponsTab,
} from "@/comps/gear/tabs";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function GearPage() {
	return (
		<div className="p-6">
			<PageHeader
				title="Gear"
				description="Weapons, footwear, rings, hats, trinkets, bait, and tackle"
			/>

			<div className="flex flex-col gap-6">
				<GearHero />

				<Tabs variant="underline">
					<TabItem title={`Weapons (${GEAR_COUNTS.weapons})`}>
						<div className="rounded-b-xl p-5" style={NAVY_TILE}>
							<WeaponsTab />
						</div>
					</TabItem>
					<TabItem title={`Footwear (${GEAR_COUNTS.footwear})`}>
						<div className="rounded-b-xl p-5" style={NAVY_TILE}>
							<FootwearTab />
						</div>
					</TabItem>
					<TabItem title={`Rings (${GEAR_COUNTS.rings})`}>
						<div className="rounded-b-xl p-5" style={NAVY_TILE}>
							<RingsTab />
						</div>
					</TabItem>
					<TabItem title={`Hats (${GEAR_COUNTS.hats})`}>
						<div className="rounded-b-xl p-5" style={NAVY_TILE}>
							<HatsTab />
						</div>
					</TabItem>
					<TabItem title={`Trinkets (${GEAR_COUNTS.trinkets})`}>
						<div className="rounded-b-xl p-5" style={NAVY_TILE}>
							<TrinketsTab />
						</div>
					</TabItem>
					<TabItem title={`Bait (${GEAR_COUNTS.bait})`}>
						<div className="rounded-b-xl p-5" style={NAVY_TILE}>
							<BaitTab />
						</div>
					</TabItem>
					<TabItem title={`Tackle (${GEAR_COUNTS.tackle})`}>
						<div className="rounded-b-xl p-5" style={NAVY_TILE}>
							<TackleTab />
						</div>
					</TabItem>
				</Tabs>
			</div>
		</div>
	);
}
