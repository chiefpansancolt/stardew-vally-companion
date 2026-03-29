"use client";

import { starDrops } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { StardropsEditStepProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";

const allDrops = starDrops().get();

export function StardropsEditStep({
	stardrops: initialStardrops,
	onChange,
}: StardropsEditStepProps) {
	const [local, setLocal] = useState(initialStardrops);

	function toggle(id: string) {
		const next = { ...local, [id]: !local[id] };
		setLocal(next);
		onChange(next);
	}

	const collectedCount = allDrops.filter((d) => local[d.id]).length;

	return (
		<div>
			<div className="mb-4 flex items-center justify-between">
				<p className="text-xs font-bold tracking-wide text-gray-500 uppercase">Stardrops</p>
				<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
					{collectedCount} / {allDrops.length} collected
				</span>
			</div>
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
				{allDrops.map((drop) => {
					const collected = Boolean(local[drop.id]);
					return (
						<button
							key={drop.id}
							type="button"
							onClick={() => toggle(drop.id)}
							className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
								collected
									? "border-accent/40 bg-accent/5 hover:bg-accent/10"
									: "border-gray-200 bg-gray-50 hover:border-gray-300"
							}`}
						>
							<img
								src={assetPath(drop.image)}
								alt={drop.name}
								className="mt-0.5 h-8 w-8 shrink-0 object-contain"
							/>
							<div className="min-w-0 flex-1">
								<div
									className={`mb-0.5 text-xs font-bold ${collected ? "text-accent" : "text-gray-700"}`}
								>
									{drop.name}
								</div>
								<div className="mb-1.5 text-[0.625rem] leading-snug text-gray-500">
									{drop.description}
								</div>
								{collected ? (
									<span className="bg-accent/20 text-accent inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] font-bold">
										<HiCheck className="h-3 w-3" /> Collected
									</span>
								) : (
									<span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[0.625rem] font-bold text-gray-500">
										<HiLockClosed className="h-3 w-3" /> Not Collected
									</span>
								)}
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
