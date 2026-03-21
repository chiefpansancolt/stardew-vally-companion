import type { BirthdayRowProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";

export function BirthdayRow({ villager, isToday }: BirthdayRowProps) {
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
