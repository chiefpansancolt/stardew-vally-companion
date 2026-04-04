"use client";

import { goldenWalnuts } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { WalnutsEditStepProps } from "@/types";
import { WALNUT_LOCATIONS } from "@/data/constants/gingerIsland";

const allWalnuts = goldenWalnuts().get();

export function WalnutsEditStep({ goldenWalnuts: initial, onChange }: WalnutsEditStepProps) {
	const [local, setLocal] = useState(initial);

	function toggle(id: string) {
		const next = { ...local };
		if (next[id]) {
			delete next[id];
		} else {
			next[id] = 1;
		}
		setLocal(next);
		onChange(next);
	}

	const foundCount = Object.keys(local).length;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<p className="text-xs font-bold tracking-wide text-gray-500 uppercase">
					Golden Walnuts
				</p>
				<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
					{foundCount} / {allWalnuts.length} found
				</span>
			</div>

			{WALNUT_LOCATIONS.map((location) => {
				const locationWalnuts = allWalnuts.filter((w) => w.location === location);
				if (locationWalnuts.length === 0) return null;
				return (
					<div key={location}>
						<p className="mb-2 text-[0.65rem] font-bold tracking-wide text-gray-400 uppercase">
							{location}
						</p>
						<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
							{locationWalnuts.map((walnut) => {
								const found = Boolean(local[walnut.id]);
								return (
									<button
										key={walnut.id}
										type="button"
										onClick={() => toggle(walnut.id)}
										className={`flex cursor-pointer items-start gap-3 rounded-xl border p-2.5 text-left transition-colors ${
											found
												? "border-accent/40 bg-accent/5 hover:bg-accent/10"
												: "border-gray-200 bg-gray-50 hover:border-gray-300"
										}`}
									>
										<div className="min-w-0 flex-1">
											<div
												className={`mb-0.5 text-xs font-bold ${found ? "text-accent" : "text-gray-700"}`}
											>
												{walnut.name}
											</div>
											<div className="text-[0.6rem] text-gray-500">
												x{walnut.amount}
											</div>
										</div>
										{found ? (
											<HiCheck className="text-accent mt-0.5 h-3.5 w-3.5 shrink-0" />
										) : (
											<HiLockClosed className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
										)}
									</button>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}
