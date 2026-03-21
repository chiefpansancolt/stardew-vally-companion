"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { type OreItem } from "stardew-valley-data";
import { HiCheck } from "react-icons/hi";
import { assetPath } from "@/lib/utils/assetPath";
import { PriceGrid } from "@/comps/ui/PriceGrid";
import { type BonusResult } from "@/lib/utils/professionPrices";

const NAVY_TILE = {
	background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)",
	border: "1px solid rgba(43,58,103,0.6)",
} as const;

interface Props {
	ore: OreItem | null;
	shipped: boolean;
	professionBonus: BonusResult | null;
	onClose: () => void;
}

export function OreDetailModal({ ore, shipped, professionBonus, onClose }: Props) {
	if (!ore) return null;

	return (
		<Modal show={!!ore} onClose={onClose} dismissible size="2xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={assetPath(ore.image)}
						alt={ore.name}
						className="h-14 w-14 object-contain"
					/>
					<div>
						<div className="flex items-center gap-2">
							<span className="text-lg font-extrabold">{ore.name}</span>
							{shipped ? (
								<span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[0.65rem] font-bold text-green-700">
									<HiCheck className="h-3 w-3" /> Shipped
								</span>
							) : (
								<span className="rounded-full bg-gray-100 px-2 py-0.5 text-[0.65rem] font-bold text-gray-500">
									Not Shipped
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
						<p className="text-sm italic leading-relaxed text-gray-500">
							{ore.description}
						</p>
					</div>

					<div>
						<div className="mb-2 text-sm font-bold text-gray-900">Sell Price</div>
						<PriceGrid
							price={ore.sellPrice}
							maxQuality="normal"
							variant="modal"
							professionBonus={professionBonus}
						/>
					</div>

					{ore.locations.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">How to Find</div>
							<div className="flex flex-col gap-1.5">
								{ore.locations.map((loc, i) => (
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
