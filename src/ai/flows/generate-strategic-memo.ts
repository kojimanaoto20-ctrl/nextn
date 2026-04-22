
'use server';
/**
 * @fileOverview A Genkit flow for generating a concise strategic memo based on company ecosystem analysis inputs and calculated scores.
 *
 * - generateStrategicMemo - A function that handles the strategic memo generation process.
 * - GenerateStrategicMemoInput - The input type for the generateStrategicMemo function.
 * - GenerateStrategicMemoOutput - The return type for the generateStrategicMemo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateStrategicMemoInputSchema = z.object({
  companyName: z.string().describe('The name of the company being analyzed.'),
  industry: z.string().describe('The industry the company operates in.'),
  businessModel: z.string().describe('Description of the company\'s business model.'),
  coreTechnology: z.string().describe('Description of the company\'s core technology.'),
  complementors: z.string().describe('Key complementors in the company\'s ecosystem.'),
  competitors: z.string().describe('Main competitors in the market.'),
  monetizationModel: z.string().describe('How the company generates revenue.'),
  networkEffects: z.string().describe('Description of network effects present in the ecosystem.'),
  switchingCosts: z.string().describe('Description of customer switching costs.'),
  multihomingRisk: z.string().describe('Assessment of multihoming risk.'),
  disintermediationRisk: z.string().describe('Assessment of disintermediation risk.'),
  platformStrengthScore: z.number().min(0).max(100).describe('Calculated Platform Strength Score (0-100).'),
  ecosystemRiskScore: z.number().min(0).max(100).describe('Calculated Ecosystem Risk Score (0-100).'),
  valueCaptureRiskScore: z.number().min(0).max(100).describe('Calculated Value Capture Risk Score (0-100).'),
});
export type GenerateStrategicMemoInput = z.infer<typeof GenerateStrategicMemoInputSchema>;

const GenerateStrategicMemoOutputSchema = z.object({
  strategicMemo: z.string().describe('A concise strategic memo with key insights, implications, and recommendations.'),
});
export type GenerateStrategicMemoOutput = z.infer<typeof GenerateStrategicMemoOutputSchema>;

const strategicMemoPrompt = ai.definePrompt({
  name: 'strategicMemoPrompt',
  input: { schema: GenerateStrategicMemoInputSchema },
  output: { schema: GenerateStrategicMemoOutputSchema },
  prompt: `You are a highly experienced business analyst specializing in technology strategy. Your task is to generate a concise strategic memo based on the provided company ecosystem analysis. The memo should highlight key insights, strategic implications, and actionable recommendations for stakeholders.

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
DisintermediationRisk: {{{disintermediationRisk}}}

Calculated Scores:
Platform Strength Score: {{{platformStrengthScore}}} / 100
Ecosystem Risk Score: {{{ecosystemRiskScore}}} / 100
Value Capture Risk Score: {{{valueCaptureRiskScore}}} / 100

Based on this information, provide a strategic memo. The memo should be structured with the following sections: Executive Summary, Key Insights, Strategic Implications, and Recommendations.`,
});

const generateStrategicMemoFlow = ai.defineFlow(
  {
    name: 'generateStrategicMemoFlow',
    inputSchema: GenerateStrategicMemoInputSchema,
    outputSchema: GenerateStrategicMemoOutputSchema,
  },
  async (input) => {
    const { output } = await strategicMemoPrompt(input);
    return output!;
  }
);

export async function generateStrategicMemo(input: GenerateStrategicMemoInput): Promise<GenerateStrategicMemoOutput> {
  return generateStrategicMemoFlow(input);
}
