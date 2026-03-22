"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import type { CraftingDetailModalProps as Props } from "@/types";
import { resolveIngredientImage } from "@/lib/pages/crafting";
import { assetPath } from "@/lib/utils/assetPath";
import { NAVY_TILE } from "@/data/constants/styles";
import { StatusBadge } from "@/comps/ui/StatusBadge";

export function CraftingDetailModal({ recipe, learned, crafted, onClose }: Props) {
	if (!recipe) return null;

	return (
		<Modal show onClose={onClose} dismissible size="2xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={assetPath(recipe.image)}
						alt={recipe.name}
						className="h-14 w-14 object-contain"
					/>
					<div>
						<div className="flex items-center gap-2">
							<span className="text-lg font-extrabold">{recipe.name}</span>
							{crafted ? (
								<StatusBadge status="success" label="Crafted" />
							) : learned ? (
								<StatusBadge status="warning" label="Learned" />
							) : (
								<StatusBadge status="inactive" label="Not Learned" />
							)}
						</div>
						<div className="text-sm text-gray-500">{recipe.category}</div>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-4">
					<p className="text-sm text-gray-500 italic">{recipe.description}</p>

					<div className="grid grid-cols-2 gap-2">
						<div className="flex flex-col gap-1 rounded-xl px-4 py-3" style={NAVY_TILE}>
							<span className="text-[0.6rem] font-semibold tracking-wide text-white/50 uppercase">
								Source
							</span>
							<span className="text-sm font-bold text-white/85">{recipe.source}</span>
						</div>
						<div className="flex flex-col gap-1 rounded-xl px-4 py-3" style={NAVY_TILE}>
							<span className="text-[0.6rem] font-semibold tracking-wide text-white/50 uppercase">
								Output
							</span>
							<span className="text-sm font-bold text-white/85">
								{recipe.output.name}
								{recipe.output.quantity > 1 && ` × ${recipe.output.quantity}`}
							</span>
							{recipe.output.isBigCraftable && (
								<span className="text-[0.6rem] text-white/40">Big Craftable</span>
							)}
						</div>
					</div>

					<div>
						<div className="mb-2 text-sm font-bold text-gray-900">Ingredients</div>
						<div className="flex flex-col gap-2">
							{recipe.ingredients.map((ing) => {
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
				</div>
			</ModalBody>
		</Modal>
	);
}
