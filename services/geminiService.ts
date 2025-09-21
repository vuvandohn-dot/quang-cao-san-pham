
import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";
import type { AdvertisingStyle, HighlightOptionsState } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = async (file: File) => {
    const base64EncodedData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
    return {
        inlineData: {
            data: base64EncodedData,
            mimeType: file.type,
        },
    };
};

const buildPrompt = (description: string, style: AdvertisingStyle, options: HighlightOptionsState): string => {
    const requirements = [
        options.productHighlight ? 'The product must be the primary focus, drawing the viewer\'s attention.' : '',
        options.keepDetails ? 'Preserve all details, labels, and text on the product clearly and sharply.' : '',
        options.rimLight ? 'Add a subtle, professional rim light to the product to make it stand out from the background.' : ''
    ].filter(Boolean).join('\n- ');

    return `
        Create a professional, ultra-realistic 4K advertising photograph.

        **Base Images:**
        - Use the provided image of the model.
        - Seamlessly integrate the provided product image. The model should appear to be holding or interacting with the product naturally and realistically.

        **User's Vision:** "${description}"

        **Style:** The overall aesthetic should be "${style}". Create a background and lighting that perfectly matches this style.

        **Key Requirements:**
        - ${requirements}

        Generate only the final image. Do not add any text, logos, or watermarks to the image. The final output must be just the image.
    `;
};

export const generateAdImage = async (
    modelFile: File,
    productFile: File,
    description: string,
    style: AdvertisingStyle,
    options: HighlightOptionsState
): Promise<string> => {
    const modelPart = await fileToGenerativePart(modelFile);
    const productPart = await fileToGenerativePart(productFile);
    const textPrompt = buildPrompt(description, style, options);

    const textPart = { text: textPrompt };

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [modelPart, productPart, textPart],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        // Find the image part in the response
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const mimeType = part.inlineData.mimeType;
                return `data:${mimeType};base64,${base64ImageBytes}`;
            }
        }
        
        throw new Error("AI did not return an image. It might have refused the request.");

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate image. Please check the console for details.");
    }
};
