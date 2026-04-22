import { CompanyAnalysisInput, AnalysisScores } from "./types";

/**
 * A simplified scoring logic based on keywords and qualitative indicators.
 * In a real app, this might use more sophisticated NLP or structured inputs.
 */
export function calculateScores(input: CompanyAnalysisInput): { 
  scores: AnalysisScores; 
  breakdowns: { label: string; score: number; description: string; category: string }[] 
} {
  // Mock scoring logic for demonstration
  const networkEffectsVal = input.networkEffects.toLowerCase().includes('strong') ? 35 : 20;
  const switchingCostsVal = input.switchingCosts.toLowerCase().includes('high') ? 35 : 15;
  const techVal = input.coreTechnology.length > 50 ? 30 : 20;
  
  const multihomingVal = input.multihomingRisk.toLowerCase().includes('high') ? 10 : 30;
  const disintermediationVal = input.disintermediationRisk.toLowerCase().includes('low') ? 35 : 15;
  const competitorsVal = input.competitors.split(',').length > 3 ? 15 : 35;

  const platformStrength = Math.min(100, networkEffectsVal + switchingCostsVal + techVal);
  const ecosystemRisk = Math.min(100, 100 - (multihomingVal + disintermediationVal + competitorsVal));
  const valueCaptureRisk = Math.min(100, (100 - platformStrength) * 0.5 + ecosystemRisk * 0.5);

  const breakdowns = [
    { 
      category: 'Platform Strength', 
      label: 'Network Effects', 
      score: networkEffectsVal, 
      description: 'The ability of the platform to grow value as more users join.' 
    },
    { 
      category: 'Platform Strength', 
      label: 'Switching Costs', 
      score: switchingCostsVal, 
      description: 'Friction preventing users from leaving for competitors.' 
    },
    { 
      category: 'Ecosystem Risk', 
      label: 'Multihoming Resistance', 
      score: multihomingVal, 
      description: 'How likely users are to use multiple platforms simultaneously.' 
    },
    { 
      category: 'Ecosystem Risk', 
      label: 'Disintermediation Protection', 
      score: disintermediationVal, 
      description: 'The difficulty for users to bypass the platform to transact directly.' 
    }
  ];

  return {
    scores: {
      platformStrength,
      ecosystemRisk,
      valueCaptureRisk
    },
    breakdowns
  };
}
