import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Disclaimer",
  description: "Important information about MiniGame Arena game scores, availability, and third-party advertising.",
  openGraph: { title: "Disclaimer | MiniGame Arena", description: "Important information about using MiniGame Arena.", url: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer">
      <p>MiniGame Arena is an entertainment website. Its games are provided for casual play and are not intended to provide educational, financial, medical, or other professional advice.</p>
      <h2>Scores and availability</h2>
      <p>Scores and personal bests are saved only in your browser. They are not verified, synced, or guaranteed to persist. Game availability and behavior may change over time.</p>
      <h2>Third-party content</h2>
      <p>External links are provided for convenience. If advertising is enabled after the site operator&apos;s AdSense approval and configuration, ads are supplied by third parties. Their content, services, and policies are outside the operator&apos;s control.</p>
      <h2>No guarantee</h2>
      <p>The site is offered as available, without a guarantee that it will be uninterrupted or error-free. Nothing in this disclaimer limits consumer rights that cannot be excluded under applicable law.</p>
    </LegalPage>
  );
}