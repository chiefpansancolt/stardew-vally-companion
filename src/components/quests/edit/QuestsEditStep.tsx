"use client";

import { quests } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { QuestsEditStepProps } from "@/types";

const allQuests = quests().get();

const INPUT =
	"w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

const LABEL = "mb-1 block text-xs font-semibold text-gray-500";

export function QuestsEditStep({
	questsCompleted,
	helpWantedCompleted,
	onQuestsChange,
	onHelpWantedChange,
}: QuestsEditStepProps) {
	const [localQuests, setLocalQuests] = useState(questsCompleted);
	const [localHelpWanted, setLocalHelpWanted] = useState(helpWantedCompleted);

	function toggle(id: string) {
		const next = { ...localQuests, [id]: !localQuests[id] };
		setLocalQuests(next);
		onQuestsChange(next);
	}

	function handleHelpWanted(value: number) {
		setLocalHelpWanted(value);
		onHelpWantedChange(value);
	}

	const completedCount = allQuests.filter((q) => localQuests[q.id]).length;

	return (
		<div className="space-y-6">
			<div>
				<p className="mb-3 text-xs font-bold tracking-wide text-gray-500 uppercase">
					Help Wanted
				</p>
				<div className="max-w-xs">
					<label className={LABEL}>Quests Completed</label>
					<input
						type="number"
						min={0}
						value={localHelpWanted}
						onChange={(e) => handleHelpWanted(Number(e.target.value))}
						className={INPUT}
					/>
				</div>
			</div>

			<div>
				<div className="mb-3 flex items-center justify-between">
					<p className="text-xs font-bold tracking-wide text-gray-500 uppercase">
						Quests
					</p>
					<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
						{completedCount} / {allQuests.length} completed
					</span>
				</div>
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
					{allQuests.map((quest, idx) => {
						const done = Boolean(localQuests[quest.id]);
						return (
							<button
								key={`${quest.id}-${idx}`}
								type="button"
								onClick={() => toggle(quest.id)}
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
										{quest.name}
									</div>
									<div className="mb-1.5 text-[0.625rem] leading-snug text-gray-500">
										{quest.requirements}
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
					})}
				</div>
			</div>
		</div>
	);
}
