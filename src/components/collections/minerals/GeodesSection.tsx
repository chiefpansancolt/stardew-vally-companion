"use client";

import { minerals, type GeodeContainer, type MineralItem } from "stardew-valley-data";
import { useState, useMemo } from "react";
import { assetPath } from "@/lib/utils/assetPath";
import { PriceGrid } from "@/comps/ui/PriceGrid";
import { SearchField } from "@/comps/ui/SearchField";
import { HiChevronRight } from "react-icons/hi";
import { GeodeDetailModal } from "./modals/GeodeDetailModal";

const allGeodes = minerals().geodes().get() as GeodeContainer[];

const geodeContents: Record<string, MineralItem[]> = {};
for (const geode of allGeodes) {
	geodeContents[geode.id] = minerals().fromGeode(geode.name).mineralItems().get() as MineralItem[];
}

interface CardProps {
	geode: GeodeContainer;
	contents: MineralItem[];
	onClick: () => void;
}

function GeodeCard({ geode, contents, onClick }: CardProps) {
	return (
		<button
			onClick={onClick}
			className="flex w-full cursor-pointer flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition-all"
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(geode.image)}
					alt={geode.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<span className="text-sm font-bold leading-tight text-white">
						{geode.name}
					</span>
					{(geode.contents?.length ?? contents.length) > 0 && (
						<div className="mt-0.5 text-[0.6rem] font-semibold text-accent">
							{geode.contents?.length ?? contents.length} possible contents <HiChevronRight className="inline h-3 w-3" />
						</div>
					)}
				</div>
			</div>
			<PriceGrid price={geode.sellPrice} maxQuality="normal" />
		</button>
	);
}

export function GeodesSection() {
	const [search, setSearch] = useState("");
	const [selectedGeode, setSelectedGeode] = useState<GeodeContainer | null>(null);

	const filtered = useMemo(
		() =>
			allGeodes.filter(
				(g) => !search || g.name.toLowerCase().includes(search.toLowerCase()),
			),
		[search],
	);

	const selectedContents = selectedGeode ? (geodeContents[selectedGeode.id] ?? null) : null;

	return (
		<>
			<div
				className="border-secondary/60 rounded-xl border p-5"
				style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
			>
				<div className="mb-4 flex items-center justify-between">
					<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
						Geodes
					</h3>
					<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-semibold">
						{allGeodes.length} types
					</span>
				</div>

				<div className="mb-4 flex">
					<SearchField value={search} onChange={setSearch} placeholder="Search geodes…" />
				</div>

				{filtered.length === 0 ? (
					<p className="py-8 text-center text-sm text-white/40">No geodes match your search.</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((g) => (
							<GeodeCard
								key={g.id}
								geode={g}
								contents={geodeContents[g.id] ?? []}
								onClick={() => setSelectedGeode(g)}
							/>
						))}
					</div>
				)}
			</div>

			<GeodeDetailModal
				geode={selectedGeode}
				fallbackContents={selectedContents}
				onClose={() => setSelectedGeode(null)}
			/>
		</>
	);
}
