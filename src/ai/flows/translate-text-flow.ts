'use server';
/**
 * @fileOverview Translates text to a specified target language.
 *
 * - translateText - A function that handles the text translation.
 * - TranslateTextInput - The input type for the translateText function.
 * - TranslateTextOutput - The return type for the translateText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateTextInputSchema = z.object({
  text: z.string().describe('The text to be translated.'),
  targetLanguage: z.string().describe('The target language for translation (e.g., "Bangla", "Spanish", "French"). Please provide the full language name.'),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

const TranslateTextOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateTextOutput = z.infer<typeof TranslateTextOutputSchema>;

export async function translateText(input: TranslateTextInput): Promise<TranslateTextOutput> {
  return translateTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateTextPrompt',
  input: {schema: TranslateTextInputSchema},
  output: {schema: TranslateTextOutputSchema},
  prompt: `You are a helpful translation assistant. Translate the following text into {{targetLanguage}}.
Provide only the translated text itself, without any additional explanations, introductory phrases, or conversational filler.
If the input text is very short or a common phrase, ensure the translation is natural and contextually appropriate for that language.

Original Text:
"{{{text}}}"

Translated Text in {{targetLanguage}}:
`,
  // Using a model that is good for multilingual tasks. Gemini Flash is generally good.
  // If higher quality translation is needed, consider a more powerful model or a specialized translation API.
  // Temperature set to 0 for more deterministic, less creative translations.
  config: {
    temperature: 0.1, 
  }
});

const translateTextFlow = ai.defineFlow(
  {
    name: 'translateTextFlow',
    inputSchema: TranslateTextInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  async (input) => {
    // Basic input validation
    if (!input.text || input.text.trim() === "") {
        return { translatedText: "" }; // Return empty if input is empty
    }
    if (!input.targetLanguage || input.targetLanguage.trim() === "") {
        throw new Error('Target language must be specified for translation.');
    }

    const {output} = await prompt(input);
    if (!output || typeof output.translatedText !== 'string') { // Check if translatedText is a string
      // Log the actual output for debugging
      console.error('Invalid translation output from model:', output);
      throw new Error('AI model did not return a valid translation. The output was not in the expected format.');
    }
    return output;
  }
);
