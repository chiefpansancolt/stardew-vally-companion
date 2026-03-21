import type { CalendarDayCellProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { BOOKSELLER_ICON } from "@/data/constants/seasons";

export function CalendarDayCell({
	day,
	isToday,
	isBookseller,
	birthdays,
	festivals,
	onClick,
}: CalendarDayCellProps) {
	const hasEvents = birthdays.length > 0 || festivals.length > 0 || isBookseller;

	return (
		<button
			onClick={hasEvents ? onClick : undefined}
			className={`relative flex min-h-24 flex-col rounded-lg border p-2 text-left transition-all ${
				isToday
					? "border-accent/40 bg-accent/10"
					: "border-white/10 bg-white/5 hover:bg-white/10"
			} ${hasEvents ? "cursor-pointer" : "cursor-default"}`}
		>
			<span className={`text-xs font-semibold ${isToday ? "text-accent" : "text-white/50"}`}>
				{day}
			</span>

			<div className="mt-1 flex flex-col gap-1">
				{birthdays.map((b) => (
					<div key={b.name} className="flex items-center gap-1.5">
						<img
							src={assetPath(b.image)}
							alt={b.name}
							className="h-6 w-6 shrink-0 rounded-full object-contain"
						/>
						<span className="truncate text-[0.6rem] font-medium text-white/80">
							{b.name}
						</span>
					</div>
				))}
				{festivals.map((f) => (
					<div key={f.name} className="flex items-center gap-1.5">
						<img
							src={assetPath(f.calendarIcon)}
							alt={f.name}
							className="h-5 w-5 shrink-0 object-contain"
						/>
						<span className="text-highlight truncate text-[0.6rem] font-medium">
							{f.name}
						</span>
					</div>
				))}
				{isBookseller && (
					<div className="flex items-center gap-1.5">
						<img
							src={assetPath(BOOKSELLER_ICON)}
							alt="Bookseller"
							className="h-5 w-5 shrink-0 object-contain"
						/>
						<span className="truncate text-[0.6rem] font-medium text-purple-300">
							Bookseller
						</span>
					</div>
				)}
			</div>
		</button>
	);
}
