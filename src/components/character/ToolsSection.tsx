"use client";

import { tools } from "stardew-valley-data";
import { useState } from "react";
import { type GameData, type ToolLevels } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { BACKPACK_LEVELS, BackpackDetailModal } from "./modals/BackpackDetailModal";
import { FishingRodDetailModal, ROD_DOT_HEX, type RodData } from "./modals/FishingRodDetailModal";
import { ToolDetailModal, type ToolModalState } from "./modals/ToolDetailModal";

interface Props {
	gameData: GameData;
}

const TOOL_ENTRIES: Array<{ key: keyof ToolLevels; id: string }> = [
	{ key: "axe", id: "axe" },
	{ key: "pickaxe", id: "pickaxe" },
	{ key: "hoe", id: "hoe" },
	{ key: "wateringCan", id: "watering-can" },
	{ key: "pan", id: "pan" },
	{ key: "trashCan", id: "trash-can" },
];

// Game saves all tools as 0=basic, 1=copper, 2=steel, 3=gold, 4=iridium.
// Pan has no basic level in the package (starts at copper=index 0),
// so subtract 1 from the game level when indexing pan's levels[].
const PAN_LEVEL_OFFSET = 1;

const LEVEL_NAMES = ["Basic", "Copper", "Steel", "Gold", "Iridium"];

// Inline hex colors to avoid Tailwind purging dynamic class names
const LEVEL_DOT_HEX: Record<string, string> = {
	Basic: "rgba(255,255,255,0.25)",
	Copper: "#fb923c",
	Steel: "#93c5fd",
	Gold: "#d9c97c",
	Iridium: "#c084fc",
};

const LEVEL_TEXT_CLASSES: Record<string, string> = {
	Basic: "text-white/40",
	Copper: "text-orange-400",
	Steel: "text-blue-300",
	Gold: "text-highlight",
	Iridium: "text-purple-400",
};

const BACKPACK_NAMES: Record<number, string> = {
	12: "Basic Backpack",
	24: "Large Pack",
	36: "Deluxe Pack",
};

function ToolCard({
	toolId,
	level,
	onClick,
}: {
	toolId: string;
	level: number;
	onClick: () => void;
}) {
	const tool = tools().find(toolId);
	if (!tool || tool.type !== "upgradeable") return null;

	const isPan = toolId === "pan";
	const levelIndex = isPan ? Math.max(0, level - PAN_LEVEL_OFFSET) : level;
	const levelData = tool.levels[levelIndex];
	const levelName = LEVEL_NAMES[level] ?? LEVEL_NAMES[LEVEL_NAMES.length - 1];
	const imgSrc = levelData?.image ? assetPath(levelData.image) : null;
	const totalDots = tool.levels.length;
	const dotNames = isPan ? ["Copper", "Steel", "Gold", "Iridium"] : LEVEL_NAMES;

	return (
		<button
			onClick={onClick}
			className="hover:border-accent/40 hover:bg-accent/10 flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-center transition-all"
		>
			{imgSrc ? (
				<img src={imgSrc} alt={tool.name} className="h-10 w-10 object-contain" />
			) : (
				<div className="h-10 w-10 rounded-lg bg-white/10" />
			)}
			<div className="text-xs font-bold text-white">{tool.name}</div>
			<span
				className={`text-[0.625rem] font-bold ${LEVEL_TEXT_CLASSES[levelName] ?? "text-white/40"}`}
			>
				{levelName}
			</span>
			<div className="flex gap-1.5">
				{Array.from({ length: totalDots }).map((_, i) => {
					const dotLevelName = dotNames[i] ?? "";
					const filled = i <= levelIndex;
					return (
						<div
							key={i}
							className="h-2.5 w-2.5 rounded-full transition-all"
							style={{
								backgroundColor: filled
									? (LEVEL_DOT_HEX[dotLevelName] ?? "rgba(255,255,255,0.25)")
									: "rgba(255,255,255,0.1)",
							}}
						/>
					);
				})}
			</div>
		</button>
	);
}

function FishingRodCard({ levelIndex, onClick }: { levelIndex: number; onClick: () => void }) {
	const rod = tools().fishingRods().first() as unknown as RodData | undefined;
	if (!rod) return null;
	const lvl = rod.levels[levelIndex];
	const imgSrc = lvl?.image ? assetPath(lvl.image) : null;
	const isUpgraded = levelIndex > 1; // above Bamboo Pole

	return (
		<button
			onClick={onClick}
			className={`hover:border-accent/40 hover:bg-accent/10 flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all ${
				isUpgraded ? "border-accent/40 bg-accent/10" : "border-white/10 bg-white/5"
			}`}
		>
			{imgSrc ? (
				<img src={imgSrc} alt={lvl?.name} className="h-10 w-10 object-contain" />
			) : (
				<div className="h-10 w-10 rounded-lg bg-white/10" />
			)}
			<div className="text-xs font-bold text-white">{rod.name}</div>
			<span
				className={`text-[0.625rem] font-bold ${isUpgraded ? "text-accent/80" : "text-white/60"}`}
			>
				{lvl?.name ?? "None"}
			</span>
			<div className="flex gap-1.5">
				{rod.levels.map((_, i) => (
					<div
						key={i}
						className="h-2.5 w-2.5 rounded-full transition-all"
						style={{
							backgroundColor:
								i <= levelIndex
									? (ROD_DOT_HEX[i] ?? "rgba(255,255,255,0.25)")
									: "rgba(255,255,255,0.1)",
						}}
					/>
				))}
			</div>
		</button>
	);
}

function BackpackCard({ maxItems, onClick }: { maxItems: number; onClick: () => void }) {
	const name = BACKPACK_NAMES[maxItems] ?? `${maxItems} slots`;
	const backpackId = maxItems === 36 ? "deluxe-pack" : maxItems === 24 ? "large-pack" : null;
	const backpackData = backpackId ? tools().find(backpackId) : null;
	const imgSrc =
		backpackData && backpackData.type === "backpack" ? assetPath(backpackData.image) : null;
	const isUpgraded = maxItems > 12;

	return (
		<button
			onClick={onClick}
			className={`hover:border-accent/40 hover:bg-accent/10 flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all ${
				isUpgraded ? "border-accent/40 bg-accent/10" : "border-white/10 bg-white/5"
			}`}
		>
			{imgSrc ? (
				<img src={imgSrc} alt={name} className="h-10 w-10 object-contain" />
			) : (
				<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-lg">
					🎒
				</div>
			)}
			<div className={`text-xs font-bold ${isUpgraded ? "text-accent" : "text-white"}`}>
				{name}
			</div>
			<span
				className={`text-[0.625rem] font-bold ${isUpgraded ? "text-accent/80" : "text-white/40"}`}
			>
				{maxItems} slots
			</span>
			<div className="mt-0.5 flex gap-1.5">
				{BACKPACK_LEVELS.map((_lvl, i) => {
					const currentIndex = BACKPACK_LEVELS.findIndex((l) => l.slots === maxItems);
					const activeLevelIndex = currentIndex === -1 ? 0 : currentIndex;
					return (
						<div
							key={i}
							className="h-2.5 w-2.5 rounded-full transition-all"
							style={{
								backgroundColor:
									i <= activeLevelIndex
										? "rgba(192,134,74,0.8)"
										: "rgba(255,255,255,0.1)",
							}}
						/>
					);
				})}
			</div>
		</button>
	);
}

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
