import { animals, isPet, type Pet } from "stardew-valley-data";
import { assetPath } from "@/lib/utils/assetPath";

const allPets = animals().pets().get().filter(isPet) as Pet[];
const petMap = new Map(allPets.map((p) => [p.id, p]));

export function findPetImage(type: string, breed: string): string | null {
  const key = `${type.toLowerCase()}-${breed}`;
  const pet = petMap.get(key);
  if (pet) return assetPath(pet.image);
  const fallback = allPets.find(
    (p) => p.name.toLowerCase() === type.toLowerCase(),
  );
  return fallback ? assetPath(fallback.image) : null;
}
