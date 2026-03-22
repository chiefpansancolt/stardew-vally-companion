import type {
  CaughtFilter,
  CookingSourceFilter,
  CookingStatusFilter,
  CraftingStatusFilter,
  DonationFilter,
  FoundFilter,
  MarriageFilter,
  MonsterTypeFilter,
  SeasonFilter,
  ShippedFilter,
  SpecialItemStatusFilter,
  SpecialItemTypeFilter,
} from "@/types";

interface FilterOption<T extends string> {
  id: T;
  label: string;
}

export const SHIPPED_FILTERS: FilterOption<ShippedFilter>[] = [
  { id: "all", label: "All" },
  { id: "shipped", label: "Shipped" },
  { id: "not-shipped", label: "Not Shipped" },
];

export const SEASON_FILTERS: FilterOption<SeasonFilter>[] = [
  { id: "all", label: "All" },
  { id: "spring", label: "Spring" },
  { id: "summer", label: "Summer" },
  { id: "fall", label: "Fall" },
  { id: "winter", label: "Winter" },
];

export const DONATION_FILTERS: FilterOption<DonationFilter>[] = [
  { id: "all", label: "All" },
  { id: "donated", label: "Donated" },
  { id: "not-donated", label: "Not Donated" },
];

export const FOUND_FILTERS: FilterOption<FoundFilter>[] = [
  { id: "all", label: "All" },
  { id: "found", label: "Found" },
  { id: "not-found", label: "Not Found" },
];

export const CAUGHT_FILTERS: FilterOption<CaughtFilter>[] = [
  { id: "all", label: "All" },
  { id: "caught", label: "Caught" },
  { id: "not-caught", label: "Not Caught" },
];

export const WEATHER_FILTERS: FilterOption<string>[] = [
  { id: "all", label: "All" },
  { id: "sunny", label: "Sunny" },
  { id: "rainy", label: "Rainy" },
  { id: "both", label: "Any" },
];

export const WEATHER_LABELS: Record<string, string> = Object.fromEntries(
  WEATHER_FILTERS.filter((f) => f.id !== "all").map((f) => [f.id, f.label]),
);

export const MARRIAGE_FILTERS: FilterOption<MarriageFilter>[] = [
  { id: "all", label: "All" },
  { id: "marriageable", label: "Marriageable" },
  { id: "non-marriageable", label: "Non-Marriageable" },
];

export const CRAFTING_STATUS_FILTERS: FilterOption<CraftingStatusFilter>[] = [
  { id: "all", label: "All" },
  { id: "crafted", label: "Crafted" },
  { id: "learned", label: "Learned" },
  { id: "not-learned", label: "Not Learned" },
];

export const COOKING_STATUS_FILTERS: FilterOption<CookingStatusFilter>[] = [
  { id: "all", label: "All" },
  { id: "cooked", label: "Cooked" },
  { id: "learned", label: "Learned" },
  { id: "not-learned", label: "Not Learned" },
];

export const COOKING_SOURCE_FILTERS: FilterOption<CookingSourceFilter>[] = [
  { id: "all", label: "All" },
  { id: "queen-of-sauce", label: "Queen of Sauce" },
  { id: "friendship", label: "Friendship" },
  { id: "purchase", label: "Purchase" },
  { id: "skill", label: "Skill Level" },
  { id: "default", label: "Default" },
  { id: "cutscene", label: "Special Event" },
];

export const MONSTER_TYPE_FILTERS: FilterOption<MonsterTypeFilter>[] = [
  { id: "all", label: "All" },
  { id: "standard", label: "Standard" },
  { id: "dangerous", label: "Dangerous" },
];

export const SPECIAL_ITEM_TYPE_FILTERS: FilterOption<SpecialItemTypeFilter>[] =
  [
    { id: "all", label: "All" },
    { id: "special-item", label: "Special Items" },
    { id: "book", label: "Books" },
    { id: "skill-book", label: "Skill Books" },
    { id: "mastery", label: "Mastery" },
  ];

export const SPECIAL_ITEM_STATUS_FILTERS: FilterOption<SpecialItemStatusFilter>[] =
  [
    { id: "all", label: "All" },
    { id: "acquired", label: "Acquired" },
    { id: "not-acquired", label: "Not Acquired" },
  ];
