"use client";

import { bundles, type GoldBundle, type ItemBundle, search } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import type { BundleRoomEditStepProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { isItemOrGoldBundle } from "@/lib/utils/bundleHelpers";
import { formatNumber } from "@/lib/utils/formatting";
import { ROOM_LABELS } from "@/data/constants/bundles";

type CCBundle = ItemBundle | GoldBundle;

const allBundles: CCBundle[] = bundles()
	.standard()
	.sortByRoomAndBundleGroup()
	.get()
	.filter(isItemOrGoldBundle);

const IMAGE_FALLBACK: Record<string, string> = {
	"Spring Seeds": "images/craftable/seeds/Spring Seeds.png",
	"Summer Seeds": "images/craftable/seeds/Summer Seeds.png",
	"Fall Seeds": "images/craftable/seeds/Fall Seeds.png",
	"Winter Seeds": "images/craftable/seeds/Winter Seeds.png",
	"Large Egg (Brown)": "images/animals/produce/Large Brown Egg.png",
};

function getItemImage(name: string): string | null {
	if (IMAGE_FALLBACK[name]) return IMAGE_FALLBACK[name];
	const match = search(name).find((r) => r.name === name);
	return match?.image ?? null;
}

export function BundleRoomEditStep({
	room,
	bundles: bundlesState,
	roomComplete,
	onBundlesChange,
	onRoomCompleteChange,
}: BundleRoomEditStepProps) {
	const [localBundles, setLocalBundles] = useState(bundlesState);
	const [localRoomComplete, setLocalRoomComplete] = useState(roomComplete);

	const roomBundles = allBundles.filter((b) => b.room === room);

	function toggleItem(bundleId: string, itemIndex: number) {
		const bundleItems = { ...(localBundles[bundleId] ?? {}) };
		bundleItems[String(itemIndex)] = !bundleItems[String(itemIndex)];
		const next = { ...localBundles, [bundleId]: bundleItems };
		setLocalBundles(next);
		onBundlesChange(next);
	}

	function markBundleComplete(bundleId: string, bundle: CCBundle) {
		const itemCount = bundle.type === "items" ? bundle.items.length : 1;
		const allDone =
			Object.keys(localBundles[bundleId] ?? {}).length === itemCount &&
			Object.values(localBundles[bundleId] ?? {}).every(Boolean);
		const bundleItems = Object.fromEntries(
			Array.from({ length: itemCount }, (_, i) => [String(i), !allDone])
		);
		const next = { ...localBundles, [bundleId]: bundleItems };
		setLocalBundles(next);
		onBundlesChange(next);
	}

	function toggleRoomComplete() {
		const next = !localRoomComplete;
		setLocalRoomComplete(next);
		onRoomCompleteChange(next);
	}

	const completedBundles = roomBundles.filter((b) => {
		if (localRoomComplete) return true;
		const items = localBundles[b.id] ?? {};
		const required = b.type === "items" ? b.itemsRequired : 1;
		return Object.values(items).filter(Boolean).length >= required;
	}).length;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<p className="text-xs font-bold tracking-wide text-gray-500 uppercase">
					{ROOM_LABELS[room] ?? room}
				</p>
				<div className="flex items-center gap-3">
					<span className="text-[0.7rem] text-gray-500">
						{completedBundles} / {roomBundles.length} complete
					</span>
					<button
						type="button"
						onClick={toggleRoomComplete}
						className={`cursor-pointer rounded-lg border px-2.5 py-1 text-[0.65rem] font-semibold transition-colors ${
							localRoomComplete
								? "border-green-300 bg-green-50 text-green-700"
								: "border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200"
						}`}
					>
						{localRoomComplete ? "Room Complete" : "Mark Room Complete"}
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{roomBundles.map((bundle) => {
					const isGold = bundle.type === "gold";
					const itemCount = isGold ? 1 : bundle.items.length;
					const completedItems = localRoomComplete
						? Object.fromEntries(
								Array.from({ length: itemCount }, (_, i) => [String(i), true])
							)
						: (localBundles[bundle.id] ?? {});
					const completedCount = Object.values(completedItems).filter(Boolean).length;
					const required = isGold ? 1 : bundle.itemsRequired;
					const isBundleComplete = completedCount >= required;
					const allItemsDone =
						itemCount > 0 &&
						Object.keys(completedItems).length === itemCount &&
						Object.values(completedItems).every(Boolean);

					return (
						<div
							key={bundle.id}
							className={`rounded-xl border p-3 ${
								isBundleComplete
									? "border-green-300/50 bg-green-50"
									: "border-gray-200 bg-gray-50"
							}`}
						>
							<div className="mb-2 flex items-center justify-between gap-2">
								<div className="flex items-center gap-2">
									<img
										src={assetPath(bundle.image)}
										alt={bundle.name}
										className="h-7 w-7 shrink-0 object-contain"
									/>
									<span
										className={`text-xs font-bold ${isBundleComplete ? "text-green-700" : "text-gray-700"}`}
									>
										{bundle.name}
									</span>
								</div>
								{!localRoomComplete && (
									<button
										type="button"
										onClick={() => markBundleComplete(bundle.id, bundle)}
										className="cursor-pointer text-[0.6rem] font-semibold text-gray-400 hover:text-gray-600"
									>
										{allItemsDone ? "Clear" : "All"}
									</button>
								)}
							</div>

							{isGold ? (
								<button
									type="button"
									disabled={localRoomComplete}
									onClick={() => toggleItem(bundle.id, 0)}
									className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border py-2 text-sm font-bold transition-colors ${
										completedItems["0"]
											? "border-green-300 bg-green-100 text-green-700"
											: "border-gray-200 bg-white text-gray-500 hover:bg-gray-100"
									} disabled:opacity-50`}
								>
									{completedItems["0"] && <HiCheck className="h-4 w-4" />}
									{formatNumber((bundle as GoldBundle).goldCost)}g
								</button>
							) : (
								<div className="flex flex-wrap gap-1.5">
									{bundle.items.map((item, idx) => {
										const done = !!completedItems[String(idx)];
										const image = getItemImage(item.name);
										return (
											<button
												key={`${item.name}-${idx}`}
												type="button"
												disabled={localRoomComplete}
												onClick={() => toggleItem(bundle.id, idx)}
												className={`relative flex w-16 cursor-pointer flex-col items-center gap-0.5 rounded-lg border p-1.5 transition-colors ${
													done
														? "border-green-300/50 bg-green-100"
														: "border-gray-200 bg-white hover:bg-gray-100"
												} disabled:opacity-50`}
											>
												{done && (
													<div className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-green-600 text-[7px] font-black text-white">
														✓
													</div>
												)}
												{image ? (
													<img
														src={assetPath(image)}
														alt={item.name}
														className="h-8 w-8 object-contain"
													/>
												) : (
													<div className="flex h-8 w-8 items-center justify-center text-[0.5rem] text-gray-400">
														?
													</div>
												)}
												<span className="text-center text-[0.5rem] leading-tight text-gray-600">
													{item.name}
												</span>
											</button>
										);
									})}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
