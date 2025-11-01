
import { GoogleGenAI, Type, Part } from '@google/genai';
import { Recipe } from '../types';
import { GEMINI_MODEL } from '../constants';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipes: {
      type: Type.ARRAY,
      description: 'An array of 5 recipe objects.',
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: 'The title of the recipe.' },
          description: { type: Type.STRING, description: 'A short, enticing description of the dish.' },
          difficulty: {
            type: Type.STRING,
            enum: ['Easy', 'Medium', 'Hard'],
            description: 'The cooking difficulty level.',
          },
          prepTime: {
            type: Type.STRING,
            description: "Estimated preparation and cooking time, e.g., '45 mins'.",
          },
          calories: {
            type: Type.NUMBER,
            description: 'Estimated calorie count per serving.',
          },
          ingredients: {
            type: Type.ARRAY,
            description: 'List of all ingredients for the recipe.',
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: 'Name of the ingredient.' },
                quantity: { type: Type.STRING, description: 'Amount of the ingredient, e.g., "1 cup" or "2 tbsp".' },
                present: {
                  type: Type.BOOLEAN,
                  description: 'Set to true if this ingredient is likely visible in the user-provided image, otherwise false.',
                },
              },
              required: ['name', 'quantity', 'present'],
            },
          },
          steps: {
            type: Type.ARRAY,
            description: 'Step-by-step cooking instructions.',
            items: { type: Type.STRING },
          },
          dietaryTags: {
            type: Type.ARRAY,
            description: 'Applicable dietary tags like "Vegetarian", "Gluten-Free", etc.',
            items: {
              type: Type.STRING,
              enum: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Dairy-Free', 'Nut-Free'],
            },
          },
        },
        required: ['name', 'description', 'difficulty', 'prepTime', 'calories', 'ingredients', 'steps', 'dietaryTags'],
      },
    },
  },
  required: ['recipes'],
};

export async function generateRecipes(imagePart: Part, dietaryRestrictions: string[]): Promise<Recipe[]> {
  const dietaryPrompt = dietaryRestrictions.length > 0 
    ? `The user has the following dietary restrictions: ${dietaryRestrictions.join(', ')}. All recipes must adhere to these.` 
    : 'There are no specific dietary restrictions.';

  const prompt = `Analyze this image of a refrigerator's contents. Identify all edible ingredients. Based on the identified ingredients, generate 5 creative and diverse recipes. For each recipe, list all required ingredients, clearly marking which ones are present in the image and which are not. ${dietaryPrompt}. Provide detailed, step-by-step instructions for each recipe. Ensure the output is a valid JSON object matching the provided schema.`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: { parts: [imagePart, { text: prompt }] },
    config: {
      responseMimeType: 'application/json',
      responseSchema: recipeSchema,
    },
  });

  const jsonText = response.text.trim();
  try {
    const parsedJson = JSON.parse(jsonText);
    return parsedJson.recipes || [];
  } catch (e) {
    console.error("Failed to parse JSON response:", e);
    console.error("Received text:", jsonText);
    return [];
  }
}

export async function fileToGenerativePart(file: File): Promise<Part> {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}
