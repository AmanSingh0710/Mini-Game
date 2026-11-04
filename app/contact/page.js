import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

export const metadata = {
  title: "Contact MiniGame Arena",
  description: "Get in touch with the MiniGame Arena team about a game, an accessibility issue, or a site question.",
  openGraph: { title: "Contact MiniGame Arena", description: "Questions or feedback? Send us a note.", url: "/contact" },
};

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <article className="contact-page content-width">
      <div className="eyebrow"><span className="eyebrow-line" /> SAY HELLO</div>
      <h1>We&apos;re listening<span className="accent-dot">.</span></h1>
      <p className="contact-lede">Found a bug, have an idea for a game, or just want to say hi? We&apos;d like to hear from you.</p>
      {email ? (
        <a className="contact-email" href={`mailto:${email}`}><span className="contact-icon"><Mail size={21} /></span><span><small>EMAIL US</small><strong>{email}</strong></span><ArrowUpRight size={19} /></a>
      ) : (
        <p className="contact-unavailable">Email contact is not configured for this deployment yet.</p>
      )}
      <p className="contact-note">For privacy questions, include &quot;Privacy&quot; in your subject line. Please don&apos;t send passwords or sensitive information.</p>
      <Link className="text-link" href="/games">Back to the games <ArrowUpRight size={15} /></Link>
    </article>
  );
}