"use client";

import { artifacts } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { ArtifactsEditStepProps } from "@/types";
import type { MuseumItem } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";

const allArtifacts = artifacts().sortByName().get();

export function ArtifactsEditStep({ artifacts: initial, onChange }: ArtifactsEditStepProps) {
	const [local, setLocal] = useState(initial);
	const [search, setSearch] = useState("");

	function setStatus(id: string, found: boolean, donated: boolean) {
		const next: Record<string, MuseumItem> = { ...local, [id]: { found, donated } };
		if (!found && !donated) delete next[id];
		setLocal(next);
		onChange(next);
	}

	const filtered = allArtifacts.filter(
		(a) => !search || a.name.toLowerCase().includes(search.toLowerCase())
	);

	const foundCount = allArtifacts.filter((a) => local[a.id]?.found).length;
	const donatedCount = allArtifacts.filter((a) => local[a.id]?.donated).length;

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<div className="flex gap-3">
					<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
						{foundCount} / {allArtifacts.length} found
					</span>
					<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
						{donatedCount} / {allArtifacts.length} donated
					</span>
				</div>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search artifacts…"
					className="focus:border-primary rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none"
				/>
			</div>

			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
				{filtered.map((artifact) => {
					const found = Boolean(local[artifact.id]?.found);
					const donated = Boolean(local[artifact.id]?.donated);
					return (
						<div
							key={artifact.id}
							className={`flex items-center gap-3 rounded-xl border p-2.5 ${
								donated
									? "border-accent/40 bg-accent/5"
									: found
										? "border-primary/30 bg-primary/5"
										: "border-gray-200 bg-gray-50"
							}`}
						>
							<img
								src={assetPath(artifact.image)}
								alt={artifact.name}
								className="h-8 w-8 shrink-0 object-contain"
							/>
							<div className="min-w-0 flex-1 text-xs font-bold text-gray-700">
								{artifact.name}
							</div>
							<div className="flex shrink-0 gap-1">
								<button
									type="button"
									onClick={() =>
										setStatus(
											artifact.id,
											!found,
											donated && !found ? false : donated
										)
									}
									className={`cursor-pointer rounded border px-1.5 py-0.5 text-[0.6rem] font-semibold transition-colors ${
										found
											? "border-primary/40 bg-primary/10 text-primary"
											: "border-gray-200 bg-white text-gray-500 hover:bg-gray-100"
									}`}
								>
									{found ? (
										<HiCheck className="inline h-3 w-3" />
									) : (
										<HiLockClosed className="inline h-3 w-3" />
									)}{" "}
									Found
								</button>
								<button
									type="button"
									onClick={() =>
										setStatus(artifact.id, donated ? found : true, !donated)
									}
									className={`cursor-pointer rounded border px-1.5 py-0.5 text-[0.6rem] font-semibold transition-colors ${
										donated
											? "border-accent/40 bg-accent/10 text-accent"
											: "border-gray-200 bg-white text-gray-500 hover:bg-gray-100"
									}`}
								>
									{donated ? (
										<HiCheck className="inline h-3 w-3" />
									) : (
										<HiLockClosed className="inline h-3 w-3" />
									)}{" "}
									Donated
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
