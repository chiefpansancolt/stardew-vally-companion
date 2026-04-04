"use client";

import { monsters } from "stardew-valley-data";
import { useState } from "react";
import type { MonsterKillsEditStepProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";

const allMonsters = monsters()
	.get()
	.sort((a, b) => a.name.localeCompare(b.name));

const INPUT =
	"w-20 rounded border border-gray-300 px-2 py-1 text-center text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export function MonsterKillsEditStep({ monsters: initial, onChange }: MonsterKillsEditStepProps) {
	const [local, setLocal] = useState<Record<string, number>>({ ...initial });
	const [search, setSearch] = useState("");

	function setKills(name: string, value: number) {
		const next = { ...local };
		if (value <= 0) {
			delete next[name];
		} else {
			next[name] = value;
		}
		setLocal(next);
		onChange(next);
	}

	const q = search.toLowerCase();
	const filtered = allMonsters.filter((m) => !q || m.name.toLowerCase().includes(q));

	const totalKills = Object.values(local).reduce((sum, c) => sum + c, 0);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between gap-2">
				<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
					{totalKills.toLocaleString()} total kills
				</span>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search monsters…"
					className="focus:border-primary rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none"
				/>
			</div>

			<div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
				{filtered.map((monster) => {
					const kills = local[monster.name] ?? 0;
					return (
						<div
							key={monster.id}
							className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 p-2"
						>
							<img
								src={assetPath(monster.image)}
								alt={monster.name}
								className="h-8 w-8 shrink-0 object-contain"
							/>
							<div className="min-w-0 flex-1 text-xs font-bold text-gray-700">
								{monster.name}
							</div>
							<div className="flex shrink-0 items-center gap-1.5">
								<button
									type="button"
									onClick={() => setKills(monster.name, Math.max(0, kills - 1))}
									className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-gray-300 bg-white text-sm font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30"
									disabled={kills === 0}
								>
									−
								</button>
								<input
									type="number"
									min={0}
									value={kills}
									onChange={(e) =>
										setKills(monster.name, Math.max(0, Number(e.target.value)))
									}
									className={INPUT}
								/>
								<button
									type="button"
									onClick={() => setKills(monster.name, kills + 1)}
									className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-gray-300 bg-white text-sm font-bold text-gray-600 hover:bg-gray-100"
								>
									+
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
