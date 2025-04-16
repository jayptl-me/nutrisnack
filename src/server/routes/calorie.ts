import { Hono } from 'hono';
import { cors } from 'hono/cors';

interface CalorieResult {
  foodName: string;
  calories: number;
  nutrients: {
    protein: number;
    carbs: number;
    fat: number;
  };
  portionSize: string;
}

export const calorieRoutes = new Hono()
  .use(cors());

calorieRoutes.post('/analyze', async (c) => {
  try {
    const { base64Image, mimeType } = await c.req.json();
    
    if (!base64Image || !mimeType) {
      return c.json({ error: 'Missing required fields: base64Image or mimeType' }, 400);
    }

    // Prepare the payload for Gemini API
    const payload = {
      contents: [{
        parts: [
          { 
            text: "Analyze this food image and provide nutritional information. Return ONLY a valid JSON object with this exact structure (no markdown, no explanations): { \"foodName\": \"name of the food\", \"calories\": number, \"nutrients\": { \"protein\": number in grams, \"carbs\": number in grams, \"fat\": number in grams }, \"portionSize\": \"estimated portion size\" }"
          },
          {
            inline_data: {
              mime_type: mimeType,
              data: base64Image
            }
          }
        ]
      }]
    };

    // Make request to Gemini API
    const apiKey = process.env.GEMINI_API_KEY || c.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return c.json({ error: 'Gemini API key not configured' }, 500);
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      return c.json({ 
        error: 'Error from Gemini API', 
        details: errorData,
        status: response.status 
      }, 500);
    }

    const data = await response.json();
    
    // Extract the text response
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textResponse) {
      return c.json({ error: 'Invalid response from Gemini API' }, 500);
    }

    // Parse the JSON response
    try {
      const calorieResult: CalorieResult = JSON.parse(textResponse);
      return c.json(calorieResult);
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      return c.json({ 
        error: 'Failed to parse Gemini response', 
        rawResponse: textResponse 
      }, 500);
    }
  } catch (error) {
    console.error('Server error:', error);
    return c.json({ 
      error: 'Server error processing request',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});
