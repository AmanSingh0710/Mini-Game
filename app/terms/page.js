import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Terms and Conditions",
  description: "Terms for using MiniGame Arena and its free browser games.",
  openGraph: { title: "Terms and Conditions | MiniGame Arena", description: "Terms for using MiniGame Arena.", url: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions">
      <p>By accessing MiniGame Arena, you agree to these terms. If you do not agree, please stop using the site. These terms are a general template and should be reviewed for the laws that apply to the site operator.</p>
      <h2>Using the site</h2>
      <p>You may use the games for personal, non-commercial entertainment. Do not misuse the site, interfere with its operation, attempt unauthorized access, or use automated means to disrupt service.</p>
      <h2>Games and scores</h2>
      <p>Games are provided for entertainment and may change or become unavailable. Scores are stored locally in your browser and are not an online leaderboard or a guaranteed record. Clearing browser data may remove them.</p>
      <h2>Intellectual property</h2>
      <p>The site design, text, and original game code are owned by or licensed to the site operator. You may not republish or commercially exploit them without permission, except where applicable law allows.</p>
      <h2>Third-party services</h2>
      <p>The site may link to third-party services or, after the operator&apos;s approval and configuration, display third-party advertisements. Those services have their own terms and privacy practices; the site operator does not control them.</p>
      <h2>Availability and liability</h2>
      <p>The site is provided on an &quot;as available&quot; basis without a promise of uninterrupted operation. To the extent permitted by law, the site operator is not liable for indirect or consequential loss arising from use of the site. Nothing in these terms limits rights that cannot legally be excluded.</p>
      <h2>Changes and contact</h2>
      <p>These terms may be updated as the site changes. Continued use after an update means you accept the revised terms. Questions can be sent through the <a href="/contact">Contact page</a>.</p>
    </LegalPage>
  );
}