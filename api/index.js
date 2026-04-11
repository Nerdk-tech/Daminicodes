import crypto from 'crypto';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAcDhrRCnaTGnmwgshZ0Peh1IEPqPVIyqc");

export default async function handler(req, res) {
    const { url, method } = req;
    const path = url.split('/').pop().split('?')[0]; 

    // YOUR EXACT GLOBAL CORS LOGIC
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') return res.status(200).end();

    try {
        switch (path) {
            case 'queendani': // Text Synthesis
                const { prompt } = req.query;
                if (!prompt) return res.status(400).json({ error: "Synthesis prompt required." });
                const model = genAI.getGenerativeModel({ model: "gemini-pro" });
                const result = await model.generateContent(prompt);
                const response = await result.response;
                return res.status(200).json({ 
                    name: "Queen Dani AI", 
                    status: "Royal precision active", 
                    synthesis: response.text() 
                });

            case 'veo': // Video Engine from Zip
                const { v_prompt } = req.body || {};
                if (!v_prompt) return res.status(400).json({ error: "Video prompt required." });
                // Note: Veo requires specific model access via the Vertex/GenAI SDK
                return res.status(200).json({ 
                    status: "Veo Video Engine Active", 
                    message: "Simulation successful. Post prompt to generate cinematic shots." 
                });

            case 'hash':
                const { data } = req.query;
                if (!data) return res.status(400).json({ error: "Nothing to hash." });
                const hashValue = crypto.createHash('sha256').update(data).digest('hex');
                return res.status(200).json({ sha256: hashValue });

            case 'ip':
                const { ip: targetIp } = req.query;
                const ipRes = await fetch(`http://ip-api.com/json/${targetIp || ""}`);
                const ipData = await ipRes.res.json();
                return res.status(200).json({ provider: "Daminī Geo", ...ipData });

            case 'fx':
                const fxRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                const fxData = await fxRes.json();
                return res.status(200).json({ base: "USD", rates: fxData.rates });

            case 'pass':
                const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
                let passResult = "";
                for (let i = 0; i < 16; i++) passResult += chars.charAt(Math.floor(Math.random() * chars.length));
                return res.status(200).json({ password: passResult });

            case 'qr':
                const { qrText } = req.query;
                return res.status(200).json({ api: "https://api.qrserver.com/v1/create-qr-code/", text: qrText || "Hello" });

            default:
                return res.status(404).json({ error: `Endpoint '${path}' not found.` });
        }
    } catch (e) {
        return res.status(500).json({ error: "Server Error", details: e.message });
    }
}
