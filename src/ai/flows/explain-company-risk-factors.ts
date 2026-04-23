'use server';
/**
 * @fileOverview This file implements a Genkit flow to perform a comprehensive 
 * ecosystem analysis of a company based on its website URL.
 *
 * - analyzeCompany - The main function for URL-based company analysis.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RatingLevelSchema = z.enum(['Low', 'Medium', 'High']);
const RatingDetailSchema = z.object({
  level: RatingLevelSchema,
  explanation: z.string().describe('2-3 sentences explaining the specific rating for this company.'),
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
    valueCaptureRisk: RatingDetailSchema,
  }),
  strategicMemo: z.string().describe('A formal strategic memo (200-300 words) summarizing key insights and actionable recommendations.'),
});

export type AnalyzeCompanyOutput = z.infer<typeof AnalyzeCompanyOutputSchema>;

const analysisPrompt = ai.definePrompt({
  name: 'analyzeCompanyPrompt',
  input: {schema: AnalyzeCompanyInputSchema},
  output: {schema: AnalyzeCompanyOutputSchema},
  prompt: `You are a world-class technology strategist and business analyst specializing in platform strategy.
Analyze the company located at: {{{companyUrl}}}

Using your extensive knowledge of this company and its industry ecosystem, perform a rigorous strategic assessment using our core frameworks.

1. Identify the official Company Name and Primary Industry.
2. For each of the following 6 dimensions, provide a qualitative rating (Low, Middle, High) and a precise 2-3 sentence explanation of WHY that rating was assigned:
   - Network Effects (The power of direct and indirect value growth as the user base expands)
   - Switching Costs (The friction/cost for users to leave for a competitor)
   - Multihoming Risk (The ease with which users can use rival platforms simultaneously)
   - Disintermediation Risk (The risk of users bypassing the platform to transact directly)
   - Platform Strength (The overall resilience and defensive moat of the platform)
   - Value Capture Risk (The threat that the platform cannot monetize the value it creates)

Important: Always output the company name in English (e.g. "Techtouch Inc." not "Techtouch株式会社"). Use Low, Medium, or High for all ratings.

3. Conclude with a Strategic Memo:
   Provide an executive summary of the company's competitive position, highlighting the most critical risk and the biggest opportunity for platform growth.

Be insightful, analytical, and professional.`,
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
