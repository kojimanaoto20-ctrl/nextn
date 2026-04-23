export type RatingLevel = 'Low' | 'Middle' | 'High';

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
    networkEffects: RatingDetail;
    switchingCosts: RatingDetail;
    multihomingRisk: RatingDetail;
    disintermediationRisk: RatingDetail;
    platformStrength: RatingDetail;
    valueCaptureRisk: RatingDetail;
  };
  strategicMemo: string;
}
