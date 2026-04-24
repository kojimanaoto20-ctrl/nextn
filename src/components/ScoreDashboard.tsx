"use client"

import React from 'react';
import { AnalysisResult, RatingLevel } from '@/lib/types';
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Trophy,
  Network,
  DollarSign,
  Rocket,
  ShieldAlert,
  Scale,
  ArrowRightLeft,
  EyeOff,
} from 'lucide-react';
import { StrategicMemo } from './StrategicMemo';

interface ScoreDashboardProps {
  result: AnalysisResult;
}

export function ScoreDashboard({ result }: ScoreDashboardProps) {
  const getPositiveColor = (level: RatingLevel) => {
    switch (level) {
      case 'High': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getRiskColor = (level: RatingLevel) => {
    switch (level) {
      case 'High': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Strengths row */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Strengths</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RatingCard
            title="Winner-Take-All Dynamics"
            level={result.ratings.winnerTakeAllDynamics.level}
            explanation={result.ratings.winnerTakeAllDynamics.explanation}
            icon={<Trophy className="h-5 w-5" />}
            colorClass={getPositiveColor(result.ratings.winnerTakeAllDynamics.level)}
          />
          <RatingCard
            title="Network Effect Quality"
            level={result.ratings.networkEffectQuality.level}
            explanation={result.ratings.networkEffectQuality.explanation}
            icon={<Network className="h-5 w-5" />}
            colorClass={getPositiveColor(result.ratings.networkEffectQuality.level)}
          />
          <RatingCard
            title="Revenue Anchor Clarity"
            level={result.ratings.revenueAnchorClarity.level}
            explanation={result.ratings.revenueAnchorClarity.explanation}
            icon={<DollarSign className="h-5 w-5" />}
            colorClass={getPositiveColor(result.ratings.revenueAnchorClarity.level)}
          />
          <RatingCard
            title="Platform Initiation Maturity"
            level={result.ratings.platformInitiationMaturity.level}
            explanation={result.ratings.platformInitiationMaturity.explanation}
            icon={<Rocket className="h-5 w-5" />}
            colorClass={getPositiveColor(result.ratings.platformInitiationMaturity.level)}
          />
        </div>
      </div>

      {/* Risks row */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Risks</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RatingCard
            title="Competitive Vulnerability"
            level={result.ratings.competitiveVulnerability.level}
            explanation={result.ratings.competitiveVulnerability.explanation}
            icon={<ShieldAlert className="h-5 w-5" />}
            colorClass={getRiskColor(result.ratings.competitiveVulnerability.level)}
          />
          <RatingCard
            title="Non-Market Risk"
            level={result.ratings.nonMarketRisk.level}
            explanation={result.ratings.nonMarketRisk.explanation}
            icon={<Scale className="h-5 w-5" />}
            colorClass={getRiskColor(result.ratings.nonMarketRisk.level)}
          />
          <RatingCard
            title="Disintermediation Risk"
            level={result.ratings.disintermediationRisk.level}
            explanation={result.ratings.disintermediationRisk.explanation}
            icon={<ArrowRightLeft className="h-5 w-5" />}
            colorClass={getRiskColor(result.ratings.disintermediationRisk.level)}
          />
          <RatingCard
            title="Network Cover Sustainability"
            level={result.ratings.networkCoverSustainability.level}
            explanation={result.ratings.networkCoverSustainability.explanation}
            icon={<EyeOff className="h-5 w-5" />}
            colorClass={getRiskColor(result.ratings.networkCoverSustainability.level)}
          />
        </div>
      </div>

      <StrategicMemo memo={result.strategicMemo} companyName={result.companyName} />
    </div>
  );
}

function RatingCard({ title, level, explanation, icon, colorClass }: {
  title: string;
  level: RatingLevel;
  explanation: string;
  icon: React.ReactNode;
  colorClass: string;
}) {
  return (
    <Card className="relative overflow-hidden shadow-md border-primary/5 hover:border-primary/20 transition-all group flex flex-col h-full bg-white">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{title}</CardDescription>
        <div className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <Badge className={`${colorClass} font-bold px-3 py-1 rounded-md border text-xs shadow-sm uppercase tracking-tighter`}>
          {level}
        </Badge>
        <p className="text-sm text-primary/80 leading-relaxed border-l-2 border-accent/20 pl-3">
          {explanation}
        </p>
      </CardContent>
    </Card>
  );
}
