"use client";

import {
	Accordion,
	AccordionContent,
	AccordionPanel,
	AccordionTitle,
	Checkbox,
	Label,
	ToggleSwitch,
} from "flowbite-react";
import { bundles as queryBundles } from "stardew-valley-data";
import type { Bundle, GoldBundle, ItemBundle } from "stardew-valley-data";
import { useMemo } from "react";
import { HiOfficeBuilding } from "react-icons/hi";
import { HiShoppingCart } from "react-icons/hi2";

type BundlePath = "joja" | "cc";

export interface BundleConfig {
	bundlePath: BundlePath | null;
	isRemix: boolean;
	activeBundles: string[];
	selectedBundles: Record<string, string[]>;
}

interface BundleSelectionStepProps {
	config: BundleConfig;
	onChange: (config: BundleConfig) => void;
}

const ROOM_LABELS: Record<string, string> = {
	"crafts-room": "Crafts Room",
	pantry: "Pantry",
	"fish-tank": "Fish Tank",
	"boiler-room": "Boiler Room",
	"bulletin-board": "Bulletin Board",
	vault: "Vault",
};

const CC_ROOMS = ["crafts-room", "pantry", "fish-tank", "boiler-room", "bulletin-board", "vault"];

function isItemOrGoldBundle(bundle: Bundle): bundle is ItemBundle | GoldBundle {
	return bundle.type === "items" || bundle.type === "gold";
}

