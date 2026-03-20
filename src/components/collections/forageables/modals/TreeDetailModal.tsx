"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { search, type FruitTree, type WildTree, type Tree } from "stardew-valley-data";
import { PriceGrid } from "@/comps/ui/PriceGrid";
import { EnergyHealthGrid } from "@/comps/ui/EnergyHealthGrid";
import { HiCheck } from "react-icons/hi";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { SeedRow } from "@/comps/ui/SeedRow";

interface Props {
	tree: Tree | null;
	shippableIds: Set<string>;
	gameData: GameData;
	onClose: () => void;
}

const ARTISAN_USE_META: Record<string, { name: string; image: string }> = {
	honey: { name: "Honey", image: "images/artisan-goods/Honey.png" },
	wine: { name: "Wine", image: "images/artisan-goods/Wine.png" },
	juice: { name: "Juice", image: "images/artisan-goods/Juice.png" },
	pickles: { name: "Pickles", image: "images/artisan-goods/Pickles.png" },
	jelly: { name: "Jelly", image: "images/artisan-goods/Jelly.png" },
	driedMushrooms: { name: "Dried Mushrooms", image: "images/artisan-goods/Dried Mushrooms.png" },
	driedFruit: { name: "Dried Fruit", image: "images/artisan-goods/Dried Fruit.png" },
};

const SEASON_LABELS: Record<string, string> = {
	spring: "Spring",
	summer: "Summer",
	fall: "Fall",
	winter: "Winter",
};

const NAVY_TILE = {
	background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)",
	border: "1px solid rgba(43,58,103,0.6)",
} as const;

function FruitTreeModal({
	tree,
	gameData,
}: {
	tree: FruitTree;
	gameData: GameData;
}) {
	const p = tree.produce;
	const shipped = gameData.shipped[p.id]?.shipped === true;
	const shippedCount = gameData.shipped[p.id]?.count ?? 0;
	const seasonLabel = tree.seasons.map((s) => SEASON_LABELS[s] ?? s).join(", ");

	const hasEnergy = p.energyHealth && (p.energyHealth.energy ?? 0) > 0;

	return (
		<>
			<ModalHeader>
				<div className="flex items-center gap-3">
					{tree.image && (
						<img src={assetPath(tree.image)} alt={tree.name} className="h-14 w-14 object-contain" />
					)}
					<div>
						<div className="text-lg font-extrabold">{tree.name}</div>
						<div className="text-sm text-gray-500">{seasonLabel} harvest · Fruit Tree</div>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-4">
					{/* Sapling row */}
					<SeedRow image={tree.saplingImage} name={tree.saplingName} prices={tree.saplingBuyPrices} variant="modal" />

					{/* Info chips */}
					<div className="grid grid-cols-2 gap-2">
						{[
							{ label: "Season", value: seasonLabel },
							{ label: "Mature", value: `${tree.daysToMature}d` },
						].map(({ label, value }) => (
							<div
								key={label}
								className="flex flex-col items-center rounded-xl px-3 py-2.5"
								style={NAVY_TILE}
							>
								<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">{label}</span>
								<span className="mt-0.5 text-sm font-bold text-white/85">{value}</span>
							</div>
						))}
					</div>

					{/* Growth stages */}
					{tree.stages && tree.stages.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">Growth Stages</div>
							<div className="flex flex-wrap items-end gap-1">
								{tree.stages.map((stage, i) => (
									<div key={i} className="flex items-end gap-1">
										<div className="flex flex-col items-center gap-1.5 rounded-xl px-3 py-3" style={NAVY_TILE}>
											{stage.image ? (
												<img src={assetPath(stage.image)} alt={stage.name} className="h-14 w-14 object-contain" />
											) : (
												<div className="h-14 w-14" />
											)}
											<span className="text-[0.6rem] text-white/80">{stage.name}</span>
										</div>
										{i < tree.stages.length - 1 && (
											<span className="mb-3 text-white/30">›</span>
										)}
									</div>
								))}
							</div>
						</div>
					)}

					{/* Produce */}
					<div>
						<div className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-900">
							Produce
							{shipped ? (
								<span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[0.65rem] font-bold text-green-700">
									<HiCheck className="h-3 w-3" /> Shipped ×{shippedCount}
								</span>
							) : (
								<span className="rounded-full bg-gray-100 px-2 py-0.5 text-[0.65rem] font-bold text-gray-500">
									Not Shipped
								</span>
							)}
						</div>

						{/* Produce name row */}
						<div className="mb-3 flex items-center gap-2 rounded-xl px-3 py-2" style={NAVY_TILE}>
							{p.image && (
								<img src={assetPath(p.image)} alt={p.name} className="h-7 w-7 object-contain" />
							)}
							<span className="text-sm font-bold text-white/90">{p.name}</span>
						</div>

						{/* Sell price */}
						<div className="mb-3">
							<div className="mb-2 text-sm font-bold text-gray-900">Sell Price</div>
							<PriceGrid price={p.sellPrice} maxQuality="iridium" variant="modal" />
						</div>

						{/* Energy & Health */}
						{hasEnergy && (
							<div className="mb-3">
								<div className="mb-2 text-sm font-bold text-gray-900">Energy &amp; Health</div>
								<EnergyHealthGrid
									energy={p.energyHealth!.energy ?? 0}
									health={p.energyHealth!.health ?? 0}
									maxQuality="iridium"
									variant="modal"
								/>
							</div>
						)}

						{/* Artisan uses */}
						{p.artisanUses && Object.entries(p.artisanUses as unknown as Record<string, boolean>).some(([, v]) => v) && (
							<div>
								<div className="mb-2 text-sm font-bold text-gray-900">Artisan Uses</div>
								<div className="flex flex-wrap gap-2">
									{Object.entries(p.artisanUses as unknown as Record<string, boolean>)
										.filter(([, v]) => v)
										.map(([key]) => {
											const meta = ARTISAN_USE_META[key];
											if (!meta) return null;
											return (
												<div key={key} className="flex items-center gap-2 rounded-xl px-3 py-2" style={NAVY_TILE}>
													<img src={assetPath(meta.image)} alt={meta.name} className="h-6 w-6 object-contain" />
													<span className="text-xs font-semibold text-white/85">{meta.name}</span>
												</div>
											);
										})}
								</div>
							</div>
						)}
					</div>
				</div>
			</ModalBody>
		</>
	);
}

