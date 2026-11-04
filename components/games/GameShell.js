"use client";

import { useEffect, useState } from "react";
import { Expand, RotateCcw, Share2, Volume2, VolumeX } from "lucide-react";
import { getSoundEnabled, recordRecentlyPlayed, setSoundEnabled } from "@/lib/storage";

export function playFeedback(success) {
  if (!getSoundEnabled() || typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = success ? 620 : 180;
    gain.gain.setValueAtTime(0.08, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.12);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.12);
    oscillator.onended = () => context.close();
  } catch {
    // Audio is optional; gameplay remains available when the browser blocks it.
  }
}

export default function GameShell({ gameId, title, score, onRestart, children }) {
  const [soundOn, setSoundOn] = useState(() => getSoundEnabled());
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    recordRecentlyPlayed(gameId);
  }, [gameId]);

  function toggleSound() {
    setSoundOn((current) => {
      setSoundEnabled(!current);
      return !current;
    });
  }

  async function shareScore() {
    const text = `I scored ${score} in ${title} on MiniGame Arena. Can you beat it?`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${title} score`, text, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(`${text} ${window.location.href}`);
        setShareMessage("Score link copied");
        window.setTimeout(() => setShareMessage(""), 2200);
      }
    } catch (error) {
      if (error?.name !== "AbortError") setShareMessage("Sharing is unavailable here");
    }
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.querySelector(".game-stage")?.requestFullscreen();
    } catch {
      setShareMessage("Full screen is unavailable here");
      window.setTimeout(() => setShareMessage(""), 2200);
    }
  }

  return (
    <section className="game-stage" aria-label={`${title} game`}>
      <div className="game-toolbar">
        <div className="game-toolbar-label"><span className="live-dot" /> QUICK PLAY <span>/</span> {title.toUpperCase()}</div>
        <div className="game-tools">
          <button className="icon-button game-tool" type="button" title={soundOn ? "Turn sound off" : "Turn sound on"} aria-label={soundOn ? "Turn sound off" : "Turn sound on"} onClick={toggleSound}>
            {soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>
          <button className="icon-button game-tool" type="button" title="Toggle full screen" aria-label="Toggle full screen" onClick={toggleFullscreen}><Expand size={17} /></button>
          <button className="icon-button game-tool" type="button" title="Share score" aria-label="Share score" onClick={shareScore}><Share2 size={17} /></button>
          <button className="icon-button game-tool" type="button" title="Restart game" aria-label="Restart game" onClick={onRestart}><RotateCcw size={17} /></button>
        </div>
      </div>
      {children}
      <span className="sr-only" role="status" aria-live="polite">{shareMessage}</span>
    </section>
  );
}