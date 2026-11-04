import GameCard from "@/components/GameCard";
import { GAMES } from "@/lib/games";

export const metadata = {
  title: "All Browser Games",
  description: "Browse every free MiniGame Arena game: quick color reflexes, sequence memory, and timed number puzzles. Play instantly on mobile or desktop.",
  openGraph: {
    title: "All Games | MiniGame Arena",
    description: "Choose a quick browser game and set a new personal best.",
    url: "/games",
  },
};

export default function GamesPage() {
  return (
    <section className="catalog-page content-width">
      <div className="eyebrow"><span className="eyebrow-line" /> THE ARCADE</div>
      <div className="catalog-heading"><h1>Pick your next<br /><span>little obsession.</span></h1><p>Three quick plays, no downloads, no waiting room. Pick one and jump straight in.</p></div>
      <div className="game-grid catalog-grid">{GAMES.map((game, index) => <GameCard game={game} index={index} key={game.id} />)}</div>
      <p className="catalog-footnote">All games run in your browser. Scores and settings stay on this device.</p>
    </section>
  );
}