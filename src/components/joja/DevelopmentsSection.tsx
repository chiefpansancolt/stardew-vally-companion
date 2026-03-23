"use client";

import { bundles, type JojaBundle } from "stardew-valley-data";
import type { CollectionProps as Props } from "@/types";
import { formatNumber } from "@/lib/utils/formatting";
import { NavySection } from "@/comps/ui/NavySection";
import { StatusBadge } from "@/comps/ui/StatusBadge";

const jojaBundles = bundles().jojaBundles().get() as JojaBundle[];

export function DevelopmentsSection({ gameData }: Props) {
	const purchased = jojaBundles.filter(
		(b) => gameData.joja.developments[b.id],
	).length;

	return (
		<NavySection title="Development Projects" badge={`${purchased} / ${jojaBundles.length} purchased`}>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{jojaBundles.map((dev) => {
					const isPurchased = !!gameData.joja.developments[dev.id];
					return (
						<div
							key={dev.id}
							className={`flex flex-col gap-2 rounded-lg border p-4 ${
								isPurchased
									? "border-green-400/30 bg-green-400/10"
									: "border-white/10 bg-white/5"
							}`}
						>
							<div className="flex items-center justify-between gap-2">
								<span
									className={`text-base font-bold ${isPurchased ? "text-green-300" : "text-white/80"}`}
								>
									{dev.name}
								</span>
								<StatusBadge
									status={isPurchased ? "success" : "inactive"}
									label={isPurchased ? "Purchased" : "Not Purchased"}
								/>
							</div>
							<div className="text-[0.7rem] text-white/80">{dev.description}</div>
							<div className="flex items-center justify-between">
								<span className="text-sm font-bold text-highlight">
									{formatNumber(dev.goldCost)}g
								</span>
								<span className="text-[0.65rem] text-white/80">
									Unlocks: <strong>{dev.unlock}</strong>
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</NavySection>
	);
}
