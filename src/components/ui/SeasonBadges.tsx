import { SeasonBadgesProps as Props } from "@/types";
import { SEASONS } from "@/data/constants/seasons";

export function SeasonBadges({ seasons }: Props) {
	return (
		<>
			{seasons.map((s) => {
				const meta = SEASONS[s];
				return (
					<span
						key={s}
						className={`inline-flex h-5 w-5 items-center justify-center rounded text-[0.55rem] font-bold text-white ${meta?.badgeColor ?? "bg-gray-600"}`}
					>
						{meta?.abbr ?? s[0].toUpperCase()}
					</span>
				);
			})}
		</>
	);
}
