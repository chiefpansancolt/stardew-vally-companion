"use client";

import { type Villager, villagers } from "stardew-valley-data";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";

interface Props {
	gameData: GameData;
}

type Season = "spring" | "summer" | "fall" | "winter";

const SEASONS: { id: Season; label: string; dotColor: string }[] = [
	{ id: "spring", label: "Spring", dotColor: "#4ade80" },
	{ id: "summer", label: "Summer", dotColor: "#fb923c" },
	{ id: "fall", label: "Fall", dotColor: "#f59e0b" },
	{ id: "winter", label: "Winter", dotColor: "#93c5fd" },
];

function capitalize(s: string) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

interface BirthdayRowProps {
	villager: Villager;
	isToday: boolean;
}

function BirthdayRow({ villager, isToday }: BirthdayRowProps) {
	return (
		<div
			className={`flex items-center gap-2 py-1.5 ${
				isToday ? "-mx-1.5 rounded-md px-1.5" : "border-b border-white/5 last:border-0"
			}`}
			style={isToday ? { background: "rgba(217,201,124,0.15)" } : undefined}
		>
			<img
				src={assetPath(villager.image)}
				alt={villager.name}
				className="h-6 w-6 shrink-0 rounded-md object-contain"
				style={{
					background: isToday ? "rgba(217,201,124,0.2)" : "rgba(255,255,255,0.08)",
				}}
			/>
			<span
				className={`flex-1 text-xs font-semibold ${
					isToday ? "text-highlight" : "text-white/80"
				}`}
			>
				{villager.name}
			</span>
			<span
				className={`text-[0.7rem] font-semibold whitespace-nowrap ${
					isToday ? "text-yellow-300/70" : "text-white/40"
				}`}
			>
				Day {villager.birthday.day}
				{isToday && " 🎂"}
			</span>
		</div>
	);
}

export function BirthdaysSection({ gameData }: Props) {
	const { season: currentSeason, day: currentDay } = gameData.character.currentDate;

	return (
		<div
			className="border-secondary/60 rounded-xl border p-5"
			style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
		>
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
					Birthdays
				</h3>
				<span className="text-xs text-white/40">Plan ahead for gift giving</span>
			</div>

			<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
				{SEASONS.map(({ id, label, dotColor }) => {
					const seasonVillagers = villagers().byBirthdaySeason(id).sortByBirthday().get();

					return (
						<div key={id} className="flex flex-col">
							{/* Season header */}
							<div className="mb-2 flex items-center gap-1.5 border-b border-white/10 pb-2">
								<div
									className="h-2 w-2 shrink-0 rounded-full"
									style={{ background: dotColor }}
								/>
								<span className="text-sm font-bold tracking-wider text-white uppercase">
									{label}
								</span>
							</div>

							{/* Villager rows */}
							<div className="flex flex-col">
								{seasonVillagers.map((villager) => {
									const isToday =
										id === currentSeason &&
										villager.birthday.day === currentDay;
									return (
										<BirthdayRow
											key={villager.id}
											villager={villager}
											isToday={isToday}
										/>
									);
								})}
								{seasonVillagers.length === 0 && (
									<span className="text-xs text-white/30">None</span>
								)}
							</div>
						</div>
					);
				})}
			</div>

			{/* Legend: today highlight */}
			<div className="mt-4 border-t border-white/10 pt-3">
				<p className="text-[0.7rem] text-white/35">
					{capitalize(currentSeason)} Day {currentDay} highlighted if a birthday falls
					today.
				</p>
			</div>
		</div>
	);
}
