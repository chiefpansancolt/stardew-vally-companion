"use client";

import { useState } from "react";
import type { CharacterProps as Props, ToolModalState } from "@/types";
import { TOOL_ENTRIES } from "@/data/constants/tools";
import { NavySection } from "@/comps/ui/NavySection";
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
			<NavySection title="Tools & Backpack">
				<div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-8">
					{TOOL_ENTRIES.map(({ key, id }) => (
						<ToolCard
							key={id}
							toolId={id}
							level={toolLevels[key]}
							isUpgrading={toolLevels.currentlyUpgrading === key}
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
			</NavySection>

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
