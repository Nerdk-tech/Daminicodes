export default async function handler(req, res) {
    const { text, task } = req.body;
    if (!text) return res.status(400).json({ error: "Queen Dani requires text." });
    
    // Logic for AI processing
    const response = task === 'summarize' ? text.slice(0, 100) + "..." : text.toUpperCase();
    
    res.status(200).json({ 
        agent: "Queen Dani", 
        processed: response,
        timestamp: new Date().toLocaleTimeString()
    });
}
