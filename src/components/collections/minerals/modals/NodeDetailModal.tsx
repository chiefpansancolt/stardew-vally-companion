"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { type NodeItem } from "stardew-valley-data";
import { assetPath } from "@/lib/utils/assetPath";

const NAVY_TILE = {
	background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)",
	border: "1px solid rgba(43,58,103,0.6)",
} as const;

interface Props {
	node: NodeItem | null;
	itemNameById: Record<string, string>;
	onClose: () => void;
}

export function NodeDetailModal({ node, itemNameById, onClose }: Props) {
	if (!node) return null;

	return (
		<Modal show={!!node} onClose={onClose} dismissible size="2xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={assetPath(node.image)}
						alt={node.name}
						className="h-14 w-14 object-contain"
					/>
					<div>
						<span className="text-lg font-extrabold">{node.name}</span>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-5">
					<div>
						<div className="mb-2 text-sm font-bold text-gray-900">Mining XP</div>
						<div className="rounded-xl px-4 py-3" style={NAVY_TILE}>
							<span className="text-lg font-bold text-highlight">+{node.miningXP} XP</span>
							<span className="ml-2 text-xs text-white/50">per break</span>
						</div>
					</div>

					{node.drops.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">Drops</div>
							<div className="flex flex-col gap-1.5">
								{node.drops.map((drop, i) => {
									const name = itemNameById[drop.item] ?? drop.item;
									return (
										<div
											key={i}
											className="flex items-center justify-between rounded-xl px-4 py-2.5"
											style={NAVY_TILE}
										>
											<span className="text-sm font-medium text-white/80">{name}</span>
											<div className="flex items-center gap-3">
												<span className="text-xs font-bold text-white/60">
													×{drop.quantity}
												</span>
												{drop.chance && (
													<span className="text-xs font-semibold text-accent">
														{drop.chance}
													</span>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					)}

					{node.locations.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">Locations</div>
							<div className="flex flex-col gap-1.5">
								{node.locations.map((loc, i) => (
									<div
										key={i}
										className="flex items-center gap-3 rounded-xl px-4 py-2.5"
										style={NAVY_TILE}
									>
										<span className="text-sm font-medium text-white/80">{loc}</span>
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
