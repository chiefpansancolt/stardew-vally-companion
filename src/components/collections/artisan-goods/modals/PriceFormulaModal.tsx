"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import {
	artisanCalculator,
	type ArtisanGood,
	type ArtisanUses,
	crops,
	fish,
	forageables,
	QualityCalculator,
	trees,
} from "stardew-valley-data";
import { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { assetPath } from "@/lib/utils/assetPath";

const calc = new QualityCalculator();
const artisanCalc = artisanCalculator();

const ARTISAN_USE_KEY: Record<string, keyof ArtisanUses> = {
	Honey: "honey",
	Wine: "wine",
	Juice: "juice",
	Jelly: "jelly",
	Pickles: "pickles",
	"Dried Fruit": "driedFruit",
	"Dried Mushrooms": "driedMushrooms",
};

type ArtisanCalcMethod = keyof typeof artisanCalc;

const ARTISAN_CALC_METHOD: Record<string, ArtisanCalcMethod> = {
	Honey: "honey",
	Wine: "wine",
	Juice: "juice",
	Jelly: "jelly",
	Pickles: "pickles",
	"Dried Fruit": "driedFruit",
	"Dried Mushrooms": "driedMushrooms",
	"Smoked Fish": "smokedFish",
	"Aged Roe": "agedRoe",
};

const FRUIT_TREE_KEYS = new Set(["wine", "jelly", "driedFruit"]);

interface IngredientOption {
	name: string;
	basePrice: number;
	image: string;
	energy?: number;
	health?: number;
	sublabel?: string;
}

interface ArtisanResult {
	sellPrice: number;
	energy?: number;
	health?: number;
}

function getIngredientOptions(good: ArtisanGood): IngredientOption[] {
	if (good.name === "Smoked Fish") {
		return fish()
			.get()
			.map((f) => ({
				name: f.name,
				basePrice: f.sellPrice,
				image: f.image,
				energy: f.energyHealth?.energy,
				health: f.energyHealth?.health,
			}))
			.sort((a, b) => a.name.localeCompare(b.name));
	}

	if (good.name === "Aged Roe") {
		return fish()
			.byRoe("roe")
			.get()
			.map((f) => {
				const roePrice = artisanCalc.roe(f.sellPrice).sellPrice;
				return {
					name: f.name,
					basePrice: f.sellPrice,
					image: f.image,
					sublabel: `Roe: ${roePrice}g`,
				};
			})
			.sort((a, b) => a.name.localeCompare(b.name));
	}

	const useKey = ARTISAN_USE_KEY[good.name];
	if (!useKey) return [];

	const results: IngredientOption[] = [
		...crops()
			.byArtisanUse(useKey)
			.get()
			.map((c) => ({
				name: c.name,
				basePrice: c.cropSellPrice,
				image: c.image,
				energy: c.energyHealth?.energy,
				health: c.energyHealth?.health,
			})),
		...forageables()
			.byArtisanUse(useKey)
			.get()
			.map((f) => ({
				name: f.name,
				basePrice: f.sellPrice,
				image: f.image,
				energy: f.energyHealth?.energy,
				health: f.energyHealth?.health,
			})),
	];

	if (FRUIT_TREE_KEYS.has(useKey)) {
		results.push(
			...trees()
				.fruitTrees()
				.byArtisanUse(useKey)
				.get()
				.filter(
					(t): t is Extract<typeof t, { type: "fruit-tree" }> => t.type === "fruit-tree"
				)
				.map((t) => ({
					name: t.produce.name,
					basePrice: t.produce.sellPrice,
					image: t.produce.image,
					energy: t.produce.energyHealth?.energy,
					health: t.produce.energyHealth?.health,
				}))
		);
	}

	const seen = new Set<string>();
	const deduped = results.filter((r) => {
		if (seen.has(r.name)) return false;
		seen.add(r.name);
		return true;
	});

	return deduped.sort((a, b) => a.name.localeCompare(b.name));
}

function calculateResult(good: ArtisanGood, opt: IngredientOption): ArtisanResult | null {
	const method = ARTISAN_CALC_METHOD[good.name];
	if (!method) return null;

	const fn = artisanCalc[method] as unknown;

	if (good.name === "Honey" || good.name === "Aged Roe") {
		return (fn as (price: number) => ArtisanResult)(opt.basePrice);
	}

	return (fn as (price: number, energy: number, health: number) => ArtisanResult)(
		opt.basePrice,
		opt.energy ?? 0,
		opt.health ?? 0
	);
}

interface Props {
	good: ArtisanGood | null;
	onClose: () => void;
}

export function PriceFormulaModal({ good, onClose }: Props) {
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

	const qualityPrices =
		calculatedPrice !== null && good?.maxQuality === "iridium"
			? calc.sellPrices(calculatedPrice)
			: null;

	const qualityEnergyHealth =
		calculatedEnergy !== null && calculatedHealth !== null && good?.maxQuality === "iridium"
			? calc.energyHealth(calculatedEnergy, calculatedHealth)
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
							<div className="text-base font-bold">
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
						{/* Search */}
						<input
							type="text"
							placeholder={`Search ${good.ingredients[0]?.name ?? "ingredient"}…`}
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="focus:border-primary w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
						/>

						{/* Ingredient grid */}
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

						{/* Result */}
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

								{/* Sell price */}
								{qualityPrices ? (
									<div className="grid grid-cols-4 overflow-hidden rounded-lg border border-white/10">
										<div className="flex flex-col items-center gap-0.5 border-r border-white/10 bg-white/5 px-2 py-2">
											<span className="text-[0.6rem] font-semibold tracking-wide text-white uppercase">
												Basic
											</span>
											<span className="text-sm font-bold text-white/80">
												{calculatedPrice}g
											</span>
										</div>
										{qualityPrices.map(({ quality, icon, value }) => (
											<div
												key={quality}
												className="flex flex-col items-center gap-0.5 border-r border-white/10 bg-white/5 px-2 py-2 last:border-r-0"
											>
												<img
													src={assetPath(icon)}
													alt={quality}
													className="h-3.5 w-3.5 object-contain"
												/>
												<span className="text-sm font-bold text-white/80">
													{value}g
												</span>
											</div>
										))}
									</div>
								) : (
									<p className="text-accent text-2xl font-bold">
										{calculatedPrice}g
									</p>
								)}

								{/* Energy / Health */}
								{calculatedEnergy !== null &&
									calculatedHealth !== null &&
									(calculatedEnergy > 0 || calculatedHealth > 0) && (
										<div className="mt-2">
											{qualityEnergyHealth ? (
												<div className="grid grid-cols-4 overflow-hidden rounded-lg border border-white/10">
													<div className="flex flex-col items-center gap-1 border-r border-white/10 bg-white/5 px-1 py-1.5">
														<span className="text-[0.6rem] font-semibold tracking-wide text-white uppercase">
															Basic
														</span>
														<div className="flex items-center gap-1.5">
															<span className="inline-flex items-center gap-0.5">
																<img
																	src={assetPath(
																		"images/misc/Energy.png"
																	)}
																	alt="Energy"
																	className="h-3.5 w-3.5 object-contain"
																/>
																<span className="text-[0.65rem] font-bold text-yellow-300">
																	+{calculatedEnergy}
																</span>
															</span>
															<span className="inline-flex items-center gap-0.5">
																<img
																	src={assetPath(
																		"images/misc/Health.png"
																	)}
																	alt="Health"
																	className="h-3.5 w-3.5 object-contain"
																/>
																<span className="text-[0.65rem] font-bold text-red-400">
																	+{calculatedHealth}
																</span>
															</span>
														</div>
													</div>
													{qualityEnergyHealth.map(
														({ quality, icon, energy, health }) => (
															<div
																key={quality}
																className="flex flex-col items-center gap-1 border-r border-white/10 bg-white/5 px-1 py-1.5 last:border-r-0"
															>
																<img
																	src={assetPath(icon)}
																	alt={quality}
																	className="h-3.5 w-3.5 object-contain"
																/>
																<div className="flex items-center gap-1.5">
																	<span className="inline-flex items-center gap-0.5">
																		<img
																			src={assetPath(
																				"images/misc/Energy.png"
																			)}
																			alt="Energy"
																			className="h-3.5 w-3.5 object-contain"
																		/>
																		<span className="text-[0.65rem] font-bold text-yellow-300">
																			+{energy}
																		</span>
																	</span>
																	<span className="inline-flex items-center gap-0.5">
																		<img
																			src={assetPath(
																				"images/misc/Health.png"
																			)}
																			alt="Health"
																			className="h-3.5 w-3.5 object-contain"
																		/>
																		<span className="text-[0.65rem] font-bold text-red-400">
																			+{health}
																		</span>
																	</span>
																</div>
															</div>
														)
													)}
												</div>
											) : (
												<div className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
													<span className="inline-flex items-center gap-1.5">
														<img
															src={assetPath(
																"images/misc/Energy.png"
															)}
															alt="Energy"
															className="h-4 w-4 object-contain"
														/>
														<span className="text-xs font-semibold text-yellow-300">
															+{calculatedEnergy}
														</span>
													</span>
													<span className="inline-flex items-center gap-1.5">
														<img
															src={assetPath(
																"images/misc/Health.png"
															)}
															alt="Health"
															className="h-4 w-4 object-contain"
														/>
														<span className="text-xs font-semibold text-red-400">
															+{calculatedHealth}
														</span>
													</span>
												</div>
											)}
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
