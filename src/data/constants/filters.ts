import type {
  CaughtFilter,
  CraftingStatusFilter,
  DonationFilter,
  FoundFilter,
  MarriageFilter,
  SeasonFilter,
  ShippedFilter,
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
