"use client";

import { useState } from "react";
import { assetPath } from "@/lib/utils/assetPath";
import { GEAR_DATA } from "@/data/constants/gear";
import { FilterPopover, FilterSelect } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { PriceGrid } from "@/comps/ui/price-grid";
import { SearchField } from "@/comps/ui/SearchField";

const allWeapons = GEAR_DATA.weapons;
const TYPE_OPTIONS = [
	{ value: "all", label: "All Types" },
	{ value: "sword", label: "Sword" },
	{ value: "dagger", label: "Dagger" },
	{ value: "club", label: "Club" },
	{ value: "slingshot", label: "Slingshot" },
];
const TYPE_COLORS: Record<string, string> = {
	sword: "border-blue-400/25 bg-blue-400/15 text-blue-300",
	dagger: "border-purple-400/25 bg-purple-400/15 text-purple-300",
	club: "border-red-400/25 bg-red-400/15 text-red-300",
	slingshot: "border-green-400/25 bg-green-400/15 text-green-300",
};

export function WeaponsTab() {
	const [search, setSearch] = useState("");
	const [typeFilter, setTypeFilter] = useState("all");

	const filtered = allWeapons
		.filter((w) => !search || w.name.toLowerCase().includes(search.toLowerCase()))
		.filter((w) => typeFilter === "all" || w.type === typeFilter);

	return (
		<NavySection title="Weapons" badge={`${filtered.length} shown`}>
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<SearchField value={search} onChange={setSearch} placeholder="Search weapons…" />
				<FilterPopover activeCount={typeFilter !== "all" ? 1 : 0}>
					<FilterSelect
						label="Type"
						value={typeFilter}
						onChange={setTypeFilter}
						options={TYPE_OPTIONS}
					/>
				</FilterPopover>
			</div>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map((w) => (
					<div
						key={w.id}
						className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3"
					>
						<img
							src={assetPath(w.image)}
							alt={w.name}
							className="h-12 w-12 shrink-0 object-contain"
						/>
						<div className="min-w-0 flex-1">
							<div className="flex items-center justify-between gap-2">
								<span className="text-[0.8rem] font-bold text-white">{w.name}</span>
								<span
									className={`shrink-0 rounded-full border px-1.5 py-0 text-[0.5rem] font-bold uppercase ${TYPE_COLORS[w.type] ?? ""}`}
								>
									{w.type}
								</span>
							</div>
							{w.type !== "slingshot" && (
								<div className="mt-1 flex flex-wrap gap-1">
									<span className="bg-highlight/10 border-highlight/20 text-highlight rounded border px-1.5 py-0.5 text-[0.55rem] font-semibold">
										{w.damageMin}-{w.damageMax} DMG
									</span>
									<span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.55rem] font-semibold text-white/80">
										SPD: {w.speed}
									</span>
									<span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.55rem] font-semibold text-white/80">
										Lvl: {w.level}
									</span>
								</div>
							)}
							<div className="mt-1 text-[0.6rem] text-white/80">{w.obtain}</div>
							<div className="mt-1">
								<PriceGrid price={w.sellPrice} maxQuality="basic" />
							</div>
						</div>
					</div>
				))}
			</div>
		</NavySection>
	);
}
