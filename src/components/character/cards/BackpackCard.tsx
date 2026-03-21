import { HiArchive } from "react-icons/hi";
import type { BackpackCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { BACKPACK_LEVELS } from "@/data/constants/backpacks";

export function BackpackCard({ maxItems, onClick }: BackpackCardProps) {
	const level = BACKPACK_LEVELS.find((l) => l.slots === maxItems);
	const name = level?.name ?? `${maxItems} slots`;
	const imgSrc = level?.image ? assetPath(level.image) : null;
	const isUpgraded = maxItems > 12;

	return (
		<button
			onClick={onClick}
			className={`hover:border-accent/40 hover:bg-accent/10 flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all ${
				isUpgraded ? "border-accent/40 bg-accent/10" : "border-white/10 bg-white/5"
			}`}
		>
			{imgSrc ? (
				<img src={imgSrc} alt={name} className="h-10 w-10 object-contain" />
			) : (
				<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
					<HiArchive className="h-5 w-5 text-white/40" />
				</div>
			)}
			<div className={`text-xs font-bold ${isUpgraded ? "text-accent" : "text-white"}`}>
				{name}
			</div>
			<span
				className={`text-[0.625rem] font-bold ${isUpgraded ? "text-accent/80" : "text-white/40"}`}
			>
				{maxItems} slots
			</span>
			<div className="mt-0.5 flex gap-1.5">
				{BACKPACK_LEVELS.map((_lvl, i) => {
					const currentIndex = BACKPACK_LEVELS.findIndex((l) => l.slots === maxItems);
					const activeLevelIndex = currentIndex === -1 ? 0 : currentIndex;
					return (
						<div
							key={i}
							className="h-2.5 w-2.5 rounded-full transition-all"
							style={{
								backgroundColor:
									i <= activeLevelIndex
										? "rgba(192,134,74,0.8)"
										: "rgba(255,255,255,0.1)",
							}}
						/>
					);
				})}
			</div>
		</button>
	);
}
