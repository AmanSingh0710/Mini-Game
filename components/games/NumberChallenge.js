"use client";

import { useCallback, useEffect, useState } from "react";
import GameShell, { playFeedback } from "@/components/games/GameShell";
import { formatCountdown, getDailyChallenge } from "@/lib/games";
import { completeDailyChallenge, getPersonalBest, savePersonalBest } from "@/lib/storage";

const GAME_ID = "number-challenge";
const LEVELS = ["Easy", "Medium", "Hard"];
const INITIAL_PUZZLE = { prompt: "9 + 4", answer: 13 };

function makePuzzle(level) {
  let left;
  let right;
  let operator;
  if (level === "Easy") {
    left = Math.floor(Math.random() * 20) + 2;
    right = Math.floor(Math.random() * 12) + 1;
    operator = Math.random() < 0.5 ? "+" : "−";
    if (operator === "−" && right > left) [left, right] = [right, left];
  } else if (level === "Medium") {
    left = Math.floor(Math.random() * 12) + 2;
    right = Math.floor(Math.random() * 10) + 2;
    operator = "×";
  } else {
    operator = ["+", "−", "×"][Math.floor(Math.random() * 3)];
    left = Math.floor(Math.random() * 30) + 8;
    right = operator === "×" ? Math.floor(Math.random() * 12) + 3 : Math.floor(Math.random() * 20) + 2;
    if (operator === "−" && right > left) [left, right] = [right, left];
  }
  const answer = operator === "+" ? left + right : operator === "−" ? left - right : left * right;
  return { prompt: `${left} ${operator} ${right}`, answer };
}

export default function NumberChallenge() {
  const [level, setLevel] = useState("Easy");
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [answer, setAnswer] = useState("");
  const [best, setBest] = useState(() => getPersonalBest(`${GAME_ID}:${"Easy".toLowerCase()}`));
  const [puzzle, setPuzzle] = useState(INITIAL_PUZZLE);

  const restart = useCallback(() => {
    setCorrect(0);
    setIncorrect(0);
    setAnswer("");
    setTimeLeft(60);
    setFinished(false);
    setPuzzle(makePuzzle(level));
    setPlaying(true);
  }, [level]);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          window.clearInterval(timer);
          setPlaying(false);
          setFinished(true);
          const nextBest = savePersonalBest(`${GAME_ID}:${level.toLowerCase()}`, correct);
          setBest(nextBest);
          const challenge = getDailyChallenge();
          if (challenge.id === GAME_ID && correct > 0) completeDailyChallenge(challenge.day);
          return 0;
        }
        return time - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [correct, level, playing]);

  function submitAnswer(event) {
    event.preventDefault();
    if (!playing || answer.trim() === "") return;
    if (Number(answer) === puzzle.answer) {
      playFeedback(true);
      setCorrect((value) => value + 1);
    } else {
      playFeedback(false);
      setIncorrect((value) => value + 1);
    }
    setAnswer("");
    setPuzzle(makePuzzle(level));
  }

  return (
    <GameShell gameId={GAME_ID} title="Number Challenge" score={correct} onRestart={restart}>
      <div className="game-content number-game">
        <div className="number-topline">
          <div className="level-control" role="group" aria-label="Choose difficulty">
            {LEVELS.map((item) => <button key={item} type="button" className={`level-button ${level === item ? "is-selected" : ""}`} onClick={() => { if (!playing) { setLevel(item); setBest(getPersonalBest(`${GAME_ID}:${item.toLowerCase()}`)); } }} disabled={playing}>{item}</button>)}
          </div>
          <div className="timer-mini"><span>TIME</span><strong className={timeLeft <= 10 ? "timer-danger" : ""}>{formatCountdown(timeLeft)}</strong></div>
        </div>
        <div className="number-scoreline">
          <div><span>CORRECT</span><strong className="score-positive">{correct.toString().padStart(2, "0")}</strong></div>
          <div><span>INCORRECT</span><strong className="score-negative">{incorrect.toString().padStart(2, "0")}</strong></div>
          <div><span>BEST · {level.toUpperCase()}</span><strong>{best.toString().padStart(2, "0")}</strong></div>
        </div>
        <div className="puzzle-wrap">
          <span className="prompt-eyebrow">SOLVE THIS</span>
          <div className="math-prompt" aria-live="polite">{puzzle.prompt}<span> = ?</span></div>
          <form className="answer-form" onSubmit={submitAnswer}>
            <label className="sr-only" htmlFor="number-answer">Your answer</label>
            <input id="number-answer" inputMode="numeric" pattern="-?[0-9]*" type="number" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Your answer" disabled={!playing} autoComplete="off" />
            <button className="button button-primary" type="submit" disabled={!playing || answer.trim() === ""}>Submit <span>↗</span></button>
          </form>
        </div>
        {!playing && !finished && <div className="game-overlay"><p>Choose your level. Solve as many as you can in 60 seconds.</p><button className="button button-primary" type="button" onClick={restart}>Start challenge <span>↗</span></button></div>}
        {finished && <div className="game-overlay"><p className="prompt-eyebrow">TIME&apos;S UP</p><h2>{correct} correct, {incorrect} missed</h2><p>Your personal best for this level is saved on this device.</p><button className="button button-primary" type="button" onClick={restart}>Play again <span>↗</span></button></div>}
        <p className="game-hint">One point for each correct answer <span>·</span> Press Enter to submit <span>·</span> Best saved by level</p>
      </div>
    </GameShell>
  );
}