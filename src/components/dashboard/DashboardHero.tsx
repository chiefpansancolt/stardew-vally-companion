"use client";

import { HiTemplate } from "react-icons/hi";
import type { DashboardProps } from "@/types";
import { getFarmIcon } from "@/lib/utils/farmIcon";
import { formatNumber, formatTimePlayed } from "@/lib/utils/formatting";
import { SEASONS } from "@/data/constants/seasons";
import { StatTile } from "@/comps/ui/StatTile";

const HOUSE_LEVELS: Record<number, string> = {
	0: "Basic",
	1: "Level 1",
	2: "Level 2",
	3: "Full Upgrade",
};

export function DashboardHero({ gameData }: DashboardProps) {
	const { character } = gameData;
	const season = SEASONS[character.currentDate.season];
	const farmIconPath = getFarmIcon(character.farmType);

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				{farmIconPath ? (
					<img
						src={farmIconPath}
						alt="Farm"
						className="h-8 w-8 shrink-0 object-contain"
					/>
				) : (
					<HiTemplate className="h-7 w-7 text-gray-400" />
				)}
				<div>
					<div className="text-lg font-bold text-gray-900">
						{character.farmName} Farm &nbsp;·&nbsp; {character.name}
					</div>
					<div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
						<span
							className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${season.badgeColor} text-white/80`}
						>
							{season.label} Day {character.currentDate.day}, Year{" "}
							{character.currentDate.year}
						</span>
						{character.spouse && (
							<span className="text-gray-800">Married to {character.spouse}</span>
						)}
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
			>
				<StatTile
					label="Time Played"
					value={formatTimePlayed(character.millisecondsPlayed)}
					valueColor="text-accent"
				/>
				<StatTile
					label="Total Days"
					value={character.totalDaysPlayed}
					valueColor="text-accent"
				/>
				<StatTile
					label="Current Money"
					value={`${formatNumber(character.money)}g`}
					valueColor="text-accent"
				/>
				<StatTile
					label="Total Earned"
					value={`${formatNumber(character.totalMoneyEarned)}g`}
					valueColor="text-accent"
				/>
				<StatTile
					label="House Upgrade"
					value={
						HOUSE_LEVELS[character.houseUpgradeLevel] ??
						`Level ${character.houseUpgradeLevel}`
					}
					valueColor={
						character.houseUpgradeLevel === 3 ? "text-green-600" : "text-accent"
					}
				/>
				<StatTile label="Max Energy" value={character.maxEnergy} valueColor="text-accent" />
				<StatTile label="Max Health" value={character.maxHealth} valueColor="text-accent" />
			</div>
		</div>
	);
}
