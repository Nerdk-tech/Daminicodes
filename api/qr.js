export default function handler(req, res) {
    const { data } = req.query;
    if (!data) return res.status(400).json({ error: "No data provided" });
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`;
    res.status(200).json({ url: qrUrl, instruction: "Embed this URL in an <img> tag" });
}
