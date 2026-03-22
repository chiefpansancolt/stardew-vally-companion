import { artifacts, collections, fish, minerals } from "stardew-valley-data";
import type { GameData } from "@/types";

export interface AchievementProgress {
  current: number;
  total: number;
}

const shippableIds = collections()
  .itemsShipped()
  .get()
  .map((x) => x.id);

const allFish = fish().get();

const allMineralItems = minerals().mineralItems().get();
const allArtifacts = artifacts().get();

export function getShipmentProgress(gameData: GameData): AchievementProgress {
  const current = shippableIds.filter(
    (id) => gameData.shipped[id]?.shipped === true,
  ).length;
  return { current, total: shippableIds.length };
}

export function getAnglerProgress(gameData: GameData): AchievementProgress {
  const current = allFish.filter((f) =>
    gameData.fishCaught.some((c) => c.id === f.id),
  ).length;
  return { current, total: allFish.length };
}

export function getVillagersAt8Hearts(gameData: GameData): AchievementProgress {
  const current = Object.entries(gameData.villagers).filter(
    ([name, v]) => name !== gameData.character.spouse && v.hearts >= 8,
  ).length;
  return { current, total: current };
}

export function getTotalSkillLevels(gameData: GameData): AchievementProgress {
  const current = Object.values(gameData.skills).reduce(
    (sum, s) => sum + s.level,
    0,
  );
  return { current, total: current };
}

export function getPetFriendship(gameData: GameData): AchievementProgress {
  const current = gameData.pets[0]?.friendship ?? 0;
  return { current, total: 1000 };
}

export function getCCRoomProgress(gameData: GameData): AchievementProgress {
  const rooms = gameData.communityCenter.rooms;
  const current = Object.values(rooms).filter(Boolean).length;
  return { current, total: 6 };
}

export function getMuseumProgress(gameData: GameData): AchievementProgress {
  const mineralsDonated = allMineralItems.filter(
    (m) => gameData.minerals[m.id]?.donated === true,
  ).length;
  const artifactsDonated = allArtifacts.filter(
    (a) => gameData.artifacts[a.id]?.donated === true,
  ).length;
  return {
    current: mineralsDonated + artifactsDonated,
    total: allMineralItems.length + allArtifacts.length,
  };
}
