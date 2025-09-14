import { GoogleGenAI, Type } from "@google/genai";
import { Game } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const gameSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A catchy name for the game." },
    rules: { type: Type.STRING, description: "Simple, step-by-step instructions for a child and an adult." },
    learning: { type: Type.STRING, description: "What observational or drawing skill the child learns." },
    alternative: { type: Type.STRING, description: "A variation or different way to play the game." },
  },
  required: ["title", "rules", "learning", "alternative"],
};

export async function generateGame(existingGames: Game[]): Promise<Partial<Game>> {
  try {
    const fewShotExamples = existingGames.slice(0, 2).map(g => JSON.stringify({ title: g.title, rules: g.rules, learning: g.learning, alternative: g.alternative })).join('\n');

    const prompt = `
      You are an expert in creating educational drawing games for children, in the style of "Drawing Games for Little Observers".
      Your goal is to invent a new, unique drawing game for a child and an adult to play together. The game should be simple, encourage observation, and build confidence.

      Here are some examples of existing games for you to learn the style and structure:
      ${fewShotExamples}

      Please generate one new game that is in the examples provided or is similar but new.
      Return the response as a single JSON object that adheres to the provided schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: gameSchema,
      },
    });

    const gameText = response.text.trim();
    const newGame = JSON.parse(gameText) as Partial<Game>;
    return newGame;
  } catch (error) {
    console.error("Error generating game:", error);
    throw new Error("Could not generate a new game.");
  }
}

export async function generateImageForGame(game: Partial<Game>): Promise<string> {
    try {
        if (!game.title || !game.rules) {
            throw new Error("Game title and rules are required to generate an image.");
        }
        
        const rulesSnippet = game.rules.length > 150 ? game.rules.substring(0, 150) + '...' : game.rules;
        
        const imagePrompt = `A whimsical and colorful children's book illustration. A small stick figure and a large stick figure are joyfully playing a drawing game called "${game.title}". The illustration captures this main activity: "${rulesSnippet}". The art style is warm, friendly, and painterly, set in a cozy, sunlit room.`;


        const imageResponse = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: imagePrompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/png',
              aspectRatio: '1:1',
            },
        });

        const image = imageResponse.generatedImages?.[0]?.image;

        if (image && image.imageBytes) {
            const base64ImageBytes = image.imageBytes;
            return `data:image/png;base64,${base64ImageBytes}`;
        } else {
            // Improved logging for better debugging
            console.error("Image generation response was empty or malformed:", JSON.stringify(imageResponse, null, 2));
            throw new Error("The image generator did not return an image. This might be due to a safety filter or a temporary issue.");
        }
    } catch (error) {
        console.error("Error generating image:", error);
        // Avoid re-throwing a generic error if a specific one was already thrown.
        if (error instanceof Error && error.message.startsWith("The image generator did not return an image")) {
            throw error;
        }
        throw new Error("Could not generate an illustration for the game.");
    }
}