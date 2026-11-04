
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://mini-game-arena.vercel.app";

const publisherId =process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "";

const validPublisherId = /^ca-pub-\d+$/.test(publisherId);

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MiniGame Arena | Quick Games for Sharp Minds",
    template: "%s | MiniGame Arena",
  },

  description:"Jump into quick reflex, memory, and number games. Play free in your browser, track your personal best, and take on today's challenge.",

  openGraph: {
    title: "MiniGame Arena | Quick Games for Sharp Minds",
    description:"Free browser games for your next quick break. No sign-up, just play.",
    siteName: "MiniGame Arena",
    type: "website",
  },

  icons: {
    icon: "/favicon.svg",
  },

  // Google AdSense verification for all pages
  other: {
    "google-adsense-account": publisherId,
  },
};

export const viewport = {
  themeColor: "#111311",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {validPublisherId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}

        <Header />

        <AdBanner placement="header" />

        <main>{children}</main>

        <Footer />

        <AdBanner placement="footer" />
      </body>
    </html>
  );
}
