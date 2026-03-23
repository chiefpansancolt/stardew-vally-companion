import {
  bait,
  footwear,
  hats,
  rings,
  tackle,
  trinkets,
  weapons,
} from "stardew-valley-data";

export const GEAR_DATA = {
  weapons: weapons().get(),
  footwear: footwear().get(),
  rings: rings().get(),
  hats: hats().get(),
  trinkets: trinkets().get(),
  bait: bait().get(),
  tackle: tackle().get(),
};

export const GEAR_COUNTS = {
  weapons: GEAR_DATA.weapons.length,
  footwear: GEAR_DATA.footwear.length,
  rings: GEAR_DATA.rings.length,
  hats: GEAR_DATA.hats.length,
  trinkets: GEAR_DATA.trinkets.length,
  bait: GEAR_DATA.bait.length,
  tackle: GEAR_DATA.tackle.length,
  total:
    GEAR_DATA.weapons.length +
    GEAR_DATA.footwear.length +
    GEAR_DATA.rings.length +
    GEAR_DATA.hats.length +
    GEAR_DATA.trinkets.length +
    GEAR_DATA.bait.length +
    GEAR_DATA.tackle.length,
};
