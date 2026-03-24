"use client";

import { HiCheck, HiX } from "react-icons/hi";
import type { DashboardProps } from "@/types";
import type { CommunityCenterRooms } from "@/types";
import { CC_ROOMS, ROOM_LABELS, ROOM_TO_CC_KEY } from "@/data/constants/bundles";
import { NavySection } from "@/comps/ui/NavySection";

const ROOM_ICONS: Record<string, string> = {
	"crafts-room": "/images/bundles/icons/Bundle Green.png",
	pantry: "/images/bundles/icons/Bundle Orange.png",
	"fish-tank": "/images/bundles/icons/Bundle Teal.png",
	"boiler-room": "/images/bundles/icons/Bundle Red.png",
	"bulletin-board": "/images/bundles/icons/Bundle Blue.png",
	vault: "/images/bundles/icons/Bundle Yellow.png",
};

export function CommunityCenterCard({ gameData }: DashboardProps) {
	const { communityCenter, joja } = gameData;

	if (joja.isMember) {
		const total = Object.keys(joja.developments).length;
		const purchased = Object.values(joja.developments).filter(Boolean).length;
		const isComplete = joja.completed;

		return (
			<NavySection title="Joja Development" badge={`${purchased} / ${total} purchased`}>
				<div className="flex flex-col gap-2">
					{isComplete && (
						<div className="flex items-center gap-2 rounded-lg border border-green-400/25 bg-green-400/10 px-3 py-2">
							<HiCheck className="h-4 w-4 text-green-400" />
							<span className="text-[0.75rem] font-semibold text-green-300">
								All projects completed
							</span>
						</div>
					)}
					{Object.entries(joja.developments).map(([id, isPurchased]) => (
						<div
							key={id}
							className="flex items-center gap-2 border-b border-white/6 py-1 last:border-b-0"
						>
							{isPurchased ? (
								<HiCheck className="h-3.5 w-3.5 shrink-0 text-green-400" />
							) : (
								<HiX className="h-3.5 w-3.5 shrink-0 text-white/80" />
							)}
							<span
								className={`text-[0.75rem] font-semibold ${isPurchased ? "text-green-300" : "text-white/80"}`}
							>
								{id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
							</span>
						</div>
					))}
				</div>
			</NavySection>
		);
	}

	const rooms = communityCenter.rooms as unknown as Record<string, boolean>;
	const completedRooms = CC_ROOMS.filter((r) => rooms[ROOM_TO_CC_KEY[r]]).length;

	return (
		<NavySection
			title="Community Center"
			badge={`${completedRooms} / ${CC_ROOMS.length} rooms`}
		>
			<div className="mb-3 flex flex-wrap gap-2">
				{communityCenter.completed && (
					<span className="rounded-full border border-green-400/25 bg-green-400/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-green-300">
						<HiCheck className="mr-1 inline h-3 w-3" />
						Completed
					</span>
				)}
				{communityCenter.ceremonyAttended && (
					<span className="rounded-full border border-green-400/25 bg-green-400/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-green-300">
						<HiCheck className="mr-1 inline h-3 w-3" />
						Ceremony Attended
					</span>
				)}
				{communityCenter.jojaAbandoned && (
					<span className="rounded-full border border-yellow-400/25 bg-yellow-400/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-yellow-300">
						Abandoned Joja
					</span>
				)}
			</div>

			<div className="flex flex-col">
				{CC_ROOMS.map((roomId) => {
					const ccKey = ROOM_TO_CC_KEY[roomId] as keyof CommunityCenterRooms;
					const isComplete = communityCenter.rooms[ccKey];
					const iconSrc = ROOM_ICONS[roomId];
					return (
						<div
							key={roomId}
							className="flex items-center gap-3 border-b border-white/6 py-2 last:border-b-0"
						>
							{iconSrc ? (
								<img
									src={iconSrc}
									alt={ROOM_LABELS[roomId]}
									className="h-5 w-5 shrink-0 object-contain"
								/>
							) : (
								<span className="w-5 shrink-0" />
							)}
							<span
								className={`flex-1 text-[0.75rem] font-semibold ${isComplete ? "text-green-300" : "text-white/80"}`}
							>
								{ROOM_LABELS[roomId]}
							</span>
							{isComplete ? (
								<HiCheck className="h-4 w-4 shrink-0 text-green-400" />
							) : (
								<HiX className="h-4 w-4 shrink-0 text-white/80" />
							)}
						</div>
					);
				})}
			</div>
		</NavySection>
	);
}
