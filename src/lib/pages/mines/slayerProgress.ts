import type { Monster, MonsterSlayerGoal } from "stardew-valley-data";

export function getGoalKillCount(
  goal: MonsterSlayerGoal,
  monsterKills: Record<string, number>,
): number {
  return goal.monsters.reduce(
    (sum, name) => sum + (monsterKills[name] ?? 0),
    0,
  );
}

export function getMonsterKillCount(
  monster: Monster,
  monsterKills: Record<string, number>,
): number {
  return (
    (monsterKills[monster.name] ?? 0) +
    (monster.name !== monster.id ? (monsterKills[monster.id] ?? 0) : 0)
  );
}
