"use client";

import { HiPlus, HiX } from "react-icons/hi";
import type { ChildrenEditStepProps as Props } from "@/types";
import type { ChildProgress } from "@/types/app/game";

const GENDER_OPTIONS = ["Male", "Female"];

export function ChildrenEditStep({ items, onChange }: Props) {
	function addChild() {
		if (items.length >= 2) return;
		const next: ChildProgress[] = [...items, { name: "", age: 0, gender: "Male" }];
		onChange(next);
	}

	function removeChild(idx: number) {
		onChange(items.filter((_, i) => i !== idx));
	}

	function updateChild(idx: number, patch: Partial<ChildProgress>) {
		onChange(items.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
	}

	return (
		<div className="space-y-3">
			<p className="text-[0.7rem] font-semibold text-gray-500">{items.length} / 2 children</p>

			{items.map((child, idx) => (
				<div key={idx} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
					<div className="mb-2 flex items-center justify-between">
						<span className="text-[0.7rem] font-bold text-gray-600">
							Child {idx + 1}
						</span>
						<button
							type="button"
							onClick={() => removeChild(idx)}
							className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-red-200 bg-white text-red-400 hover:bg-red-50"
						>
							<HiX className="h-3 w-3" />
						</button>
					</div>
					<div className="grid grid-cols-3 gap-2">
						<div className="col-span-3">
							<label className="mb-1 block text-[0.65rem] font-semibold text-gray-500">
								Name
							</label>
							<input
								type="text"
								value={child.name}
								onChange={(e) => updateChild(idx, { name: e.target.value })}
								placeholder="Child's name"
								className="border-primary/30 focus:border-primary w-full rounded border bg-white px-2 py-1 text-[0.75rem] focus:outline-none"
							/>
						</div>
						<div>
							<label className="mb-1 block text-[0.65rem] font-semibold text-gray-500">
								Age
							</label>
							<input
								type="number"
								min={0}
								value={child.age}
								onChange={(e) =>
									updateChild(idx, { age: Math.max(0, Number(e.target.value)) })
								}
								className="border-primary/30 focus:border-primary w-full rounded border bg-white px-2 py-1 text-[0.75rem] focus:outline-none"
							/>
						</div>
						<div>
							<label className="mb-1 block text-[0.65rem] font-semibold text-gray-500">
								Gender
							</label>
							<select
								value={child.gender}
								onChange={(e) => updateChild(idx, { gender: e.target.value })}
								className="border-primary/30 focus:border-primary w-full rounded border bg-white px-2 py-1 text-[0.75rem] focus:outline-none"
							>
								{GENDER_OPTIONS.map((g) => (
									<option key={g} value={g}>
										{g}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			))}

			{items.length < 2 && (
				<button
					type="button"
					onClick={addChild}
					className="hover:border-primary/30 hover:bg-primary/5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-2.5 text-[0.75rem] font-semibold text-gray-500 transition-colors"
				>
					<HiPlus className="h-4 w-4" />
					Add Child
				</button>
			)}
		</div>
	);
}
