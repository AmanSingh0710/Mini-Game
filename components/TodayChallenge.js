"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { getDailyChallenge } from "@/lib/games";
import { isDailyChallengeComplete } from "@/lib/storage";

export default function TodayChallenge() {
  const challenge = getDailyChallenge();
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const refreshStatus = () => setComplete(isDailyChallengeComplete(challenge.day));
    refreshStatus();
    window.addEventListener("minigame-arena:daily", refreshStatus);
    return () => window.removeEventListener("minigame-arena:daily", refreshStatus);
  }, [challenge.day]);

  return (
    <section className="daily-panel">
      <div className="daily-glow" aria-hidden="true" />
      <div className="daily-copy">
        <div className="eyebrow"><Sparkles size={14} /> THE DAILY PLAY</div>
        <h2>One run.<br /><span>A fresh record.</span></h2>
        <p>Today&apos;s challenge: put your {challenge.title.toLowerCase()} skills to work.</p>
        <Link className="button button-light" href={challenge.href}>
          {complete ? "Play it again" : "Take the challenge"} <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="daily-stamp" aria-live="polite">
        {complete ? <><Check size={24} /><span>DONE FOR TODAY</span></> : <><span className="stamp-day">{new Date().getUTCDate().toString().padStart(2, "0")}</span><span>DAILY RUN</span></>}
      </div>
    </section>
  );
}