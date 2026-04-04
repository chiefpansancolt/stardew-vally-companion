"use client";

import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { MinesEditStepProps } from "@/types";
import type { MineProgress } from "@/types/app/game";

const INPUT =
	"w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

const LABEL = "mb-1 block text-xs font-semibold text-gray-500";

export function MinesEditStep({ mineProgress: initial, onChange }: MinesEditStepProps) {
	const [local, setLocal] = useState<MineProgress>(initial);

	function set<K extends keyof MineProgress>(key: K, value: MineProgress[K]) {
		const next = { ...local, [key]: value };
		setLocal(next);
		onChange(next);
	}

	return (
		<div className="space-y-6">
			<div>
				<p className="mb-3 text-xs font-bold tracking-wide text-gray-500 uppercase">
					Deepest Levels Reached
				</p>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className={LABEL}>The Mines</label>
						<input
							type="number"
							min={0}
							max={120}
							value={local.deepestMineLevel}
							onChange={(e) => set("deepestMineLevel", Number(e.target.value))}
							className={INPUT}
						/>
					</div>
					<div>
						<label className={LABEL}>Skull Cavern</label>
						<input
							type="number"
							min={0}
							value={local.deepestSkullCavernLevel}
							onChange={(e) => set("deepestSkullCavernLevel", Number(e.target.value))}
							className={INPUT}
						/>
					</div>
				</div>
			</div>

			<div>
				<p className="mb-3 text-xs font-bold tracking-wide text-gray-500 uppercase">Keys</p>
				<div className="grid grid-cols-2 gap-3">
					{(
						[
							{ key: "hasRustyKey", label: "Rusty Key", sub: "Unlocks the Sewers" },
							{ key: "hasSkullKey", label: "Skull Key", sub: "Unlocks Skull Cavern" },
						] as const
					).map(({ key, label, sub }) => {
						const has = local[key];
						return (
							<button
								key={key}
								type="button"
								onClick={() => set(key, !has)}
								className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
									has
										? "border-accent/40 bg-accent/5 hover:bg-accent/10"
										: "border-gray-200 bg-gray-50 hover:border-gray-300"
								}`}
							>
								<div className="min-w-0 flex-1">
									<div
										className={`mb-0.5 text-xs font-bold ${has ? "text-accent" : "text-gray-700"}`}
									>
										{label}
									</div>
									<div className="mb-1.5 text-[0.625rem] text-gray-500">
										{sub}
									</div>
									{has ? (
										<span className="bg-accent/20 text-accent inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] font-bold">
											<HiCheck className="h-3 w-3" /> Obtained
										</span>
									) : (
										<span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[0.625rem] font-bold text-gray-500">
											<HiLockClosed className="h-3 w-3" /> Not Obtained
										</span>
									)}
								</div>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
