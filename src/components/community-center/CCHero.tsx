"use client";

import { bundles } from "stardew-valley-data";
import { FaSchool } from "react-icons/fa6";
import type { CollectionProps as Props, CommunityCenterRooms } from "@/types";
import { isItemOrGoldBundle } from "@/lib/utils/bundleHelpers";
import { CC_ROOMS, ROOM_TO_CC_KEY } from "@/data/constants/bundles";
import { StatTile } from "@/comps/ui/StatTile";

const allBundles = bundles()
	.standard()
	.sortByRoomAndBundleGroup()
	.get()
	.filter(isItemOrGoldBundle)
	.filter((b) => CC_ROOMS.includes(b.room));

const bundleCountByRoom = new Map<string, number>();
for (const room of CC_ROOMS) {
	bundleCountByRoom.set(room, allBundles.filter((b) => b.room === room).length);
}

export function CCHero({ gameData }: Props) {
	const cc = gameData.communityCenter;
	const rooms = cc.rooms;

	const roomsComplete = CC_ROOMS.filter(
		(r) => rooms[ROOM_TO_CC_KEY[r] as keyof CommunityCenterRooms],
	).length;

	let bundlesComplete = 0;
	for (const room of CC_ROOMS) {
		const isRoomDone = rooms[ROOM_TO_CC_KEY[room] as keyof CommunityCenterRooms];
		if (isRoomDone) {
			bundlesComplete += bundleCountByRoom.get(room) ?? 0;
		} else {
			bundlesComplete += allBundles
				.filter((b) => b.room === room)
				.filter((b) => {
					const items = gameData.bundles[b.id];
					return items && Object.values(items).every(Boolean);
				}).length;
		}
	}

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<FaSchool className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Community Center</div>
					<div className="mt-0.5 text-sm text-gray-500">
						Bundle progress and room completion
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
			>
				<StatTile
					label="Unlocked"
					value={cc.unlocked ? "Yes" : "No"}
					valueColor={cc.unlocked ? "text-green-600" : "text-gray-400"}
				/>
				<StatTile
					label="Bundles Active"
					value={cc.bundlesActive ? "Yes" : "No"}
					valueColor={cc.bundlesActive ? "text-green-600" : "text-gray-400"}
				/>
				<StatTile
					label="Rooms Complete"
					value={roomsComplete}
					valueColor={roomsComplete === CC_ROOMS.length ? "text-green-600" : "text-accent"}
					suffix={`/ ${CC_ROOMS.length}`}
				/>
				<StatTile
					label="Bundles Complete"
					value={bundlesComplete}
					valueColor={bundlesComplete === allBundles.length ? "text-green-600" : "text-accent"}
					suffix={`/ ${allBundles.length}`}
				/>
				<StatTile
					label="Completed"
					value={cc.completed ? "Yes" : "No"}
					valueColor={cc.completed ? "text-green-600" : "text-gray-400"}
				/>
				<StatTile
					label="Ceremony"
					value={cc.ceremonyAttended ? "Attended" : "Not Yet"}
					valueColor={cc.ceremonyAttended ? "text-green-600" : "text-gray-400"}
				/>
				<StatTile
					label="Joja Abandoned"
					value={cc.jojaAbandoned ? "Yes" : "No"}
					valueColor={cc.jojaAbandoned ? "text-green-600" : "text-gray-400"}
				/>
			</div>
		</div>
	);
}
