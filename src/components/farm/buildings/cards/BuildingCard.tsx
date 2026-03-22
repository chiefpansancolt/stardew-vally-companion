import { animals, type FarmAnimal, isFarmAnimal } from "stardew-valley-data";
import type { BuildingCardProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { formatNumber } from "@/lib/utils/formatting";

const speciesMap = new Map(
	(animals().farmAnimals().get().filter(isFarmAnimal) as FarmAnimal[]).map((s) => [s.name, s])
);

export function BuildingCard({
	building,
	buildingData,
	animals: housed,
	fishPond,
	onClick,
}: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-left transition-colors hover:bg-white/10"
		>
			{buildingData?.image && (
				<img
					src={assetPath(buildingData.image)}
					alt={buildingData.name}
					className="h-14 w-14 shrink-0 rounded-lg object-contain"
				/>
			)}
			<div className="min-w-0 flex-1">
				<div className="flex items-center justify-between gap-2">
					<span className="text-sm font-semibold text-white">{building.type}</span>
					{building.animalCount > 0 && !fishPond && (
						<span className="bg-highlight/20 text-highlight rounded-full px-2 py-0.5 text-[0.6rem] font-bold">
							{building.animalCount} animal{building.animalCount !== 1 ? "s" : ""}
						</span>
					)}
				</div>
				<div className="mt-0.5 flex items-center gap-2 text-[0.65rem] text-white/50">
					{buildingData && (
						<>
							<span
								className={`rounded-full border px-2 py-0.5 text-[0.55rem] font-semibold ${
									buildingData.magical
										? "border-purple-400/25 bg-purple-400/15 text-purple-300"
										: "border-green-400/25 bg-green-400/15 text-green-300"
								}`}
							>
								{buildingData.builder}
							</span>
							<span className="text-highlight font-semibold">
								{formatNumber(buildingData.buildCost)}g
							</span>
						</>
					)}
				</div>
				{housed.length > 0 && (
					<div className="mt-1.5 flex flex-wrap gap-1">
						{housed.map((a, i) => {
							const species = speciesMap.get(a.type);
							return (
								<div
									key={`${a.name}-${i}`}
									className="flex flex-col items-center gap-0.5"
								>
									<div className="flex h-6 w-6 items-center justify-center">
										{species?.image ? (
											<img
												src={assetPath(species.image)}
												alt={a.type}
												className="h-5 w-5 object-contain"
											/>
										) : (
											<span className="text-[0.5rem] text-white/30">?</span>
										)}
									</div>
									<span className="max-w-10 truncate text-center text-[0.45rem] text-white/80">
										{a.name}
									</span>
								</div>
							);
						})}
					</div>
				)}
				{fishPond && (
					<div className="mt-1.5 flex items-center gap-2">
						{fishPond.image && (
							<img
								src={assetPath(fishPond.image)}
								alt={fishPond.name}
								className="h-6 w-6 object-contain"
							/>
						)}
						<span className="text-[0.65rem] text-white/80">{fishPond.name}</span>
						<span className="bg-highlight/20 text-highlight rounded-full px-2 py-0.5 text-[0.55rem] font-bold">
							{fishPond.currentOccupants} / {fishPond.maxOccupants}
						</span>
					</div>
				)}
			</div>
		</button>
	);
}
