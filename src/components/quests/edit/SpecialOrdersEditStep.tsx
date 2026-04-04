"use client";

import { specialOrders } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { SpecialOrdersEditStepProps } from "@/types";

const allOrders = specialOrders().get();
const townOrders = allOrders.filter((o) => o.type === "town");
const qiOrders = allOrders.filter((o) => o.type === "qi");

export function SpecialOrdersEditStep({
	specialOrdersCompleted,
	onChange,
}: SpecialOrdersEditStepProps) {
	const [local, setLocal] = useState(specialOrdersCompleted);

	function toggle(id: string) {
		const next = { ...local, [id]: !local[id] };
		setLocal(next);
		onChange(next);
	}

	const completedCount = allOrders.filter((o) => local[o.id]).length;

	function renderOrder(order: (typeof allOrders)[number]) {
		const done = Boolean(local[order.id]);
		return (
			<button
				key={order.id}
				type="button"
				onClick={() => toggle(order.id)}
				className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
					done
						? "border-accent/40 bg-accent/5 hover:bg-accent/10"
						: "border-gray-200 bg-gray-50 hover:border-gray-300"
				}`}
			>
				<div className="min-w-0 flex-1">
					<div
						className={`mb-0.5 text-xs font-bold ${done ? "text-accent" : "text-gray-700"}`}
					>
						{order.name}
					</div>
					<div className="mb-1.5 text-[0.625rem] leading-snug text-gray-500">
						{order.requirements}
					</div>
					{done ? (
						<span className="bg-accent/20 text-accent inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] font-bold">
							<HiCheck className="h-3 w-3" /> Completed
						</span>
					) : (
						<span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[0.625rem] font-bold text-gray-500">
							<HiLockClosed className="h-3 w-3" /> Incomplete
						</span>
					)}
				</div>
			</button>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<p className="text-xs font-bold tracking-wide text-gray-500 uppercase">
					Special Orders
				</p>
				<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
					{completedCount} / {allOrders.length} completed
				</span>
			</div>

			<div>
				<p className="mb-2 text-[0.65rem] font-bold tracking-wide text-gray-400 uppercase">
					Town Orders
				</p>
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
					{townOrders.map(renderOrder)}
				</div>
			</div>

			<div>
				<p className="mb-2 text-[0.65rem] font-bold tracking-wide text-gray-400 uppercase">
					Qi&apos;s Orders
				</p>
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
					{qiOrders.map(renderOrder)}
				</div>
			</div>
		</div>
	);
}
