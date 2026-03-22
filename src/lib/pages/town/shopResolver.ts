import type {
  Building,
  FarmAnimal,
  FieldOfficeCollectionData,
  HouseRenovation,
  HouseUpgrade,
  Pet,
} from "stardew-valley-data";
import {
  animals as animalsFn,
  blacksmith,
  booksellerShop,
  buildings as buildingsFn,
  carpenter,
  casino,
  desertTrader,
  dwarfShop,
  fieldOffice,
  guild,
  hats,
  houseRenovations as houseRenovationsFn,
  houseUpgrades as houseUpgradesFn,
  isFarmAnimal,
  islandTrader,
  isPet,
  joja,
  krobus,
  marnie,
  medicalSupplies,
  oasis,
  pierre,
  qiStock,
  saloon,
  volcanoShop,
  willy,
  wizard,
} from "stardew-valley-data";

export interface ShopItem {
  name: string;
  price: string;
  image: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SHOP_MAP: Record<string, () => { get: () => any[] }> = {
  "pierre-shop": pierre,
  "saloon-shop": saloon,
  "blacksmith-shop": blacksmith,
  "carpenter-shop": carpenter,
  "marnie-shop": marnie,
  "willy-shop": willy,
  "krobus-shop": krobus,
  "oasis-shop": oasis,
  "desert-trader-shop": desertTrader,
  "wizard-shop": wizard,
  "guild-shop": guild,
  "dwarf-shop": dwarfShop,
  "volcano-shop": volcanoShop,
  "casino-shop": casino,
  "island-trader-shop": islandTrader,
  hats: hats,
  "joja-shop": joja,
  "medical-supplies-shop": medicalSupplies,
  "bookseller-shop": booksellerShop,
  "qi-shop": qiStock,
};

const cache = new Map<string, ShopItem[]>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizePrice(item: any): string {
  if (item.tradeItemName && item.tradeAmount) {
    return `${item.tradeAmount}x ${item.tradeItemName}`;
  }
  if (typeof item.cost === "number" && item.currency === "qi-gem") {
    return `${item.cost} Qi Gems`;
  }
  if (typeof item.price === "number") return `${item.price.toLocaleString()}g`;
  if (typeof item.priceYear1 === "number")
    return `${item.priceYear1.toLocaleString()}g`;
  if (typeof item.buildCost === "number")
    return `${item.buildCost.toLocaleString()}g`;
  if (typeof item.cost === "number") return `${item.cost.toLocaleString()}g`;
  return "—";
}

export function getShopItems(shopId: string): ShopItem[] {
  const cached = cache.get(shopId);
  if (cached) return cached;

  const fn = SHOP_MAP[shopId];
  if (!fn) return [];

  const raw = fn().get();
  const items: ShopItem[] = raw.map((item) => ({
    name: String(item.name ?? ""),
    price: normalizePrice(item),
    image: typeof item.image === "string" ? item.image : null,
  }));

  cache.set(shopId, items);
  return items;
}

let fieldOfficeCache: FieldOfficeCollectionData[] | null = null;

export function getFieldOfficeCollections(): FieldOfficeCollectionData[] {
  if (fieldOfficeCache) return fieldOfficeCache;
  fieldOfficeCache = fieldOffice().get();
  return fieldOfficeCache;
}

export function isFieldOffice(shopId: string): boolean {
  return shopId === "field-office";
}

export function hasBuildings(shopId: string): boolean {
  return shopId === "carpenter-shop" || shopId === "wizard-shop";
}

const allBuildingsList = buildingsFn().get();

export function getBuildingsForShop(shopId: string): Building[] {
  if (shopId === "carpenter-shop") {
    return allBuildingsList.filter((b) => !b.magical && b.builder === "Robin");
  }
  if (shopId === "wizard-shop") {
    return allBuildingsList.filter((b) => b.magical);
  }
  return [];
}

const allHouseUpgrades = houseUpgradesFn().get();
const allHouseRenovations = houseRenovationsFn().get();

export function getHouseUpgrades(): HouseUpgrade[] {
  return allHouseUpgrades;
}

export function getHouseRenovations(): HouseRenovation[] {
  return allHouseRenovations;
}

export function hasFarmhouseTab(shopId: string): boolean {
  return shopId === "carpenter-shop";
}

const purchasableAnimals = (
  animalsFn().farmAnimals().get().filter(isFarmAnimal) as FarmAnimal[]
).filter((a) => a.purchasePrice !== null);

export function hasAnimalsTab(shopId: string): boolean {
  return shopId === "marnie-shop";
}

export function getPurchasableAnimals(): FarmAnimal[] {
  return purchasableAnimals;
}

const purchasablePets = (
  animalsFn().pets().get().filter(isPet) as Pet[]
).filter((p) => p.purchasePrice !== null && p.purchasePrice !== undefined);

export function getPurchasablePets(): Pet[] {
  return purchasablePets;
}
