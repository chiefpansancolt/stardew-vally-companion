import type { SaveData } from "stardew-valley-data";
import { villagers as villagersQuery } from "stardew-valley-data";
import type { GameData } from "@/types";
import { DEFAULT_GAME_DATA } from "@/data/constants";

const villagerEventMap = new Map<string, Set<string>>();
for (const v of villagersQuery().get()) {
  villagerEventMap.set(v.name, new Set(v.events.map((e) => String(e.id))));
}

/**
 * Maps parsed SaveData from stardew-valley-data's parseSaveFile() into our GameData structure.
 */
export function mapSaveDataToGameData(save: SaveData): GameData {
  return {
    character: {
      name: save.player.name,
      farmName: save.player.farmName,
      favoriteThing: save.player.favoriteThing,
      gender: save.player.gender,
      money: save.player.money,
      totalMoneyEarned: save.player.totalMoneyEarned,
      spouse: save.player.spouse ?? "",
      houseUpgradeLevel: save.player.houseUpgradeLevel,
      maxHealth: save.player.maxHealth,
      maxEnergy: save.player.maxStamina,
      luckLevel: save.player.luckLevel,
      maxItems: save.player.maxItems,
      gameVersion: save.player.gameVersion,
      totalDaysPlayed: save.date.totalDaysPlayed,
      millisecondsPlayed: save.player.millisecondsPlayed,
      farmType: save.farm.type,
      willyBackRoomInvitation: save.player.willyBackRoomInvitation,
      currentDate: {
        season: save.date.season as "spring" | "summer" | "fall" | "winter",
        day: save.date.day,
        year: save.date.year,
      },
    },

    toolLevels: {
      wateringCan: save.player.toolLevels.wateringCan.level,
      pan: save.player.toolLevels.pan.level,
      pickaxe: save.player.toolLevels.pickaxe.level,
      axe: save.player.toolLevels.axe.level,
      hoe: save.player.toolLevels.hoe.level,
      trashCan: save.player.toolLevels.trashCan.level,
      fishingRod: save.player.toolLevels.fishingRod.level,
      currentlyUpgrading:
        save.player.toolLevels.currentlyUpgrading?.tool ?? null,
    },

    shipped: Object.fromEntries(
      save.itemsShipped.map((item) => [
        item.id,
        { shipped: true, count: item.count },
      ]),
    ),

    fishCaught: save.fishCaught.map((fish) => ({
      id: fish.id,
      timesCaught: fish.timesCaught,
      largestSize: fish.largestSize,
    })),

    cookingRecipes: Object.fromEntries(
      save.cookingRecipes.map((recipe) => [
        recipe.name,
        { learned: true, cooked: recipe.timesMade > 0 },
      ]),
    ),

    craftingRecipes: Object.fromEntries(
      save.craftingRecipes.map((recipe) => [
        recipe.name,
        { learned: true, crafted: recipe.timesMade > 0 },
      ]),
    ),

    minerals: Object.fromEntries(
      save.museum.mineralsFound.map((mineral) => [
        mineral.id,
        {
          found: true,
          donated: save.museum.donations.includes(mineral.id),
        },
      ]),
    ),

    artifacts: Object.fromEntries(
      save.museum.artifactsFound.map((artifact) => [
        artifact.id,
        {
          found: true,
          donated: save.museum.donations.includes(artifact.id),
        },
      ]),
    ),

    villagers: Object.fromEntries(
      save.friendships.map((f) => {
        const villagerEvents = villagerEventMap.get(f.name);
        return [
          f.name,
          {
            hearts: f.hearts,
            heartPoints: f.points,
            eventsSeen: villagerEvents
              ? save.eventsSeen.filter((id) => villagerEvents.has(id))
              : [],
            status: f.status,
          },
        ];
      }),
    ),

    bundles: Object.fromEntries(
      save.bundles.rooms.flatMap((room) =>
        room.bundles.map((bundle) => [
          bundle.id,
          Object.fromEntries(
            bundle.items.map((item, index) => [String(index), item.completed]),
          ),
        ]),
      ),
    ),

    achievements: save.achievements.map(String),

    stardrops: Object.fromEntries(
      save.stardrops.map((s) => [s.id, s.collected]),
    ),

    goldenWalnuts: Object.fromEntries(
      save.walnuts.collected.map((id) => [id, 1]),
    ),
    goldenWalnutsFound: save.walnuts.found,

    secretNotes: Object.fromEntries(
      save.secretNotes.notesFound.map((id) => [String(id), true]),
    ),
    journalScraps: Object.fromEntries(
      save.secretNotes.journalScrapsFound.map((id) => [
        String(id + 1000),
        true,
      ]),
    ),

    lostBooks: DEFAULT_GAME_DATA.lostBooks,

    monsters: Object.fromEntries(
      save.monstersKilled.map((m) => [m.name, m.count]),
    ),

    skills: {
      farming: {
        level: save.player.skills.farming.level,
        xp: save.player.skills.farming.xp,
      },
      fishing: {
        level: save.player.skills.fishing.level,
        xp: save.player.skills.fishing.xp,
      },
      foraging: {
        level: save.player.skills.foraging.level,
        xp: save.player.skills.foraging.xp,
      },
      mining: {
        level: save.player.skills.mining.level,
        xp: save.player.skills.mining.xp,
      },
      combat: {
        level: save.player.skills.combat.level,
        xp: save.player.skills.combat.xp,
      },
    },

    professions: save.professions.map((p) => String(p.id)),

    mastery: {
      masteryXp: save.player.mastery.xp,
      unlocked: save.player.mastery.perks
        .filter((p) => p.unlocked)
        .map((p) => p.id),
    },

    books: save.booksRead,

    specialItems: save.powers.specialItems
      .filter((p) => p.acquired)
      .map((p) => p.id),

    rarecrows: save.rarecrows.placed,

    questsCompleted: Object.fromEntries(
      save.activeQuests.filter((q) => q.completed).map((q) => [q.id, true]),
    ),

    specialOrdersCompleted: Object.fromEntries([
      ...save.specialOrders.completed.map((id) => [id, true] as const),
      ...save.specialOrders.qiCompleted.map((id) => [id, true] as const),
    ]),

    animals: save.animals.map((a) => ({
      name: a.name,
      id: a.id,
      type: a.type,
      buildingType: a.buildingType,
      buildingId: a.buildingId,
      friendship: a.friendship,
      happiness: a.happiness,
      age: a.age,
      hasAnimalCracker: a.hasAnimalCracker,
    })),

    pets: [
      ...save.pets.map((p) => ({
        name: p.name,
        type: p.type,
        breed: String(p.breed),
        friendship: p.friendship,
        starter: p.starter,
      })),
      ...(save.horse
        ? [
            {
              name: save.horse.name,
              type: "Horse",
              breed: "",
              friendship: null,
              starter: false,
            },
          ]
        : []),
    ],

    buildings: save.buildings.map((b) => ({
      id: b.id,
      type: b.type,
      animalCount: b.animalCount,
    })),

    fishPonds: save.fishPonds.map((fp) => ({
      buildingId: fp.buildingId,
      fishType: fp.fishType,
      currentOccupants: fp.currentOccupants,
      maxOccupants: fp.maxOccupants,
    })),

    mineProgress: {
      deepestMineLevel: save.mineProgress.deepestMineLevel,
      deepestSkullCavernLevel: save.mineProgress.deepestSkullCavernLevel,
      hasRustyKey: save.mineProgress.hasRustyKey,
      hasSkullKey: save.mineProgress.hasSkullKey,
    },

    islandUpgrades: Object.fromEntries(
      save.islandUpgrades.map((u) => [u.id, u.unlocked]),
    ),
    perfectionWaiverCount: save.perfection.waivers,
    helpWantedCompleted: save.player.helpWantedQuests,
    lostBooksFound: save.player.lostBooksFound,
    communityCenter: save.communityCenter,
    joja: {
      isMember: save.joja.isMember,
      completed: save.joja.completed,
      developments: Object.fromEntries(
        save.joja.developments.map((d) => [d.id, d.purchased]),
      ),
    },
    trackedGifts: [],
  };
}
