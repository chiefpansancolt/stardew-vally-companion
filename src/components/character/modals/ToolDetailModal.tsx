"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiLockClosed } from "react-icons/hi";
import { minerals, tools, type UpgradeLevel } from "stardew-valley-data";
import { assetPath } from "@/lib/utils/assetPath";

export interface ToolModalState {
	toolId: string;
	currentLevel: number;
}

const LEVEL_NAMES = ["Basic", "Copper", "Steel", "Gold", "Iridium"];
const PAN_LEVEL_OFFSET = 1;

// Colors for modal level cards on light (cream) background
const LEVEL_CARD_HEX: Record<string, { border: string; bg: string; text: string }> = {
	Basic:   { border: "rgba(0,0,0,0.1)",        bg: "rgba(0,0,0,0.03)",       text: "#6b7280" },
	Copper:  { border: "rgba(234,88,12,0.3)",    bg: "rgba(234,88,12,0.06)",   text: "#c2410c" },
	Steel:   { border: "rgba(59,130,246,0.3)",   bg: "rgba(59,130,246,0.06)",  text: "#1d4ed8" },
	Gold:    { border: "rgba(161,116,0,0.3)",    bg: "rgba(161,116,0,0.06)",   text: "#92660a" },
	Iridium: { border: "rgba(126,34,206,0.3)",   bg: "rgba(126,34,206,0.06)",  text: "#7e22ce" },
};

export function ToolDetailModal({
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
				<p className="mb-5 text-sm text-gray-600">{tool.description}</p>

				<div className="flex flex-col gap-3">
					{tool.levels.map((lvl: UpgradeLevel, i: number) => {
						const levelName = dotNames[i] ?? "";
						const isCurrentLevel = i === levelIndex;
						const isReached = i <= levelIndex;
						const colors = LEVEL_CARD_HEX[levelName];
						const imgSrc = lvl.image ? assetPath(lvl.image) : null;
						const materialData = lvl.materialName ? minerals().findByName(lvl.materialName) : null;
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
								<div className="shrink-0">
									{imgSrc ? (
										<img src={imgSrc} alt={levelName} className="h-14 w-14 object-contain" />
									) : (
										<div className="h-14 w-14 rounded-lg bg-gray-100" />
									)}
								</div>

								<div className="min-w-0 flex-1">
									<div className="mb-1 flex items-center gap-2">
										<span
											className="text-sm font-bold"
											style={{ color: isReached ? (colors?.text ?? "#374151") : "#6b7280" }}
										>
											{levelName}
										</span>
										{isCurrentLevel && (
											<span className="rounded-full bg-primary/20 px-2 py-0.5 text-[0.6rem] font-bold text-primary">
												Current
											</span>
										)}
										{!isCurrentLevel && isReached && (
											<span className="rounded-full bg-primary/15 px-2 py-0.5 text-[0.6rem] font-bold text-primary">
												Upgraded
											</span>
										)}
										{!isReached && <HiLockClosed className="h-3.5 w-3.5 text-red-500" />}
									</div>
									<p className="text-xs text-gray-500">{lvl.description}</p>
								</div>

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
														{lvl.materialQuantity !== null && lvl.materialQuantity > 1
															? `${lvl.materialQuantity}× `
															: ""}
														{lvl.materialName}
													</span>
												</div>
											)}
										</div>
									) : (
										<span className="text-[0.65rem] text-gray-800">Starter</span>
									)}
								</div>
							</div>
						);
					})}
				</div>

				{tool.canEnchant && (
					<p className="mt-4 text-[0.7rem] text-gray-800">Can be enchanted at the Forge.</p>
				)}
			</ModalBody>
		</Modal>
	);
}
