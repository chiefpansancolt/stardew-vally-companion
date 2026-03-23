"use client";

import type { CollectionProps as Props } from "@/types";
import { ISLAND_UPGRADES } from "@/data/constants/gingerIsland";
import { NavySection } from "@/comps/ui/NavySection";
import { StatusBadge } from "@/comps/ui/StatusBadge";

export function IslandUpgradesSection({ gameData }: Props) {
	const unlocked = ISLAND_UPGRADES.filter((u) => gameData.islandUpgrades[u.id]).length;

	return (
		<NavySection
			title="Island Upgrades"
			badge={`${unlocked} / ${ISLAND_UPGRADES.length} unlocked`}
		>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{ISLAND_UPGRADES.map((u) => {
					const isUnlocked = !!gameData.islandUpgrades[u.id];
					return (
						<div
							key={u.id}
							className={`flex flex-col gap-1.5 rounded-lg border p-3 ${
								isUnlocked
									? "border-green-400/30 bg-green-400/10"
									: "border-white/10 bg-white/5"
							}`}
						>
							<div className="flex items-center justify-between gap-2">
								<span
									className={`text-sm font-semibold ${isUnlocked ? "text-green-300" : "text-white/80"}`}
								>
									{u.name}
								</span>
								<StatusBadge
									status={isUnlocked ? "success" : "inactive"}
									label={isUnlocked ? "Unlocked" : "Locked"}
								/>
							</div>
							<div className="text-[0.65rem] text-white/80">{u.description}</div>
							<div className="flex items-center gap-2">
								<span className="text-highlight text-[0.6rem] font-bold">
									{u.cost} walnut{u.cost !== 1 ? "s" : ""}
								</span>
								<span className="text-[0.6rem] text-white/80">{u.location}</span>
							</div>
						</div>
					);
				})}
			</div>
		</NavySection>
	);
}
