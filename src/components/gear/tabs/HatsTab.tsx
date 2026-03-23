"use client";

import { useState } from "react";
import { assetPath } from "@/lib/utils/assetPath";
import { GEAR_DATA } from "@/data/constants/gear";
import { SearchField } from "@/comps/ui/SearchField";

const allHats = GEAR_DATA.hats;

export function HatsTab() {
	const [search, setSearch] = useState("");
	const filtered = allHats.filter(
		(h) => !search || h.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<>
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<SearchField value={search} onChange={setSearch} placeholder="Search hats…" />
			</div>
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
				{filtered.map((h) => (
					<div
						key={h.id}
						className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3"
					>
						<img
							src={assetPath(h.image)}
							alt={h.name}
							className="h-10 w-10 object-contain"
						/>
						<span className="text-center text-[0.7rem] font-bold text-white">
							{h.name}
						</span>
						<span className="text-center text-[0.55rem] text-white/80">{h.obtain}</span>
					</div>
				))}
			</div>
		</>
	);
}
