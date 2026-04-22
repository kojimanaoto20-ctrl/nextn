"use client"

import React from 'react';
import { AnalysisResult } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ShieldAlert, 
  TrendingUp, 
  Target, 
  Zap, 
  ArrowUpRight,
  Info
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { StrategicMemo } from './StrategicMemo';

interface ScoreDashboardProps {
  result: AnalysisResult;
  memo: string;
}

export function ScoreDashboard({ result, memo }: ScoreDashboardProps) {
  const radarData = [
    { subject: 'Platform Strength', A: result.scores.platformStrength, fullMark: 100 },
    { subject: 'Ecosystem Risk', A: result.scores.ecosystemRisk, fullMark: 100 },
    { subject: 'Value Capture', A: result.scores.valueCaptureRisk, fullMark: 100 },
    { subject: 'Net Effects', A: result.scoreBreakdowns.find(b => b.label === 'Network Effects')?.score || 0, fullMark: 100 },
    { subject: 'Switching Costs', A: result.scoreBreakdowns.find(b => b.label === 'Switching Costs')?.score || 0, fullMark: 100 },
  ];

  const getScoreColor = (score: number, inverse = false) => {
    if (inverse) {
      if (score < 40) return 'text-emerald-600';
      if (score < 70) return 'text-amber-600';
      return 'text-rose-600';
    }
    if (score > 75) return 'text-emerald-600';
    if (score > 50) return 'text-amber-600';
    return 'text-rose-600';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Main Score Cards */}
          <ScoreCard 
            title="Platform Strength" 
            value={result.scores.platformStrength} 
            icon={<TrendingUp className="h-5 w-5" />}
            description="Overall resilience and power of the platform model."
            colorClass={getScoreColor(result.scores.platformStrength)}
          />
          <ScoreCard 
            title="Ecosystem Risk" 
            value={result.scores.ecosystemRisk} 
            icon={<ShieldAlert className="h-5 w-5" />}
            description="Exposure to external threats within the ecosystem."
            colorClass={getScoreColor(result.scores.ecosystemRisk, true)}
          />
          <ScoreCard 
            title="Value Capture Risk" 
            value={result.scores.valueCaptureRisk} 
            icon={<Target className="h-5 w-5" />}
            description="Risk of inability to monetize the value created."
            colorClass={getScoreColor(result.scores.valueCaptureRisk, true)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Radar Chart */}
        <Card className="lg:col-span-1 shadow-md border-primary/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Ecosystem Radar
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center p-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name={result.companyName}
                  dataKey="A"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Breakdown */}
        <Card className="lg:col-span-2 shadow-md border-primary/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-accent" />
              Strategic Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {result.scoreBreakdowns.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{item.label}</span>
                    <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">
                      {item.category}
                    </Badge>
                  </div>
                  <span className="text-sm font-semibold">{item.score}/100</span>
                </div>
                <Progress value={item.score} className="h-2" />
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
            <div className="pt-4 mt-4 border-t border-dashed">
              <div className="flex gap-4 items-start p-3 bg-muted/30 rounded-lg">
                <Info className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <p className="text-xs leading-relaxed italic">
                  Scores are derived using the <strong>Columbia Strategy Framework</strong>, weighting network effects, switching costs, and multihoming risks based on platform architecture.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Memo Section */}
      <StrategicMemo memo={memo} companyName={result.companyName} />
    </div>
  );
}

function ScoreCard({ title, value, icon, description, colorClass }: { 
  title: string; 
  value: number; 
  icon: React.ReactNode; 
  description: string;
  colorClass: string;
}) {
  return (
    <Card className="relative overflow-hidden shadow-md border-primary/5 group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <CardHeader className="pb-2">
        <CardDescription className="text-xs font-semibold uppercase tracking-wider">{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`text-4xl font-headline font-bold mb-1 ${colorClass}`}>{value}</div>
        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
    </Card>
  );
}
