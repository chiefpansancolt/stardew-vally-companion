import type { Building, FarmAnimal } from "stardew-valley-data";
import type {
  BuildingProgress,
  FarmAnimalProgress,
  PetProgress,
} from "../app/game";

export interface AnimalCardProps {
  animal: FarmAnimalProgress;
  species: FarmAnimal | undefined;
  onClick: () => void;
}

export interface AnimalDetailModalProps {
  animal: FarmAnimalProgress | null;
  species: FarmAnimal | undefined;
  onClose: () => void;
}

export interface PetCardProps {
  pet: PetProgress;
}

export interface FishPondInfo {
  name: string;
  image: string | null;
  currentOccupants: number;
  maxOccupants: number;
}

export interface BuildingCardProps {
  building: BuildingProgress;
  buildingData: Building | undefined;
  animals: FarmAnimalProgress[];
  fishPond?: FishPondInfo;
  onClick: () => void;
}

export interface BuildingDetailModalProps {
  building: BuildingProgress | null;
  buildingData: Building | undefined;
  animals: FarmAnimalProgress[];
  fishPond?: FishPondInfo;
  onClose: () => void;
}
