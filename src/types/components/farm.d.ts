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

export interface AnimalsEditDraft {
  animals: FarmAnimalProgress[];
  pets: PetProgress[];
  buildings: BuildingProgress[];
}

export interface AnimalsEditStepProps {
  animals: FarmAnimalProgress[];
  buildings: BuildingProgress[];
  onChange: (animals: FarmAnimalProgress[]) => void;
}

export interface PetsEditStepProps {
  pets: PetProgress[];
  onChange: (pets: PetProgress[]) => void;
}

export interface BuildingsEditDraft {
  buildings: BuildingProgress[];
}

export interface BuildingsEditStepProps {
  buildings: BuildingProgress[];
  onChange: (buildings: BuildingProgress[]) => void;
}
