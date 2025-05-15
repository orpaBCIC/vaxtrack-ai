// src/ai/flows/search-vaccine-info.ts
'use server';
/**
 * @fileOverview AI flow to search for and provide detailed information about vaccines.
 *
 * - searchVaccineInfo - A function that triggers the AI flow to find vaccine details.
 * - SearchVaccineInfoInput - The input type for the searchVaccineInfo function.
 * - SearchVaccineInfoOutput - The return type for the searchVaccineInfo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SearchVaccineInfoInputSchema = z.object({
  vaccineQuery: z.string().describe('The user query, which can be a vaccine name, symptoms, or a general question about vaccines (e.g., "MMR vaccine details", "polio", "vaccines for 2 month old", "side effects of flu shot").'),
});
export type SearchVaccineInfoInput = z.infer<typeof SearchVaccineInfoInputSchema>;

const SearchedVaccineInfoSchema = z.object({
  vaccineName: z.string().describe("The identified common name of the vaccine. If the query was about symptoms or general, this might be a suggested vaccine or 'General Information' if no single vaccine is identified."),
  isIdentified: z.boolean().describe("True if a specific vaccine was clearly identified based on the query, false if the information is more general or covers multiple possibilities."),
  description: z.string().describe("A detailed description of the vaccine (or general information if not specifically identified). Explain what diseases it protects against."),
  usageSummary: z.string().describe("Summary of who should typically get this vaccine and when (e.g., age groups, specific risk conditions, if it's part of a routine schedule)."),
  commonBenefits: z.array(z.string()).describe("A list of 3-5 key common benefits of the vaccine."),
  commonSideEffects: z.array(z.string()).describe("A list of 3-5 common, usually mild, side effects."),
  importantConsiderations: z.array(z.string()).describe("A list of other important considerations, such as contraindications, serious but rare side effects to watch for, or when to consult a doctor. Include a note if specific groups should be cautious."),
  administrationSchedule: z.string().describe("Typical administration schedule including number of doses, intervals between doses, and any boosters, if applicable. State if it varies."),
  sourceInformation: z.string().default("Information synthesized from general medical knowledge based on publicly available data from health authorities like WHO and CDC. Always consult a healthcare professional for medical advice.").describe("A brief statement about the source or nature of the information provided."),
});
export type SearchedVaccineInfo = z.infer<typeof SearchedVaccineInfoSchema>;

const SearchVaccineInfoOutputSchema = z.object({
  results: z.array(SearchedVaccineInfoSchema).describe("An array of found vaccine information. This may contain one or more vaccines if the query is broad, or be empty if no relevant information is found. Prioritize the most relevant vaccine if a specific name is queried."),
  queryAnalysis: z.string().describe("A brief analysis of the user's query and a summary of how the information was derived or what the results represent, e.g., 'Showing information for the MMR vaccine as requested.' or 'Based on the symptoms described, here is information about relevant vaccines.'"),
});
export type SearchedVaccineInfoResult = z.infer<typeof SearchVaccineInfoOutputSchema>; // Renaming for clarity in components

export async function searchVaccineInfo(input: SearchVaccineInfoInput): Promise<SearchedVaccineInfoResult> {
  return searchVaccineInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchVaccineInfoPrompt',
  input: { schema: SearchVaccineInfoInputSchema },
  output: { schema: SearchVaccineInfoOutputSchema },
  prompt: `You are an expert AI medical information assistant specializing in global vaccine knowledge. Your information is based on a comprehensive understanding of data from reputable public health organizations like the World Health Organization (WHO), Centers for Disease Control and Prevention (CDC), European Medicines Agency (EMA), and other national health bodies. Your goal is to provide accurate, detailed, and easy-to-understand information about vaccines in response to user queries.

User Query: "{{{vaccineQuery}}}"

Based on this query, please perform the following:
1.  **Analyze the Query**: Briefly explain your understanding of the user's query in the 'queryAnalysis' field. For example, if they asked for "MMR", state that you are providing info on MMR. If they described symptoms, explain how you linked them to potential vaccines.
2.  **Identify Vaccine(s)**: Determine the most relevant vaccine(s) related to the query.
    *   If a specific vaccine name is mentioned (e.g., "Hepatitis B", "Flu shot"), focus on that vaccine. Set 'isIdentified' to true.
    *   If symptoms or a general category is mentioned (e.g., "vaccines for travel to Africa", "protection against measles"), identify relevant vaccine(s). 'isIdentified' can be true if a primary vaccine is clear, or false if providing broader info.
    *   If the query is very broad or unclear for a specific vaccine, 'vaccineName' could be "General Vaccine Information" and 'isIdentified' false.
3.  **Provide Detailed Information**: For each identified vaccine (or general info), populate the fields in the 'results' array:
    *   **vaccineName**: Common name of the vaccine.
    *   **isIdentified**: Boolean.
    *   **description**: What is the vaccine, what diseases does it protect against, and why is it important?
    *   **usageSummary**: Who is it for (age groups, special conditions)? When is it typically given?
    *   **commonBenefits**: List 3-5 key benefits.
    *   **commonSideEffects**: List 3-5 common, generally mild side effects.
    *   **importantConsiderations**: Critical information like major contraindications, rare but serious side effects, when to seek medical attention, or advice for specific populations (e.g., pregnant women, immunocompromised individuals, if applicable).
    *   **administrationSchedule**: Typical dosing schedule: number of doses, timing/intervals, boosters. Mention if it's complex or varies.
    *   **sourceInformation**: Use the default: "Information synthesized from general medical knowledge based on publicly available data from health authorities like WHO and CDC. Always consult a healthcare professional for medical advice."

**Guidelines**:
*   Prioritize accuracy and safety.
*   Use clear, parent-friendly language.
*   If multiple vaccines are relevant for a general query, you can return information for 1-2 of the most prominent ones.
*   If no specific vaccine can be reasonably identified or the query is too vague, provide general advice on consulting a doctor and set 'isIdentified' to false for the result item.
*   Ensure the output strictly adheres to the JSON schema provided.
*   Do not provide direct medical advice or diagnoses. Emphasize consultation with healthcare professionals.
*   For "world" queries, focus on widely accepted information but acknowledge that specific recommendations can vary by country and individuals should consult local health authorities.

Generate the response.
`,
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
    temperature: 0.3, // Lower temperature for more factual, less creative responses
  },
});

const searchVaccineInfoFlow = ai.defineFlow(
  {
    name: 'searchVaccineInfoFlow',
    inputSchema: SearchVaccineInfoInputSchema,
    outputSchema: SearchVaccineInfoOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);

    if (!output) {
      throw new Error('AI model did not return valid vaccine information.');
    }
    
    // Ensure results array exists, even if empty
    if (!output.results) {
        output.results = [];
    }
    if (!output.queryAnalysis) {
        output.queryAnalysis = "The AI model provided results for your query." // Default if model misses it
    }

    return output;
  }
);
