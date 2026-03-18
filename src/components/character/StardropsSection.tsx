"use client";

import { starDrops } from "stardew-valley-data";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";

interface Props {
	gameData: GameData;
}

export function StardropsSection({ gameData }: Props) {
	const allDrops = starDrops().get();
	const collectedCount = allDrops.filter((d) => gameData.stardrops[d.id]).length;

	return (
		<div
			className="border-secondary/60 rounded-xl border p-5"
			style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
		>
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
					Stardrops
				</h3>
				<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-semibold">
					{collectedCount} / {allDrops.length} collected
				</span>
			</div>

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
		</div>
	);
}
