"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  ArrowRight,
  TrendingUp,
  Network,
  ShieldCheck,
  RefreshCcw,
  Target,
  DollarSign,
} from 'lucide-react';
import Link from 'next/link';

const FRAMEWORKS = [
  {
    title: "Platform Strength",
    icon: <TrendingUp className="h-5 w-5" />,
    description: "The overall resilience and defensive moat of a platform business.",
    details: "Platform strength is a composite of network effects, switching costs, and data advantages. A strong platform creates self-reinforcing loops that make it increasingly difficult for competitors to displace it over time.",
    category: "Strength",
    isStrength: true,
  },
  {
    title: "Network Effects",
    icon: <Network className="h-5 w-5" />,
    description: "A product or service increases in value as more people use it.",
    details: "Direct effects occur when value increases within the same user group (e.g., messaging apps). Indirect effects occur when one group's growth benefits another (e.g., more drivers making the ride-hailing platform better for riders). Strong network effects create winner-take-all dynamics.",
    category: "Strength",
    isStrength: true,
  },
  {
    title: "Switching Costs",
    icon: <ShieldCheck className="h-5 w-5" />,
    description: "The friction and cost a user faces when leaving a platform for a competitor.",
    details: "Switching costs can be financial (cancellation fees), procedural (data migration), or relational (lost connections and history). High switching costs reduce churn and give platforms pricing power, even when competitors offer marginally better products.",
    category: "Strength",
    isStrength: true,
  },
  {
    title: "Multihoming Risk",
    icon: <RefreshCcw className="h-5 w-5" />,
    description: "The threat posed when users can easily use multiple platforms simultaneously.",
    details: "High multihoming risk reduces platform power and commoditizes competition. If both users and suppliers can freely participate in multiple ecosystems at low cost, the platform struggles to capture value. Success requires creating exclusive value or high switching costs.",
    category: "Risk",
    isStrength: false,
  },
  {
    title: "Disintermediation Risk",
    icon: <Target className="h-5 w-5" />,
    description: "The risk that users bypass the platform to transact directly with each other.",
    details: "Common in high-value, recurring transaction marketplaces (e.g., freelancers and clients meeting via a platform, then working directly). Platforms must continuously add value beyond the initial introduction—trust signals, payments, insurance, tools—to stay relevant.",
    category: "Risk",
    isStrength: false,
  },
  {
    title: "Value Capture Risk",
    icon: <DollarSign className="h-5 w-5" />,
    description: "The threat that a platform cannot monetize the value it creates for users.",
    details: "A platform can generate enormous ecosystem value while capturing very little of it. This happens when users have strong outside options, when regulation constrains monetization, or when complementors accumulate bargaining power. The key question: who appropriates the surplus?",
    category: "Risk",
    isStrength: false,
  },
];

export default function FrameworkExplorer() {
  const strengths = FRAMEWORKS.filter(f => f.isStrength);
  const risks = FRAMEWORKS.filter(f => !f.isStrength);

  return (
    <div className="min-h-screen bg-background">
      {/* Shared nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg shadow-inner">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight text-primary">
              Platform<span className="text-accent">Lens</span>
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Analyzer</Link>
            <Link href="/frameworks" className="text-sm font-medium text-primary hover:text-accent transition-colors">Framework Explorer</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section className="max-w-3xl space-y-4">
          <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 uppercase tracking-widest px-3 py-1 text-[10px] font-bold">
            Reference
          </Badge>
          <h1 className="text-5xl font-headline font-bold text-primary">Framework Explorer</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The six dimensions PlatformLens evaluates, drawn from graduate-level technology strategy curricula. Use these to understand your analysis results.
          </p>
        </section>

        {/* Strengths */}
        <section className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Strengths</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strengths.map((f, i) => (
              <FrameworkCard key={i} framework={f} />
            ))}
          </div>
        </section>

        {/* Risks */}
        <section className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Risks</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {risks.map((f, i) => (
              <FrameworkCard key={i} framework={f} />
            ))}
          </div>
        </section>

        <section className="bg-primary rounded-3xl p-10 md:p-16 text-primary-foreground space-y-8 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl font-headline font-bold">Ready to apply these?</h2>
            <p className="text-primary-foreground/80 leading-relaxed">
              Use PlatformLens to see how these dynamics play out in real companies like Uber, LinkedIn, or your own business.
            </p>
            <div className="pt-6">
              <Link href="/">
                <button className="bg-accent hover:bg-accent/90 text-white font-headline px-8 py-3 rounded-xl transition-all flex items-center gap-2 group shadow-lg">
                  Start New Analysis
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FrameworkCard({ framework }: { framework: typeof FRAMEWORKS[0] }) {
  return (
    <Card className="group hover:shadow-xl transition-all border-primary/5 hover:border-accent/30 flex flex-col">
      <CardHeader className="space-y-4">
        <div className="p-3 bg-primary/5 rounded-xl w-fit group-hover:bg-accent group-hover:text-white transition-colors duration-300">
          {framework.icon}
        </div>
        <div>
          <div className="flex justify-between items-start mb-1">
            <CardTitle className="text-lg font-headline">{framework.title}</CardTitle>
            <Badge
              variant="outline"
              className={`text-[9px] uppercase font-bold ml-2 shrink-0 ${
                framework.isStrength
                  ? 'text-emerald-600 border-emerald-200'
                  : 'text-rose-600 border-rose-200'
              }`}
            >
              {framework.category}
            </Badge>
          </div>
          <CardDescription className="text-primary/70 font-medium">
            {framework.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {framework.details}
        </p>
      </CardContent>
    </Card>
  );
}
