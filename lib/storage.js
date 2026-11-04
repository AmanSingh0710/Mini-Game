const SCORES_KEY = "minigame-arena:scores";
const RECENT_KEY = "minigame-arena:recent";
const SETTINGS_KEY = "minigame-arena:settings";
const CHALLENGE_KEY = "minigame-arena:daily";

function readJson(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(window.localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private browsing or when the quota is full.
  }
}

export function getPersonalBest(gameId) {
  return Number(readJson(SCORES_KEY, {})[gameId] || 0);
}

export function savePersonalBest(gameId, score) {
  const scores = readJson(SCORES_KEY, {});
  const best = Math.max(Number(scores[gameId] || 0), Number(score) || 0);
  writeJson(SCORES_KEY, { ...scores, [gameId]: best });
  return best;
}

export function recordRecentlyPlayed(gameId) {
  const recent = readJson(RECENT_KEY, []).filter((item) => item.id !== gameId);
  writeJson(RECENT_KEY, [{ id: gameId, playedAt: Date.now() }, ...recent].slice(0, 3));
  if (typeof window !== "undefined") window.dispatchEvent(new Event("minigame-arena:recent"));
}

export function getRecentlyPlayed() {
  return readJson(RECENT_KEY, []).map((item) => item.id);
}

export function getSoundEnabled() {
  return readJson(SETTINGS_KEY, { sound: true }).sound !== false;
}

export function setSoundEnabled(enabled) {
  writeJson(SETTINGS_KEY, { ...readJson(SETTINGS_KEY, {}), sound: enabled });
}

export function isDailyChallengeComplete(day) {
  return readJson(CHALLENGE_KEY, "") === day;
}

export function completeDailyChallenge(day) {
  writeJson(CHALLENGE_KEY, day);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("minigame-arena:daily"));
}