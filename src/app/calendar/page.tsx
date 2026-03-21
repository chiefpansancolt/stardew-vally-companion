"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { CalendarView } from "@/comps/calendar/CalendarView";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function CalendarPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="calendar" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
				<p className="mt-1 text-gray-600">Birthdays, festivals, and seasonal events</p>
			</div>

			<CalendarView gameData={activePlaythrough.data} />
		</div>
	);
}
