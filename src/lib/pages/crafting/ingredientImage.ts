import { crafting, search } from "stardew-valley-data";
import { assetPath } from "@/lib/utils/assetPath";

export function resolveIngredientImage(id: string, name: string): string | null {
	const results = search(id);
	const match = results.find((r) => r.name.toLowerCase() === name.toLowerCase());
	if (match?.image) return assetPath(match.image);

	const cleanId = id.replace(/^\(BC\)/, "");
	const craftMatch = crafting().findByOutputId(cleanId);
	if (craftMatch?.image) return assetPath(craftMatch.image);

	return null;
}
