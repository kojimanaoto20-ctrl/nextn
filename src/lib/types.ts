export interface CompanyAnalysisInput {
  companyName: string;
  industry: string;
  businessModel: string;
  coreTechnology: string;
  complementors: string;
  competitors: string;
  monetizationModel: string;
  networkEffects: string;
  switchingCosts: string;
  multihomingRisk: string;
  disintermediationRisk: string;
}

export interface AnalysisScores {
  platformStrength: number;
  ecosystemRisk: number;
  valueCaptureRisk: number;
}

export interface AnalysisResult extends CompanyAnalysisInput {
  scores: AnalysisScores;
  scoreBreakdowns: {
    label: string;
    score: number;
    description: string;
  }[];
}

export interface Framework {
  id: string;
  title: string;
  description: string;
  keyConcepts: string[];
}
