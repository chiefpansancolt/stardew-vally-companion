"use client";

import { useState } from "react";
import { assetPath } from "@/lib/utils/assetPath";
import { GEAR_DATA } from "@/data/constants/gear";
import { PriceGrid } from "@/comps/ui/price-grid";
import { SearchField } from "@/comps/ui/SearchField";

const allRings = GEAR_DATA.rings;

export function RingsTab() {
	const [search, setSearch] = useState("");
	const filtered = allRings.filter(
		(r) => !search || r.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<>
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<SearchField value={search} onChange={setSearch} placeholder="Search rings…" />
			</div>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map((r) => (
					<div
						key={r.id}
						className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3"
					>
						<img
							src={assetPath(r.image)}
							alt={r.name}
							className="h-12 w-12 shrink-0 object-contain"
						/>
						<div className="min-w-0 flex-1">
							<span className="text-[0.8rem] font-bold text-white">{r.name}</span>
							<div className="mt-1 text-[0.6rem] text-white/80">{r.description}</div>
							{r.sources.length > 0 && (
								<div className="mt-1 flex flex-wrap gap-1">
									{r.sources.map((s) => (
										<span
											key={s}
											className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.55rem] text-white/80"
										>
											{s}
										</span>
									))}
								</div>
							)}
							{r.sellPrice > 0 && (
								<div className="mt-1">
									<PriceGrid price={r.sellPrice} maxQuality="basic" />
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</>
	);
}
