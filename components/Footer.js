import Link from "next/link";
import { Gamepad2 } from "lucide-react";

const legalLinks = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Disclaimer", "/disclaimer"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <Link className="brand" href="/">
            <span className="brand-mark"><Gamepad2 size={18} /></span>
            <span>mini<span className="brand-light">game</span><b>arena</b></span>
          </Link>
          <p>Small games. Big brain energy.</p>
        </div>
        <div className="footer-meta">
          <nav className="footer-links" aria-label="Legal and contact links">
            {legalLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          </nav>
          <span className="copyright">© {new Date().getFullYear()} MiniGame Arena</span>
        </div>
      </div>
    </footer>
  );
}