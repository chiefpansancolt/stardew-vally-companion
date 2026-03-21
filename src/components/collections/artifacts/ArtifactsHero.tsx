"use client";

import { artifacts } from "stardew-valley-data";
import { RiTreasureMapLine } from "react-icons/ri";
import { CollectionProps as Props } from "@/types";
import { StatTile } from "@/comps/ui/StatTile";

const allArtifacts = artifacts().get();
const total = allArtifacts.length;
const withRewardsCount = allArtifacts.filter((a) => a.donationNotes !== null).length;

export function ArtifactsHero({ gameData }: Props) {
	const foundCount = allArtifacts.filter((a) => gameData.artifacts[a.id]?.found === true).length;
	const donatedCount = allArtifacts.filter(
		(a) => gameData.artifacts[a.id]?.donated === true
	).length;

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<RiTreasureMapLine className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Artifacts Summary</div>
					<div className="mt-0.5 text-sm text-gray-500">
						{gameData.character.name} · {gameData.character.farmName} Farm
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))" }}
			>
				<StatTile label="Total" value={total} />
				<StatTile
					label="Found"
					value={foundCount}
					valueColor="text-accent"
					suffix={`/ ${total}`}
				/>
				<StatTile
					label="Donated"
					value={donatedCount}
					valueColor="text-green-600"
					suffix={`/ ${total}`}
				/>
				<StatTile label="With Rewards" value={withRewardsCount} colored />
			</div>
		</div>
	);
}
