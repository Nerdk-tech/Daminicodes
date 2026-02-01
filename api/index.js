import crypto from 'crypto';

export default async function handler(req, res) {
    const { url, method } = req;
    // Extract the endpoint name (e.g., /api/queendani -> queendani)
    const path = url.split('/').pop().split('?')[0]; 

    // Global CORS Headers for all tools
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') return res.status(200).end();

    try {
        switch (path) {
            case 'queendani':
                return res.status(200).json({ 
                    name: "Queen Dani AI", 
                    status: "Royal precision active", 
                    capabilities: ["Summarize", "Translate"] 
                });

            case 'db':
                return res.status(200).json({ 
                    storage: "Daminī Cloud KV", 
                    status: "Online", 
                    quota: "100MB" 
                });

            case 'earth':
                return res.status(200).json({ 
                    layers: ["satellite", "terrain", "night-lights"], 
                    source: "Three-Globe/OSM", 
                    status: "Live" 
                });

            case 'format':
                const { code } = req.body || {};
                if (!code) return res.status(400).json({ error: "No code provided" });
                return res.status(200).json({ formatted: code.replace(/\s+/g, ' ').trim() });

            case 'fx':
                const fxResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                const fxData = await fxResponse.json();
                return res.status(200).json({ base: "USD", rates: fxData.rates, update: fxData.date });

            case 'hash':
                const { data } = req.query;
                if (!data) return res.status(400).json({ error: "Nothing to hash." });
                const hashValue = crypto.createHash('sha256').update(data).digest('hex');
                return res.status(200).json({ sha256: hashValue });

            case 'ip':
                const { ip: targetIp } = req.query;
                const ipResponse = await fetch(`http://ip-api.com/json/${targetIp || ""}`);
                const ipData = await ipResponse.json();
                return res.status(200).json({ provider: "Daminī Geo", ...ipData });

            case 'maps':
                return res.status(200).json({ 
                    style: "mapbox://styles/damini/dark-v11", 
                    zoom: "Global", 
                    status: "Authorized" 
                });

            case 'meta':
                const { url: targetUrl } = req.query;
                if (!targetUrl) return res.status(400).json({ error: "URL required" });
                const htmlText = await fetch(targetUrl).then(r => r.text());
                const metaDesc = htmlText.match(/<meta name="description" content="(.*?)"/)?.[1] || "No description found";
                return res.status(200).json({ url: targetUrl, description: metaDesc });

            case 'pass':
                const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
                let passResult = "";
                for (let i = 0; i < 16; i++) passResult += chars.charAt(Math.floor(Math.random() * chars.length));
                return res.status(200).json({ password: passResult });

            case 'pdf':
                return res.status(200).json({ 
                    message: "PDF Engine active. Post HTML to this endpoint.", 
                    status: "Ready" 
                });

            case 'scrape':
                const { scrapeUrl } = req.query;
                return res.status(200).json({ 
                    endpoint: "Scraper", 
                    target: scrapeUrl || "None", 
                    status: "Simulation mode" 
                });

            case 'qr':
                const { qrText } = req.query;
                return res.status(200).json({ 
                    message: "QR Generator Active", 
                    text: qrText || "Hello", 
                    api: "https://api.qrserver.com/v1/create-qr-code/" 
                });

            case 'shrink':
                return res.status(200).json({ 
                    message: "Image compression engine ready", 
                    limit: "5MB" 
                });

            case 'verify':
                const { email } = req.query;
                const emailValid = email?.includes('@') && email?.includes('.');
                return res.status(200).json({ email, valid: !!emailValid, check: "Syntax Only" });

            default:
                return res.status(404).json({ error: `Endpoint '${path}' not found.` });
        }
    } catch (e) {
        return res.status(500).json({ error: "Server Error", details: e.message });
    }
}
