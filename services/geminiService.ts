import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const MAX_IMAGES_PER_REQUEST = 4;

const stylePrompts: { [key: string]: string } = {
  'flat': 'modern, flat, vector-style',
  'gradient': 'modern, vector-style icon with a smooth, vibrant color gradient',
  '3d': 'photorealistic 3D rendered',
  'line-art': 'minimalist, single-line art style',
  'pixel-art': '8-bit pixel art style',
  'claymorphic': 'cute, claymorphic 3D style with soft shadows',
  'origami': 'paper origami style',
  'isometric': 'clean, isometric 3D style',
};

export const generateIconsBatch = async (prompt: string, batchSize: number, style: string, generateVariations: boolean): Promise<string[]> => {
  try {
    const styleDescription = stylePrompts[style] || stylePrompts['flat'];
    
    let fullPrompt: string;
    if (generateVariations) {
      fullPrompt = `Generate slight variations of a single concept for a ${styleDescription} application icon of: "${prompt}". The core concept should be consistent across all images, but with subtle differences in angle, color shading, or minor details. All icons should be simple, clean, and professional, centered on a solid neutral colored background.`;
    } else {
      fullPrompt = `A ${styleDescription} application icon of: "${prompt}". The icon should be simple, clean, and professional. Centered on a solid neutral colored background.`;
    }
    
    const apiCalls: Promise<any>[] = [];
    let remainingIcons = batchSize;

    while (remainingIcons > 0) {
      const currentBatchSize = Math.min(remainingIcons, MAX_IMAGES_PER_REQUEST);
      
      const promise = ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
          numberOfImages: currentBatchSize,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
      });
      apiCalls.push(promise);
      
      remainingIcons -= currentBatchSize;
    }

    const responses = await Promise.all(apiCalls);
    
    const imageUrls = responses.flatMap(response => {
        if (!response.generatedImages || response.generatedImages.length === 0) {
            // This error will be caught by the outer catch block.
            throw new Error("The API did not return any images in one of the batches. Try a different prompt.");
        }
        return response.generatedImages.map(img => {
            const base64ImageBytes = img.image.imageBytes;
            return `data:image/png;base64,${base64ImageBytes}`;
        });
    });

    return imageUrls;

  } catch (error) {
    console.error("Error generating icons:", error);
    
    // The error could be an Error instance, a string, or an object from the API.
    // We create a string representation to analyze it.
    const errorMessage = error instanceof Error ? error.message : String(error);

    let userFriendlyMessage: string;

    // Check for specific, common API errors first.
    if (errorMessage.toLowerCase().includes('api key not valid')) {
        userFriendlyMessage = "Your API Key is not valid. Please check your configuration.";
    } else if (errorMessage.toLowerCase().includes('safety') || errorMessage.toLowerCase().includes('blocked')) {
        userFriendlyMessage = "Your prompt was blocked due to safety policies. Please try a different, more general prompt.";
    } else if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('quota') || errorMessage.toLowerCase().includes('resource_exhausted')) {
        userFriendlyMessage = "You have exceeded your request quota. Please check your plan and billing details, then try again later.";
    } else {
        // If it's none of the above, it might be a different API error with a useful message.
        // Let's try to parse it as JSON to extract the core message.
        try {
            // Error messages can sometimes be prefixed with text, so we find the start of the JSON object.
            const jsonStartIndex = errorMessage.indexOf('{');
            const jsonString = jsonStartIndex > -1 ? errorMessage.substring(jsonStartIndex) : errorMessage;
            const parsedError = JSON.parse(jsonString);
            
            // Use the message from the API response if available.
            const messageFromServer = parsedError?.error?.message || "An unexpected error occurred.";
            userFriendlyMessage = `Failed to generate icons. ${messageFromServer}`;

        } catch (e) {
            // If it's not a JSON error, it's likely a network issue or an unexpected SDK error.
            userFriendlyMessage = "An unexpected network or server error occurred. Please try again.";
        }
    }
    
    throw new Error(userFriendlyMessage);
  }
};
