"use client";

import { useState } from "react";
import { assetPath } from "@/lib/utils/assetPath";
import { GEAR_DATA } from "@/data/constants/gear";
import { NavySection } from "@/comps/ui/NavySection";
import { PriceGrid } from "@/comps/ui/price-grid";
import { SearchField } from "@/comps/ui/SearchField";

const allFootwear = GEAR_DATA.footwear;

export function FootwearTab() {
	const [search, setSearch] = useState("");
	const filtered = allFootwear.filter(
		(f) => !search || f.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<NavySection title="Footwear" badge={`${allFootwear.length} items`}>
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<SearchField value={search} onChange={setSearch} placeholder="Search footwear…" />
			</div>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map((f) => (
					<div
						key={f.id}
						className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3"
					>
						<img
							src={assetPath(f.image)}
							alt={f.name}
							className="h-12 w-12 shrink-0 object-contain"
						/>
						<div className="min-w-0 flex-1">
							<span className="text-[0.8rem] font-bold text-white">{f.name}</span>
							<div className="mt-1 flex gap-1">
								<span className="bg-highlight/10 border-highlight/20 text-highlight rounded border px-1.5 py-0.5 text-[0.55rem] font-semibold">
									DEF: {f.defense}
								</span>
								<span className="bg-highlight/10 border-highlight/20 text-highlight rounded border px-1.5 py-0.5 text-[0.55rem] font-semibold">
									IMM: {f.immunity}
								</span>
							</div>
							<div className="mt-1 text-[0.6rem] text-white/80">{f.obtain}</div>
							{"sellPrice" in f &&
								typeof f.sellPrice === "number" &&
								f.sellPrice > 0 && (
									<div className="mt-1">
										<PriceGrid price={f.sellPrice} maxQuality="basic" />
									</div>
								)}
						</div>
					</div>
				))}
			</div>
		</NavySection>
	);
}
