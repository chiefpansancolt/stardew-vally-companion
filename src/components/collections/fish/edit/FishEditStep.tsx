"use client";

import { fish } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { FishCaughtProgress, FishEditStepProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";

const allFish = fish().sortByName().get();

export function FishEditStep({ fishCaught, onChange }: FishEditStepProps) {
	const [local, setLocal] = useState<FishCaughtProgress[]>(fishCaught);
	const [search, setSearch] = useState("");

	const caughtIds = new Set(local.map((f) => f.id));

	function toggle(id: string) {
		let next: FishCaughtProgress[];
		if (caughtIds.has(id)) {
			next = local.filter((f) => f.id !== id);
		} else {
			next = [...local, { id, timesCaught: 1, largestSize: 0 }];
		}
		setLocal(next);
		onChange(next);
	}

	const filtered = allFish.filter(
		(f) => !search || f.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between gap-2">
				<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
					{caughtIds.size} / {allFish.length} caught
				</span>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search fish…"
					className="focus:border-primary rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none"
				/>
			</div>

			<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
				{filtered.map((f) => {
					const caught = caughtIds.has(f.id);
					return (
						<button
							key={f.id}
							type="button"
							onClick={() => toggle(f.id)}
							className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2 text-left transition-colors ${
								caught
									? "border-accent/40 bg-accent/5 hover:bg-accent/10"
									: "border-gray-200 bg-gray-50 hover:border-gray-300"
							}`}
						>
							<img
								src={assetPath(f.image)}
								alt={f.name}
								className="h-8 w-8 shrink-0 object-contain"
							/>
							<div
								className={`min-w-0 flex-1 text-[0.65rem] leading-tight font-bold ${caught ? "text-accent" : "text-gray-700"}`}
							>
								{f.name}
							</div>
							{caught ? (
								<HiCheck className="text-accent h-3.5 w-3.5 shrink-0" />
							) : (
								<HiLockClosed className="h-3.5 w-3.5 shrink-0 text-gray-400" />
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
}
