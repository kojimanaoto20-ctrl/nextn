
'use server';
/**
 * @fileOverview This file implements a Genkit flow to perform a comprehensive 
 * ecosystem analysis of a company based on its website URL.
 *
 * - analyzeCompany - The main function for URL-based company analysis.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RatingLevelSchema = z.enum(['Low', 'Middle', 'High']);
const RatingDetailSchema = z.object({
  level: RatingLevelSchema,
  explanation: z.string().describe('2-3 sentences explaining the rating.'),
});

const AnalyzeCompanyInputSchema = z.object({
  companyUrl: z.string().describe('The website URL of the company to analyze.'),
});

const AnalyzeCompanyOutputSchema = z.object({
  companyName: z.string(),
  industry: z.string(),
  ratings: z.object({
    networkEffects: RatingDetailSchema,
    switchingCosts: RatingDetailSchema,
    multihomingRisk: RatingDetailSchema,
    disintermediationRisk: RatingDetailSchema,
    platformStrength: RatingDetailSchema,
  }),
  strategicMemo: z.string().describe('A concise strategic memo with executive summary and recommendations.'),
});

export type AnalyzeCompanyOutput = z.infer<typeof AnalyzeCompanyOutputSchema>;

const analysisPrompt = ai.definePrompt({
  name: 'analyzeCompanyPrompt',
  input: {schema: AnalyzeCompanyInputSchema},
  output: {schema: AnalyzeCompanyOutputSchema},
  prompt: `You are an expert business analyst from Columbia Business School. 
Analyze the company located at: {{{companyUrl}}}

Using your knowledge of this company and its industry, perform a strategic ecosystem assessment.
1. Identify the company name and industry.
2. For each of the following dimensions, provide a rating (Low, Middle, High) and a 2-3 sentence explanation of WHY:
   - Network Effects (Direct/Indirect)
   - Switching Costs
   - Multihoming Risk
   - Disintermediation Risk
   - Platform Strength (Overall resilience)
3. Provide a concise Strategic Memo summarizing the key insights and recommendations.

Be rigorous and insightful, focusing on platform dynamics and technology strategy.`,
});

const analyzeCompanyFlow = ai.defineFlow(
  {
    name: 'analyzeCompanyFlow',
    inputSchema: AnalyzeCompanyInputSchema,
    outputSchema: AnalyzeCompanyOutputSchema,
  },
  async (input) => {
    const {output} = await analysisPrompt(input);
    return output!;
  }
);

export async function analyzeCompany(input: {companyUrl: string}): Promise<AnalyzeCompanyOutput> {
  return analyzeCompanyFlow(input);
}
