"use client"

import React from 'react';
import { AnalysisResult, RatingLevel } from '@/lib/types';
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ShieldAlert,
  TrendingUp,
  Target,
  ShieldCheck,
  Network,
  DollarSign
} from 'lucide-react';
import { StrategicMemo } from './StrategicMemo';

interface ScoreDashboardProps {
  result: AnalysisResult;
}

export function ScoreDashboard({ result }: ScoreDashboardProps) {
  // Positive metrics: High = good (green), Low = bad (red)
  const getPositiveColor = (level: RatingLevel) => {
    switch (level) {
      case 'High': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Risk metrics: High = bad (red), Low = good (green)
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RatingCard
            title="Platform Strength"
            level={result.ratings.platformStrength.level}
            explanation={result.ratings.platformStrength.explanation}
            icon={<TrendingUp className="h-5 w-5" />}
            colorClass={getPositiveColor(result.ratings.platformStrength.level)}
          />
          <RatingCard
            title="Network Effects"
            level={result.ratings.networkEffects.level}
            explanation={result.ratings.networkEffects.explanation}
            icon={<Network className="h-5 w-5" />}
            colorClass={getPositiveColor(result.ratings.networkEffects.level)}
          />
          <RatingCard
            title="Switching Costs"
            level={result.ratings.switchingCosts.level}
            explanation={result.ratings.switchingCosts.explanation}
            icon={<ShieldCheck className="h-5 w-5" />}
            colorClass={getPositiveColor(result.ratings.switchingCosts.level)}
          />
        </div>
      </div>

      {/* Risks row */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Risks</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RatingCard
            title="Multihoming Risk"
            level={result.ratings.multihomingRisk.level}
            explanation={result.ratings.multihomingRisk.explanation}
            icon={<ShieldAlert className="h-5 w-5" />}
            colorClass={getRiskColor(result.ratings.multihomingRisk.level)}
          />
          <RatingCard
            title="Disintermediation"
            level={result.ratings.disintermediationRisk.level}
            explanation={result.ratings.disintermediationRisk.explanation}
            icon={<Target className="h-5 w-5" />}
            colorClass={getRiskColor(result.ratings.disintermediationRisk.level)}
          />
          <RatingCard
            title="Value Capture Risk"
            level={result.ratings.valueCaptureRisk.level}
            explanation={result.ratings.valueCaptureRisk.explanation}
            icon={<DollarSign className="h-5 w-5" />}
            colorClass={getRiskColor(result.ratings.valueCaptureRisk.level)}
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
