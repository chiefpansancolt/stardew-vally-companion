import type { ProfessionData } from "stardew-valley-data";

export function toggleProfession(
  profId: string,
  currentProfessions: string[],
  allProfessions: ProfessionData[],
): string[] {
  const prof = allProfessions.find((p) => p.id === profId);
  if (!prof) return currentProfessions;

  const isSelected = currentProfessions.includes(profId);

  if (isSelected) {
    const childIds = allProfessions
      .filter((p) => p.parentProfession === profId)
      .map((p) => p.id);
    return currentProfessions.filter(
      (id) => id !== profId && !childIds.includes(id),
    );
  }

  let next = [...currentProfessions];

  if (prof.level === 5) {
    const siblings = allProfessions.filter(
      (p) => p.skill === prof.skill && p.level === 5 && p.id !== profId,
    );
    const toRemove = new Set<string>();
    for (const sib of siblings) {
      toRemove.add(sib.id);
      allProfessions
        .filter((p) => p.parentProfession === sib.id)
        .forEach((p) => toRemove.add(p.id));
    }
    next = next.filter((id) => !toRemove.has(id));
  } else {
    if (prof.parentProfession && !next.includes(prof.parentProfession)) {
      const parent = allProfessions.find((p) => p.id === prof.parentProfession);
      if (parent) {
        const sibLv5 = allProfessions.filter(
          (p) =>
            p.skill === parent.skill && p.level === 5 && p.id !== parent.id,
        );
        const toRemove = new Set<string>();
        for (const sib of sibLv5) {
          toRemove.add(sib.id);
          allProfessions
            .filter((p) => p.parentProfession === sib.id)
            .forEach((p) => toRemove.add(p.id));
        }
        next = next.filter((id) => !toRemove.has(id));
        next.push(prof.parentProfession);
      }
    }
    const sibLv10 = allProfessions.filter(
      (p) => p.parentProfession === prof.parentProfession && p.id !== profId,
    );
    next = next.filter((id) => !sibLv10.map((s) => s.id).includes(id));
  }

  next.push(profId);
  return next;
}
