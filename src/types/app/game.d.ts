export interface CharacterInfo {
  name: string;
  farmName: string;
  favoriteThing: string;
  gender: string;
  money: number;
  totalMoneyEarned: number;
  spouse: string;
  houseUpgradeLevel: number;
  maxHealth: number;
  maxEnergy: number;
  luckLevel: number;
  maxItems: number;
  gameVersion: string;
  totalDaysPlayed: number;
  millisecondsPlayed: number;
  farmType: number;
  currentDate: {
    season: "spring" | "summer" | "fall" | "winter";
    day: number;
    year: number;
  };
  willyBackRoomInvitation: boolean;
}

export interface ToolLevels {
  wateringCan: number;
  pan: number;
  pickaxe: number;
  axe: number;
  hoe: number;
  trashCan: number;
  fishingRod: number;
}

export interface ShippedItem {
  shipped: boolean;
  count: number;
}

export interface CookingRecipe {
  learned: boolean;
  cooked: boolean;
}

export interface CraftingRecipe {
  learned: boolean;
  crafted: boolean;
}

export interface MuseumItem {
  found: boolean;
  donated: boolean;
}

export interface VillagerProgress {
  hearts: number;
  heartPoints: number;
  eventsSeen: string[];
  status: string;
}

export interface FarmAnimalProgress {
  name: string;
  id: string;
  type: string;
  buildingType: string;
  buildingId: string;
  friendship: number;
  happiness: number;
  age: number;
  hasAnimalCracker: boolean;
}

export interface FishCaughtProgress {
  id: string;
  timesCaught: number;
  largestSize: number;
}

export interface PetProgress {
  name: string;
  type: string;
  breed: string;
  friendship: number | null;
}

export interface BuildingProgress {
  id: string;
  type: string;
  animalCount: number;
}

export interface FishPondProgress {
  buildingId: string;
  fishType: number;
  currentOccupants: number;
  maxOccupants: number;
}

export interface SkillProgress {
  level: number;
  xp: number;
}

export interface MineProgress {
  deepestMineLevel: number;
  deepestSkullCavernLevel: number;
  hasRustyKey: boolean;
  hasSkullKey: boolean;
}

export interface MasteryProgress {
  masteryXp: number;
  unlocked: string[];
}

export interface GameData {
  character: CharacterInfo;
  toolLevels: ToolLevels;
  shipped: Record<string, ShippedItem>;
  fishCaught: FishCaughtProgress[];
  cookingRecipes: Record<string, CookingRecipe>;
  craftingRecipes: Record<string, CraftingRecipe>;
  minerals: Record<string, MuseumItem>;
  artifacts: Record<string, MuseumItem>;
  villagers: Record<string, VillagerProgress>;
  bundles: Record<string, Record<string, boolean>>;
  achievements: string[];
  stardrops: Record<string, boolean>;
  goldenWalnuts: Record<string, number>;
  secretNotes: Record<string, boolean>;
  lostBooks: Record<string, boolean>;
  monsters: Record<string, number>;
  skills: Record<string, SkillProgress>;
  professions: string[];
  mastery: MasteryProgress;
  books: string[];
  specialItems: string[];
  questsCompleted: Record<string, boolean>;
  specialOrdersCompleted: Record<string, boolean>;
  animals: FarmAnimalProgress[];
  pets: PetProgress[];
  buildings: BuildingProgress[];
  fishPonds: FishPondProgress[];
  mineProgress: MineProgress;
  islandUpgrades: Record<string, boolean>;
  perfectionWaiverCount: number;
  communityCenter: CommunityCenterProgress;
}

export interface CommunityCenterProgress {
  unlocked: boolean;
  bundlesActive: boolean;
  completed: boolean;
  ceremonyAttended: boolean;
  jojaAbandoned: boolean;
  rooms: CommunityCenterRooms;
}

export interface CommunityCenterRooms {
  boilerRoom: boolean;
  craftsRoom: boolean;
  pantry: boolean;
  fishTank: boolean;
  vault: boolean;
  bulletin: boolean;
}
