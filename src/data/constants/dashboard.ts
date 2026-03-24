import {
  achievements,
  artifacts,
  collections,
  cooking,
  crafting,
  fish,
  lostBooks,
  minerals,
  monsterSlayerGoals,
  quests,
  secretNotes,
  specialItems,
  specialOrders,
  starDrops,
  villagers,
} from "stardew-valley-data";

const EXCLUDED_FISH = new Set([
  "Son of Crimsonfish",
  "Ms. Angler",
  "Legend II",
  "Radioactive Carp",
  "Glacierfish Jr.",
]);

const allSpecialOrders = specialOrders().get();
const allNotes = secretNotes().get();
const allSpecialItems = specialItems().get();

export const DASHBOARD_DATA = {
  shippableItems: collections().itemsShipped().get(),
  allFish: fish()
    .get()
    .filter((f) => !EXCLUDED_FISH.has(f.name)),
  allCooking: cooking().get(),
  allCrafting: crafting().get(),
  allMineralItems: minerals().mineralItems().get(),
  allArtifacts: artifacts().get(),
  allVillagers: villagers().get(),
  allGoals: monsterSlayerGoals().get(),
  allStardrops: starDrops().get(),
  secretNotes: allNotes.filter((n) => n.type === "secret-note"),
  journalScraps: allNotes.filter((n) => n.type === "journal-scrap"),
  allLostBooks: lostBooks().get(),
  allQuests: quests().get(),
  townOrders: allSpecialOrders.filter((o) => o.type === "town"),
  qiOrders: allSpecialOrders.filter((o) => o.type === "qi"),
  totalAchievements: achievements().get().length,
  totalBooks: allSpecialItems.filter((i) => i.type === "book").length,
  totalSpecialItems: allSpecialItems.filter((i) => i.type === "special-item")
    .length,
};
