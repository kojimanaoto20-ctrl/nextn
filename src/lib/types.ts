export type RatingLevel = 'Low' | 'Medium' | 'High';

export interface RatingDetail {
  level: RatingLevel;
  explanation: string;
}

export interface CompanyAnalysisInput {
  companyUrl: string;
}

export interface AnalysisResult {
  companyName: string;
  companyUrl: string;
  industry: string;
  ratings: {
    // Strengths
    winnerTakeAllDynamics: RatingDetail;
    networkEffectQuality: RatingDetail;
    revenueAnchorClarity: RatingDetail;
    platformInitiationMaturity: RatingDetail;
    // Risks
    competitiveVulnerability: RatingDetail;
    nonMarketRisk: RatingDetail;
    disintermediationRisk: RatingDetail;
    networkCoverSustainability: RatingDetail;
  };
  strategicMemo: string;
}