function WildTreeModal({
	tree,
	shippableIds,
	gameData,
}: {
	tree: WildTree;
	shippableIds: Set<string>;
	gameData: GameData;
}) {
	const t = tree.tapper;
	const isShippable = t ? shippableIds.has(t.id) : false;
	const shipped = isShippable && t ? gameData.shipped[t.id]?.shipped === true : false;
	const shippedCount = t ? (gameData.shipped[t.id]?.count ?? 0) : 0;

	const hasEnergy = t?.energyHealth && (t.energyHealth.energy ?? 0) > 0;

	return (
		<>
			<ModalHeader>
				<div className="flex items-center gap-3">
					{tree.image && (
						<img src={assetPath(tree.image)} alt={tree.name} className="h-14 w-14 object-contain" />
					)}
					<div>
						<div className="text-lg font-extrabold">{tree.name}</div>
						<div className="text-sm text-gray-500">Wild Tree</div>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-4">
					{/* Seed row */}
					<SeedRow image={tree.seedImage} name={tree.seedName ?? ""} variant="modal" />

					{/* Growth stages */}
					{tree.stages && tree.stages.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">Growth Stages</div>
							<div className="flex flex-wrap items-end gap-1">
								{tree.stages.map((stage, i) => (
									<div key={i} className="flex items-end gap-1">
										<div className="flex flex-col items-center gap-1.5 rounded-xl px-3 py-3" style={NAVY_TILE}>
											{stage.image ? (
												<img src={assetPath(stage.image)} alt={stage.name} className="h-14 w-14 object-contain" />
											) : (
												<div className="h-14 w-14" />
											)}
											<span className="text-[0.6rem] text-white/80">{stage.name}</span>
										</div>
										{i < tree.stages.length - 1 && (
											<span className="mb-3 text-white/30">›</span>
										)}
									</div>
								))}
							</div>
						</div>
					)}

					{/* Tapper produce */}
					{t && (
						<div>
							<div className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-900">
								Tapper Produce
								{isShippable && (
									shipped ? (
										<span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[0.65rem] font-bold text-green-700">
											<HiCheck className="h-3 w-3" /> Shipped ×{shippedCount}
										</span>
									) : (
										<span className="rounded-full bg-gray-100 px-2 py-0.5 text-[0.65rem] font-bold text-gray-500">
											Not Shipped
										</span>
									)
								)}
							</div>

							{/* Tapper name row */}
							<div className="mb-3 flex items-center gap-2 rounded-xl px-3 py-2" style={NAVY_TILE}>
								{t.image && (
									<img src={assetPath(t.image)} alt={t.name} className="h-7 w-7 object-contain" />
								)}
								<span className="text-sm font-bold text-white/90">{t.name}</span>
							</div>

							{/* Sell price — single row, no quality tiers */}
							<div className="mb-3">
								<div className="mb-2 text-sm font-bold text-gray-900">Sell Price</div>
								<PriceGrid price={t.sellPrice} maxQuality="basic" variant="modal" />
							</div>

							{/* Energy & Health — single row */}
							{hasEnergy && (
								<div>
									<div className="mb-2 text-sm font-bold text-gray-900">Energy &amp; Health</div>
									<EnergyHealthGrid
										energy={t.energyHealth!.energy ?? 0}
										health={t.energyHealth!.health ?? 0}
										maxQuality="basic"
										variant="modal"
									/>
								</div>
							)}
						</div>
					)}
						{/* Chopped produce */}
						{tree.choppedProduce && tree.choppedProduce.length > 0 && (
							<div>
								<div className="mb-2 text-sm font-bold text-gray-900">Chopped Produce</div>
								<div className="flex flex-wrap gap-1.5">
									{tree.choppedProduce.map((p) => {
										const img = p.image ?? search(p.id)?.find((r) => r.name === p.name)?.image;
										return (
											<div key={p.id} className="flex items-center gap-1.5 rounded-xl px-3 py-2" style={NAVY_TILE}>
												{img && <img src={assetPath(img)} alt={p.name} className="h-5 w-5 object-contain" />}
												<span className="text-sm font-semibold text-white/90">{p.name}</span>
											</div>
										);
									})}
								</div>
							</div>
						)}
				</div>
			</ModalBody>
		</>
	);
}

export function TreeDetailModal({ tree, shippableIds, gameData, onClose }: Props) {
	if (!tree) return null;

	return (
		<Modal show={!!tree} onClose={onClose} dismissible size="2xl">
			{tree.type === "fruit-tree" ? (
				<FruitTreeModal tree={tree} gameData={gameData} />
			) : (
				<WildTreeModal tree={tree} shippableIds={shippableIds} gameData={gameData} />
			)}
		</Modal>
	);
}
