import {
  type KnowledgeBonus,
  knowledgeCalculator,
  type ProfessionBonus,
  professionCalculator,
  professions,
} from "stardew-valley-data";
import type { GameData } from "@/types";

const VALID_BONUSES = new Set<string>([
  "artisan",
  "rancher",
  "tiller",
  "blacksmith",
  "gemologist",
  "tapper",
  "fisher",
  "angler",
]);

const PROFESSION_LABELS: Record<string, string> = {
  artisan: "Artisan",
  rancher: "Rancher",
  tiller: "Tiller",
  blacksmith: "Blacksmith",
  gemologist: "Gemologist",
  tapper: "Tapper",
  fisher: "Fisher",
  angler: "Angler",
};

const KNOWLEDGE_LABELS: Record<string, string> = {
  "bears-knowledge": "Bear's Knowledge",
  "spring-onion-mastery": "Spring Onion Mastery",
};

export interface BonusResult {
  price: number;
  label: string;
}

/** Resolves numeric profession IDs in GameData to a Set of active ProfessionBonus names. */
export function getActiveProfessionBonuses(
  gameData: GameData,
): Set<ProfessionBonus> {
  const playerIds = new Set(gameData.professions);
  const bonuses = new Set<ProfessionBonus>();
  for (const prof of professions().get()) {
    if (playerIds.has(prof.id)) {
      const key = prof.name.toLowerCase();
      if (VALID_BONUSES.has(key)) bonuses.add(key as ProfessionBonus);
    }
  }
  return bonuses;
}

/**
 * Returns the best profession-adjusted price and label for an item, or null if no
 * applicable profession is active. Fisher is skipped when angler is also applicable
 * and active (they are mutually exclusive in-game and angler gives a higher bonus).
 */
export function applyBestProfessionBonus(
  price: number,
  itemProfessions: ProfessionBonus[],
  activeBonuses: Set<ProfessionBonus>,
): BonusResult | null {
  const calc = professionCalculator();
  let best: BonusResult | null = null;
  for (const bonus of itemProfessions) {
    if (!activeBonuses.has(bonus)) continue;
    if (
      bonus === "fisher" &&
      itemProfessions.includes("angler") &&
      activeBonuses.has("angler")
    )
      continue;
    const adjusted = (calc[bonus] as (p: number) => number)(price);
    if (best === null || adjusted > best.price) {
      best = { price: adjusted, label: PROFESSION_LABELS[bonus] ?? bonus };
    }
  }
  return best;
}

/**
 * For items where multiple professions stack sequentially (e.g. Smoked Fish: Fisher → Artisan),
 * returns an ordered list of BonusResults to display. Each entry represents a step or combination.
 *
 * Rules:
 * - Angler supersedes Fisher (mutually exclusive; Angler gives the higher bonus)
 * - The "primary" non-artisan profession (Fisher/Angler/Tapper/etc.) is shown first
 * - If Artisan is also active, a combined row (primary → Artisan) is appended
 * - If only Artisan is active (no primary), returns [Artisan row]
 * - Returns [] if no applicable professions are active
 */
export function getStackedBonuses(
  price: number,
  itemProfessions: ProfessionBonus[],
  activeBonuses: Set<ProfessionBonus>,
): BonusResult[] {
  const calc = professionCalculator();
  const results: BonusResult[] = [];

  const primaryProfessions = itemProfessions.filter((p) => p !== "artisan");
  const hasArtisan =
    itemProfessions.includes("artisan") && activeBonuses.has("artisan");

  let activePrimary: ProfessionBonus | null = null;
  for (const p of primaryProfessions) {
    if (!activeBonuses.has(p)) continue;
    if (
      p === "fisher" &&
      primaryProfessions.includes("angler") &&
      activeBonuses.has("angler")
    )
      continue;
    activePrimary = p;
    break;
  }

  if (activePrimary) {
    const primaryPrice = (calc[activePrimary] as (p: number) => number)(price);
    results.push({
      price: primaryPrice,
      label: PROFESSION_LABELS[activePrimary] ?? activePrimary,
    });

    if (hasArtisan) {
      const comboPrice = calc.artisan(primaryPrice);
      results.push({
        price: comboPrice,
        label: `${PROFESSION_LABELS[activePrimary] ?? activePrimary} + Artisan`,
      });
    }
  } else if (hasArtisan) {
    results.push({ price: calc.artisan(price), label: "Artisan" });
  }

  return results;
}

/** Derives active knowledge bonuses from gameData.specialItems. */
export function getActiveKnowledgeBonuses(
  gameData: GameData,
): Set<KnowledgeBonus> {
  const set = new Set<KnowledgeBonus>();
  if (gameData.specialItems.includes("bears-knowledge"))
    set.add("bears-knowledge");
  if (gameData.specialItems.includes("spring-onion-mastery"))
    set.add("spring-onion-mastery");
  return set;
}

/**
 * For forageables that may have both profession and knowledge bonuses: returns the
 * higher of the two adjusted prices with the appropriate label, or null if neither
 * applies. They don't stack in-game.
 */
export function applyBestForageableBonus(
  price: number,
  itemProfessions: ProfessionBonus[],
  itemKnowledge: KnowledgeBonus[],
  activeBonuses: Set<ProfessionBonus>,
  activeKnowledge: Set<KnowledgeBonus>,
): BonusResult | null {
  const profResult = applyBestProfessionBonus(
    price,
    itemProfessions,
    activeBonuses,
  );

  const calc = knowledgeCalculator();
  let knowResult: BonusResult | null = null;
  for (const k of itemKnowledge) {
    if (!activeKnowledge.has(k)) continue;
    const adjusted =
      k === "bears-knowledge"
        ? calc.bearsKnowledge(price)
        : calc.springOnionMastery(price);
    knowResult = { price: adjusted, label: KNOWLEDGE_LABELS[k] ?? k };
    break;
  }

  if (profResult !== null && knowResult !== null) {
    return profResult.price >= knowResult.price ? profResult : knowResult;
  }
  return profResult ?? knowResult;
}
