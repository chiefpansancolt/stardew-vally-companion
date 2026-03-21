import type { Skill } from "stardew-valley-data";

export function computeXpBarPercent(
  skill: Skill,
  currentXp: number,
  currentLevel: number,
): number {
  if (currentLevel >= 10) return 100;
  if (currentLevel === 0) {
    const nextTotal = skill.levels[0]?.totalXp ?? 1;
    return Math.min(100, (currentXp / nextTotal) * 100);
  }
  const prevTotal = skill.levels[currentLevel - 1]?.totalXp ?? 0;
  const nextTotal = skill.levels[currentLevel]?.totalXp ?? prevTotal + 1;
  return Math.min(
    100,
    ((currentXp - prevTotal) / (nextTotal - prevTotal)) * 100,
  );
}

export function xpLabel(
  skill: Skill,
  currentXp: number,
  currentLevel: number,
): string {
  if (currentLevel >= 10) return `${currentXp.toLocaleString()} XP`;
  const nextTotal = skill.levels[currentLevel]?.totalXp ?? 0;
  return `${currentXp.toLocaleString()} / ${nextTotal.toLocaleString()} XP`;
}
