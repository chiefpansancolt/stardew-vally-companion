import type { SpecialItem } from "stardew-valley-data";
import type { GameData } from "@/types";

export function isSpecialItemAcquired(
  item: SpecialItem,
  gameData: GameData,
): boolean | null {
  switch (item.type) {
    case "special-item":
      return gameData.specialItems.includes(item.id);
    case "book":
      return gameData.books.includes(item.id);
    case "mastery": {
      const skill = item.id.replace(/^Mastery_/, "").toLowerCase();
      return gameData.mastery.unlocked.includes(skill);
    }
    case "skill-book":
      return null;
  }
}
