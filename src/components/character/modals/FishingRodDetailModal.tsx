"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { tools } from "stardew-valley-data";
import { HiLockClosed } from "react-icons/hi";
import { assetPath } from "@/lib/utils/assetPath";

export type RodLevel = {
	name: string;
	image: string;
	cost: number | null;
	fishingLevelRequired: number | null;
	bait: boolean;
	tackleSlots: number;
	canEnchant: boolean;
	obtain: string;
	description: string;
};
export type RodData = {
	id: string;
	type: string;
	name: string;
	description: string;
	canEnchant: boolean;
	levels: RodLevel[];
};

export const ROD_DOT_HEX: Record<number, string> = {
	0: "#86efac",
	1: "#d97706",
	2: "#60a5fa",
	3: "#c084fc",
	4: "#f0abfc",
};

export function FishingRodDetailModal({
	levelIndex,
	onClose,
}: {
	levelIndex: number;
	onClose: () => void;
}) {
	const rod = tools().fishingRods().first() as unknown as RodData | undefined;
	if (!rod) return null;
	const currentLvl = rod.levels[levelIndex];
	const headerImg = currentLvl?.image ? assetPath(currentLvl.image) : null;

	return (
		<Modal show onClose={onClose} dismissible size="2xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					{headerImg && (
						<img
							src={headerImg}
							alt={currentLvl?.name}
							className="h-10 w-10 object-contain"
						/>
					)}
					<div>
						<div className="text-lg font-extrabold">{rod.name}</div>
						<div className="text-sm font-semibold text-gray-500">
							{currentLvl?.name}
						</div>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-3">
					{rod.levels.map((lvl, i) => {
						const isCurrentLevel = i === levelIndex;
						const isReached = i <= levelIndex;
						const imgSrc = lvl.image ? assetPath(lvl.image) : null;
						const dotColor = ROD_DOT_HEX[i] ?? "#fff";

						return (
							<div
								key={lvl.name}
								className="flex items-start gap-4 rounded-xl border p-4"
								style={{
									borderColor: isCurrentLevel
										? `${dotColor}55`
										: isReached
											? `${dotColor}33`
											: "rgba(0,0,0,0.1)",
									backgroundColor: isCurrentLevel
										? `${dotColor}14`
										: isReached
											? `${dotColor}0a`
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
										<div className="h-14 w-14 rounded-lg bg-gray-100" />
									)}
								</div>

								<div className="min-w-0 flex-1">
									<div className="mb-1 flex items-center gap-2">
										<span
											className="text-sm font-bold"
											style={{
												color: isReached ? dotColor : "#6b7280",
												filter: isReached ? "brightness(0.75)" : "none",
											}}
										>
											{lvl.name}
										</span>
										{isCurrentLevel && (
											<span className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-[0.6rem] font-bold">
												Current
											</span>
										)}
										{!isCurrentLevel && isReached && (
											<span className="bg-primary/15 text-primary rounded-full px-2 py-0.5 text-[0.6rem] font-bold">
												Owned
											</span>
										)}
										{!isReached && (
											<HiLockClosed className="h-3.5 w-3.5 text-red-500" />
										)}
									</div>
									<p className="mb-1.5 text-xs text-gray-500">
										{lvl.description}
									</p>
									<div className="flex flex-wrap gap-2">
										{lvl.bait && (
											<span className="rounded bg-blue-50 px-1.5 py-0.5 text-[0.6rem] font-semibold text-blue-700">
												Supports Bait
											</span>
										)}
										{lvl.tackleSlots > 0 && (
											<span className="rounded bg-purple-50 px-1.5 py-0.5 text-[0.6rem] font-semibold text-purple-700">
												{lvl.tackleSlots} Tackle Slot
												{lvl.tackleSlots > 1 ? "s" : ""}
											</span>
										)}
										{lvl.fishingLevelRequired !== null && (
											<span className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.6rem] font-semibold text-gray-600">
												Fishing Lv.{lvl.fishingLevelRequired}+
											</span>
										)}
										{lvl.canEnchant && (
											<span className="rounded bg-amber-50 px-1.5 py-0.5 text-[0.6rem] font-semibold text-amber-700">
												Enchantable
											</span>
										)}
									</div>
								</div>

								<div className="shrink-0 text-right">
									{lvl.cost !== null ? (
										<div className="text-sm font-bold text-gray-800">
											{lvl.cost.toLocaleString()}g
										</div>
									) : (
										<span className="text-[0.65rem] text-gray-600">
											{lvl.obtain}
										</span>
									)}
								</div>
							</div>
						);
					})}
				</div>
				<p className="mt-4 text-[0.7rem] text-gray-800">
					Purchased from Willy&apos;s Fish Shop.
				</p>
			</ModalBody>
		</Modal>
	);
}
