"use client";

import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { ShippedItemsEditStepProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";

export function ShippedItemsEditStep({ items, shipped, onChange }: ShippedItemsEditStepProps) {
	const [local, setLocal] = useState(shipped);

	function toggle(id: string) {
		const next = { ...local };
		if (next[id]?.shipped) {
			delete next[id];
		} else {
			next[id] = { shipped: true, count: 1 };
		}
		setLocal(next);
		onChange(next);
	}

	function setCount(id: string, count: number) {
		const next = { ...local, [id]: { shipped: true, count: Math.max(1, count) } };
		setLocal(next);
		onChange(next);
	}

	const shippedCount = items.filter((i) => local[i.id]?.shipped).length;

	return (
		<div>
			<div className="mb-3 flex items-center justify-between">
				<p className="text-xs font-bold tracking-wide text-gray-500 uppercase">Items</p>
				<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
					{shippedCount} / {items.length} shipped
				</span>
			</div>
			<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
				{items.map((item) => {
					const isShipped = Boolean(local[item.id]?.shipped);
					const count = local[item.id]?.count ?? 1;
					return (
						<div
							key={item.id}
							className={`rounded-xl border transition-colors ${
								isShipped
									? "border-accent/40 bg-accent/5"
									: "border-gray-200 bg-gray-50"
							}`}
						>
							<button
								type="button"
								onClick={() => toggle(item.id)}
								className={`flex w-full cursor-pointer items-center gap-2 p-2 text-left`}
							>
								<img
									src={assetPath(item.image)}
									alt={item.name}
									className="h-8 w-8 shrink-0 object-contain"
								/>
								<div className="min-w-0 flex-1">
									<div
										className={`text-[0.65rem] leading-tight font-bold ${isShipped ? "text-accent" : "text-gray-700"}`}
									>
										{item.name}
									</div>
								</div>
								{isShipped ? (
									<HiCheck className="text-accent h-3.5 w-3.5 shrink-0" />
								) : (
									<HiLockClosed className="h-3.5 w-3.5 shrink-0 text-gray-400" />
								)}
							</button>
							{isShipped && (
								<div className="border-accent/20 flex items-center gap-1 border-t px-2 py-1">
									<span className="text-[0.6rem] text-gray-500">Count:</span>
									<input
										type="number"
										min={1}
										value={count}
										onChange={(e) => setCount(item.id, Number(e.target.value))}
										className="border-accent/30 focus:border-primary w-full rounded border bg-white px-1.5 py-0.5 text-center text-[0.65rem] focus:outline-none"
									/>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
