import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { AnimalCardProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { FRIENDSHIP_PER_HEART, MAX_FRIENDSHIP, MAX_HEARTS } from "@/data/constants/animals";

export function AnimalCard({ animal, species, onClick }: Props) {
	const hearts = Math.floor(animal.friendship / FRIENDSHIP_PER_HEART);
	const pct = Math.min((animal.friendship / MAX_FRIENDSHIP) * 100, 100);
	const isMaxed = animal.friendship >= MAX_FRIENDSHIP;
	const barColor = pct >= 80 ? "bg-green-400" : pct >= 40 ? "bg-accent" : "bg-red-400";

	return (
		<button
			type="button"
			onClick={onClick}
			className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-white/10 ${
				isMaxed
					? "border-green-400/30 bg-green-400/10"
					: "border-white/10 bg-white/5"
			}`}
		>
			{species?.image && (
				<img
					src={assetPath(species.image)}
					alt={species.name}
					className="h-12 w-12 shrink-0 object-contain"
				/>
			)}
			<div className="min-w-0 flex-1">
				<div className="flex items-center justify-between gap-2">
					<span
						className={`text-sm font-semibold ${isMaxed ? "text-green-300" : "text-white"}`}
					>
						{animal.name}
					</span>
					<div className="flex shrink-0 items-center">
						{Array.from({ length: MAX_HEARTS }, (_, i) =>
							i < hearts ? (
								<FaHeart key={i} className="h-2.5 w-2.5 text-red-400" />
							) : (
								<FaRegHeart key={i} className="h-2.5 w-2.5 text-white/15" />
							)
						)}
						{animal.hasAnimalCracker && (
							<img
								src="/images/misc/Golden Animal Cracker.png"
								alt="Animal Cracker"
								className="ml-1 h-4 w-4 object-contain"
							/>
						)}
					</div>
				</div>
				<div className="mt-0.5 text-[0.7rem] text-white/80">
					{species?.name ?? animal.type}
				</div>
				<div className="mt-1 flex items-center gap-2">
					<span className="rounded-full border border-white/12 bg-white/8 px-2 py-0.5 text-[0.55rem] font-semibold text-white/80">
						{animal.buildingType}
					</span>
					<span className="text-[0.65rem] text-white/80">
						Age: {animal.age} days
					</span>
				</div>
				<div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
					<div
						className={`h-full rounded-full ${barColor}`}
						style={{ width: `${pct}%` }}
					/>
				</div>
			</div>
		</button>
	);
}
