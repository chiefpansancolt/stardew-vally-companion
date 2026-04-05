"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { monsterLoot } from "stardew-valley-data";
import type { MonsterDetailModalProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { NAVY_TILE } from "@/data/constants/styles";

const allLoot = monsterLoot().get();

export function MonsterDetailModal({ monster, killCount, onClose }: Props) {
	if (!monster) return null;

	const lootItems = allLoot.filter((l) => l.droppedBy.includes(monster.id));

	return (
		<Modal show onClose={onClose} dismissible size="2xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={assetPath(monster.image)}
						alt={monster.name}
						className="h-14 w-14 object-contain"
					/>
					<div>
						<div className="flex items-center gap-2">
							<span
								className="text-lg font-extrabold"
								style={{ fontFamily: "var(--font-stardew-valley)" }}
							>
								{monster.name}
							</span>
							<span
								className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${
									killCount > 0
										? "bg-highlight/20 text-highlight"
										: "bg-gray-200 text-gray-500"
								}`}
							>
								&times;{killCount.toLocaleString()} slain
							</span>
						</div>
						{monster.dangerous && (
							<span className="text-xs font-semibold text-red-500">
								Dangerous Mode
							</span>
						)}
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-5">
					<div className="grid grid-cols-4 gap-2">
						{[
							{ label: "HP", value: monster.hp },
							{ label: "Damage", value: monster.damage },
							{ label: "Speed", value: monster.speed },
							{ label: "XP", value: monster.xp },
						].map((stat) => (
							<div
								key={stat.label}
								className="flex flex-col items-center gap-1 rounded-xl px-3 py-2.5"
								style={NAVY_TILE}
							>
								<span className="text-[0.6rem] font-semibold tracking-wide text-white/50 uppercase">
									{stat.label}
								</span>
								<span className="text-sm font-bold text-white/85">
									{stat.value}
								</span>
							</div>
						))}
					</div>

					{monster.locations.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">Locations</div>
							<div className="flex flex-col gap-1.5">
								{monster.locations.map((loc) => (
									<div
										key={loc}
										className="flex items-center gap-3 rounded-xl px-4 py-2.5"
										style={NAVY_TILE}
									>
										<span className="text-sm font-medium text-white/80">
											{loc}
										</span>
									</div>
								))}
							</div>
						</div>
					)}

					{lootItems.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">Loot Drops</div>
							<div className="flex flex-col gap-1.5">
								{lootItems.map((loot) => (
									<div
										key={loot.id}
										className="flex items-center gap-3 rounded-xl px-4 py-2.5"
										style={NAVY_TILE}
									>
										<img
											src={assetPath(loot.image)}
											alt={loot.name}
											className="h-8 w-8 shrink-0 object-contain"
										/>
										<span className="text-sm font-semibold text-white/85">
											{loot.name}
										</span>
										<span className="ml-auto text-[0.7rem] text-white/50">
											{loot.sellPrice}g
										</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</ModalBody>
		</Modal>
	);
}
