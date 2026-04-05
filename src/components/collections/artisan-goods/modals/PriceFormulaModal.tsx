"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import type { IngredientOption, PriceFormulaModalProps as Props } from "@/types";
import { calculateResult, getIngredientOptions } from "@/lib/pages/artisan-goods";
import { assetPath } from "@/lib/utils/assetPath";
import {
	applyBestProfessionBonus,
	type BonusResult,
	getStackedBonuses,
} from "@/lib/utils/professionPrices";
import { EnergyHealthGrid } from "@/comps/ui/energy-health-grid";
import { PriceGrid } from "@/comps/ui/price-grid";
import { SearchField } from "@/comps/ui/SearchField";

export function PriceFormulaModal({ good, onClose, activeProfessionBonuses = null }: Props) {
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState<IngredientOption | null>(null);

	const options = good ? getIngredientOptions(good) : [];
	const filtered = query
		? options.filter((o) => o.name.toLowerCase().includes(query.toLowerCase()))
		: options;

	const result = selected && good ? calculateResult(good, selected) : null;
	const calculatedPrice = result?.sellPrice ?? null;
	const calculatedEnergy = result?.energy ?? null;
	const calculatedHealth = result?.health ?? null;

	const hasStackingProfessions =
		!!good && good.profession.length > 1 && good.profession.includes("artisan");
	const professionBonuses: BonusResult[] =
		hasStackingProfessions && calculatedPrice !== null && activeProfessionBonuses && good
			? getStackedBonuses(calculatedPrice, good.profession, activeProfessionBonuses)
			: [];
	const professionBonus: BonusResult | null =
		!hasStackingProfessions && calculatedPrice !== null && activeProfessionBonuses && good
			? applyBestProfessionBonus(calculatedPrice, good.profession, activeProfessionBonuses)
			: null;

	return (
		<Modal show={!!good} onClose={onClose} dismissible size="2xl">
			<ModalHeader>
				{good && (
					<div className="flex items-center gap-3">
						<img
							src={assetPath(good.image)}
							alt={good.name}
							className="h-8 w-8 object-contain"
						/>
						<div>
							<div
								className="text-base font-bold"
								style={{ fontFamily: "var(--font-stardew-valley)" }}
							>
								{good.name} — Price Calculator
							</div>
							<div className="text-xs font-normal text-gray-500 italic">
								{good.sellPriceFormula}
							</div>
						</div>
					</div>
				)}
			</ModalHeader>
			<ModalBody>
				{good && (
					<div className="flex flex-col gap-4">
						<SearchField
							value={query}
							onChange={setQuery}
							placeholder={`Search ${good.ingredients[0]?.name ?? "ingredient"}…`}
							variant="light"
						/>

						{filtered.length === 0 ? (
							<p className="py-6 text-center text-sm text-white/40">
								No items match your search.
							</p>
						) : (
							<div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
								{filtered.map((opt) => {
									const isSelected = selected?.name === opt.name;
									return (
										<button
											key={opt.name}
											onClick={() => setSelected(opt)}
											className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all ${isSelected ? "border-accent" : "border-secondary/60"}`}
											style={{
												background:
													"linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)",
											}}
										>
											<img
												src={assetPath(opt.image)}
												alt={opt.name}
												className="h-10 w-10 object-contain"
											/>
											<span
												className={`text-[0.65rem] leading-tight font-semibold ${isSelected ? "text-accent" : "text-white"}`}
											>
												{opt.name}
											</span>
											<span
												className={`text-[0.6rem] ${isSelected ? "text-accent" : "text-white/80"}`}
											>
												{opt.sublabel ?? `${opt.basePrice}g`}
											</span>
										</button>
									);
								})}
							</div>
						)}

						{calculatedPrice !== null && selected && (
							<div
								className="border-secondary/60 rounded-xl border p-4"
								style={{
									background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)",
								}}
							>
								<div className="mb-3 flex items-center gap-2">
									<img
										src={assetPath(selected.image)}
										alt={selected.name}
										className="h-7 w-7 object-contain"
									/>
									<p className="flex items-center gap-1 text-sm">
										<span className="font-bold text-white">
											{selected.name}
										</span>
										<HiArrowRight className="inline h-3.5 w-3.5 text-white/60" />
										<span className="text-white">{good.name}</span>
									</p>
								</div>

								<PriceGrid
									price={calculatedPrice}
									maxQuality={good.maxQuality}
									variant="modal"
									professionBonus={professionBonus}
									professionBonuses={
										professionBonuses.length > 0 ? professionBonuses : undefined
									}
								/>

								{calculatedEnergy !== null &&
									calculatedHealth !== null &&
									(calculatedEnergy > 0 || calculatedHealth > 0) && (
										<div className="mt-2">
											<EnergyHealthGrid
												energy={calculatedEnergy}
												health={calculatedHealth}
												maxQuality={good.maxQuality}
												variant="modal"
											/>
										</div>
									)}
							</div>
						)}
					</div>
				)}
			</ModalBody>
		</Modal>
	);
}
