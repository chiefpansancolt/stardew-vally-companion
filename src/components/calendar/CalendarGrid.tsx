import type { CalendarGridProps } from "@/types";
import { CalendarDayCell } from "./cards";

const DAY_HEADERS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CalendarGrid({
	currentDay,
	birthdays,
	festivals,
	booksellerDays,
	onDayClick,
}: CalendarGridProps) {
	return (
		<div>
			<div className="grid grid-cols-7 gap-px text-center text-xs font-semibold text-white/70">
				{DAY_HEADERS.map((d) => (
					<div key={d} className="py-2">
						{d}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 gap-1 p-1">
				{Array.from({ length: 28 }, (_, i) => {
					const day = i + 1;
					return (
						<CalendarDayCell
							key={day}
							day={day}
							isToday={currentDay === day}
							isBookseller={booksellerDays.has(day)}
							birthdays={birthdays.get(day) ?? []}
							festivals={festivals.get(day) ?? []}
							onClick={() => onDayClick(day)}
						/>
					);
				})}
			</div>
		</div>
	);
}
