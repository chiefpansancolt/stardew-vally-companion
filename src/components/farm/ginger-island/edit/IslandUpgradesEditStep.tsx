"use client";

import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { IslandUpgradesEditStepProps } from "@/types";
import { ISLAND_UPGRADES } from "@/data/constants/gingerIsland";

const INPUT =
	"w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

const LABEL = "mb-1 block text-xs font-semibold text-gray-500";

export function IslandUpgradesEditStep({
	islandUpgrades,
	goldenWalnutsFound,
	onUpgradesChange,
	onFoundChange,
}: IslandUpgradesEditStepProps) {
	const [localUpgrades, setLocalUpgrades] = useState(islandUpgrades);
	const [localFound, setLocalFound] = useState(goldenWalnutsFound);

	function toggle(id: string) {
		const next = { ...localUpgrades, [id]: !localUpgrades[id] };
		setLocalUpgrades(next);
		onUpgradesChange(next);
	}

	function handleFound(value: number) {
		setLocalFound(value);
		onFoundChange(value);
	}

	const unlockedCount = ISLAND_UPGRADES.filter((u) => localUpgrades[u.id]).length;

	return (
		<div className="space-y-6">
			<div>
				<p className="mb-3 text-xs font-bold tracking-wide text-gray-500 uppercase">
					Golden Walnuts Found
				</p>
				<div className="max-w-xs">
					<label className={LABEL}>Total Found</label>
					<input
						type="number"
						min={0}
						max={130}
						value={localFound}
						onChange={(e) => handleFound(Number(e.target.value))}
						className={INPUT}
					/>
				</div>
			</div>

			<div>
				<div className="mb-3 flex items-center justify-between">
					<p className="text-xs font-bold tracking-wide text-gray-500 uppercase">
						Island Upgrades
					</p>
					<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
						{unlockedCount} / {ISLAND_UPGRADES.length} unlocked
					</span>
				</div>
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
					{ISLAND_UPGRADES.map((upgrade) => {
						const unlocked = Boolean(localUpgrades[upgrade.id]);
						return (
							<button
								key={upgrade.id}
								type="button"
								onClick={() => toggle(upgrade.id)}
								className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
									unlocked
										? "border-accent/40 bg-accent/5 hover:bg-accent/10"
										: "border-gray-200 bg-gray-50 hover:border-gray-300"
								}`}
							>
								<div className="min-w-0 flex-1">
									<div
										className={`mb-0.5 text-xs font-bold ${unlocked ? "text-accent" : "text-gray-700"}`}
									>
										{upgrade.name}
									</div>
									<div className="mb-1.5 text-[0.625rem] leading-snug text-gray-500">
										{upgrade.description}
									</div>
									<div className="flex items-center justify-between">
										<span className="text-[0.625rem] font-semibold text-gray-400">
											{upgrade.cost} walnut{upgrade.cost !== 1 ? "s" : ""} ·{" "}
											{upgrade.location}
										</span>
										{unlocked ? (
											<span className="bg-accent/20 text-accent inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] font-bold">
												<HiCheck className="h-3 w-3" /> Unlocked
											</span>
										) : (
											<span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[0.625rem] font-bold text-gray-500">
												<HiLockClosed className="h-3 w-3" /> Locked
											</span>
										)}
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
