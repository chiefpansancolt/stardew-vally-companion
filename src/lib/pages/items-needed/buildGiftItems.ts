import type { NeededItem, TrackedGift } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { ALL_VILLAGERS, ITEM_IMAGE_MAP } from "@/data/constants/itemsNeeded";

function getPreference(
  villagerName: string,
  itemName: string,
  stored?: "loves" | "likes" | "neutral",
): "loves" | "likes" | "neutral" {
  if (stored) return stored;
  const villager = ALL_VILLAGERS.find((v) => v.name === villagerName);
  if (!villager) return "likes";
  if (villager.loves.includes(itemName)) return "loves";
  if (villager.likes.includes(itemName)) return "likes";
  return "likes";
}

export function buildGiftItems(trackedGifts: TrackedGift[]): NeededItem[] {
  return trackedGifts
    .filter((g) => !g.given)
    .map((g) => {
      const rawImage = ITEM_IMAGE_MAP.get(g.itemName);
      const preference = getPreference(
        g.villagerName,
        g.itemName,
        g.preference,
      );
      return {
        id: `gift-${g.villagerName}-${g.itemName}`,
        name: g.itemName,
        image: rawImage ? assetPath(rawImage) : null,
        usages: [
          {
            goalName: g.villagerName,
            tag: "Gift" as const,
            preference,
          },
        ],
      };
    });
}
