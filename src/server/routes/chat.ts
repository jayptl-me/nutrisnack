import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

// Define the expected schema for incoming chat messages
const messageSchema = z.object({
    role: z.enum(['user', 'model']), // Gemini uses 'model' for assistant
    parts: z.array(z.object({ text: z.string() })),
});

const chatRequestSchema = z.object({
    history: z.array(messageSchema),
    message: z.string(),
});

// Define the chat routes
export const chatRoutes = new Hono();

// POST endpoint for handling chat messages
chatRoutes.post('/', zValidator('json', chatRequestSchema), async (c) => {
    const { history, message } = c.req.valid('json');
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!geminiApiKey) {
        console.error('GEMINI_API_KEY is not set in environment variables.');
        return c.json({ error: 'Server configuration error' }, 500);
    }

    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;

    // Construct the payload for Gemini API
    const contents = [
        ...history,
        { role: 'user', parts: [{ text: message }] },
    ];

    const payload = {
        contents: contents,
        system_instruction: {
            parts: [{
                text: "You are a professional dietician and nutrition expert. Provide accurate, evidence-based advice about nutrition, diet plans, healthy eating habits, and food choices. Format your responses with clear structure: use **bold** for section titles, use numbered points, and use * for bullet points. Be helpful, concise, and personable while maintaining a professional tone. When uncertain, acknowledge limitations and avoid making definitive medical claims. Focus on general nutritional advice rather than specific medical recommendations."
            }]
        },
        generation_config: {
            temperature: 0.3,
            top_p: 0.8,
            top_k: 40,
            max_output_tokens: 1024,
        },
    };

    try {
        console.log("Sending payload to Gemini API:", JSON.stringify(payload, null, 2));
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API error response:', response.status, errorText);
            return c.json({ error: `Gemini API Error: ${response.statusText}`, details: errorText }, response.status);
        }

        const data = await response.json();
        console.log("Gemini API response:", JSON.stringify(data, null, 2));

        // Extract the response text, handling potential variations in the response structure
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process your request. Please try again.";

        return c.json({ response: responseText });

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return c.json({ error: 'Failed to communicate with AI service' }, 500);
    }
});
