export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "URL required" });
    try {
        const html = await fetch(url).then(r => r.text());
        const description = html.match(/<meta name="description" content="(.*?)"/)?.[1] || "No description found";
        res.status(200).json({ url, description });
    } catch (e) {
        res.status(500).json({ error: "Meta extraction failed" });
    }
}
