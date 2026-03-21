import { crafting } from "stardew-valley-data";

const allRecipes = crafting().get();

export const CRAFTING_CATEGORIES: string[] = [
	...new Set(allRecipes.map((r) => r.category)),
].sort();
