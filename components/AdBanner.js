"use client";

import { useEffect, useRef } from "react";

const SLOT_ENV = {
  header: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER,
  content: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT,
  footer: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER,
};

export default function AdBanner({ placement = "content" }) {
  const adRef = useRef(null);
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "";
  const slot = SLOT_ENV[placement] || "";
  const enabled =
    process.env.NEXT_PUBLIC_ADSENSE_APPROVED === "true" &&
    /^ca-pub-\d+$/.test(publisherId) &&
    /^\d+$/.test(slot);

  useEffect(() => {
    if (!enabled || !adRef.current || adRef.current.dataset.requested) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      adRef.current.dataset.requested = "true";
    } catch {
      // Ad loading is intentionally non-blocking for the game experience.
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <aside className={`ad-slot ad-slot-${placement}`} aria-label="Advertisement">
      <span className="ad-label">Advertisement</span>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: placement === "header" ? 90 : 100 }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}