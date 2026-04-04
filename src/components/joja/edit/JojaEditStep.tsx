"use client";

import { bundles, type JojaBundle } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { JojaEditStepProps } from "@/types";
import type { JojaProgress } from "@/types/app/game";
import { formatNumber } from "@/lib/utils/formatting";

const jojaBundles = bundles().jojaBundles().get() as JojaBundle[];

export function JojaEditStep({ joja: initial, onChange }: JojaEditStepProps) {
	const [local, setLocal] = useState<JojaProgress>(initial);

	function set<K extends keyof JojaProgress>(key: K, value: JojaProgress[K]) {
		const next = { ...local, [key]: value };
		setLocal(next);
		onChange(next);
	}

	function toggleDevelopment(id: string) {
		const next = {
			...local,
			developments: { ...local.developments, [id]: !local.developments[id] },
		};
		setLocal(next);
		onChange(next);
	}

	const purchasedCount = jojaBundles.filter((b) => local.developments[b.id]).length;

	return (
		<div className="space-y-6">
			<div>
				<p className="mb-3 text-xs font-bold tracking-wide text-gray-500 uppercase">
					Membership
				</p>
				<div className="grid grid-cols-2 gap-3">
					{(
						[
							{
								key: "isMember",
								label: "Joja Member",
								sub: "Purchased Joja membership",
							},
							{
								key: "completed",
								label: "All Developed",
								sub: "All projects purchased",
							},
						] as const
					).map(({ key, label, sub }) => {
						const active = local[key];
						return (
							<button
								key={key}
								type="button"
								onClick={() => set(key, !active)}
								className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
									active
										? "border-accent/40 bg-accent/5 hover:bg-accent/10"
										: "border-gray-200 bg-gray-50 hover:border-gray-300"
								}`}
							>
								<div className="min-w-0 flex-1">
									<div
										className={`mb-0.5 text-xs font-bold ${active ? "text-accent" : "text-gray-700"}`}
									>
										{label}
									</div>
									<div className="mb-1.5 text-[0.625rem] text-gray-500">
										{sub}
									</div>
									{active ? (
										<span className="bg-accent/20 text-accent inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] font-bold">
											<HiCheck className="h-3 w-3" /> Active
										</span>
									) : (
										<span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[0.625rem] font-bold text-gray-500">
											<HiLockClosed className="h-3 w-3" /> Inactive
										</span>
									)}
								</div>
							</button>
						);
					})}
				</div>
			</div>

			<div>
				<div className="mb-3 flex items-center justify-between">
					<p className="text-xs font-bold tracking-wide text-gray-500 uppercase">
						Development Projects
					</p>
					<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
						{purchasedCount} / {jojaBundles.length} purchased
					</span>
				</div>
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
					{jojaBundles.map((dev) => {
						const purchased = Boolean(local.developments[dev.id]);
						return (
							<button
								key={dev.id}
								type="button"
								onClick={() => toggleDevelopment(dev.id)}
								className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
									purchased
										? "border-accent/40 bg-accent/5 hover:bg-accent/10"
										: "border-gray-200 bg-gray-50 hover:border-gray-300"
								}`}
							>
								<div className="min-w-0 flex-1">
									<div
										className={`mb-0.5 text-xs font-bold ${purchased ? "text-accent" : "text-gray-700"}`}
									>
										{dev.name}
									</div>
									<div className="mb-1 text-[0.625rem] leading-snug text-gray-500">
										{dev.description}
									</div>
									<div className="flex items-center justify-between">
										<span className="text-[0.625rem] font-semibold text-gray-400">
											{formatNumber(dev.goldCost)}g
										</span>
										{purchased ? (
											<span className="bg-accent/20 text-accent inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] font-bold">
												<HiCheck className="h-3 w-3" /> Purchased
											</span>
										) : (
											<span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[0.625rem] font-bold text-gray-500">
												<HiLockClosed className="h-3 w-3" /> Not Purchased
											</span>
										)}
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
