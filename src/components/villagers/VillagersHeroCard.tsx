"use client";

import { villagers } from "stardew-valley-data";
import { HiUserGroup } from "react-icons/hi";
import { type GameData } from "@/types/app/game";
import { effectiveMaxHearts } from "@/lib/utils/villagerHearts";
import { StatTile } from "@/comps/ui/StatTile";

interface Props {
	gameData: GameData;
}

interface HeartEvent {
	id: number | number[] | null;
}

export function VillagersHeroCard({ gameData }: Props) {
	const allVillagers = villagers().get();
	const maxHeartsCount = allVillagers.filter((v) => {
		const progress = gameData.villagers[v.name];
		if (!progress) return false;
		const isMarried = gameData.character.spouse === v.name;
		return progress.hearts >= effectiveMaxHearts(v, isMarried, progress.status);
	}).length;

	const eventsSeen = Object.values(gameData.villagers)[0]?.eventsSeen ?? [];

	const totalPossibleEvents = allVillagers.reduce((sum, v) => {
		const countable = (v.events as HeartEvent[]).filter((e) => e.id !== null).length;
		return sum + countable;
	}, 0);

	const seenEventsCount = allVillagers.reduce((sum, v) => {
		const seen = (v.events as HeartEvent[]).filter((e) => {
			if (e.id === null) return false;
			return [e.id].flat().some((id) => eventsSeen.includes(String(id)));
		}).length;
		return sum + seen;
	}, 0);

	const spouse = gameData.character.spouse || "—";

	const fiveHeartsCount = allVillagers.filter((v) => {
		const progress = gameData.villagers[v.name];
		return progress !== undefined && progress.hearts >= 5;
	}).length;

	const tenHeartsCount = allVillagers.filter((v) => {
		const progress = gameData.villagers[v.name];
		return progress !== undefined && progress.hearts >= 10;
	}).length;

	const stats: { label: string; value: string | number; colored?: boolean; accent?: boolean }[] =
		[
			{ label: "Total Villagers", value: allVillagers.length },
			{
				label: "Max Hearts",
				value: `${maxHeartsCount} / ${allVillagers.length}`,
				colored: true,
			},
			{ label: "10+ Hearts", value: `${tenHeartsCount} / ${allVillagers.length}` },
			{ label: "5+ Hearts", value: `${fiveHeartsCount} / ${allVillagers.length}` },
			{
				label: "Events Seen",
				value:
					totalPossibleEvents > 0 ? `${seenEventsCount} / ${totalPossibleEvents}` : "—",
			},
			{ label: "Spouse", value: spouse, accent: spouse !== "—" },
		];

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<HiUserGroup className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Relationship Summary</div>
					<div className="mt-0.5 text-sm text-gray-500">
						{gameData.character.name} · {gameData.character.farmName} Farm
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
			>
				{stats.map(({ label, value, colored, accent }) => (
					<StatTile
						key={label}
						label={label}
						value={value}
						colored={colored}
						accent={accent}
					/>
				))}
			</div>
		</div>
	);
}
