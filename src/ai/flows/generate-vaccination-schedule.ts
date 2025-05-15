// src/ai/flows/generate-vaccination-schedule.ts
'use server';
/**
 * @fileOverview Generates a personalized vaccination schedule for a child, including catch-up plans.
 *
 * - generateVaccinationSchedule - A function that generates the vaccination schedule.
 * - GenerateVaccinationScheduleInput - The input type for the generateVaccinationSchedule function.
 * - GenerateVaccinationScheduleOutput - The return type for the generateVaccinationSchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVaccinationScheduleInputSchema = z.object({
  childName: z.string().describe('The name of the child.'),
  childDateOfBirth: z.string().describe('The date of birth of the child (ISO format YYYY-MM-DD).'),
  vaccinationHistory: z
    .string()
    .describe(
      'A list of vaccines the child has already received, as a comma-separated string. Example: "Hepatitis B - 2023-01-15, Rotavirus - 2023-03-20, DTaP - 2023-03-20". If no history, this can be empty or a note like "No prior vaccinations".'
    ).optional(),
});
export type GenerateVaccinationScheduleInput = z.infer<typeof GenerateVaccinationScheduleInputSchema>;

const VaccineDoseSchema = z.object({
  vaccine: z.string().describe('The name of the vaccine (e.g., "Hepatitis B", "DTaP", "MMR"). Include dose number if part of a series, e.g., "DTaP (1st dose)".'),
  dueDate: z.string().describe('The recommended due date for the vaccination (ISO format YYYY-MM-DD).'),
  notes: z.string().describe('Important information about this dose, such as dose number (e.g., "1st dose of 5", "Booster dose"), or if it is part of a catch-up schedule with relevant context (e.g., "Catch-up dose 1, minimum interval from previous met"). Can also include age range, e.g., "Due at 2 months".'),
});

const GenerateVaccinationScheduleOutputSchema = z.object({
  childName: z.string().describe('The name of the child, copied from input.'),
  vaccinationSchedule: z.array(VaccineDoseSchema).describe('An array of recommended vaccine doses.'),
});
export type GenerateVaccinationScheduleOutput = z.infer<typeof GenerateVaccinationScheduleOutputSchema>;


export async function generateVaccinationSchedule(input: GenerateVaccinationScheduleInput): Promise<GenerateVaccinationScheduleOutput> {
  return generateVaccinationScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVaccinationSchedulePrompt',
  input: {schema: GenerateVaccinationScheduleInputSchema},
  output: {schema: GenerateVaccinationScheduleOutputSchema},
  prompt: `You are an expert pediatrician specializing in childhood immunizations, strictly adhering to the current CDC (Centers for Disease Control and Prevention) guidelines for the United States.
You will be given a child's name, date of birth (ISO format YYYY-MM-DD), and their vaccination history (a string, possibly comma-separated, listing vaccine names and dates, e.g., "HepB - 2023-01-15, RV - 2023-03-20" or "No prior vaccinations").

Your primary task is to generate a personalized vaccination schedule. Consider the following scenarios:
1.  **Standard Schedule:** If the child is on track with their vaccinations according to their age (calculated from date of birth and current date), provide the upcoming recommended vaccines based on CDC guidelines.
2.  **Catch-Up Schedule:** If the child has missed doses or is behind schedule (based on their age, vaccination history, and CDC guidelines), create a catch-up plan. This plan must adhere to minimum age requirements for each vaccine and minimum intervals between doses for catch-up vaccinations. Clearly indicate in the 'notes' field that a dose is part of a catch-up plan and provide specific context (e.g., "Catch-up: 1st DTaP dose", "Catch-up: 2nd Hib dose, ensure minimum 4 weeks from 1st Hib dose").
3.  **Completed Series:** If a vaccine series is complete according to the provided history and the child's current age, do not list further doses for that specific vaccine series unless a booster is appropriately due based on CDC guidelines (e.g., Tdap booster at age 11-12).

For each recommended vaccine dose in the schedule, provide:
-   'vaccine': The common name of the vaccine (e.g., "Hepatitis B", "DTaP", "MMR"). If it's part of a multi-dose series, clearly indicate the dose number (e.g., "DTaP (3rd dose of 5)", "Polio (IPV) (2nd dose)").
-   'dueDate': The recommended due date for the vaccination, formatted as an ISO string (YYYY-MM-DD). Calculate this based on the child's age, history, and CDC guidelines for timing and intervals.
-   'notes': Essential information related to this specific dose. This MUST include the dose number in the series (e.g., "1st dose", "Booster at 4-6 years") and any relevant catch-up details as described above. Also include the recommended age for this dose (e.g., "Typically given at 2 months of age", "Catch-up dose for age 14 months").

Format the entire output strictly as a JSON object matching the provided output schema.
The 'vaccinationSchedule' should be an array of vaccine dose objects.
Return the child's name as provided in the input.
Prioritize safety, accuracy, and strict adherence to established CDC catch-up guidelines and routine immunization schedules.
Do not include vaccines that are not routinely recommended by the CDC for children in the US unless specifically justified by catch-up needs for a universally recommended vaccine.
If vaccination history is empty or "No prior vaccinations", generate a schedule starting from the appropriate point for the child's current age.
If vaccination history is provided, carefully analyze it against the child's age to determine which doses are due, overdue, or part of a catch-up sequence.
Assume today's date is {{currentDate}}. Use this to calculate the child's current age.`,
  config: {
    // Loosen safety settings a bit for medical topics, but be mindful.
    safetySettings: [
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  }
});

const generateVaccinationScheduleFlow = ai.defineFlow(
  {
    name: 'generateVaccinationScheduleFlow',
    inputSchema: GenerateVaccinationScheduleInputSchema,
    outputSchema: GenerateVaccinationScheduleOutputSchema,
  },
  async (input) => {
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const {output} = await prompt({...input, currentDate});
    
    if (!output) {
      throw new Error('AI model did not return a valid vaccination schedule.');
    }
    // Ensure the output includes the child's name and an array for the schedule, even if empty.
    return {
      childName: output.childName || input.childName, // Fallback to input name
      vaccinationSchedule: output.vaccinationSchedule || [],
    };
  }
);
