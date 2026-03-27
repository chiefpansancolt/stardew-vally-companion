"use client";

import { tools } from "stardew-valley-data";
import { useState } from "react";
import type { RodData, ToolsEditStepProps } from "@/types";
import type { ToolLevels } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { BACKPACK_LEVELS } from "@/data/constants/backpacks";
import { LEVEL_META, LEVEL_NAMES, PAN_LEVEL_OFFSET, TOOL_ENTRIES } from "@/data/constants/tools";
import { ROD_DOT_HEX } from "@/data/constants/tools";

const rod = tools().fishingRods().first() as unknown as RodData | undefined;

export function ToolsEditStep({
	toolLevels: initialToolLevels,
	maxItems: initialMaxItems,
	onToolLevelsChange,
	onMaxItemsChange,
}: ToolsEditStepProps) {
	const [toolLevels, setToolLevels] = useState<ToolLevels>(initialToolLevels);
	const [maxItems, setMaxItems] = useState<number>(initialMaxItems);

	function setTool(key: keyof ToolLevels, level: number) {
		const next = { ...toolLevels, [key]: level };
		setToolLevels(next);
		onToolLevelsChange(next);
	}

	function handleMaxItemsChange(slots: number) {
		setMaxItems(slots);
		onMaxItemsChange(slots);
	}

	return (
		<div className="space-y-6">
			<div>
				<p className="mb-3 text-xs font-bold tracking-wide text-gray-500 uppercase">
					Standard Tools
				</p>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{TOOL_ENTRIES.map(({ key, id }) => {
						const tool = tools().find(id);
						if (!tool || tool.type !== "upgradeable") return null;
						const isPan = id === "pan";
						const currentLevel = toolLevels[key];
						const levelIndex = isPan ? Math.max(0, currentLevel - PAN_LEVEL_OFFSET) : currentLevel;
						const imgSrc = tool.levels[levelIndex]?.image
							? assetPath(tool.levels[levelIndex].image)
							: null;

						return (
							<div
								key={id}
								className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3"
							>
								<div className="flex h-10 w-10 shrink-0 items-center justify-center">
									{imgSrc ? (
										<img
											src={imgSrc}
											alt={tool.name}
											className="h-10 w-10 object-contain"
										/>
									) : (
										<div className="h-10 w-10 rounded-lg bg-gray-200" />
									)}
								</div>
								<div className="min-w-0 flex-1">
									<div className="mb-1.5 text-xs font-bold text-gray-700">
										{tool.name}
									</div>
									<div className="flex flex-wrap gap-1">
										{LEVEL_NAMES.map((name, i) => {
											if (isPan && i === 0) return null;
											const meta = LEVEL_META[name];
											const selected = currentLevel === i;
											return (
												<button
													key={name}
													type="button"
													onClick={() => setTool(key, i)}
													className="rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold transition-colors"
													style={
														selected
															? {
																	borderColor: meta?.card.border,
																	backgroundColor: meta?.card.bg,
																	color: meta?.card.text,
																}
															: {}
													}
												>
													{!selected ? (
														<span className="text-gray-500">{name}</span>
													) : (
														name
													)}
												</button>
											);
										})}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{rod && (
				<div>
					<p className="mb-3 text-xs font-bold tracking-wide text-gray-500 uppercase">
						Fishing Rod
					</p>
					<div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center">
							{rod.levels[toolLevels.fishingRod]?.image ? (
								<img
									src={assetPath(rod.levels[toolLevels.fishingRod].image)}
									alt={rod.name}
									className="h-10 w-10 object-contain"
								/>
							) : (
								<div className="h-10 w-10 rounded-lg bg-gray-200" />
							)}
						</div>
						<div className="min-w-0 flex-1">
							<div className="mb-1.5 text-xs font-bold text-gray-700">{rod.name}</div>
							<div className="flex flex-wrap gap-1">
								{rod.levels.map((lvl, i) => {
									const selected = toolLevels.fishingRod === i;
									const hex = ROD_DOT_HEX[i] ?? "#9ca3af";
									return (
										<button
											key={lvl.name}
											type="button"
											onClick={() => setTool("fishingRod", i)}
											className="rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold transition-colors"
											style={
												selected
													? {
															borderColor: `${hex}55`,
															backgroundColor: `${hex}18`,
															color: hex,
															filter: "brightness(0.75)",
														}
													: {}
											}
										>
											{!selected ? (
												<span className="text-gray-500">{lvl.name}</span>
											) : (
												lvl.name
											)}
										</button>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			)}

			<div>
				<p className="mb-3 text-xs font-bold tracking-wide text-gray-500 uppercase">
					Backpack
				</p>
				<div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center">
						{BACKPACK_LEVELS[1]?.image ? (
							<img
								src={assetPath(BACKPACK_LEVELS[1].image)}
								alt="Backpack"
								className="h-10 w-10 object-contain"
							/>
						) : (
							<div className="h-10 w-10 rounded-lg bg-gray-200" />
						)}
					</div>
					<div className="min-w-0 flex-1">
						<div className="mb-1.5 text-xs font-bold text-gray-700">Backpack</div>
						<div className="flex flex-wrap gap-1">
							{BACKPACK_LEVELS.map((bp) => {
								const selected = maxItems === bp.slots;
								return (
									<button
										key={bp.slots}
										type="button"
										onClick={() => handleMaxItemsChange(bp.slots)}
										className={`rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold transition-colors ${
											selected
												? "border-primary/40 bg-primary/10 text-primary"
												: "border-gray-200 text-gray-500 hover:bg-gray-100"
										}`}
									>
										{bp.name} ({bp.slots})
									</button>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
