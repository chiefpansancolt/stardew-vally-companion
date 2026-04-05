"use client";

import { useState } from "react";
import { assetPath } from "@/lib/utils/assetPath";
import { GEAR_DATA } from "@/data/constants/gear";
import { NavySection } from "@/comps/ui/NavySection";
import { PriceGrid } from "@/comps/ui/price-grid";
import { SearchField } from "@/comps/ui/SearchField";

const allHats = GEAR_DATA.hats;

export function HatsTab() {
	const [search, setSearch] = useState("");
	const filtered = allHats.filter(
		(h) => !search || h.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<NavySection title="Hats" badge={`${allHats.length} items`}>
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<SearchField value={search} onChange={setSearch} placeholder="Search hats…" />
			</div>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map((h) => (
					<div
						key={h.id}
						className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3"
					>
						<img
							src={assetPath(h.image)}
							alt={h.name}
							className="h-12 w-12 shrink-0 object-contain"
						/>
						<div className="min-w-0 flex-1">
							<span className="text-[0.8rem] font-bold text-white">{h.name}</span>
							<div className="mt-1 text-[0.6rem] text-white/80">{h.obtain}</div>
							{typeof h.price === "number" && (
								<div className="mt-1">
									<PriceGrid price={h.price} maxQuality="basic" />
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</NavySection>
	);
}