export function BundleSelectionStep({ config, onChange }: BundleSelectionStepProps) {
	const standardCountsByRoom = useMemo(() => {
		const counts: Record<string, number> = {};
		const stdBundles = queryBundles().standard().get().filter(isItemOrGoldBundle);
		for (const b of stdBundles) {
			counts[b.room] = (counts[b.room] || 0) + 1;
		}
		return counts;
	}, []);

	const allBundles = useMemo(() => {
		return queryBundles()
			.sortByRoomAndBundleGroup()
			.get()
			.filter(isItemOrGoldBundle)
			.filter((b) => b.room !== "abandoned-joja-mart");
	}, []);

	const standardBundles = useMemo(() => {
		return queryBundles()
			.standard()
			.sortByRoomAndBundleGroup()
			.get()
			.filter(isItemOrGoldBundle);
	}, []);

	const displayBundles = config.isRemix ? allBundles : standardBundles;

	const bundlesByRoom = useMemo(() => {
		const grouped: Record<string, (ItemBundle | GoldBundle)[]> = {};
		for (const room of CC_ROOMS) {
			grouped[room] = displayBundles.filter((b) => b.room === room);
		}
		return grouped;
	}, [displayBundles]);

	const handlePathSelect = (path: BundlePath) => {
		if (path === "joja") {
			onChange({ ...config, bundlePath: path, activeBundles: [], selectedBundles: {} });
		} else {
			const stdIds = standardBundles.map((b) => b.id);
			onChange({ ...config, bundlePath: path, activeBundles: stdIds, selectedBundles: {} });
		}
	};

	const handleRemixToggle = (checked: boolean) => {
		if (checked) {
			onChange({ ...config, isRemix: true, activeBundles: [], selectedBundles: {} });
		} else {
			const stdIds = standardBundles.map((b) => b.id);
			onChange({
				...config,
				isRemix: false,
				activeBundles: stdIds,
				selectedBundles: {},
			});
		}
	};

	const handleBundleToggle = (bundleId: string, room: string) => {
		const isActive = config.activeBundles.includes(bundleId);
		let newActive: string[];
		let newSelected = { ...config.selectedBundles };

		if (isActive) {
			newActive = config.activeBundles.filter((id) => id !== bundleId);
			delete newSelected[bundleId];
		} else {
			newActive = [...config.activeBundles, bundleId];
		}

		onChange({ ...config, activeBundles: newActive, selectedBundles: newSelected });
	};

	const handleBundleItemToggle = (bundleId: string, itemIndex: string, itemsRequired: number) => {
		const current = config.selectedBundles[bundleId] ?? [];
		let updated: string[];

		if (current.includes(itemIndex)) {
			updated = current.filter((i) => i !== itemIndex);
		} else {
			if (current.length >= itemsRequired) return;
			updated = [...current, itemIndex];
		}

		onChange({
			...config,
			selectedBundles: { ...config.selectedBundles, [bundleId]: updated },
		});
	};

	const getActiveCountForRoom = (room: string) => {
		const roomBundleIds = bundlesByRoom[room].map((b) => b.id);
		return config.activeBundles.filter((id) => roomBundleIds.includes(id)).length;
	};

	if (!config.bundlePath) {
		return (
			<div className="space-y-4">
				<p className="text-sm text-gray-600 dark:text-gray-400">
					Choose your Community Center path:
				</p>
				<div className="grid grid-cols-2 gap-4">
					<button
						type="button"
						onClick={() => handlePathSelect("cc")}
						className="group hover:border-primary hover:bg-primary/5 dark:hover:border-primary dark:hover:bg-primary/10 flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-gray-200 p-6 transition-all dark:border-gray-600"
					>
						<HiOfficeBuilding className="group-hover:text-primary h-12 w-12 text-gray-400 transition-colors" />
						<span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
							Community Center
						</span>
						<span className="text-center text-sm text-gray-500 dark:text-gray-400">
							Complete bundles to restore the Community Center
						</span>
					</button>

					<button
						type="button"
						onClick={() => handlePathSelect("joja")}
						className="group hover:border-primary hover:bg-primary/5 dark:hover:border-primary dark:hover:bg-primary/10 flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-gray-200 p-6 transition-all dark:border-gray-600"
					>
						<HiShoppingCart className="group-hover:text-primary h-12 w-12 text-gray-400 transition-colors" />
						<span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
							Joja Warehouse
						</span>
						<span className="text-center text-sm text-gray-500 dark:text-gray-400">
							Purchase community upgrades through Joja
						</span>
					</button>
				</div>
			</div>
		);
	}

	if (config.bundlePath === "joja") {
		return (
			<div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
				<p className="text-center text-gray-600 dark:text-gray-300">
					Joja Warehouse selected. No bundle configuration needed.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
					Bundle Type
				</span>
				<ToggleSwitch
					checked={config.isRemix}
					onChange={handleRemixToggle}
					label={config.isRemix ? "Remix" : "Standard"}
				/>
			</div>

			{config.isRemix && (
				<p className="text-xs text-gray-500 dark:text-gray-400">
					Select the bundles that match your game. Each room has a limited number of
					bundle slots.
				</p>
			)}

			<Accordion collapseAll>
				{CC_ROOMS.filter((room) => (bundlesByRoom[room] ?? []).length > 0).map((room) => {
					const roomBundles = bundlesByRoom[room];
					const maxBundles = standardCountsByRoom[room] ?? roomBundles.length;
					const activeCount = getActiveCountForRoom(room);
					const isRoomFull = activeCount >= maxBundles;

					return (
						<AccordionPanel key={room}>
							<AccordionTitle>
								<span className="flex items-center gap-2">
									{ROOM_LABELS[room]}
									{config.isRemix ? (
										<span
											className={`text-xs ${activeCount === maxBundles ? "text-green-500" : "text-amber-500"}`}
										>
											({activeCount}/{maxBundles} selected)
										</span>
									) : (
										<span className="text-xs text-gray-400">
											({roomBundles.length} bundles)
										</span>
									)}
								</span>
							</AccordionTitle>
							<AccordionContent>
								<div className="space-y-3">
									{roomBundles.map((bundle) => {
										const isActive = config.activeBundles.includes(bundle.id);
										const isDisabled =
											config.isRemix && !isActive && isRoomFull;

										return (
											<div
												key={bundle.id}
												className={`rounded-lg border p-3 transition-colors ${
													isActive
														? "border-primary/40 bg-primary/5 dark:border-primary/30 dark:bg-primary/10"
														: isDisabled
															? "border-gray-100 bg-gray-50 opacity-50 dark:border-gray-700 dark:bg-gray-800"
															: "border-gray-200 dark:border-gray-600"
												}`}
											>
												<div className="flex items-center gap-2">
													{config.isRemix && (
														<Checkbox
															id={`bundle-toggle-${bundle.id}`}
															checked={isActive}
															disabled={isDisabled}
															onChange={() =>
																handleBundleToggle(bundle.id, room)
															}
														/>
													)}
													<h4 className="font-medium text-gray-800 dark:text-gray-200">
														{bundle.name}
														{bundle.type === "gold" && (
															<span className="ml-2 text-sm text-yellow-600">
																({bundle.goldCost.toLocaleString()}
																g)
															</span>
														)}
														{"remixBundle" in bundle &&
															bundle.remixBundle && (
																<span className="ml-2 text-xs text-purple-500">
																	Remix
																</span>
															)}
													</h4>
												</div>
												{bundle.type === "items" && isActive && (
													<div className="mt-2 space-y-1 pl-6">
														<p className="text-xs text-gray-500 dark:text-gray-400">
															Select {bundle.itemsRequired} of{" "}
															{bundle.items.length} items:
														</p>
														{bundle.items.map((item, idx) => {
															const itemIndex = String(idx);
															const selected =
																config.selectedBundles[
																	bundle.id
																]?.includes(itemIndex) ?? false;
															const selectedCount =
																config.selectedBundles[bundle.id]
																	?.length ?? 0;
															const atLimit =
																selectedCount >=
																bundle.itemsRequired;
															return (
																<div
																	key={idx}
																	className="flex items-center gap-2"
																>
																	<Checkbox
																		id={`${bundle.id}-${idx}`}
																		checked={selected}
																		disabled={
																			!selected && atLimit
																		}
																		onChange={() =>
																			handleBundleItemToggle(
																				bundle.id,
																				itemIndex,
																				bundle.itemsRequired
																			)
																		}
																	/>
																	<Label
																		htmlFor={`${bundle.id}-${idx}`}
																		className={`text-sm ${!selected && atLimit ? "text-gray-400 dark:text-gray-500" : ""}`}
																	>
																		{item.name}
																		{item.quantity > 1 &&
																			` (x${item.quantity})`}
																		{item.quality &&
																			` [${item.quality}]`}
																	</Label>
																</div>
															);
														})}
													</div>
												)}
											</div>
										);
									})}
								</div>
							</AccordionContent>
						</AccordionPanel>
					);
				})}
			</Accordion>
		</div>
	);
}
