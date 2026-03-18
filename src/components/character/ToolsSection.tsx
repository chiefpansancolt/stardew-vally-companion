"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { minerals, tools, type UpgradeLevel } from "stardew-valley-data";
import { useState } from "react";
import { HiLockClosed } from "react-icons/hi";
import { type GameData, type ToolLevels } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";

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

// Colors for modal level cards on light (cream) background
const LEVEL_CARD_HEX: Record<string, { border: string; bg: string; text: string }> = {
	Basic: { border: "rgba(0,0,0,0.1)", bg: "rgba(0,0,0,0.03)", text: "#6b7280" },
	Copper: { border: "rgba(234,88,12,0.3)", bg: "rgba(234,88,12,0.06)", text: "#c2410c" },
	Steel: { border: "rgba(59,130,246,0.3)", bg: "rgba(59,130,246,0.06)", text: "#1d4ed8" },
	Gold: { border: "rgba(161,116,0,0.3)", bg: "rgba(161,116,0,0.06)", text: "#92660a" },
	Iridium: { border: "rgba(126,34,206,0.3)", bg: "rgba(126,34,206,0.06)", text: "#7e22ce" },
};

const BACKPACK_NAMES: Record<number, string> = {
	12: "Basic Backpack",
	24: "Large Pack",
	36: "Deluxe Pack",
};

interface ToolModalState {
	toolId: string;
	currentLevel: number;
}

function ToolDetailModal({
	state,
	onClose,
}: {
	state: ToolModalState | null;
	onClose: () => void;
}) {
	if (!state) return null;
	const tool = tools().find(state.toolId);
	if (!tool || tool.type !== "upgradeable") return null;

	const isPan = state.toolId === "pan";
	const levelIndex = isPan
		? Math.max(0, state.currentLevel - PAN_LEVEL_OFFSET)
		: state.currentLevel;
	const dotNames = isPan ? ["Copper", "Steel", "Gold", "Iridium"] : LEVEL_NAMES;
	const currentLevelName = LEVEL_NAMES[state.currentLevel] ?? LEVEL_NAMES[LEVEL_NAMES.length - 1];

	// Get the current level image for the header
	const currentLevelData = tool.levels[levelIndex];
	const headerImg = currentLevelData?.image ? assetPath(currentLevelData.image) : null;

	return (
		<Modal show={!!state} onClose={onClose} dismissible size="2xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					{headerImg ? (
						<img src={headerImg} alt={tool.name} className="h-10 w-10 object-contain" />
					) : (
						<div className="h-10 w-10 rounded-lg bg-white/10" />
					)}
					<div>
						<div className="text-lg font-extrabold">{tool.name}</div>
						<div
							className="text-sm font-semibold"
							style={{ color: LEVEL_CARD_HEX[currentLevelName]?.text ?? "inherit" }}
						>
							{currentLevelName}
						</div>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<p className="mb-5 text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>

				<div className="flex flex-col gap-3">
					{tool.levels.map((lvl: UpgradeLevel, i: number) => {
						const levelName = dotNames[i] ?? "";
						const isCurrentLevel = i === levelIndex;
						const isReached = i <= levelIndex;
						const colors = LEVEL_CARD_HEX[levelName];
						const imgSrc = lvl.image ? assetPath(lvl.image) : null;
						const materialData = lvl.materialName
							? minerals().findByName(lvl.materialName)
							: null;
						const materialImgSrc =
							materialData && "image" in materialData
								? assetPath(materialData.image as string)
								: null;

						return (
							<div
								key={lvl.level}
								className="flex items-start gap-4 rounded-xl border p-4"
								style={{
									borderColor: colors?.border ?? "rgba(0,0,0,0.1)",
									backgroundColor:
										isCurrentLevel || isReached
											? (colors?.bg ?? "rgba(0,0,0,0.03)")
											: "transparent",
								}}
							>
								{/* Tool image */}
								<div className="shrink-0">
									{imgSrc ? (
										<img
											src={imgSrc}
											alt={levelName}
											className="h-14 w-14 object-contain"
										/>
									) : (
										<div className="h-14 w-14 rounded-lg bg-gray-100" />
									)}
								</div>

								{/* Level info */}
								<div className="min-w-0 flex-1">
									<div className="mb-1 flex items-center gap-2">
										<span
											className="text-sm font-bold"
											style={{
												color: isReached
													? (colors?.text ?? "#374151")
													: "#6b7280",
											}}
										>
											{levelName}
										</span>
										{isCurrentLevel && (
											<span className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-[0.6rem] font-bold">
												Current
											</span>
										)}
										{!isCurrentLevel && isReached && (
											<span className="bg-primary/15 text-primary rounded-full px-2 py-0.5 text-[0.6rem] font-bold">
												Upgraded
											</span>
										)}
										{!isReached && (
											<HiLockClosed className="h-3.5 w-3.5 text-red-500" />
										)}
									</div>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										{lvl.description}
									</p>
								</div>

								{/* Upgrade cost */}
								<div className="shrink-0 text-right">
									{lvl.upgradeCost !== null ? (
										<div className="flex flex-col items-end gap-1.5">
											<div className="text-sm font-bold text-gray-800">
												{lvl.upgradeCost.toLocaleString()}g
											</div>
											{lvl.materialName && (
												<div className="flex items-center gap-1.5">
													{materialImgSrc && (
														<img
															src={materialImgSrc}
															alt={lvl.materialName}
															className="h-5 w-5 object-contain"
														/>
													)}
													<span className="text-[0.65rem] text-gray-600">
														{lvl.materialQuantity !== null &&
														lvl.materialQuantity > 1
															? `${lvl.materialQuantity}× `
															: ""}
														{lvl.materialName}
													</span>
												</div>
											)}
										</div>
									) : (
										<span className="text-[0.65rem] text-gray-800">
											Starter
										</span>
									)}
								</div>
							</div>
						);
					})}
				</div>

				{tool.canEnchant && (
					<p className="mt-4 text-[0.7rem] text-gray-800">
						Can be enchanted at the Forge.
					</p>
				)}
			</ModalBody>
		</Modal>
	);
}

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
			{/* Level dots */}
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

