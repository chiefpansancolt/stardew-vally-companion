import type {
  Building,
  FarmAnimal,
  FieldOfficeCollectionData,
  GameLocation,
  HouseRenovation,
  HouseUpgrade,
  Pet,
} from "stardew-valley-data";
import type { ShopItem } from "@/lib/pages/town/shopResolver";

export interface LocationCardProps {
  location: GameLocation;
  hasShop: boolean;
  onClick?: () => void;
}

export interface LocationDetailModalProps {
  location: GameLocation | null;
  onClose: () => void;
}

export interface InventoryTabProps {
  items: ShopItem[];
}

export interface BuildingsTabProps {
  buildings: Building[];
}

export interface FarmhouseTabProps {
  upgrades: HouseUpgrade[];
  renovations: HouseRenovation[];
}

export interface AnimalsTabProps {
  animals: FarmAnimal[];
}

export interface PetsTabProps {
  pets: Pet[];
}

export interface FossilCollectionsTabProps {
  collections: FieldOfficeCollectionData[];
}
