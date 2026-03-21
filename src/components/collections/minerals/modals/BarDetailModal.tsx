"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { type BarItem } from "stardew-valley-data";
import { HiCheck, HiClock } from "react-icons/hi";
import { assetPath } from "@/lib/utils/assetPath";
import { PriceGrid } from "@/comps/ui/PriceGrid";
import { type BonusResult } from "@/lib/utils/professionPrices";

const NAVY_TILE = {
	background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)",
	border: "1px solid rgba(43,58,103,0.6)",
} as const;

interface Props {
	bar: BarItem | null;
	shipped: boolean;
	professionBonus: BonusResult | null;
	oreNameById: Record<string, string>;
	onClose: () => void;
}

export function BarDetailModal({ bar, shipped, professionBonus, oreNameById, onClose }: Props) {
	if (!bar) return null;

	return (
		<Modal show={!!bar} onClose={onClose} dismissible size="2xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={assetPath(bar.image)}
						alt={bar.name}
						className="h-14 w-14 object-contain"
					/>
					<div>
						<div className="flex items-center gap-2">
							<span className="text-lg font-extrabold">{bar.name}</span>
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
							{bar.description}
						</p>
					</div>

					<div>
						<div className="mb-2 text-sm font-bold text-gray-900">Sell Price</div>
						<PriceGrid
							price={bar.sellPrice}
							maxQuality="normal"
							variant="modal"
							professionBonus={professionBonus}
						/>
					</div>

					{bar.smeltRecipes.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">Smelt Recipe</div>
							<div className="flex flex-col gap-2">
								{bar.smeltRecipes.map((recipe, i) => {
									const oreName = oreNameById[recipe.ore] ?? recipe.ore;
									return (
										<div
											key={i}
											className="flex flex-col gap-2 rounded-xl px-4 py-3"
											style={NAVY_TILE}
										>
											<div className="flex flex-wrap items-center gap-3 text-sm">
												<span className="font-bold text-white">
													{recipe.oreQty}× {oreName}
												</span>
												<span className="text-white/40">+</span>
												<span className="font-bold text-white">
													{recipe.coalQty}× Coal
												</span>
												{recipe.outputQty && recipe.outputQty > 1 && (
													<>
														<span className="text-white/40">→</span>
														<span className="font-bold text-white">
															{recipe.outputQty}× {bar.name}
														</span>
													</>
												)}
											</div>
											<div className="flex items-center gap-1 text-xs text-white/50">
												<HiClock className="h-3 w-3" /> {recipe.timeMinutes} minutes in Furnace
											</div>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>
			</ModalBody>
		</Modal>
	);
}
