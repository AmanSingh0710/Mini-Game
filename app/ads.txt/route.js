export function GET() {
  const publisherId = process.env.ADSENSE_PUBLISHER_ID || "";
  if (!/^pub-\d+$/.test(publisherId)) {
    return new Response("", { status: 404 });
  }

  return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}