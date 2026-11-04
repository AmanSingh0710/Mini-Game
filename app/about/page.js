import { Gamepad2, Heart, Zap } from "lucide-react";

export const metadata = {
  title: "About MiniGame Arena",
  description: "Learn about MiniGame Arena, a small collection of free, no-sign-up browser games designed for quick breaks.",
  openGraph: { title: "About MiniGame Arena", description: "A tiny arcade for your next quick break.", url: "/about" },
};

export default function AboutPage() {
  return (
    <article className="about-page content-width">
      <div className="eyebrow"><span className="eyebrow-line" /> WHY WE PLAY</div>
      <h1>A little play<br /><span>goes a long way.</span></h1>
      <p className="about-lede">MiniGame Arena is a small collection of quick browser games for the in-between moments. No account, no download, no complicated setup. Pick a game and get straight to it.</p>
      <div className="about-values">
        <section><span className="value-icon"><Zap size={19} /></span><h2>Quick by design</h2><p>Short rounds make it easy to fit a game into a break, then get right back to your day.</p></section>
        <section><span className="value-icon"><Gamepad2 size={19} /></span><h2>Play anywhere</h2><p>Each game works in a modern mobile or desktop browser, with touch and keyboard-friendly controls.</p></section>
        <section><span className="value-icon"><Heart size={19} /></span><h2>Yours to enjoy</h2><p>Play without registration. Scores and sound preferences are stored locally on your device.</p></section>
      </div>
      <div className="about-note"><span>THE POINT</span><p>A good game doesn&apos;t need a big commitment. Sometimes one minute is exactly enough.</p></div>
    </article>
  );
}