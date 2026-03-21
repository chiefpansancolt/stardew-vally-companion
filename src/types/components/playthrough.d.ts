import type { Playthrough } from "@/types/app";

export interface LoadingPlaythroughProps {
  message?: string;
}

export interface NotFoundCardProps {
  title?: string;
  message?: string;
}

export interface PlaythroughCardProps {
  playthrough: Playthrough;
}

export type SortOption = "lastModified" | "name" | "createdAt";
