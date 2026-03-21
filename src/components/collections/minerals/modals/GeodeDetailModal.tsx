"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { minerals, type GeodeContainer, type GeodeContent, type MineralItem } from "stardew-valley-data";
import { assetPath } from "@/lib/utils/assetPath";
import { PriceGrid } from "@/comps/ui/PriceGrid";

const NAVY_TILE = {
	background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)",
	border: "1px solid rgba(43,58,103,0.6)",
} as const;

interface Props {
	geode: GeodeContainer | null;
	fallbackContents: MineralItem[] | null;
	onClose: () => void;
}

export function GeodeDetailModal({ geode, fallbackContents, onClose }: Props) {
	if (!geode) return null;

	const geodeContents: GeodeContent[] | null = geode.contents ?? null;
	const mineralFallback: MineralItem[] =
		fallbackContents ??
		(minerals().fromGeode(geode.name).mineralItems().get() as MineralItem[]);

	return (
		<Modal show={!!geode} onClose={onClose} dismissible size="2xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={assetPath(geode.image)}
						alt={geode.name}
						className="h-14 w-14 object-contain"
					/>
					<div>
						<span className="text-lg font-extrabold">{geode.name}</span>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-5">
					<div>
						<div className="mb-1.5 text-sm font-bold text-gray-900">Description</div>
						<p className="text-sm italic leading-relaxed text-gray-500">
							{geode.description}
						</p>
					</div>

					<div>
						<div className="mb-2 text-sm font-bold text-gray-900">Sell Price</div>
						<PriceGrid price={geode.sellPrice} maxQuality="normal" variant="modal" />
					</div>

					{/* Structured GeodeContent list (preferred) */}
					{geodeContents && geodeContents.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">
								Possible Contents ({geodeContents.length})
							</div>
							<div className="flex flex-col gap-1.5">
								{geodeContents.map((item, i) => (
									<div
										key={i}
										className="flex items-center justify-between rounded-xl px-4 py-2.5"
										style={NAVY_TILE}
									>
										<div className="flex items-center gap-3">
											{item.image && (
												<img
													src={assetPath(item.image)}
													alt={item.name}
													className="h-8 w-8 shrink-0 object-contain"
												/>
											)}
											<span className="text-sm font-medium text-white/80">{item.name}</span>
										</div>
										<div className="flex items-center gap-2">
											{item.quantity && (
												<span className="text-xs font-bold text-white/60">
													×{item.quantity}
												</span>
											)}
											{item.chance && (
												<span className="text-xs font-semibold text-accent">
													{item.chance}
												</span>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Fallback MineralItem grid when geode.contents is absent */}
					{!geodeContents && mineralFallback.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">
								Possible Contents ({mineralFallback.length})
							</div>
							<div
								className="grid gap-2"
								style={{ gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))" }}
							>
								{mineralFallback.map((mineral) => (
									<div
										key={mineral.id}
										className="flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center"
										style={NAVY_TILE}
									>
										<img
											src={assetPath(mineral.image)}
											alt={mineral.name}
											className="h-10 w-10 object-contain"
										/>
										<span className="text-[0.6rem] font-semibold leading-tight text-white/75">
											{mineral.name}
										</span>
									</div>
								))}
							</div>
						</div>
					)}

					{geode.locations.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">How to Find</div>
							<div className="flex flex-col gap-1.5">
								{geode.locations.map((loc, i) => (
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
