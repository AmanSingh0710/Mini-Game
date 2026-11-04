import AdBanner from "@/components/AdBanner";
import NumberChallenge from "@/components/games/NumberChallenge";

export const metadata = {
  title: "Number Challenge - Free Timed Math Game",
  description: "Solve as many number puzzles as you can in 60 seconds. Choose easy, medium, or hard and track correct answers and personal bests.",
  openGraph: { title: "Number Challenge | MiniGame Arena", description: "A quick-fire math game with three difficulty levels.", url: "/games/number-challenge" },
};

export default function NumberChallengePage() {
  return (
    <article className="game-page content-width">
      <div className="game-page-heading"><div className="eyebrow"><span className="eyebrow-line" /> NUMBER GAME</div><h1>Number <span>Challenge.</span></h1><p>Pick a difficulty, solve each equation, and see how many you can clear in one minute.</p></div>
      <NumberChallenge />
      <div className="game-description"><h2>How to play Number Challenge</h2><p>Select easy, medium, or hard before starting. Enter each answer and submit it with the button or Enter key. Correct and incorrect answers are tracked separately; personal bests are saved on this device for each difficulty level.</p></div>
      <AdBanner placement="content" />
    </article>
  );
}