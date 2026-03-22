"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import type { SpecialItemDetailModalProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { SPECIAL_ITEM_TYPE_LABELS } from "@/data/constants/specialItems";
import { NAVY_TILE } from "@/data/constants/styles";
import { StatusBadge } from "@/comps/ui/StatusBadge";

export function SpecialItemDetailModal({ item, acquired, onClose }: Props) {
	if (!item) return null;

	const isInfo = acquired === null;

	return (
		<Modal show={!!item} onClose={onClose} size="md" dismissible>
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={assetPath(item.image)}
						alt={item.name}
						className="h-14 w-14 object-contain"
					/>
					<div>
						<div className="flex items-center gap-2">
							<span className="text-lg font-extrabold">{item.name}</span>
							{isInfo ? (
								<span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
									Info
								</span>
							) : (
								<StatusBadge status={acquired ? "success" : "inactive"} label={acquired ? "Acquired" : "Not Acquired"} />
							)}
						</div>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-4">
					<div
						className="inline-flex self-start rounded-lg px-3 py-1.5"
						style={NAVY_TILE}
					>
						<span className="text-xs font-semibold text-white/90">
							{SPECIAL_ITEM_TYPE_LABELS[item.type] ?? item.type}
						</span>
					</div>

					<div>
						<h4 className="mb-1 text-sm font-semibold text-gray-700">Effect</h4>
						<div className="rounded-lg p-3" style={NAVY_TILE}>
							<div className="text-sm text-white/90">{item.effect}</div>
						</div>
					</div>

					<div>
						<h4 className="mb-1 text-sm font-semibold text-gray-700">How to Obtain</h4>
						<div className="rounded-lg p-3" style={NAVY_TILE}>
							<div className="text-sm text-white/90">{item.obtainedFrom}</div>
						</div>
					</div>
				</div>
			</ModalBody>
		</Modal>
	);
}
