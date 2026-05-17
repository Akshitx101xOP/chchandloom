export default async function handler(req, res) {
  // ── Aggressive anti-cache for ALL browsers (especially mobile) ──
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const OWNER = "Akshitx101xOP";
  const REPO = "chchandloom";

  try {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/data/all-products.json`;
    const response = await fetch(url, {
      headers: { 
        Authorization: `Bearer ${GITHUB_TOKEN}`, 
        Accept: "application/vnd.github+json" 
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`GitHub Fetch Error: ${response.status}`);
    }

    const data = await response.json();
    if (data.content) {
      const content = Buffer.from(data.content, "base64").toString("utf-8");
      return res.status(200).json(JSON.parse(content));
    }

    return res.status(200).json([]);
  } catch (error) {
    console.error("Dynamic API Error:", error);
    // Fallback to static file if GitHub fetch fails (optional, but safer to return 500)
    return res.status(500).json({ error: "Failed to fetch live data" });
  }
}
