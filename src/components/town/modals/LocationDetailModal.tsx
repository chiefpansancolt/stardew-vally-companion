"use client";

import { Modal, ModalBody, ModalHeader, TabItem, Tabs } from "flowbite-react";
import type { LocationDetailModalProps as Props } from "@/types";
import {
	getBuildingsForShop,
	getFieldOfficeCollections,
	getHouseRenovations,
	getHouseUpgrades,
	getPurchasableAnimals,
	getPurchasablePets,
	getShopItems,
	hasAnimalsTab,
	hasBuildings,
	hasFarmhouseTab,
	isFieldOffice,
} from "@/lib/pages/town";
import { assetPath } from "@/lib/utils/assetPath";
import { capitalize } from "@/lib/utils/formatting";
import { NAVY_TILE } from "@/data/constants/styles";
import {
	AnimalsTab,
	BuildingsTab,
	FarmhouseTab,
	FossilCollectionsTab,
	InventoryTab,
	PetsTab,
} from "./tabs";

export function LocationDetailModal({ location, onClose }: Props) {
	if (!location) return null;

	const isFieldOfficeShop = location.shop ? isFieldOffice(location.shop) : false;
	const showBuildingTab = location.shop ? hasBuildings(location.shop) : false;
	const showFarmhouseTab = location.shop ? hasFarmhouseTab(location.shop) : false;
	const showAnimalsTab = location.shop ? hasAnimalsTab(location.shop) : false;

	const shopItems = location.shop && !isFieldOfficeShop ? getShopItems(location.shop) : [];
	const fieldOfficeCollections = isFieldOfficeShop ? getFieldOfficeCollections() : [];
	const shopBuildings =
		showBuildingTab && location.shop ? getBuildingsForShop(location.shop) : [];
	const houseUpgradesList = showFarmhouseTab ? getHouseUpgrades() : [];
	const renovationsList = showFarmhouseTab ? getHouseRenovations() : [];
	const purchasableAnimals = showAnimalsTab ? getPurchasableAnimals() : [];
	const purchasablePets = showAnimalsTab ? getPurchasablePets() : [];

	return (
		<Modal show onClose={onClose} dismissible size="6xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={assetPath(location.image)}
						alt={location.name}
						className="h-14 w-14 rounded-lg object-cover"
					/>
					<div>
						<div
							className="text-lg font-extrabold"
							style={{ fontFamily: "var(--font-stardew-valley)" }}
						>
							{location.name}
						</div>
						{location.address && (
							<div className="text-sm text-gray-500">{location.address}</div>
						)}
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-4">
					<div className="rounded-lg p-3" style={NAVY_TILE}>
						<div className="grid grid-cols-2 gap-3">
							<div>
								<div className="text-[0.6rem] font-semibold tracking-wide text-white/40 uppercase">
									Hours
								</div>
								<div className="mt-1 text-sm font-bold text-white/90">
									{location.openHours
										? `${location.openHours.open} - ${location.openHours.close}`
										: "Always open"}
								</div>
							</div>
							<div>
								<div className="text-[0.6rem] font-semibold tracking-wide text-white/40 uppercase">
									Closed
								</div>
								<div className="mt-1 text-sm font-bold text-white/90">
									{location.closed.length > 0
										? location.closed.join(", ")
										: "Never"}
								</div>
							</div>
							{location.occupants.length > 0 && (
								<div>
									<div className="text-[0.6rem] font-semibold tracking-wide text-white/40 uppercase">
										Occupants
									</div>
									<div className="mt-1 text-sm font-bold text-white/90">
										{location.occupants.join(", ")}
									</div>
								</div>
							)}
							<div>
								<div className="text-[0.6rem] font-semibold tracking-wide text-white/40 uppercase">
									Type
								</div>
								<div className="mt-1 text-sm font-bold text-white/90">
									{capitalize(location.type)}
								</div>
							</div>
						</div>
					</div>

					{location.shop === "joja-shop" && (
						<div className="flex items-center gap-4 rounded-lg p-4" style={NAVY_TILE}>
							<img
								src="/images/shop/Joja Development Form.png"
								alt="Joja Membership"
								className="h-12 w-12 shrink-0 object-contain"
							/>
							<div className="flex-1">
								<div className="text-sm font-bold text-white">Joja Membership</div>
								<div className="text-[0.7rem] text-white/50">
									Purchase a Joja membership to unlock community development
									projects
								</div>
							</div>
							<div className="text-highlight text-sm font-bold">5,000g</div>
						</div>
					)}

					{location.shop && (
						<Tabs variant="underline">
							<TabItem title={`Inventory (${shopItems.length})`}>
								<InventoryTab items={shopItems} />
							</TabItem>

							{showBuildingTab && (
								<TabItem title={`Buildings (${shopBuildings.length})`}>
									<BuildingsTab buildings={shopBuildings} />
								</TabItem>
							)}

							{showFarmhouseTab && (
								<TabItem
									title={`Farmhouse (${houseUpgradesList.length + renovationsList.length})`}
								>
									<FarmhouseTab
										upgrades={houseUpgradesList}
										renovations={renovationsList}
									/>
								</TabItem>
							)}

							{showAnimalsTab && (
								<TabItem title={`Animals (${purchasableAnimals.length})`}>
									<AnimalsTab animals={purchasableAnimals} />
								</TabItem>
							)}

							{showAnimalsTab && purchasablePets.length > 0 && (
								<TabItem title={`Pets (${purchasablePets.length})`}>
									<PetsTab pets={purchasablePets} />
								</TabItem>
							)}

							{isFieldOfficeShop && fieldOfficeCollections.length > 0 && (
								<TabItem title={`Collections (${fieldOfficeCollections.length})`}>
									<FossilCollectionsTab collections={fieldOfficeCollections} />
								</TabItem>
							)}
						</Tabs>
					)}
				</div>
			</ModalBody>
		</Modal>
	);
}
