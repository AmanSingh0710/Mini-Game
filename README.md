# MiniGame Arena

A JavaScript Next.js App Router site with three free browser games. Scores, recently played games, and sound preferences are stored locally in the visitor's browser; there is no account or backend leaderboard.

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To verify the production output, run `npm run build`, then `npm start`.

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the canonical URL before deployment. Set `NEXT_PUBLIC_CONTACT_EMAIL` to an inbox you control. The site still runs if those values are omitted; metadata and sitemap then use the default Vercel URL, and the contact page tells visitors that email is not configured.

## Deploy to Vercel

1. Push the project to a Git provider and import that repository in Vercel, or run `npx vercel` from the project directory.
2. Keep the framework preset as Next.js and the build command as `npm run build`. Vercel detects the output settings automatically.
3. Add `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CONTACT_EMAIL` in Project Settings → Environment Variables for Preview and Production. Use the actual canonical production URL, redeploy, and check `/robots.txt` and `/sitemap.xml`.
4. Deploy. Every push to the connected production branch creates a deployment; preview deployments are available for other branches.

### Custom domain

In Vercel, open the project Settings → Domains and add the domain and any `www` variant you intend to use. Follow the DNS records Vercel displays at your registrar (typically an A record for the apex and a CNAME for `www`). Wait for verification and TLS provisioning, choose the canonical domain/redirect in Vercel, then set `NEXT_PUBLIC_SITE_URL` to that canonical HTTPS URL and redeploy. DNS propagation time depends on the registrar and existing records.

## Google Search Console

1. Add the canonical domain as a Domain property in Search Console and verify it using the DNS TXT record Google provides. A URL-prefix property can instead use its offered HTML or DNS verification method.
2. Set `NEXT_PUBLIC_SITE_URL` to the same canonical HTTPS origin and deploy.
3. Submit `https://your-domain.com/sitemap.xml` in Search Console's Sitemaps report. Check indexing and URL inspection reports for crawl issues.

## AdSense setup

Ads are disabled by default. Applying does not guarantee approval; Google reviews the live site and its content against its then-current program policies.

1. Apply for AdSense and add/verify the production site in the AdSense account. Publish the site with useful original content, functioning navigation, and accurate privacy/contact information before requesting review.
2. Only after approval, set `NEXT_PUBLIC_ADSENSE_APPROVED=true`, `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-...`, and the numeric `NEXT_PUBLIC_ADSENSE_SLOT_HEADER`, `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT`, and/or `NEXT_PUBLIC_ADSENSE_SLOT_FOOTER` values in Vercel. Leave unused slots blank. Redeploy after setting environment variables.
3. Set the server-only `ADSENSE_PUBLISHER_ID=pub-...` using the publisher number provided by Google. The `/ads.txt` route returns the Google seller declaration only when this value is valid; otherwise it returns 404. Confirm the deployed file at `https://your-domain.com/ads.txt` and follow any account-specific instructions from AdSense.
4. Ads render only in the reserved header, content, and footer placements. The content placement on game pages is below the instructions and game board; ads are never inserted into active gameplay or over controls. Do not encourage clicks, test by clicking live ads, or use automated traffic.

The operator is responsible for current consent requirements, privacy disclosures, ad placement, site review, and all AdSense policy compliance. This integration is a technical starting point, not an approval or legal-compliance guarantee.