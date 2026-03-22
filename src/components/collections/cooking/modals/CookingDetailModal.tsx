"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import type { CookingDetailModalProps as Props } from "@/types";
import { resolveIngredientImage } from "@/lib/pages/crafting";
import { assetPath } from "@/lib/utils/assetPath";
import { SEASONS } from "@/data/constants/seasons";
import { NAVY_TILE } from "@/data/constants/styles";
import { EnergyHealthGrid } from "@/comps/ui/energy-health-grid";
import { PriceGrid } from "@/comps/ui/price-grid";
import { StatusBadge } from "@/comps/ui/StatusBadge";

export function CookingDetailModal({ dish, learned, cooked, onClose }: Props) {
	if (!dish) return null;

	const energy = dish.energyHealth?.energy ?? 0;
	const health = dish.energyHealth?.health ?? 0;
	const hasEnergy = energy > 0 || health > 0;
	const isPoisonous = dish.energyHealth?.poison === true;

	return (
		<Modal show onClose={onClose} dismissible size="2xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={assetPath(dish.image)}
						alt={dish.name}
						className="h-14 w-14 object-contain"
					/>
					<div>
						<div className="flex items-center gap-2">
							<span className="text-lg font-extrabold">{dish.name}</span>
							{cooked ? (
								<StatusBadge status="success" label="Cooked" />
							) : learned ? (
								<StatusBadge status="warning" label="Learned" />
							) : (
								<StatusBadge status="inactive" label="Not Learned" />
							)}
						</div>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-4">
					<p className="text-sm text-gray-500 italic">{dish.description}</p>

					{(hasEnergy || isPoisonous) && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">
								Energy &amp; Health
							</div>
							<EnergyHealthGrid
								energy={energy}
								health={health}
								maxQuality="normal"
								variant="modal"
								poison={isPoisonous}
							/>
						</div>
					)}

					<div>
						<div className="mb-2 text-sm font-bold text-gray-900">Sell Price</div>
						<PriceGrid price={dish.sellPrice} maxQuality="normal" variant="modal" />
					</div>

					{dish.buffs.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">Buffs</div>
							<div className="flex flex-col gap-1.5">
								{dish.buffs.map((buff) => (
									<div
										key={buff.stat}
										className="flex items-center justify-between rounded-xl px-4 py-2.5"
										style={NAVY_TILE}
									>
										<span className="text-sm font-semibold text-white/85">
											{buff.stat}
										</span>
										<div className="flex items-center gap-3">
											<span className="text-sm font-bold text-blue-300">
												{buff.value > 0 ? `+${buff.value}` : buff.value}
											</span>
											{dish.buffDuration && (
												<span className="text-[0.65rem] text-white/40">
													{dish.buffDuration} min
												</span>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					<div>
						<div className="mb-2 text-sm font-bold text-gray-900">Ingredients</div>
						<div className="flex flex-col gap-2">
							{dish.ingredients.map((ing) => {
								const imgSrc = resolveIngredientImage(ing.id, ing.name);
								return (
									<div
										key={ing.id}
										className="flex items-center gap-3 rounded-xl px-4 py-2.5"
										style={NAVY_TILE}
									>
										{imgSrc ? (
											<img
												src={imgSrc}
												alt={ing.name}
												className="h-8 w-8 shrink-0 object-contain"
											/>
										) : (
											<div className="h-8 w-8 shrink-0 rounded-lg bg-white/10" />
										)}
										<span className="flex-1 text-sm font-semibold text-white/85">
											{ing.name}
										</span>
										<span className="text-sm font-bold text-white/60">
											&times; {ing.quantity}
										</span>
									</div>
								);
							})}
						</div>
					</div>

					<div>
						<div className="mb-2 text-sm font-bold text-gray-900">Recipe Sources</div>
						<div className="flex flex-col gap-1.5">
							{dish.recipeSources.map((src, i) => (
								<div
									key={i}
									className="flex items-center gap-3 rounded-xl px-4 py-2.5"
									style={NAVY_TILE}
								>
									<span className="text-sm font-medium text-white/80">
										{formatRecipeSource(src)}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</ModalBody>
		</Modal>
	);
}

function formatRecipeSource(
	src: Props["dish"] extends null ? never : NonNullable<Props["dish"]>["recipeSources"][number]
): string {
	switch (src.type) {
		case "friendship":
			return `${src.villager} — ${src.hearts} hearts`;
		case "queen-of-sauce": {
			const seasonLabel = SEASONS[src.season as keyof typeof SEASONS]?.label ?? src.season;
			return `Queen of Sauce — ${seasonLabel} ${src.day}, Year ${src.year}`;
		}
		case "purchase":
			return `Buy from ${src.from} — ${src.price}${src.currency}`;
		case "skill":
			return `${src.skill} Level ${src.level}`;
		case "cutscene":
			return "Special event";
		default:
			return "Starter recipe";
	}
}
