import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Privacy Policy",
  description: "How MiniGame Arena handles browser storage, game scores, and advertising-related data.",
  openGraph: { title: "Privacy Policy | MiniGame Arena", description: "How this site handles information and browser storage.", url: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>This policy explains what MiniGame Arena stores and what may be processed when you visit the site. It is general information, not legal advice. Review it for your jurisdiction and update it to reflect any services you add.</p>
      <h2>Information stored on your device</h2>
      <p>MiniGame Arena does not require an account. Game scores, recently played games, daily challenge status, and your sound preference are saved in your browser&apos;s local storage. This information is not sent to our server by the games. You can remove it by clearing this site&apos;s browser storage.</p>
      <h2>Server and diagnostic data</h2>
      <p>Our hosting provider may process standard request information, such as IP address, browser details, and requested URLs, to deliver and secure the site. We do not currently run a site analytics service or collect information through a contact form.</p>
      <h2>Advertising</h2>
      <p>Advertisements are disabled unless the site operator has configured an AdSense publisher account and ad slots and has marked the site as approved for ads. If advertising is enabled, Google and its partners may use cookies or similar technologies to serve and measure ads, subject to your region, consent choices, Google&apos;s policies, and applicable law. See <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">Google&apos;s advertising information</a> and <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer">ad settings</a>.</p>
      <h2>Your choices</h2>
      <p>You can control cookies and local storage through your browser settings. Where required, the site operator must provide an appropriate consent experience before using advertising technologies. Browser storage controls may reset your locally saved scores.</p>
      <h2>Children and contact</h2>
      <p>The site is a general-audience game collection and is not designed to collect personal information from children. If you have a privacy question, contact the site operator using the address on the <a href="/contact">Contact page</a>.</p>
      <h2>Changes</h2>
      <p>This policy may be updated when the site or its services change. The date at the top indicates the latest revision.</p>
    </LegalPage>
  );
}