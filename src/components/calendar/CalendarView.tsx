"use client";

import { type Season, seasons, villagers } from "stardew-valley-data";
import { useMemo, useState } from "react";
import type { CalendarBirthday, CalendarFestival, CalendarProps } from "@/types";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarDayModal } from "./modals/CalendarDayModal";

const allSeasons = seasons().get();

function buildBirthdayMap(season: Season): Map<number, CalendarBirthday[]> {
	const map = new Map<number, CalendarBirthday[]>();
	const vills = villagers()
		.byBirthdaySeason(season as "spring" | "summer" | "fall" | "winter")
		.sortByBirthday()
		.get();
	for (const v of vills) {
		const day = v.birthday.day;
		const entry = map.get(day) ?? [];
		entry.push({ name: v.name, image: v.image });
		map.set(day, entry);
	}
	return map;
}

function buildFestivalMap(season: Season): Map<number, CalendarFestival[]> {
	const map = new Map<number, CalendarFestival[]>();
	const seasonData = allSeasons.find((s) => s.id === season);
	if (!seasonData) return map;
	for (const f of seasonData.festivals) {
		for (let day = f.startDay; day <= f.endDay; day++) {
			const entry = map.get(day) ?? [];
			entry.push({ name: f.name, calendarIcon: f.calendarIcon, image: f.image });
			map.set(day, entry);
		}
	}
	return map;
}

export function CalendarView({ gameData }: CalendarProps) {
	const { season: currentSeason, day: currentDay } = gameData.character.currentDate;
	const [season, setSeason] = useState<Season>(currentSeason);
	const [selectedDay, setSelectedDay] = useState<number | null>(null);

	const birthdays = useMemo(() => buildBirthdayMap(season), [season]);
	const festivals = useMemo(() => buildFestivalMap(season), [season]);
	const booksellerDays = useMemo(() => {
		const seasonData = allSeasons.find((s) => s.id === season);
		return new Set<number>(seasonData?.bookseller ?? []);
	}, [season]);

	const isCurrentSeason = season === currentSeason;

	const selectedBirthdays = selectedDay ? (birthdays.get(selectedDay) ?? []) : [];
	const selectedFestivals = selectedDay ? (festivals.get(selectedDay) ?? []) : [];
	const selectedIsBookseller = selectedDay ? booksellerDays.has(selectedDay) : false;

	return (
		<div
			className="border-secondary/60 overflow-hidden rounded-xl border"
			style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
		>
			<div className="border-b border-white/10 px-6 py-4">
				<CalendarHeader season={season} onSeasonChange={setSeason} />
			</div>
			<CalendarGrid
				season={season}
				currentDay={isCurrentSeason ? currentDay : null}
				birthdays={birthdays}
				festivals={festivals}
				booksellerDays={booksellerDays}
				onDayClick={setSelectedDay}
			/>
			<CalendarDayModal
				day={selectedDay}
				season={season}
				isBookseller={selectedIsBookseller}
				birthdays={selectedBirthdays}
				festivals={selectedFestivals}
				onClose={() => setSelectedDay(null)}
			/>
		</div>
	);
}
