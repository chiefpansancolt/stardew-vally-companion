"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { tools } from "stardew-valley-data";
import { HiLockClosed } from "react-icons/hi";
import { assetPath } from "@/lib/utils/assetPath";

export interface BackpackLevel {
	id: string | null;
	name: string;
	description: string;
	slots: number;
	cost: number | null;
	image: string | null;
}

export const BACKPACK_LEVELS: BackpackLevel[] = [
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

export function BackpackDetailModal({
	maxItems,
	onClose,
}: {
	maxItems: number;
	onClose: () => void;
}) {
	const currentLevel = BACKPACK_LEVELS.findIndex((l) => l.slots === maxItems);
	const activeLevelIndex = currentLevel === -1 ? 0 : currentLevel;
	const activeLevel = BACKPACK_LEVELS[activeLevelIndex];
	const headerImgSrc = activeLevel?.image ? assetPath(activeLevel.image) : null;

	return (
		<Modal show onClose={onClose} dismissible size="2xl">
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

								<div className="min-w-0 flex-1">
									<div className="mb-1 flex items-center gap-2">
										<span className="text-sm font-bold text-gray-800">{lvl.name}</span>
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
										{!isReached && <HiLockClosed className="h-3.5 w-3.5 text-red-500" />}
									</div>
									<p className="mb-1 text-xs text-gray-500">{lvl.description}</p>
									<span className="text-[0.65rem] font-semibold text-gray-600">
										{lvl.slots} slots
									</span>
								</div>

								<div className="shrink-0 text-right">
									{lvl.cost !== null ? (
										<div className="text-sm font-bold text-gray-800">
											{lvl.cost.toLocaleString()}g
										</div>
									) : (
										<span className="text-[0.65rem] text-gray-800">Starter</span>
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
