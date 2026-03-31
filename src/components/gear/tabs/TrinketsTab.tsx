"use client";

import { assetPath } from "@/lib/utils/assetPath";
import { kebabToTitle } from "@/lib/utils/formatting";
import { GEAR_DATA } from "@/data/constants/gear";
import { PriceGrid } from "@/comps/ui/price-grid";

const allTrinkets = GEAR_DATA.trinkets;

export function TrinketsTab() {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{allTrinkets.map((t) => (
				<div
					key={t.id}
					className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3"
				>
					<img
						src={assetPath(t.image)}
						alt={t.name}
						className="h-12 w-12 shrink-0 object-contain"
					/>
					<div className="min-w-0 flex-1">
						<span className="text-[0.8rem] font-bold text-white">{t.name}</span>
						<div className="mt-1 text-[0.6rem] text-white/80">{t.effect}</div>
						<div className="mt-1 flex gap-1">
							<span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.55rem] text-white/80">
								{kebabToTitle(t.source)}
							</span>
						</div>
						<div className="mt-1">
							<PriceGrid price={t.sellPrice} maxQuality="basic" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
