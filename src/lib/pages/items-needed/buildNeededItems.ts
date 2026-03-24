import type { GameData, NeededItem, NeededItemUsage } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import {
  ITEM_IMAGE_MAP,
  ITEMS_NEEDED_DATA,
} from "@/data/constants/itemsNeeded";

function resolveImage(name: string): string | null {
  const raw = ITEM_IMAGE_MAP.get(name);
  return raw ? assetPath(raw) : null;
}

export function buildNeededItems(gameData: GameData | null): NeededItem[] {
  const itemMap = new Map<string, NeededItem>();

  function upsert(
    key: string,
    name: string,
    image: string | null,
    usage: NeededItemUsage,
  ) {
    const existing = itemMap.get(key);
    if (existing) {
      existing.usages.push(usage);
    } else {
      itemMap.set(key, { id: key, name, image, usages: [usage] });
    }
  }

  for (const mineral of ITEMS_NEEDED_DATA.mineralItems) {
    if (gameData?.minerals[mineral.id]?.donated) continue;
    upsert(`mineral-${mineral.id}`, mineral.name, assetPath(mineral.image), {
      goalName: "Museum Donation",
      tag: "Donate",
    });
  }

  for (const artifact of ITEMS_NEEDED_DATA.artifacts) {
    if (gameData?.artifacts[artifact.id]?.donated) continue;
    upsert(
      `artifact-${artifact.id}`,
      artifact.name,
      assetPath(artifact.image),
      {
        goalName: "Museum Donation",
        tag: "Donate",
      },
    );
  }

  for (const item of ITEMS_NEEDED_DATA.shippableItems) {
    if (gameData?.shipped[item.id]?.shipped) continue;
    upsert(`ship-${item.id}`, item.name, assetPath(item.image), {
      goalName: "Shipping Collection",
      tag: "Ship",
    });
  }

  for (const dish of ITEMS_NEEDED_DATA.cookingDishes) {
    if (gameData?.cookingRecipes[dish.name]?.cooked) continue;
    for (const ingredient of dish.ingredients) {
      upsert(
        `ing-${ingredient.name}`,
        ingredient.name,
        resolveImage(ingredient.name),
        {
          goalName: dish.name,
          tag: "Cook",
          quantity: ingredient.quantity,
        },
      );
    }
  }

  for (const recipe of ITEMS_NEEDED_DATA.craftingRecipes) {
    if (gameData?.craftingRecipes[recipe.name]?.crafted) continue;
    for (const ingredient of recipe.ingredients) {
      upsert(
        `ing-${ingredient.name}`,
        ingredient.name,
        resolveImage(ingredient.name),
        {
          goalName: recipe.name,
          tag: "Craft",
          quantity: ingredient.quantity,
        },
      );
    }
  }

  for (const building of ITEMS_NEEDED_DATA.obelisks) {
    if (gameData?.buildings.some((b) => b.type === building.name)) continue;
    if (building.materials.length === 0) continue;
    for (const material of building.materials) {
      upsert(
        `ing-${material.item}`,
        material.item,
        resolveImage(material.item),
        { goalName: building.name, tag: "Build", quantity: material.quantity },
      );
    }
  }

  return Array.from(itemMap.values());
}
