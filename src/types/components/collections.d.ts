import type {
  AnimalProduce,
  Artifact,
  ArtisanGood,
  BarItem,
  CollectionItem,
  CookedDish,
  CraftingRecipe,
  Crop,
  Fish,
  Forageable,
  FruitTree,
  GeodeContainer,
  MineralItem,
  MonsterLoot,
  NodeItem,
  OreItem,
  ProfessionBonus,
  ResourceItem,
  Tree,
  WildTree,
} from "stardew-valley-data";
import type { GameData } from "@/types/app/game";
import type { BonusResult } from "@/lib/utils/professionPrices";
import type { applyBestProfessionBonus } from "@/lib/utils/professionPrices";

export interface CollectionProps {
  gameData: GameData;
}

export interface IngredientOption {
  name: string;
  basePrice: number;
  image: string;
  energy?: number;
  health?: number;
  sublabel?: string;
}

export interface ArtisanResult {
  sellPrice: number;
  energy?: number;
  health?: number;
}

export interface ProduceEntry {
  produce: AnimalProduce;
  animalName: string;
  building: string;
  isDeluxe: boolean;
}

export interface ProduceCardProps {
  entry: ProduceEntry;
  shipped: boolean;
  professionBonus?: BonusResult | null;
}

export interface ArtisanGoodCardProps {
  good: ArtisanGood;
  shipped: boolean;
  shippable: boolean;
  professionBonus?: BonusResult | null;
  onCalculate: () => void;
  ingredientImageMap: Record<string, string>;
}

export interface DifficultyBarProps {
  difficulty: string;
  behavior: string;
}

export interface ArtisanUsesRowProps {
  artisanUses: Record<string, boolean>;
}

export interface ForageableCardProps {
  item: Forageable;
  shippable: boolean;
  shipped: boolean;
  shippedCount: number;
  professionBonus?: BonusResult | null;
}

export interface FruitTreeProduceCardProps {
  tree: FruitTree;
  shipped: boolean;
  shippedCount: number;
  professionBonus?: BonusResult | null;
}

export interface WildTreeTapperCardProps {
  tree: WildTree;
  shipped: boolean;
  shippedCount: number;
  professionBonus?: BonusResult | null;
}

export interface FruitTreeCardProps {
  tree: FruitTree;
  onClick: () => void;
}

export interface WildTreeCardProps {
  tree: WildTree;
  onClick: () => void;
}

export interface ItemTileProps {
  item: CollectionItem;
  complete: boolean;
}

export interface FishCardProps {
  fish: Fish;
  caught: boolean;
  professionBonus?: ReturnType<typeof applyBestProfessionBonus>;
  onClick: () => void;
}

export interface CropCardProps {
  crop: Crop;
  shipped: boolean;
  shippedCount: number;
  professionBonus?: BonusResult | null;
  onClick: () => void;
}

export interface ArtifactCardProps {
  artifact: Artifact;
  donated: boolean;
  found: boolean;
  onClick: () => void;
}

export interface MineralCardProps {
  mineral: MineralItem;
  donated: boolean;
  found: boolean;
  geodeNames: string[];
  professionBonus: BonusResult | null;
  onClick: () => void;
}

export interface OreCardProps {
  ore: OreItem;
  shipped: boolean;
  professionBonus: BonusResult | null;
  onClick: () => void;
}

export interface BarCardProps {
  bar: BarItem;
  shipped: boolean;
  professionBonus: BonusResult | null;
  oreNameById: Record<string, string>;
  onClick: () => void;
}

export interface GeodeCardProps {
  geode: GeodeContainer;
  contents: MineralItem[];
  onClick: () => void;
}

export interface NodeCardProps {
  node: NodeItem;
  itemNameById: Record<string, string>;
  onClick: () => void;
}

export interface CategorySectionProps {
  title: string;
  items: CollectionItem[];
  isComplete: (item: CollectionItem) => boolean;
}

export interface FishDetailModalProps {
  fish: Fish | null;
  caught: boolean;
  onClose: () => void;
  activeProfessionBonuses?: Set<ProfessionBonus> | null;
}

export interface CropDetailModalProps extends CollectionProps {
  crop: Crop | null;
  onClose: () => void;
}

export interface ArtifactDetailModalProps {
  artifact: Artifact | null;
  donated: boolean;
  found: boolean;
  onClose: () => void;
}

export interface TreeDetailModalProps extends CollectionProps {
  tree: Tree | null;
  shippableIds: Set<string>;
  onClose: () => void;
}

export interface MineralDetailModalProps {
  mineral: MineralItem | null;
  donated: boolean;
  found: boolean;
  geodeNames: string[];
  professionBonus: BonusResult | null;
  onClose: () => void;
}

export interface OreDetailModalProps {
  ore: OreItem | null;
  shipped: boolean;
  professionBonus: BonusResult | null;
  onClose: () => void;
}

export interface BarDetailModalProps {
  bar: BarItem | null;
  shipped: boolean;
  professionBonus: BonusResult | null;
  oreNameById: Record<string, string>;
  onClose: () => void;
}

export interface NodeDetailModalProps {
  node: NodeItem | null;
  itemNameById: Record<string, string>;
  onClose: () => void;
}

export interface GeodeDetailModalProps {
  geode: GeodeContainer | null;
  fallbackContents: MineralItem[] | null;
  onClose: () => void;
}

export interface PriceFormulaModalProps {
  good: ArtisanGood | null;
  onClose: () => void;
  activeProfessionBonuses?: Set<ProfessionBonus> | null;
}

export interface CraftingCardProps {
  recipe: CraftingRecipe;
  learned: boolean;
  crafted: boolean;
  onClick: () => void;
}

export interface CraftingDetailModalProps {
  recipe: CraftingRecipe | null;
  learned: boolean;
  crafted: boolean;
  onClose: () => void;
}

export interface CraftingBadgeProps {
  learned: boolean;
  crafted: boolean;
}

export interface ResourceCardProps {
  resource: ResourceItem;
  shipped: boolean;
  professionBonus: BonusResult | null;
  onClick: () => void;
}

export interface ResourceDetailModalProps {
  resource: ResourceItem | null;
  shipped: boolean;
  professionBonus: BonusResult | null;
  onClose: () => void;
}

export interface CookingCardProps {
  dish: CookedDish;
  learned: boolean;
  cooked: boolean;
  onClick: () => void;
}

export interface CookingDetailModalProps {
  dish: CookedDish | null;
  learned: boolean;
  cooked: boolean;
  onClose: () => void;
}

export interface CookingBadgeProps {
  learned: boolean;
  cooked: boolean;
}

export interface MonsterLootCardProps {
  loot: MonsterLoot;
  shipped: boolean;
  shippable: boolean;
  onClick: () => void;
}

export interface MonsterLootDetailModalProps {
  loot: MonsterLoot | null;
  shipped: boolean;
  shippable: boolean;
  onClose: () => void;
}
