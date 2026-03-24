"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { DashboardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { effectiveMaxHearts } from "@/lib/utils/villagerHearts";
import { DASHBOARD_DATA } from "@/data/constants/dashboard";
import { NavySection } from "@/comps/ui/NavySection";

const { allVillagers } = DASHBOARD_DATA;

export function VillagersCard({ gameData }: DashboardProps) {
	const spouse = gameData.character.spouse;

	const villagerRows = allVillagers.map((v) => {
		const progress = gameData.villagers[v.name];
		const isMarried = spouse === v.name;
		const status = (progress?.status ?? "").toLowerCase();
		const maxH = effectiveMaxHearts(v, isMarried, status);
		const currentH = progress?.hearts ?? 0;
		const isMaxed = currentH >= maxH;
		return { v, progress, isMarried, maxH, currentH, isMaxed };
	});

	const atMax = villagerRows.filter((r) => r.isMaxed).length;

	const spouseRow = villagerRows.find((r) => r.isMarried);

	return (
		<NavySection title="Relationships" badge={`${atMax} / ${allVillagers.length} maxed`}>
			<div className="flex flex-col gap-4">
				{spouseRow && (
					<div className="flex items-center gap-3 rounded-lg border border-red-400/20 bg-red-400/8 px-3 py-2">
						<img
							src={assetPath(spouseRow.v.spouseImage ?? spouseRow.v.image)}
							alt={spouseRow.v.name}
							className="h-10 w-10 shrink-0 rounded-lg object-contain"
						/>
						<div className="min-w-0 flex-1">
							<div className="text-[0.8rem] font-bold text-white/80">
								{spouseRow.v.name}
							</div>
							<div className="mt-1 flex flex-wrap gap-0.5">
								{Array.from({ length: spouseRow.maxH }).map((_, i) =>
									i < spouseRow.currentH ? (
										<FaHeart key={i} className="h-2.5 w-2.5 text-red-400" />
									) : (
										<FaRegHeart key={i} className="h-2.5 w-2.5 text-white/80" />
									)
								)}
							</div>
							<div className="mt-0.5 text-[0.6rem] text-white/80">
								{spouseRow.currentH} / {spouseRow.maxH} hearts
							</div>
						</div>
					</div>
				)}

				<div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
					{villagerRows
						.filter((r) => !r.isMarried)
						.map(({ v, currentH, maxH, isMaxed }) => (
							<div key={v.id} className="flex flex-col items-center gap-1">
								<div
									className={`h-9 w-9 overflow-hidden rounded-lg border-2 ${
										isMaxed ? "border-green-400/50" : "border-white/10"
									}`}
								>
									<img
										src={assetPath(v.image)}
										alt={v.name}
										className="h-full w-full object-contain"
									/>
								</div>
								<div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
									<div
										className={`h-full rounded-full ${isMaxed ? "bg-green-400" : "bg-red-400"}`}
										style={{
											width: `${maxH > 0 ? (currentH / maxH) * 100 : 0}%`,
										}}
									/>
								</div>
								<span className="max-w-full truncate text-[0.5rem] text-white/80">
									{v.name}
								</span>
							</div>
						))}
				</div>
			</div>
		</NavySection>
	);
}
