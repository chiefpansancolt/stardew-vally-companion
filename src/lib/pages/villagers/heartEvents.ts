import type { HeartEvent } from "@/types";

export function isSeen(
  event: HeartEvent,
  eventsSeen: string[],
  hearts: number,
): boolean {
  if (event.id === null) return hearts >= event.heart;
  return [event.id].flat().some((id) => eventsSeen.includes(String(id)));
}
