"use client";

import { villagers } from "stardew-valley-data";
import type { VillagersProps as Props } from "@/types";
import { capitalize } from "@/lib/utils/formatting";
import { SEASONS } from "@/data/constants/seasons";
import { NavySection } from "@/comps/ui/NavySection";
import { BirthdayRow } from "./cards";

export function BirthdaysSection({ gameData }: Props) {
	const { season: currentSeason, day: currentDay } = gameData.character.currentDate;

	return (
		<NavySection title="Birthdays">
			<p className="-mt-2 mb-4 text-xs text-white/40">Plan ahead for gift giving</p>

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
		</NavySection>
	);
}
