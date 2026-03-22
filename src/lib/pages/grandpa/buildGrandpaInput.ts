import type { GrandpaInput } from "stardew-valley-data";
import type { GameData } from "@/types";

export function buildGrandpaInput(gameData: GameData): GrandpaInput {
  const totalSkillLevels = Object.values(gameData.skills).reduce(
    (sum, s) => sum + s.level,
    0,
  );

  const villagersAt8Hearts = Object.entries(gameData.villagers).filter(
    ([name, v]) => name !== gameData.character.spouse && v.hearts >= 8,
  ).length;

  return {
    totalEarnings: gameData.character.totalMoneyEarned,
    totalSkillLevels,
    museumCompleted: gameData.achievements.includes("5"),
    masterAngler: gameData.achievements.includes("26"),
    fullShipment: gameData.achievements.includes("34"),
    married:
      gameData.character.spouse !== "" &&
      gameData.character.houseUpgradeLevel >= 2,
    villagersAt8Hearts,
    petFriendship: (gameData.pets[0]?.friendship ?? 0) >= 1000,
    communityCenterCompleted: gameData.communityCenter.completed,
    communityCenterCeremonyAttended: gameData.communityCenter.ceremonyAttended,
    skullKeyObtained: gameData.mineProgress.hasSkullKey,
    rustyKeyObtained: gameData.mineProgress.hasRustyKey,
  };
}
