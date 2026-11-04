"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Brain, Calculator, Clock3, Palette } from "lucide-react";

const icons = {
  "color-rush": Palette,
  "memory-master": Brain,
  "number-challenge": Calculator,
};

export default function GameCard({ game, index = 0 }) {
  const Icon = icons[game.id] || Palette;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.07 }}>
      <Link href={game.href} className={`game-card art-${game.accent}`} style={{ "--card-index": index }}>
        <div className="game-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-mark"><Icon size={34} strokeWidth={1.6} /></div>
          <span className="art-number">0{index + 1}</span>
        </div>
        <div className="game-card-body">
          <div className="game-card-kicker"><span>{game.category}</span><span className="game-duration"><Clock3 size={13} />{game.duration}</span></div>
          <h3>{game.title}</h3>
          <p>{game.description}</p>
          <div className="card-play">Play game <ArrowUpRight size={16} /></div>
        </div>
      </Link>
    </motion.div>
  );
}