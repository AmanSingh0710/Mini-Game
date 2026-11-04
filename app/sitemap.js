import { GAMES } from "@/lib/games";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://minigame-arena.vercel.app";

export default function sitemap() {
  const pages = ["", "/games", "/about", "/contact", "/privacy", "/terms", "/disclaimer"];
  return [
    ...pages.map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: path === "" ? "daily" : "monthly", priority: path === "" ? 1 : 0.6 })),
    ...GAMES.map((game) => ({ url: `${siteUrl}${game.href}`, changeFrequency: "monthly", priority: 0.8 })),
  ];
}