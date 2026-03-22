import type { FarmAnimal } from "stardew-valley-data";
import type { FarmAnimalProgress, PetProgress } from "../app/game";

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
