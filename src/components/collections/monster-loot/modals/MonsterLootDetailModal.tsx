"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { monsters } from "stardew-valley-data";
import type { MonsterLootDetailModalProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { NAVY_TILE } from "@/data/constants/styles";
import { PriceGrid } from "@/comps/ui/price-grid";
import { StatusBadge } from "@/comps/ui/StatusBadge";

const allMonsters = monsters().get();
const monsterById = Object.fromEntries(allMonsters.map((m) => [m.id, m]));

export function MonsterLootDetailModal({ loot, shipped, shippable, onClose }: Props) {
	if (!loot) return null;

	return (
		<Modal show onClose={onClose} dismissible size="2xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={assetPath(loot.image)}
						alt={loot.name}
						className="h-14 w-14 object-contain"
					/>
					<div>
						<div className="flex items-center gap-2">
							<span className="text-lg font-extrabold">{loot.name}</span>
							{shippable && (
								<StatusBadge
									status={shipped ? "success" : "inactive"}
									label={shipped ? "Shipped" : "Not Shipped"}
								/>
							)}
						</div>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-5">
					<div>
						<div className="mb-2 text-sm font-bold text-gray-900">Sell Price</div>
						<PriceGrid price={loot.sellPrice} maxQuality="normal" variant="modal" />
					</div>

					<div>
						<div className="mb-2 text-sm font-bold text-gray-900">Dropped By</div>
						<div className="flex flex-col gap-1.5">
							{loot.droppedBy.map((mId) => {
								const monster = monsterById[mId];
								return (
									<div
										key={mId}
										className="flex items-center gap-3 rounded-xl px-4 py-2.5"
										style={NAVY_TILE}
									>
										{monster?.image ? (
											<img
												src={assetPath(monster.image)}
												alt={monster.name}
												className="h-8 w-8 shrink-0 object-contain"
											/>
										) : (
											<div className="h-8 w-8 shrink-0 rounded-lg bg-white/10" />
										)}
										<span className="text-sm font-semibold text-white/85">
											{monster?.name ?? mId}
										</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</ModalBody>
		</Modal>
	);
}
