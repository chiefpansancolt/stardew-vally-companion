export function shippedCardStyles(shipped: boolean) {
  return {
    borderBg: shipped
      ? "border-green-500/40 bg-green-900/20"
      : "border-white/10 bg-white/5",
    nameColor: shipped ? "text-green-300" : "text-white",
  };
}

export function museumCardStyles(donated: boolean, found: boolean) {
  if (donated) {
    return {
      borderBg: "border-green-500/40 bg-green-900/20",
      nameColor: "text-green-300",
    };
  }
  if (found) {
    return {
      borderBg: "border-accent/40 bg-accent/10",
      nameColor: "text-accent",
    };
  }
  return {
    borderBg: "border-white/10 bg-white/5",
    nameColor: "text-white",
  };
}
