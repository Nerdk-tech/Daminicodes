export default async function handler(req, res) {
    try {
        const r = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await r.json();
        res.status(200).json({ base: "USD", rates: data.rates, update: data.date });
    } catch (e) {
        res.status(500).json({ error: "FX data unavailable" });
    }
}
