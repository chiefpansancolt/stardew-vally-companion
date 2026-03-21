"use client";

import { villagers } from "stardew-valley-data";
import type { VillagersProps as Props } from "@/types";
import { capitalize } from "@/lib/utils/formatting";
import { SEASONS } from "@/data/constants/seasons";
import { BirthdayRow } from "./cards";

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
				{Object.values(SEASONS)
					.filter((s) => s.id !== "ginger island")
					.map((meta) => {
						const seasonVillagers = villagers()
							.byBirthdaySeason(meta.id as "spring" | "summer" | "fall" | "winter")
							.sortByBirthday()
							.get();

						return (
							<div key={meta.id} className="flex flex-col">
								<div className="mb-2 flex items-center gap-1.5 border-b border-white/10 pb-2">
									<div
										className="h-2 w-2 shrink-0 rounded-full"
										style={{ background: meta.dotColor }}
									/>
									<span className="text-sm font-bold tracking-wider text-white uppercase">
										{meta.label}
									</span>
								</div>

								<div className="flex flex-col">
									{seasonVillagers.map((villager) => {
										const isToday =
											meta.id === currentSeason &&
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

			<div className="mt-4 border-t border-white/10 pt-3">
				<p className="text-[0.7rem] text-white/35">
					{capitalize(currentSeason)} Day {currentDay} highlighted if a birthday falls
					today.
				</p>
			</div>
		</div>
	);
}
