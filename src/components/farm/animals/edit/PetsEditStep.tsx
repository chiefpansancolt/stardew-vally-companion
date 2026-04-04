"use client";

import { useState } from "react";
import type { PetsEditStepProps } from "@/types";
import type { PetProgress } from "@/types/app/game";

export function PetsEditStep({ pets: initial, onChange }: PetsEditStepProps) {
	const [local, setLocal] = useState<PetProgress[]>([...initial]);

	function update(idx: number, patch: Partial<PetProgress>) {
		const next = local.map((p, i) => (i === idx ? { ...p, ...patch } : p));
		setLocal(next);
		onChange(next);
	}

	if (local.length === 0) {
		return <p className="py-8 text-center text-sm text-gray-400">No pets recorded.</p>;
	}

	return (
		<div className="space-y-2">
			{local.map((pet, idx) => (
				<div
					key={`${pet.name}-${idx}`}
					className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-2.5"
				>
					<div className="min-w-0 flex-1">
						<div className="text-xs font-bold text-gray-700">{pet.name}</div>
						<div className="text-[0.6rem] text-gray-400 capitalize">
							{pet.type} · {pet.breed}
						</div>
					</div>
					<div className="flex shrink-0 items-center gap-1.5">
						<span className="text-[0.6rem] text-gray-500">Friendship:</span>
						<input
							type="number"
							min={0}
							max={1000}
							value={pet.friendship ?? 0}
							onChange={(e) =>
								update(idx, {
									friendship: Math.min(1000, Math.max(0, Number(e.target.value))),
								})
							}
							className="focus:border-primary w-16 rounded border border-gray-300 px-1.5 py-0.5 text-center text-xs focus:outline-none"
						/>
					</div>
				</div>
			))}
		</div>
	);
}
