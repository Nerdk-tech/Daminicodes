
// netlify/functions/gemini.js

const { GoogleGenAI } = require('@google/genai');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ reply: 'Method Not Allowed' }) };
    }

    try {
        const body = JSON.parse(event.body);
        const userMessage = body.message;

        if (!userMessage) {
            return { statusCode: 400, body: JSON.stringify({ reply: 'No message provided.' }) };
        }
        
        // This key MUST be set in Netlify's site settings (Step 3)
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); 

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: userMessage }] }],
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply: response.text }),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ reply: 'Sorry, the AI encountered an internal server error.' }),
        };
    }
};
      
