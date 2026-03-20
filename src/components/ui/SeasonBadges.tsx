import { type Season } from "stardew-valley-data";

const SEASON_COLORS: Record<Season, string> = {
	spring: "bg-green-700",
	summer: "bg-yellow-600",
	fall: "bg-orange-700",
	winter: "bg-blue-500",
	"ginger island": "bg-teal-600",
};

const SEASON_LABELS: Record<Season, string> = {
	spring: "Sp",
	summer: "Su",
	fall: "Fa",
	winter: "Wi",
	"ginger island": "GI",
};

interface Props {
	seasons: Season[];
}

export function SeasonBadges({ seasons }: Props) {
	return (
		<>
			{seasons.map((s) => (
				<span
					key={s}
					className={`inline-flex h-5 w-5 items-center justify-center rounded text-[0.55rem] font-bold text-white ${SEASON_COLORS[s] ?? "bg-gray-600"}`}
				>
					{SEASON_LABELS[s] ?? s[0].toUpperCase()}
				</span>
			))}
		</>
	);
}
