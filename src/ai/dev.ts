import { config } from 'dotenv';
config();

import '@/ai/flows/generate-vaccination-schedule.ts';
import '@/ai/flows/get-vaccine-faqs.ts';
import '@/ai/flows/search-vaccine-info.ts';
import '@/ai/flows/translate-text-flow.ts'; // Add this line
