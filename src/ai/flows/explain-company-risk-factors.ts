'use server';

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
    winnerTakeAllDynamics: RatingDetailSchema,
    networkEffectQuality: RatingDetailSchema,
    revenueAnchorClarity: RatingDetailSchema,
    platformInitiationMaturity: RatingDetailSchema,
    competitiveVulnerability: RatingDetailSchema,
    nonMarketRisk: RatingDetailSchema,
    disintermediationRisk: RatingDetailSchema,
    networkCoverSustainability: RatingDetailSchema,
  }),
  strategicMemo: z.string().describe('A formal strategic memo (200-300 words) summarizing key insights and actionable recommendations.'),
});

export type AnalyzeCompanyOutput = z.infer<typeof AnalyzeCompanyOutputSchema>;

const analysisPrompt = ai.definePrompt({
  name: 'analyzeCompanyPrompt',
  input: {schema: AnalyzeCompanyInputSchema},
  output: {schema: AnalyzeCompanyOutputSchema},
  prompt: `You are a world-class technology strategist specializing in platform economics, drawing on graduate-level frameworks from courses on Uber, LinkedIn, and Google.
Analyze the company located at: {{{companyUrl}}}

Using your extensive knowledge of this company and its industry, perform a rigorous 8-dimension platform strategy assessment.

1. Identify the official Company Name (in English) and Primary Industry.

2. For each of the following 8 dimensions, provide a qualitative rating (Low, Medium, or High) and a precise 2-3 sentence explanation. Ratings reflect the strength/maturity of a positive attribute, or the severity of a risk.

STRENGTHS (High = strong/favorable):

- Winner-Take-All Dynamics: Assess across 4 axes — (1) Multi-homing costs: how hard is it for users/suppliers to use rival platforms simultaneously? (2) Preference for standardization: do users benefit from everyone being on the same platform? (3) Necessity of intermediation: is the platform essential to the transaction? (4) Dispersion of user power: are buyers/sellers fragmented? High = market structure favors winner-take-all or winner-take-most. Low = fragmented, no-winner dynamics.

- Network Effect Quality: Evaluate the type (direct vs. indirect), density (how tightly nodes are connected), and breadth (single-sided vs. multi-sided). High = strong direct AND indirect effects with high density. Low = weak or single-sided effects with sparse connections.

- Revenue Anchor Clarity: Identify which side of the platform is the true revenue source versus which side is subsidized (the "Network Cover"). Does the platform have a clear, functioning monetization anchor? High = clear paying side with a sustainable cover story for the subsidized side. Low = monetization model is unclear or misaligned with the platform's primary value.

- Platform Initiation Maturity: Assess whether the company has solved the Cold Start problem and how far along the Product-to-Platform transition it is. High = fully mature platform with solved bootstrapping, strong flywheel. Low = still in product/pipeline mode or early-stage platform with cold start challenges.

RISKS (High = severe risk):

- Competitive Vulnerability: Assess two attack vectors — (1) Niche Attack: risk of a specialized competitor capturing a high-value segment; (2) Envelopment: risk of an adjacent platform bundling this platform's functionality. High = highly exposed to both. Low = well-defended on both fronts.

- Non-Market Risk: Evaluate three categories — (1) Governance risk: exposure to user fraud, misinformation, or platform abuse; (2) Regulatory risk: antitrust, data privacy, or sector-specific regulation threats; (3) Dependency risk: over-reliance on a single supplier, partner, or infrastructure provider. High = significant exposure across multiple categories. Low = minimal non-market threats.

- Disintermediation Risk: Assess the risk that users bypass the platform to transact directly, linked to "Necessity of Intermediation." High = platform is easily bypassed after initial matching (e.g., freelancers leaving after first contact). Low = platform remains essential throughout the transaction lifecycle.

- Network Cover Sustainability: Assess whether the platform's "cover story" — the non-monetized value proposition used to attract the subsidized side (e.g., "learning" for LinkedIn's free users) — is credible and stable. High risk = cover story is eroding or users are becoming aware of the commercial intent. Low risk = cover story is strong, users remain engaged and do not feel exploited.

Important: Always output the company name in English. Use Low, Medium, or High for all ratings.

3. Conclude with a Strategic Memo (200-300 words):
   Write the memo as plain prose paragraphs only — no headers, no fields like "MEMORANDUM FOR", "FROM", "DATE", or "SUBJECT". Start directly with the analysis content. Identify the company's market type (WTA/WTMost/WTSome), the single most critical risk, and the highest-leverage opportunity for platform growth.

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
