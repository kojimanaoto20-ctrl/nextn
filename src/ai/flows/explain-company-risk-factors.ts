
'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate AI-driven explanations
 * of specific score breakdowns and critical risk factors for a company's ecosystem analysis.
 *
 * - explainCompanyRiskFactors - A function that handles the generation of explanations.
 * - ExplainCompanyRiskFactorsInput - The input type for the explainCompanyRiskFactors function.
 * - ExplainCompanyRiskFactorsOutput - The return type for the explainCompanyRiskFactors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCompanyRiskFactorsInputSchema = z.object({
  companyName: z.string().describe('The name of the company being analyzed.'),
  industry: z.string().describe('The industry the company operates in.'),
  businessModel: z.string().describe('The company\'s business model.'),
  coreTechnology: z.string().describe('The core technology or platform of the company.'),
  complementors: z.string().describe('Key complementors in the company\'s ecosystem.'),
  competitors: z.string().describe('Key competitors in the company\'s market.'),
  monetizationModel: z.string().describe('How the company generates revenue.'),
  networkEffects: z
    .string()
    .describe(
      'Description of network effects present in the company\'s ecosystem (e.g., direct, indirect, two-sided).'
    ),
  switchingCosts: z.string().describe('Description of switching costs for users or customers.'),
  multihomingRisk: z
    .string()
    .describe('Description of multihoming risk (users using multiple platforms simultaneously).'),
  disintermediationRisk: z
    .string()
    .describe('Description of disintermediation risk (bypassing the platform).'),
  platformStrengthScore: z.number().describe('The calculated Platform Strength Score (0-100).'),
  ecosystemRiskScore: z.number().describe('The calculated Ecosystem Risk Score (0-100).'),
  valueCaptureRiskScore: z.number().describe('The calculated Value Capture Risk Score (0-100).'),
});
export type ExplainCompanyRiskFactorsInput = z.infer<
  typeof ExplainCompanyRiskFactorsInputSchema
>;

const ExplainCompanyRiskFactorsOutputSchema = z.object({
  explanation: z
    .string()
    .describe('A detailed explanation of the score breakdowns and critical risk factors for the company.'),
});
export type ExplainCompanyRiskFactorsOutput = z.infer<
  typeof ExplainCompanyRiskFactorsOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'explainCompanyRiskFactorsPrompt',
  input: {schema: ExplainCompanyRiskFactorsInputSchema},
  output: {schema: ExplainCompanyRiskFactorsOutputSchema},
  prompt: `You are an expert business analyst specializing in technology strategy and ecosystem analysis. Your task is to provide a concise and insightful explanation of the score breakdowns and critical risk factors for the company provided below.

Focus on the implications of each score (Platform Strength, Ecosystem Risk, Value Capture Risk) and highlight the most critical risk factors based on the detailed company information.

Company: {{{companyName}}}
Industry: {{{industry}}}
Business Model: {{{businessModel}}}
Core Technology: {{{coreTechnology}}}
Complementors: {{{complementors}}}
Competitors: {{{competitors}}}
Monetization Model: {{{monetizationModel}}}
Network Effects: {{{networkEffects}}}
Switching Costs: {{{switchingCosts}}}
Multihoming Risk: {{{multihomingRisk}}}
Disintermediation Risk: {{{disintermediationRisk}}}

Platform Strength Score: {{{platformStrengthScore}}}/100
Ecosystem Risk Score: {{{ecosystemRiskScore}}}/100
Value Capture Risk Score: {{{valueCaptureRiskScore}}}/100

Based on the above information, explain the score breakdowns and identify the most critical risk factors for {{{companyName}}}'s ecosystem. Your explanation should be clear, concise, and actionable, similar to a strategic memo.`,
});

const explainCompanyRiskFactorsFlow = ai.defineFlow(
  {
    name: 'explainCompanyRiskFactorsFlow',
    inputSchema: ExplainCompanyRiskFactorsInputSchema,
    outputSchema: ExplainCompanyRiskFactorsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);

export async function explainCompanyRiskFactors(
  input: ExplainCompanyRiskFactorsInput
): Promise<ExplainCompanyRiskFactorsOutput> {
  return explainCompanyRiskFactorsFlow(input);
}
