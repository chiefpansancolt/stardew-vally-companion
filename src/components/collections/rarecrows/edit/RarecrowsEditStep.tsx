"use client";

import { rarecrows } from "stardew-valley-data";
import type { RarecrowsEditStepProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";

const allRarecrows = rarecrows().sortByNumber().get();

export function RarecrowsEditStep({ rarecrows: obtained, onChange }: Props) {
	function toggle(id: string) {
		const next = obtained.includes(id) ? obtained.filter((r) => r !== id) : [...obtained, id];
		onChange(next);
	}

	return (
		<div className="space-y-2">
			<p className="text-[0.7rem] font-semibold text-gray-500">
				{obtained.length} / {allRarecrows.length} obtained
			</p>
			{allRarecrows.map((r) => {
				const isObtained = obtained.includes(r.id);
				return (
					<button
						key={r.id}
						type="button"
						onClick={() => toggle(r.id)}
						className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border p-2.5 text-left transition-colors ${
							isObtained
								? "border-primary/30 bg-primary/5"
								: "border-gray-200 bg-white hover:bg-gray-50"
						}`}
					>
						<img
							src={assetPath(r.image)}
							alt={r.name}
							className="h-8 w-8 shrink-0 object-contain"
						/>
						<div className="min-w-0 flex-1">
							<div className="text-[0.7rem] font-bold text-gray-700">{r.name}</div>
							<div className="truncate text-[0.6rem] text-gray-600">{r.obtain}</div>
						</div>
						<span
							className={`shrink-0 rounded-full px-2 py-0.5 text-[0.6rem] font-semibold ${
								isObtained
									? "bg-primary/10 text-primary"
									: "bg-gray-100 text-gray-600"
							}`}
						>
							{isObtained ? "Obtained" : "Missing"}
						</span>
					</button>
				);
			})}
		</div>
	);
}
