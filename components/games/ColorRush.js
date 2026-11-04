"use client";

import { useCallback, useEffect, useState } from "react";
import GameShell, { playFeedback } from "@/components/games/GameShell";
import { formatCountdown, getDailyChallenge } from "@/lib/games";
import { completeDailyChallenge, getPersonalBest, savePersonalBest } from "@/lib/storage";

const COLORS = [
  { name: "Coral", value: "#ff665e" },
  { name: "Lemon", value: "#e6dc54" },
  { name: "Mint", value: "#5dd4a4" },
  { name: "Sky", value: "#67b9ee" },
  { name: "Lilac", value: "#b59bf4" },
  { name: "Tangerine", value: "#f39c55" },
];
const INITIAL_ROUND = { target: COLORS[0], choices: COLORS.slice(0, 4) };
const GAME_ID = "color-rush";

function makeChoices(level) {
  const count = Math.min(4 + Math.floor(level / 5), COLORS.length);
  const target = COLORS[Math.floor(Math.random() * COLORS.length)];
  const others = COLORS.filter((color) => color.name !== target.name).sort(() => Math.random() - 0.5);
  return { target, choices: [target, ...others.slice(0, count - 1)].sort(() => Math.random() - 0.5) };
}

export default function ColorRush() {
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => getPersonalBest(GAME_ID));
  const [timeLeft, setTimeLeft] = useState(60);
  const [round, setRound] = useState(INITIAL_ROUND);

  const restart = useCallback(() => {
    setScore(0);
    setTimeLeft(60);
    setFinished(false);
    setRound(makeChoices(0));
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          window.clearInterval(timer);
          setPlaying(false);
          setFinished(true);
          const nextBest = savePersonalBest(GAME_ID, score);
          setBest(nextBest);
          const challenge = getDailyChallenge();
          if (challenge.id === GAME_ID) completeDailyChallenge(challenge.day);
          return 0;
        }
        return time - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing, score]);

  const chooseColor = useCallback((name) => {
    if (!playing) return;
    if (name === round.target.name) {
      playFeedback(true);
      const nextScore = score + 1;
      setScore(nextScore);
      setRound(makeChoices(nextScore));
    } else {
      playFeedback(false);
    }
  }, [playing, round.target.name, score]);

  useEffect(() => {
    function onKeyDown(event) {
      const number = Number(event.key);
      if (playing && number >= 1 && number <= round.choices.length) {
        chooseColor(round.choices[number - 1].name);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [chooseColor, playing, round.choices]);

  return (
    <GameShell gameId={GAME_ID} title="Color Rush" score={score} onRestart={restart}>
      <div className="game-content color-game">
        <div className="game-stats-row">
          <div className="stat-block"><span>YOUR SCORE</span><strong>{score.toString().padStart(2, "0")}</strong></div>
          <div className="timer-block"><span>TIME LEFT</span><strong className={timeLeft <= 10 ? "timer-danger" : ""}>{formatCountdown(timeLeft)}</strong></div>
          <div className="stat-block stat-right"><span>PERSONAL BEST</span><strong>{best.toString().padStart(2, "0")}</strong></div>
        </div>
        <div className="color-prompt">
          <div className="prompt-copy"><span className="prompt-eyebrow">FIND THIS COLOR</span><h2>{round.target.name}</h2></div>
          <div className="target-swatch" style={{ "--swatch": round.target.value }} aria-label={`${round.target.name} target color`} />
        </div>
        <div className="color-options" aria-label="Color choices">
          {round.choices.map((color, index) => (
            <button key={color.name} className="color-choice" type="button" disabled={!playing} onClick={() => chooseColor(color.name)} aria-label={`${color.name}, option ${index + 1}`} style={{ "--swatch": color.value }}>
              <span className="choice-swatch" />
              <span className="choice-label">{color.name}</span>
              <kbd>{index + 1}</kbd>
            </button>
          ))}
        </div>
        {!playing && !finished && <div className="game-overlay"><p>60 seconds. How sharp are your eyes?</p><button className="button button-primary" type="button" onClick={restart}>Start playing <span>↗</span></button></div>}
        {finished && <div className="game-overlay"><p className="prompt-eyebrow">TIME&apos;S UP</p><h2>Final score: {score}</h2><p>Your best is saved on this device. Ready for another?</p><button className="button button-primary" type="button" onClick={restart}>Play again <span>↗</span></button></div>}
        <p className="game-hint">Pick the matching swatch <span>·</span> Keyboard: 1–{round.choices.length} <span>·</span> More choices every 5 points</p>
      </div>
    </GameShell>
  );
}