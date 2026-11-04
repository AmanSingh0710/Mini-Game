"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Gamepad2, Menu, X } from "lucide-react";

const links = [
  { href: "/games", label: "Games" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="MiniGame Arena home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark"><Gamepad2 size={19} strokeWidth={2.2} /></span>
          <span>mini<span className="brand-light">game</span><b>arena</b></span>
        </Link>
        <button
          className="icon-button menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => {
            const active = pathname === link.href || (link.href === "/games" && pathname.startsWith("/games/"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "nav-link is-active" : "nav-link"}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link className="nav-play" href="/games" onClick={() => setMenuOpen(false)}>
            Play a game <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}