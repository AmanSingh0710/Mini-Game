export const GAMES = [
  {
    id: "color-rush",
    title: "Color Rush",
    category: "REFLEX",
    description: "Trust your eyes. Tap the target before the palette shifts.",
    href: "/games/color-rush",
    accent: "coral",
    duration: "60 sec",
    keys: "1-6",
  },
  {
    id: "memory-master",
    title: "Memory Master",
    category: "MEMORY",
    description: "Watch the pattern, then repeat it without missing a beat.",
    href: "/games/memory-master",
    accent: "mint",
    duration: "Endless",
    keys: "Tap",
  },
  {
    id: "number-challenge",
    title: "Number Challenge",
    category: "PUZZLE",
    description: "Clear quick-fire equations before the clock runs out.",
    href: "/games/number-challenge",
    accent: "yellow",
    duration: "60 sec",
    keys: "Enter",
  },
];

export function getDailyChallenge(date = new Date()) {
  const day = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
  const hash = [...day].reduce((value, char) => value + char.charCodeAt(0), 0);
  const game = GAMES[hash % GAMES.length];
  return { ...game, day };
}

export function formatCountdown(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remaining = Math.max(0, seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remaining}`;
}