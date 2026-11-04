"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { GAMES } from "@/lib/games";
import { getRecentlyPlayed } from "@/lib/storage";

export default function RecentlyPlayed() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    function refreshRecent() {
      setRecent(getRecentlyPlayed().map((id) => GAMES.find((game) => game.id === id)).filter(Boolean));
    }
    refreshRecent();
    window.addEventListener("minigame-arena:recent", refreshRecent);
    return () => window.removeEventListener("minigame-arena:recent", refreshRecent);
  }, []);

  return (
    <section className="recent-section">
      <div className="section-heading recent-heading">
        <div><div className="eyebrow"><Clock3 size={13} /> YOUR ARENA</div><h2>Recently played</h2></div>
        <Link className="text-link" href="/games">All games <ArrowUpRight size={15} /></Link>
      </div>
      {recent.length ? (
        <div className="recent-list">
          {recent.map((game) => (
            <Link href={game.href} className="recent-item" key={game.id}>
              <span className={`recent-dot dot-${game.accent}`} /><span>{game.title}</span><span className="recent-category">{game.category}</span><ArrowUpRight size={15} />
            </Link>
          ))}
        </div>
      ) : <p className="recent-empty">Your next favorite might be one click away. Choose a game to get started.</p>}
    </section>
  );
}