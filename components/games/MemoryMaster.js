"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GameShell, { playFeedback } from "@/components/games/GameShell";
import { getDailyChallenge } from "@/lib/games";
import { completeDailyChallenge, getPersonalBest, savePersonalBest } from "@/lib/storage";

const TILES = [
  { name: "Coral", value: "#ff665e" },
  { name: "Lemon", value: "#e6dc54" },
  { name: "Mint", value: "#5dd4a4" },
  { name: "Sky", value: "#67b9ee" },
];
const GAME_ID = "memory-master";

export default function MemoryMaster() {
  const [phase, setPhase] = useState("ready");
  const [sequence, setSequence] = useState([]);
  const [inputIndex, setInputIndex] = useState(0);
  const [litTile, setLitTile] = useState(-1);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => getPersonalBest(GAME_ID));
  const roundTimeout = useRef(null);

  useEffect(() => () => window.clearTimeout(roundTimeout.current), []);

  useEffect(() => {
    if (phase !== "watch") return undefined;
    let index = 0;
    let timeout;
    const showNext = () => {
      if (index >= sequence.length) {
        setLitTile(-1);
        setInputIndex(0);
        setPhase("input");
        return;
      }
      setLitTile(sequence[index]);
      timeout = window.setTimeout(() => {
        setLitTile(-1);
        index += 1;
        timeout = window.setTimeout(showNext, 180);
      }, 540);
    };
    timeout = window.setTimeout(showNext, 350);
    return () => window.clearTimeout(timeout);
  }, [phase, sequence]);

  const startRound = useCallback((current = []) => {
    const nextSequence = [...current, Math.floor(Math.random() * TILES.length)];
    setSequence(nextSequence);
    setPhase("watch");
  }, []);

  const restart = useCallback(() => {
    window.clearTimeout(roundTimeout.current);
    roundTimeout.current = null;
    setScore(0);
    setInputIndex(0);
    setSequence([]);
    setPhase("ready");
    setLitTile(-1);
  }, []);

  const chooseTile = useCallback((tileIndex) => {
    if (phase !== "input") return;
    if (sequence[inputIndex] !== tileIndex) {
      playFeedback(false);
      setPhase("over");
      const nextBest = savePersonalBest(GAME_ID, score);
      setBest(nextBest);
      return;
    }
    playFeedback(true);
    const nextIndex = inputIndex + 1;
    setInputIndex(nextIndex);
    if (nextIndex === sequence.length) {
      const nextScore = score + 1;
      setScore(nextScore);
      setBest(savePersonalBest(GAME_ID, nextScore));
      if (nextScore >= 5) {
        const challenge = getDailyChallenge();
        if (challenge.id === GAME_ID) completeDailyChallenge(challenge.day);
      }
      setPhase("transition");
      roundTimeout.current = window.setTimeout(() => {
        roundTimeout.current = null;
        startRound(sequence);
      }, 450);
    }
  }, [inputIndex, phase, score, sequence, startRound]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key >= "1" && event.key <= "4") chooseTile(Number(event.key) - 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [chooseTile]);

  return (
    <GameShell gameId={GAME_ID} title="Memory Master" score={score} onRestart={restart}>
      <div className="game-content memory-game">
        <div className="game-stats-row">
          <div className="stat-block"><span>ROUNDS CLEARED</span><strong>{score.toString().padStart(2, "0")}</strong></div>
          <div className="memory-status"><span className="prompt-eyebrow">{phase === "watch" ? "WATCH THE SEQUENCE" : phase === "input" ? "YOUR TURN" : phase === "transition" ? "NICE RUN" : phase === "over" ? "ROUND OVER" : "READY WHEN YOU ARE"}</span><strong>{phase === "input" ? `${inputIndex + 1} / ${sequence.length}` : phase === "watch" ? `${sequence.length} ${sequence.length === 1 ? "TILE" : "TILES"}` : ""}</strong></div>
          <div className="stat-block stat-right"><span>PERSONAL BEST</span><strong>{best.toString().padStart(2, "0")}</strong></div>
        </div>
        <div className="memory-board" aria-label="Memory sequence tiles">
          {TILES.map((tile, index) => (
            <button key={tile.name} className={`memory-tile ${litTile === index ? "is-lit" : ""}`} type="button" disabled={phase !== "input"} onClick={() => chooseTile(index)} aria-label={`${tile.name} tile, key ${index + 1}`} style={{ "--tile-color": tile.value }}>
              <span>{index + 1}</span>
            </button>
          ))}
        </div>
        {phase === "ready" && <div className="game-overlay"><p>Watch the lights, then repeat the pattern.</p><button className="button button-primary" type="button" onClick={() => startRound()}>Start sequence <span>↗</span></button></div>}
        {phase === "over" && <div className="game-overlay"><p className="prompt-eyebrow">PATTERN MISSED</p><h2>{score} {score === 1 ? "round" : "rounds"} cleared</h2><p>Your longest streak is saved on this device.</p><button className="button button-primary" type="button" onClick={restart}>Try again <span>↗</span></button></div>}
        <p className="game-hint">Repeat the glowing pattern in order <span>·</span> Keyboard: 1–4 <span>·</span> One new tile each round</p>
      </div>
    </GameShell>
  );
}