export default async function handler(req, res) {
    const { ip } = req.query;
    const target = ip || ""; // If empty, it finds the user's IP
    try {
        const response = await fetch(`http://ip-api.com/json/${target}`);
        const data = await response.json();
        res.status(200).json({ provider: "Daminī Geo", ...data });
    } catch (e) {
        res.status(500).json({ error: "Location fetch failed" });
    }
}
