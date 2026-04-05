"use client";

import { quests, specialOrders } from "stardew-valley-data";
import { useState } from "react";
import type { CollectionProps as Props } from "@/types";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { StatusBadge } from "@/comps/ui/StatusBadge";

const allQuests = quests().get();
const allSpecialOrders = specialOrders().get();
const townOrders = allSpecialOrders.filter((o) => o.type === "town");
const qiOrders = allSpecialOrders.filter((o) => o.type === "qi");

export function QuestsTab({ gameData }: Props) {
	const [questSearch, setQuestSearch] = useState("");
	const [townSearch, setTownSearch] = useState("");
	const [qiSearch, setQiSearch] = useState("");

	const filteredQuests = allQuests.filter(
		(quest) => !questSearch || quest.name.toLowerCase().includes(questSearch.toLowerCase())
	);
	const filteredTown = townOrders.filter(
		(o) => !townSearch || o.name.toLowerCase().includes(townSearch.toLowerCase())
	);
	const filteredQi = qiOrders.filter(
		(o) => !qiSearch || o.name.toLowerCase().includes(qiSearch.toLowerCase())
	);

	const questsComplete = allQuests.filter((quest) => gameData.questsCompleted[quest.id]).length;
	const townComplete = townOrders.filter((o) => gameData.specialOrdersCompleted[o.id]).length;
	const qiComplete = qiOrders.filter((o) => gameData.specialOrdersCompleted[o.id]).length;

	return (
		<div className="flex flex-col gap-4">
			<NavySection title="Main Quests" badge={`${questsComplete} / ${allQuests.length}`}>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField
						value={questSearch}
						onChange={setQuestSearch}
						placeholder="Search quests…"
					/>
				</div>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{filteredQuests.map((quest, i) => (
						<div
							key={`${quest.id}-${i}`}
							className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-white/5 p-3"
						>
							<span className="text-[0.8rem] font-bold text-white/80">
								{quest.name}
							</span>
							<div className="text-[0.6rem] text-white/80">{quest.text}</div>
							<span className="self-start rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.55rem] text-white/80">
								{quest.providedBy}
							</span>
							<div className="border-highlight/20 bg-highlight/8 flex items-center gap-1.5 rounded border px-2 py-1">
								<span className="text-[0.55rem] font-semibold text-white/80">
									Reward:
								</span>
								<span className="text-highlight text-[0.6rem] font-semibold">
									{quest.rewards}
								</span>
							</div>
						</div>
					))}
				</div>
			</NavySection>

			<NavySection
				title="Special Orders (Town)"
				badge={`${townComplete} / ${townOrders.length}`}
			>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField
						value={townSearch}
						onChange={setTownSearch}
						placeholder="Search orders…"
					/>
				</div>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{filteredTown.map((order) => {
						const done = !!gameData.specialOrdersCompleted[order.id];
						return (
							<div
								key={order.id}
								className={`flex flex-col gap-1.5 rounded-lg border p-3 ${
									done
										? "border-green-400/30 bg-green-400/10"
										: "border-white/10 bg-white/5"
								}`}
							>
								<div className="flex items-center justify-between gap-2">
									<span
										className={`text-[0.8rem] font-bold ${done ? "text-green-300" : "text-white/80"}`}
									>
										{order.name}
									</span>
									<StatusBadge
										status={done ? "success" : "inactive"}
										label={done ? "Complete" : "Incomplete"}
									/>
								</div>
								<div className="text-[0.6rem] text-white/80">{order.text}</div>
								<div className="flex flex-wrap gap-1">
									<span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.55rem] text-white/80">
										{order.requester}
									</span>
									<span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.55rem] text-white/80">
										{order.timeframe} days
									</span>
								</div>
								<div className="border-highlight/20 bg-highlight/8 flex items-center gap-1.5 rounded border px-2 py-1">
									<span className="text-[0.55rem] font-semibold text-white/80">
										Reward:
									</span>
									<span className="text-highlight text-[0.6rem] font-semibold">
										{order.rewards}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</NavySection>

			<NavySection title="Qi Special Orders" badge={`${qiComplete} / ${qiOrders.length}`}>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField
						value={qiSearch}
						onChange={setQiSearch}
						placeholder="Search Qi orders…"
					/>
				</div>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{filteredQi.map((order) => {
						const done = !!gameData.specialOrdersCompleted[order.id];
						return (
							<div
								key={order.id}
								className={`flex flex-col gap-1.5 rounded-lg border p-3 ${
									done
										? "border-green-400/30 bg-green-400/10"
										: "border-white/10 bg-white/5"
								}`}
							>
								<div className="flex items-center justify-between gap-2">
									<span
										className={`text-[0.8rem] font-bold ${done ? "text-green-300" : "text-white/80"}`}
									>
										{order.name}
									</span>
									<StatusBadge
										status={done ? "success" : "inactive"}
										label={done ? "Complete" : "Incomplete"}
									/>
								</div>
								<div className="text-[0.6rem] text-white/80">{order.text}</div>
								<span className="self-start rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.55rem] text-white/80">
									{order.timeframe} days
								</span>
								<div className="border-highlight/20 bg-highlight/8 flex items-center gap-1.5 rounded border px-2 py-1">
									<span className="text-[0.55rem] font-semibold text-white/80">
										Reward:
									</span>
									<span className="text-highlight text-[0.6rem] font-semibold">
										{order.rewards}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</NavySection>
		</div>
	);
}
