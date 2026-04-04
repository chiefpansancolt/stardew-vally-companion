"use client";

import { villagers } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiChevronDown, HiChevronUp } from "react-icons/hi";
import type { VillagersEditStepProps } from "@/types";
import type { VillagerProgress } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { effectiveMaxHearts } from "@/lib/utils/villagerHearts";

const allVillagers = villagers().sortByName().get();

function eventIds(id: number | number[] | null): string[] {
	if (id === null) return [];
	return [id].flat().map(String);
}

function isEventSeen(id: number | number[] | null, eventsSeen: string[]): boolean {
	return eventIds(id).some((eid) => eventsSeen.includes(eid));
}

export function VillagersEditStep({ villagers: initial, onChange }: VillagersEditStepProps) {
	const [local, setLocal] = useState<Record<string, VillagerProgress>>({ ...initial });
	const [search, setSearch] = useState("");
	const [expanded, setExpanded] = useState<Set<string>>(new Set());

	function setHearts(name: string, hearts: number) {
		const existing = local[name];
		const next = {
			...local,
			[name]: {
				hearts,
				heartPoints: existing?.heartPoints ?? hearts * 250,
				eventsSeen: existing?.eventsSeen ?? [],
				status: existing?.status ?? "",
			},
		};
		setLocal(next);
		onChange(next);
	}

	function toggleEvent(name: string, id: number | number[] | null) {
		const ids = eventIds(id);
		if (ids.length === 0) return;
		const existing = local[name];
		const seen = existing?.eventsSeen ?? [];
		const alreadySeen = ids.some((eid) => seen.includes(eid));
		const nextSeen = alreadySeen
			? seen.filter((eid) => !ids.includes(eid))
			: [...seen, ...ids.filter((eid) => !seen.includes(eid))];
		const next = {
			...local,
			[name]: {
				hearts: existing?.hearts ?? 0,
				heartPoints: existing?.heartPoints ?? 0,
				eventsSeen: nextSeen,
				status: existing?.status ?? "",
			},
		};
		setLocal(next);
		onChange(next);
	}

	function toggleExpanded(name: string) {
		setExpanded((prev) => {
			const next = new Set(prev);
			if (next.has(name)) next.delete(name);
			else next.add(name);
			return next;
		});
	}

	const q = search.toLowerCase();
	const filtered = allVillagers.filter((v) => !q || v.name.toLowerCase().includes(q));

	const maxHeartsCount = allVillagers.filter((v) => {
		const p = local[v.name];
		const max = effectiveMaxHearts(
			v,
			local[v.name]?.status?.toLowerCase() === "married",
			p?.status ?? ""
		);
		return p && p.hearts >= max;
	}).length;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between gap-2">
				<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
					{maxHeartsCount} / {allVillagers.length} max hearts
				</span>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search villagers…"
					className="focus:border-primary rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none"
				/>
			</div>

			<div className="space-y-1.5">
				{filtered.map((villager) => {
					const progress = local[villager.name];
					const hearts = progress?.hearts ?? 0;
					const status = progress?.status ?? "";
					const isMarried = status.toLowerCase() === "married";
					const maxHearts = effectiveMaxHearts(villager, isMarried, status);
					const isMax = hearts >= maxHearts;
					const isOpen = expanded.has(villager.name);
					const eventsSeen = progress?.eventsSeen ?? [];
					const seenCount = villager.events.filter((e) =>
						e.id === null ? hearts >= e.heart : isEventSeen(e.id, eventsSeen)
					).length;

					return (
						<div
							key={villager.id}
							className={`rounded-xl border transition-colors ${
								isMax
									? "border-highlight/40 bg-highlight/5"
									: hearts > 0
										? "border-primary/30 bg-primary/5"
										: "border-gray-200 bg-gray-50"
							}`}
						>
							<div className="flex items-center gap-3 p-2.5">
								<img
									src={assetPath(villager.image)}
									alt={villager.name}
									className="h-9 w-9 shrink-0 rounded-full object-cover"
								/>
								<div className="min-w-0 flex-1">
									<div className="text-xs font-bold text-gray-700">
										{villager.name}
									</div>
									<div className="flex items-center gap-1.5">
										<span className="text-[0.6rem] text-gray-400">
											{villager.occupation}
										</span>
										{villager.events.length > 0 && (
											<span className="text-[0.55rem] font-semibold text-gray-400">
												· {seenCount}/{villager.events.length} events
											</span>
										)}
									</div>
								</div>
								<div className="flex shrink-0 items-center gap-2">
									{villager.events.length > 0 && (
										<button
											type="button"
											onClick={() => toggleExpanded(villager.name)}
											className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-100"
										>
											{isOpen ? (
												<HiChevronUp className="h-3.5 w-3.5" />
											) : (
												<HiChevronDown className="h-3.5 w-3.5" />
											)}
										</button>
									)}
									<div className="flex items-center gap-1">
										<button
											type="button"
											onClick={() =>
												setHearts(villager.name, Math.max(0, hearts - 1))
											}
											disabled={hearts === 0}
											className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-gray-300 bg-white text-sm font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30"
										>
											−
										</button>
										<span className="w-12 text-center text-xs font-semibold text-gray-700">
											{hearts} / {maxHearts}
										</span>
										<button
											type="button"
											onClick={() =>
												setHearts(
													villager.name,
													Math.min(maxHearts, hearts + 1)
												)
											}
											disabled={hearts >= maxHearts}
											className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-gray-300 bg-white text-sm font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30"
										>
											+
										</button>
									</div>
								</div>
							</div>

							{isOpen && (
								<div className="space-y-1 border-t border-gray-200 px-3 py-2">
									{villager.events.map((event) => {
										const isNull = event.id === null;
										const seen = isNull
											? hearts >= event.heart
											: isEventSeen(event.id, eventsSeen);
										return (
											<button
												key={
													isNull
														? `null-${event.heart}`
														: eventIds(event.id)[0]
												}
												type="button"
												disabled={isNull}
												onClick={() => toggleEvent(villager.name, event.id)}
												className={`flex w-full cursor-pointer items-start gap-2 rounded-lg px-2 py-1.5 text-left transition-colors ${
													seen
														? "bg-primary/10 hover:bg-primary/15"
														: "bg-white hover:bg-gray-50"
												} ${isNull ? "cursor-default opacity-60" : ""}`}
											>
												<div
													className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
														seen
															? "border-primary bg-primary text-white"
															: "border-gray-300 bg-white"
													}`}
												>
													{seen && <HiCheck className="h-2.5 w-2.5" />}
												</div>
												<div className="min-w-0 flex-1">
													<span className="text-primary/70 text-[0.6rem] font-bold">
														♥{event.heart}
													</span>{" "}
													<span className="text-[0.62rem] text-gray-600">
														{event.description}
													</span>
												</div>
											</button>
										);
									})}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
