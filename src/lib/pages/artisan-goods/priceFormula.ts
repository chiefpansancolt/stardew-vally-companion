import {
  artisanCalculator,
  type ArtisanGood,
  crops,
  fish,
  forageables,
  trees,
} from "stardew-valley-data";
import type { ArtisanResult, IngredientOption } from "@/types";
import {
  ARTISAN_CALC_METHOD,
  ARTISAN_USE_KEY,
  FRUIT_TREE_KEYS,
} from "@/data/constants/artisanGoods";

const artisanCalc = artisanCalculator();

export function getIngredientOptions(good: ArtisanGood): IngredientOption[] {
  if (good.name === "Smoked Fish") {
    return fish()
      .get()
      .map((f) => ({
        name: f.name,
        basePrice: f.sellPrice,
        image: f.image,
        energy: f.energyHealth?.energy,
        health: f.energyHealth?.health,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  if (good.name === "Aged Roe") {
    return fish()
      .byRoe("roe")
      .get()
      .map((f) => {
        const roePrice = artisanCalc.roe(f.sellPrice).sellPrice;
        return {
          name: f.name,
          basePrice: f.sellPrice,
          image: f.image,
          sublabel: `Roe: ${roePrice}g`,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  const useKey = ARTISAN_USE_KEY[good.name];
  if (!useKey) return [];

  const results: IngredientOption[] = [
    ...crops()
      .byArtisanUse(useKey)
      .get()
      .map((c) => ({
        name: c.name,
        basePrice: c.cropSellPrice,
        image: c.image,
        energy: c.energyHealth?.energy,
        health: c.energyHealth?.health,
      })),
    ...forageables()
      .byArtisanUse(useKey)
      .get()
      .map((f) => ({
        name: f.name,
        basePrice: f.sellPrice,
        image: f.image,
        energy: f.energyHealth?.energy,
        health: f.energyHealth?.health,
      })),
  ];

  if (FRUIT_TREE_KEYS.has(useKey)) {
    results.push(
      ...trees()
        .fruitTrees()
        .byArtisanUse(useKey)
        .get()
        .filter(
          (t): t is Extract<typeof t, { type: "fruit-tree" }> =>
            t.type === "fruit-tree",
        )
        .map((t) => ({
          name: t.produce.name,
          basePrice: t.produce.sellPrice,
          image: t.produce.image,
          energy: t.produce.energyHealth?.energy,
          health: t.produce.energyHealth?.health,
        })),
    );
  }

  const seen = new Set<string>();
  const deduped = results.filter((r) => {
    if (seen.has(r.name)) return false;
    seen.add(r.name);
    return true;
  });

  return deduped.sort((a, b) => a.name.localeCompare(b.name));
}

export function calculateResult(
  good: ArtisanGood,
  opt: IngredientOption,
): ArtisanResult | null {
  const method = ARTISAN_CALC_METHOD[good.name];
  if (!method) return null;

  const fn = artisanCalc[method as keyof typeof artisanCalc] as unknown;

  if (good.name === "Honey" || good.name === "Aged Roe") {
    return (fn as (price: number) => ArtisanResult)(opt.basePrice);
  }

  return (
    fn as (price: number, energy: number, health: number) => ArtisanResult
  )(opt.basePrice, opt.energy ?? 0, opt.health ?? 0);
}
