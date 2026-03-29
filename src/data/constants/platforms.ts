export const PLATFORMS = [
  "PC",
  "Switch",
  "Xbox",
  "Playstation",
  "iOS",
  "Android",
] as const;
export type Platform = (typeof PLATFORMS)[number];
