import type { Season } from "stardew-valley-data";

export interface SeasonMeta {
  id: Season;
  label: string;
  abbr: string;
  image: string;
  badgeColor: string;
  textColor: string;
  heroColor: string;
  dotColor: string;
}
