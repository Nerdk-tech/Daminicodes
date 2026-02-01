export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    try {
        const response = await fetch(url);
        const html = await response.text();
        const title = html.match(/<title>(.*?)<\/title>/)?.[1] || "Untitled";
        
        res.status(200).json({
            status: "success",
            provider: "Daminī WebScraper",
            data: { title, url, bytes: html.length }
        });
    } catch (e) {
        res.status(500).json({ error: "Could not scrape the target URL" });
    }
}
