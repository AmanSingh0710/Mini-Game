import Link from "next/link";
import { ArrowDown, ArrowUpRight, Bolt, Gamepad2, Sparkles } from "lucide-react";
import AdBanner from "@/components/AdBanner";
import GameCard from "@/components/GameCard";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import TodayChallenge from "@/components/TodayChallenge";
import { GAMES } from "@/lib/games";

export const metadata = {
  title: "Free Online Mini Games for Quick Breaks",
  description: "Play Color Rush, Memory Master, and Number Challenge free in your browser. No sign-up needed; your best scores stay on your device.",
  openGraph: {
    title: "MiniGame Arena | Free Online Mini Games",
    description: "A quick game for every kind of break. Play free, no account needed.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-inner content-width">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> YOUR BREAK, BETTER</div>
            <h1>Quick games.<br /><span>Clear head.</span></h1>
            <p>Step into a tiny arcade for your brain. Chase a new best, train your reflexes, or take a one-minute reset.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/games">Play now <ArrowUpRight size={17} /></Link>
              <span className="no-account"><Bolt size={14} /> No sign-up. Just play.</span>
            </div>
            <a className="hero-scroll" href="#featured"><ArrowDown size={14} /> SCROLL TO PLAY</a>
          </div>
          <div className="hero-art" aria-label="Arcade-inspired artwork">
            <div className="hero-art-frame">
              <span className="hero-art-label"><span className="live-dot" /> ARENA OPEN</span>
              <div className="hero-art-grid" aria-hidden="true">
                <span className="art-cell cell-coral" /><span className="art-cell cell-dark" /><span className="art-cell cell-mint" />
                <span className="art-cell cell-yellow" /><span className="art-cell cell-dark cell-center"><Gamepad2 size={54} strokeWidth={1.2} /></span><span className="art-cell cell-sky" />
                <span className="art-cell cell-dark" /><span className="art-cell cell-lilac" /><span className="art-cell cell-coral" />
              </div>
              <div className="hero-art-caption"><span>GOOD GAMES</span><strong>NO LONG WAIT.</strong></div>
            </div>
            <div className="hero-float float-score"><Sparkles size={14} /><span>ONE MORE ROUND</span></div>
            <span className="hero-orbit hero-orbit-a" /><span className="hero-orbit hero-orbit-b" />
          </div>
          <div className="hero-index"><span>01</span><span className="index-line" /><span>03</span></div>
        </div>
      </section>

      <section className="featured-section content-width" id="featured">
        <div className="section-heading">
          <div><div className="eyebrow"><span className="eyebrow-line" /> PICK YOUR PACE</div><h2>Featured games<span className="accent-dot">.</span></h2></div>
          <Link className="text-link" href="/games">Explore all games <ArrowUpRight size={15} /></Link>
        </div>
        <div className="game-grid">
          {GAMES.map((game, index) => <GameCard game={game} index={index} key={game.id} />)}
        </div>
      </section>

      <div className="content-width"><AdBanner placement="content" /></div>

      <section className="challenge-section content-width">
        <TodayChallenge />
      </section>

      <section className="popular-section content-width">
        <div className="popular-title"><div className="eyebrow"><Bolt size={13} /> QUICK PICKS</div><h2>Popular games</h2><p>Choose your kind of challenge.</p></div>
        <div className="popular-picks">
          {GAMES.map((game) => <Link className="popular-pick" href={game.href} key={game.id}><span className={`recent-dot dot-${game.accent}`} /><span className="popular-pick-copy"><strong>{game.title}</strong><small>{game.category} <span>·</span> {game.duration}</small></span><ArrowUpRight size={16} /></Link>)}
        </div>
      </section>

      <div className="content-width"><RecentlyPlayed /></div>
    </>
  );
}