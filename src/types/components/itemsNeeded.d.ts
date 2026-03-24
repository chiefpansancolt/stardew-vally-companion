export type NeededTag = "Donate" | "Ship" | "Cook" | "Craft" | "Build" | "Gift";

export interface NeededItemUsage {
  goalName: string;
  tag: NeededTag;
  quantity?: number;
  preference?: "loves" | "likes" | "neutral";
}

export interface NeededItem {
  id: string;
  name: string;
  image: string | null;
  usages: NeededItemUsage[];
}
