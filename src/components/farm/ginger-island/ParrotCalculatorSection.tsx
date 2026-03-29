"use client";

import { jojaParrotCalculator } from "stardew-valley-data";
import type { CollectionProps as Props } from "@/types";
import { formatNumber } from "@/lib/utils/formatting";
import { NavySection } from "@/comps/ui/NavySection";

const parrot = jojaParrotCalculator();

export function ParrotCalculatorSection({ gameData }: Props) {
	const walnutsFound =
		gameData.goldenWalnutsFound > 0
			? gameData.goldenWalnutsFound
			: Object.keys(gameData.goldenWalnuts).length;
	const remaining = parrot.remaining(walnutsFound);
	const cost = parrot.cost(walnutsFound);

	const tiles = [
		{
			label: "Walnuts Found",
			value: String(walnutsFound),
			color: "text-green-400",
			sub: `of ${parrot.total} total`,
		},
		{
			label: "Walnuts Remaining",
			value: String(remaining),
			color: remaining === 0 ? "text-green-400" : "text-accent",
			sub: "unfound walnuts",
		},
		{
			label: "Cost Per Walnut",
			value: `${formatNumber(parrot.costPerWalnut)}g`,
			color: "text-highlight",
			sub: "fixed rate",
		},
		{
			label: "Total Cost",
			value: `${formatNumber(cost)}g`,
			color: cost === 0 ? "text-green-400" : "text-highlight",
			sub: "to buy all remaining",
		},
	];

	return (
		<NavySection title="Joja Parrot Calculator">
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
				{tiles.map((t) => (
					<div
						key={t.label}
						className="rounded-lg border border-white/10 bg-white/5 p-4 text-center"
					>
						<div className="text-[0.65rem] font-semibold tracking-wide text-white/40 uppercase">
							{t.label}
						</div>
						<div className={`mt-1.5 text-xl font-extrabold ${t.color}`}>{t.value}</div>
						<div className="mt-1 text-[0.65rem] text-white/40">{t.sub}</div>
					</div>
				))}
			</div>
		</NavySection>
	);
}
