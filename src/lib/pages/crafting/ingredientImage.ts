import { crafting, search } from "stardew-valley-data";
import { assetPath } from "@/lib/utils/assetPath";

const INGREDIENT_IMAGE_FALLBACK: Record<string, string> = {
  "-5": "images/animals/produce/Egg.png",
  "-4": "images/fish/Anchovy.png",
  "-6": "images/animals/produce/Milk.png",
  "423": "images/shop/Rice.png",
  "245": "images/shop/Sugar.png",
  "246": "images/shop/Wheat Flour.png",
};

export function resolveIngredientImage(
  id: string,
  name: string,
): string | null {
  const fallback = INGREDIENT_IMAGE_FALLBACK[id];
  if (fallback) return assetPath(fallback);

  const results = search(id);
  const match = results.find(
    (r) => r.name.toLowerCase() === name.toLowerCase(),
  );
  if (match?.image) return assetPath(match.image);

  const cleanId = id.replace(/^\(BC\)/, "");
  const craftMatch = crafting().findByOutputId(cleanId);
  if (craftMatch?.image) return assetPath(craftMatch.image);

  return null;
}
