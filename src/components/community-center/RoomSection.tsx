"use client";

import { bundles, type ItemBundle, type GoldBundle } from "stardew-valley-data";
import type { CollectionProps as Props, CommunityCenterRooms } from "@/types";
import { isItemOrGoldBundle } from "@/lib/utils/bundleHelpers";
import { CC_ROOMS, ROOM_LABELS, ROOM_TO_CC_KEY } from "@/data/constants/bundles";
import { NavySection } from "@/comps/ui/NavySection";
import { BundleCard } from "./cards";

type CCBundle = ItemBundle | GoldBundle;
const allBundles: CCBundle[] = bundles().standard().sortByRoomAndBundleGroup().get().filter(isItemOrGoldBundle);

const bundlesByRoom = new Map<string, CCBundle[]>();
for (const room of CC_ROOMS) {
	bundlesByRoom.set(room, allBundles.filter((b) => b.room === room));
}

const abandonedJojaBundles: CCBundle[] = bundles()
	.standard()
	.get()
	.filter(isItemOrGoldBundle)
	.filter((b) => b.room === "abandoned-joja-mart");

function isBundleComplete(bundleItems: Record<string, boolean> | undefined): boolean {
	if (!bundleItems) return false;
	return Object.values(bundleItems).every(Boolean);
}

export function RoomSections({ gameData }: Props) {
	const rooms = gameData.communityCenter.rooms;

	return (
		<>
			{CC_ROOMS.map((room) => {
				const roomBundles = bundlesByRoom.get(room) ?? [];
				const isRoomComplete = rooms[ROOM_TO_CC_KEY[room] as keyof CommunityCenterRooms] ?? false;

				const completedCount = isRoomComplete
					? roomBundles.length
					: roomBundles.filter((b) => isBundleComplete(gameData.bundles[b.id])).length;

				return (
					<NavySection
						key={room}
						title={ROOM_LABELS[room] ?? room}
						badge={`${completedCount} / ${roomBundles.length} complete`}
					>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{roomBundles.map((b) => {
								const itemCompletion = isRoomComplete
									? Object.fromEntries(
											(b.type === "items" ? b.items : [{ name: "gold" }]).map((_, i) => [String(i), true]),
										)
									: (gameData.bundles[b.id] ?? {});

								return (
									<BundleCard
										key={b.id}
										bundle={b}
										completedItems={itemCompletion}
									/>
								);
							})}
						</div>
					</NavySection>
				);
			})}
			{abandonedJojaBundles.length > 0 && (
				<NavySection
					title="Abandoned JojaMart"
					badge={`${abandonedJojaBundles.filter((b) => isBundleComplete(gameData.bundles[b.id])).length} / ${abandonedJojaBundles.length} complete`}
				>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{abandonedJojaBundles.map((b) => (
							<BundleCard
								key={b.id}
								bundle={b}
								completedItems={gameData.bundles[b.id] ?? {}}
							/>
						))}
					</div>
				</NavySection>
			)}
		</>
	);
}
