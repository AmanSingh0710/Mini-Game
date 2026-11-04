import AdBanner from "@/components/AdBanner";
import MemoryMaster from "@/components/games/MemoryMaster";

export const metadata = {
  title: "Memory Master - Free Sequence Memory Game",
  description: "Watch a growing sequence of color tiles and repeat it from memory. Build your streak in this free browser memory game.",
  openGraph: { title: "Memory Master | MiniGame Arena", description: "A color sequence memory game that gets harder each round.", url: "/games/memory-master" },
};

export default function MemoryMasterPage() {
  return (
    <article className="game-page content-width">
      <div className="game-page-heading"><div className="eyebrow"><span className="eyebrow-line" /> MEMORY GAME</div><h1>Memory <span>Master.</span></h1><p>Watch each light, then play the pattern back in exactly the right order.</p></div>
      <MemoryMaster />
      <div className="game-description"><h2>How to play Memory Master</h2><p>Start a round and watch the tiles light up one by one. Repeat the sequence by tapping or clicking each tile; every clear round adds another step. One missed tile ends the run, and your longest cleared streak is saved on this device.</p></div>
      <AdBanner placement="content" />
    </article>
  );
}