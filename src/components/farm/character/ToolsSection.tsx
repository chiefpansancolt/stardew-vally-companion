"use client";

import { useState } from "react";
import type { CharacterProps as Props, ToolModalState } from "@/types";
import { TOOL_ENTRIES } from "@/data/constants/tools";
import { BackpackCard, FishingRodCard, ToolCard } from "./cards";
import { BackpackDetailModal } from "./modals/BackpackDetailModal";
import { FishingRodDetailModal } from "./modals/FishingRodDetailModal";
import { ToolDetailModal } from "./modals/ToolDetailModal";

export function ToolsSection({ gameData }: Props) {
	const { toolLevels } = gameData;
	const { maxItems } = gameData.character;
	const [modalState, setModalState] = useState<ToolModalState | null>(null);
	const [backpackModalOpen, setBackpackModalOpen] = useState(false);
	const [rodModalOpen, setRodModalOpen] = useState(false);

	return (
		<>
			<div
				className="border-secondary/60 rounded-xl border p-5"
				style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
			>
				<div className="mb-4">
					<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
						Tools & Backpack
					</h3>
				</div>

				<div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-8">
					{TOOL_ENTRIES.map(({ key, id }) => (
						<ToolCard
							key={id}
							toolId={id}
							level={toolLevels[key]}
							onClick={() =>
								setModalState({ toolId: id, currentLevel: toolLevels[key] })
							}
						/>
					))}
					<FishingRodCard
						levelIndex={toolLevels.fishingRod}
						onClick={() => setRodModalOpen(true)}
					/>
					<BackpackCard maxItems={maxItems} onClick={() => setBackpackModalOpen(true)} />
				</div>
			</div>

			<ToolDetailModal state={modalState} onClose={() => setModalState(null)} />
			{rodModalOpen && (
				<FishingRodDetailModal
					levelIndex={toolLevels.fishingRod}
					onClose={() => setRodModalOpen(false)}
				/>
			)}
			{backpackModalOpen && (
				<BackpackDetailModal
					maxItems={maxItems}
					onClose={() => setBackpackModalOpen(false)}
				/>
			)}
		</>
	);
}
