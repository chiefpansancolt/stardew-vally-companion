"use client";

import { assetPath } from "@/lib/utils/assetPath";
import { GEAR_DATA } from "@/data/constants/gear";
import { PriceGrid } from "@/comps/ui/price-grid";

const allBait = GEAR_DATA.bait;

export function BaitTab() {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{allBait.map((b) => (
				<div
					key={b.id}
					className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3"
				>
					<img
						src={assetPath(b.image)}
						alt={b.name}
						className="h-12 w-12 shrink-0 object-contain"
					/>
					<div className="min-w-0 flex-1">
						<span className="text-[0.8rem] font-bold text-white">{b.name}</span>
						<div className="mt-1 text-[0.6rem] text-white/80">{b.description}</div>
						<div className="mt-1">
							<PriceGrid price={b.sellPrice} maxQuality="basic" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
