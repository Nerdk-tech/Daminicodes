export default function handler(req, res) {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "No code provided" });
    // Basic whitespace cleanup
    const clean = code.replace(/\s+/g, ' ').trim();
    res.status(200).json({ formatted: clean });
}
