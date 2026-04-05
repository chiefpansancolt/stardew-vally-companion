"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { FaStar } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";
import { ArtifactDetailModalProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { NAVY_TILE } from "@/data/constants/styles";
import { PriceGrid } from "@/comps/ui/price-grid";

export function ArtifactDetailModal({ artifact, donated, found, onClose }: Props) {
	if (!artifact) return null;

	return (
		<Modal show={!!artifact} onClose={onClose} dismissible size="2xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={assetPath(artifact.image)}
						alt={artifact.name}
						className="h-14 w-14 object-contain"
					/>
					<div>
						<div className="flex items-center gap-2">
							<span
								className="text-lg font-extrabold"
								style={{ fontFamily: "var(--font-stardew-valley)" }}
							>
								{artifact.name}
							</span>
							{donated && (
								<span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[0.65rem] font-bold text-green-700">
									<HiCheck className="h-3 w-3" /> Donated
								</span>
							)}
							{!donated && found && (
								<span className="rounded-full bg-amber-100 px-2 py-0.5 text-[0.65rem] font-bold text-amber-700">
									Found
								</span>
							)}
							{!donated && !found && (
								<span className="rounded-full bg-gray-100 px-2 py-0.5 text-[0.65rem] font-bold text-gray-500">
									Not Found
								</span>
							)}
						</div>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-5">
					<div>
						<div className="mb-1.5 text-sm font-bold text-gray-900">Description</div>
						<p className="text-sm leading-relaxed text-gray-500 italic">
							{artifact.description}
						</p>
					</div>

					<div>
						<div className="mb-2 text-sm font-bold text-gray-900">Sell Price</div>
						<PriceGrid price={artifact.sellPrice} maxQuality="normal" variant="modal" />
					</div>

					<div>
						<div className="mb-2 text-sm font-bold text-gray-900">How to Find</div>
						<div className="flex flex-col gap-1.5">
							{artifact.locations.map((loc, i) => (
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

					{artifact.donationNotes && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">
								Donation Reward
							</div>
							<div className="rounded-xl px-4 py-3" style={NAVY_TILE}>
								<div className="text-highlight mb-1 flex items-center gap-1 text-[0.6rem] font-bold tracking-wide uppercase">
									<FaStar className="h-2.5 w-2.5" /> Museum Reward
								</div>
								<p className="text-sm font-medium text-white/80">
									{artifact.donationNotes}
								</p>
							</div>
						</div>
					)}
				</div>
			</ModalBody>
		</Modal>
	);
}
