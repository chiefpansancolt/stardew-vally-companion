import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import type { CalendarHeaderProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { SEASONS } from "@/data/constants/seasons";

const seasonKeys = Object.keys(SEASONS).filter((s) => s !== "ginger island");

export function CalendarHeader({ season, onSeasonChange }: CalendarHeaderProps) {
	const meta = SEASONS[season];
	const currentIndex = seasonKeys.indexOf(season);

	function handlePrev() {
		const prev = (currentIndex - 1 + seasonKeys.length) % seasonKeys.length;
		onSeasonChange(seasonKeys[prev] as typeof season);
	}

	function handleNext() {
		const next = (currentIndex + 1) % seasonKeys.length;
		onSeasonChange(seasonKeys[next] as typeof season);
	}

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<img
					src={assetPath(meta.image)}
					alt={meta.label}
					className="h-8 w-8 object-contain"
				/>
				<h2 className="text-xl font-bold text-white">{meta.label}</h2>
			</div>

			<div className="flex items-center gap-1">
				<button
					onClick={handlePrev}
					className="cursor-pointer rounded-md p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
				>
					<HiChevronLeft className="h-5 w-5" />
				</button>

				<div className="flex gap-1">
					{Object.values(SEASONS).filter((s) => s.id !== "ginger island").map((sMeta) => {
						const isActive = sMeta.id === season;
						return (
							<button
								key={sMeta.id}
								onClick={() => onSeasonChange(sMeta.id)}
								className={`cursor-pointer rounded-md px-3 py-1.5 text-sm font-semibold transition-all ${
									isActive
										? `${sMeta.badgeColor} text-white`
										: "text-white/60 hover:bg-white/10"
								}`}
							>
								{sMeta.label}
							</button>
						);
					})}
				</div>

				<button
					onClick={handleNext}
					className="cursor-pointer rounded-md p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
				>
					<HiChevronRight className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
}
