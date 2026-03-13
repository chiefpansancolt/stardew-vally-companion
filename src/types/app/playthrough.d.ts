/**
 * Base Playthrough interface.
 *
 * The `data` field is intentionally typed as `Record<string, unknown>` so that
 * this template compiles without any game-specific knowledge. When implementing
 * your tracker, replace or extend this field with a typed interface.
 */
export interface Playthrough {
  id: string;
  name: string;
  description?: string;
  createdAt: string; // ISO 8601
  lastModified: string; // ISO 8601
  // Replace with your typed GameData interface — see TRACKER_TEMPLATE.md
  data: Record<string, unknown>;
}

export interface AppData {
  playthroughs: Playthrough[];
  activePlaythroughId: string | null;
}
