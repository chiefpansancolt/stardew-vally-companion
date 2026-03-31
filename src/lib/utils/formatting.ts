export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function kebabToTitle(s: string): string {
  return s.split("-").map(capitalize).join(" ");
}

export function formatTimePlayed(ms: number): string {
  if (!ms) return "—";
  const totalMinutes = Math.floor(ms / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString();
}

export function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