interface BackpackLevel {
	id: string | null;
	name: string;
	description: string;
	slots: number;
	cost: number | null;
	image: string | null;
}

const BACKPACK_LEVELS: BackpackLevel[] = [
	{
		id: null,
		name: "Basic Backpack",
		description: "Your starting backpack. Holds 12 items.",
		slots: 12,
		cost: null,
		image: null,
	},
	{
		id: "large-pack",
		name: "Large Pack",
		description:
			tools().find("large-pack")?.description ?? "Adds 12 more slots to your backpack.",
		slots: 24,
		cost: (tools().find("large-pack") as { cost?: number } | undefined)?.cost ?? 2000,
		image: (() => {
			const t = tools().find("large-pack");
			return t && t.type === "backpack" ? t.image : null;
		})(),
	},
	{
		id: "deluxe-pack",
		name: "Deluxe Pack",
		description:
			tools().find("deluxe-pack")?.description ?? "Adds 12 more slots to your backpack.",
		slots: 36,
		cost: (tools().find("deluxe-pack") as { cost?: number } | undefined)?.cost ?? 10000,
		image: (() => {
			const t = tools().find("deluxe-pack");
			return t && t.type === "backpack" ? t.image : null;
		})(),
	},
];

function BackpackDetailModal({ maxItems, onClose }: { maxItems: number; onClose: () => void }) {
	const currentLevel = BACKPACK_LEVELS.findIndex((l) => l.slots === maxItems);
	const activeLevelIndex = currentLevel === -1 ? 0 : currentLevel;
	const activeLevel = BACKPACK_LEVELS[activeLevelIndex];
	const headerImgSrc = activeLevel?.image ? assetPath(activeLevel.image) : null;

	return (
		<Modal show onClose={onClose} dismissible size="lg">
			<ModalHeader>
				<div className="flex items-center gap-3">
					{headerImgSrc && (
						<img
							src={headerImgSrc}
							alt={activeLevel?.name}
							className="h-10 w-10 object-contain"
						/>
					)}
					<div>
						<div className="text-lg font-extrabold">Backpack</div>
						<div className="text-sm font-semibold text-gray-500">
							{BACKPACK_LEVELS[activeLevelIndex]?.name} — {maxItems} slots
						</div>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-3">
					{BACKPACK_LEVELS.map((lvl, i) => {
						const isCurrentLevel = i === activeLevelIndex;
						const isReached = i <= activeLevelIndex;
						const imgSrc = lvl.image ? assetPath(lvl.image) : null;

						return (
							<div
								key={lvl.name}
								className="flex items-start gap-4 rounded-xl border p-4"
								style={{
									borderColor: isCurrentLevel
										? "rgba(192,134,74,0.4)"
										: isReached
											? "rgba(192,134,74,0.2)"
											: "rgba(0,0,0,0.1)",
									backgroundColor: isCurrentLevel
										? "rgba(192,134,74,0.08)"
										: isReached
											? "rgba(192,134,74,0.04)"
											: "transparent",
								}}
							>
								{/* Image */}
								<div className="shrink-0">
									{imgSrc ? (
										<img
											src={imgSrc}
											alt={lvl.name}
											className="h-14 w-14 object-contain"
										/>
									) : (
										<div className="h-14 w-14" />
									)}
								</div>

								{/* Info */}
								<div className="min-w-0 flex-1">
									<div className="mb-1 flex items-center gap-2">
										<span className="text-sm font-bold text-gray-800">
											{lvl.name}
										</span>
										{isCurrentLevel && (
											<span className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-[0.6rem] font-bold">
												Current
											</span>
										)}
										{!isCurrentLevel && isReached && (
											<span className="bg-primary/15 text-primary rounded-full px-2 py-0.5 text-[0.6rem] font-bold">
												Upgraded
											</span>
										)}
										{!isReached && (
											<HiLockClosed className="h-3.5 w-3.5 text-red-500" />
										)}
									</div>
									<p className="mb-1 text-xs text-gray-500">{lvl.description}</p>
									<span className="text-[0.65rem] font-semibold text-gray-600">
										{lvl.slots} slots
									</span>
								</div>

								{/* Cost */}
								<div className="shrink-0 text-right">
									{lvl.cost !== null ? (
										<div className="text-sm font-bold text-gray-800">
											{lvl.cost.toLocaleString()}g
										</div>
									) : (
										<span className="text-[0.65rem] text-gray-800">
											Starter
										</span>
									)}
								</div>
							</div>
						);
					})}
				</div>
				<p className="mt-4 text-[0.7rem] text-gray-600">
					Purchased from Pierre&apos;s General Store.
				</p>
			</ModalBody>
		</Modal>
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
		</button>
	);
}

export function ToolsSection({ gameData }: Props) {
	const { toolLevels } = gameData;
	const { maxItems } = gameData.character;
	const [modalState, setModalState] = useState<ToolModalState | null>(null);
	const [backpackModalOpen, setBackpackModalOpen] = useState(false);

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

				<div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
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
					<BackpackCard maxItems={maxItems} onClick={() => setBackpackModalOpen(true)} />
				</div>
			</div>

			<ToolDetailModal state={modalState} onClose={() => setModalState(null)} />
			{backpackModalOpen && (
				<BackpackDetailModal
					maxItems={maxItems}
					onClose={() => setBackpackModalOpen(false)}
				/>
			)}
		</>
	);
}
