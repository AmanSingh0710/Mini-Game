import AdBanner from "@/components/AdBanner";
import ColorRush from "@/components/games/ColorRush";

export const metadata = {
  title: "Color Rush - Free Color Reflex Game",
  description: "Test your color recognition in a fast 60-second reflex game. Choose the matching swatch, beat your personal best, and play free in your browser.",
  openGraph: { title: "Color Rush | MiniGame Arena", description: "A fast, free color recognition challenge. Can you beat the clock?", url: "/games/color-rush" },
};

export default function ColorRushPage() {
  return (
    <article className="game-page content-width">
      <div className="game-page-heading"><div className="eyebrow"><span className="eyebrow-line" /> REFLEX GAME</div><h1>Color <span>Rush.</span></h1><p>Match the target swatch before the clock runs out. The palette grows as your streak gets longer.</p></div>
      <ColorRush />
      <div className="game-description"><h2>How to play Color Rush</h2><p>Choose the color that matches the name and sample shown in the prompt. You have 60 seconds; every correct tap adds a point, and new colors join the choices as your score climbs. Play with touch, mouse, or the number keys.</p></div>
      <AdBanner placement="content" />
    </article>
  );
}