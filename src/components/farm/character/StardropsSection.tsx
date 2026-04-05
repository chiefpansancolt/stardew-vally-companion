"use client";

import { starDrops } from "stardew-valley-data";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import { type CharacterProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { NavySection } from "@/comps/ui/NavySection";

export function StardropsSection({ gameData }: Props) {
	const allDrops = starDrops().get();
	const collectedCount = allDrops.filter((d) => gameData.stardrops[d.id]).length;

	return (
		<NavySection title="Stardrops" badge={`${collectedCount} / ${allDrops.length} collected`}>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{allDrops.map((drop) => {
					const collected = Boolean(gameData.stardrops[drop.id]);
					return (
						<div
							key={drop.id}
							className={`flex items-start gap-3 rounded-xl border p-3 transition-all ${
								collected
									? "border-accent/40 bg-accent/10"
									: "border-white/10 bg-white/5"
							}`}
						>
							<img
								src={assetPath(drop.image)}
								alt={drop.name}
								className="mt-0.5 h-8 w-8 shrink-0 object-contain"
							/>
							<div className="min-w-0 flex-1">
								<div
									className={`mb-1 text-xs font-bold ${collected ? "text-accent" : "text-white/80"}`}
								>
									{drop.name}
								</div>
								<div className="mb-1.5 text-[0.625rem] leading-snug text-white/70">
									{drop.description}
								</div>
								{collected ? (
									<span className="bg-accent/20 text-accent inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] font-bold">
										<HiCheck className="h-3 w-3" /> Collected
									</span>
								) : (
									<span className="inline-flex items-center gap-1 rounded-full bg-white/[0.07] px-2 py-0.5 text-[0.625rem] font-bold text-white/60">
										<HiLockClosed className="h-3 w-3 text-red-500" /> Not
										Collected
									</span>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</NavySection>
	);
}
