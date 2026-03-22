import { search } from "stardew-valley-data";

export function getMaterialImage(name: string): string | null {
  const match = search(name).find((r) => r.name === name);
  return match?.image ?? null;
}
