"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Layers, 
  Network, 
  RefreshCcw, 
  Zap, 
  ShieldCheck, 
  Lightbulb, 
  Puzzle,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';

const FRAMEWORKS = [
  {
    title: "Network Effects (Direct & Indirect)",
    icon: <Network className="h-5 w-5" />,
    description: "The phenomenon where a product or service increases in value as more people use it.",
    details: "Direct effects occur when the value increases for the same user group (e.g., messaging). Indirect effects occur when value increases for one group as another group grows (e.g., more drivers benefiting riders).",
    category: "Dynamics"
  },
  {
    title: "Multihoming Risk",
    icon: <RefreshCcw className="h-5 w-5" />,
    description: "The threat posed when users or complementors can easily use multiple platforms simultaneously.",
    details: "High multihoming risk reduces platform power and leads to commodity competition. Success requires unique value or high switching costs.",
    category: "Risk"
  },
  {
    title: "Winner-Take-All Dynamics",
    icon: <Zap className="h-5 w-5" />,
    description: "Markets where a single platform tends to capture the vast majority of value.",
    details: "Driven by strong network effects, high switching costs, and low demand for niche specialization.",
    category: "Dynamics"
  },
  {
    title: "Complementor Dependence",
    icon: <Puzzle className="h-5 w-5" />,
    description: "The strategic risk of relying on external partners for core value delivery.",
    details: "Essential for ecosystem growth but creates 'hold-up' risk if complementors gain too much power or switch to rivals.",
    category: "Ecosystem"
  },
  {
    title: "Disintermediation Risk",
    icon: <ShieldCheck className="h-5 w-5" />,
    description: "The risk that users will bypass the platform to conduct business directly.",
    details: "Common in high-value, recurring transaction marketplaces (e.g., cleaning services). Platforms must add continuous value beyond discovery.",
    category: "Risk"
  },
  {
    title: "AI as a Prediction Machine",
    icon: <Lightbulb className="h-5 w-5" />,
    description: "Reframing AI's impact as the dramatic lowering of the cost of prediction.",
    details: "When prediction becomes cheap, its value shifts to data (input) and judgment (human output), transforming business models.",
    category: "Technology"
  },
  {
    title: "Make-Buy-Partner",
    icon: <Briefcase className="h-5 w-5" />,
    description: "The critical choice of how to acquire or build strategic capabilities.",
    details: "Depends on strategic importance, internal capability, and the maturity of the external market ecosystem.",
    category: "Strategy"
  },
  {
    title: "Technology S-Curve",
    icon: <Layers className="h-5 w-5" />,
    description: "The typical trajectory of technology improvement over time.",
    details: "Initial slow progress followed by rapid growth, eventually reaching physical or economic limits. Disruptive tech often starts on a new S-curve.",
    category: "Technology"
  }
];

export default function FrameworkExplorer() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Analyzer
          </Link>
          <span className="font-headline font-bold text-xl tracking-tight text-primary">Framework <span className="text-accent">Explorer</span></span>
          <div className="w-20"></div> {/* Spacer */}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section className="max-w-3xl space-y-6">
          <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 uppercase tracking-widest px-3 py-1 text-[10px] font-bold">
            Curriculum Reference
          </Badge>
          <h1 className="text-5xl font-headline font-bold text-primary">Strategy Frameworks</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            These concepts form the analytical core of our Ecosystem Risk Analyzer. Based on the Technology Strategy course at Columbia Business School, they provide a rigorous way to think about digital business models.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FRAMEWORKS.map((f, i) => (
            <Card key={i} className="group hover:shadow-xl transition-all border-primary/5 hover:border-accent/30 flex flex-col">
              <CardHeader className="space-y-4">
                <div className="p-3 bg-primary/5 rounded-xl w-fit group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  {f.icon}
                </div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <CardTitle className="text-lg font-headline">{f.title}</CardTitle>
                    <Badge variant="outline" className="text-[9px] uppercase font-bold text-muted-foreground">
                      {f.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-primary/70 font-medium">
                    {f.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="bg-primary rounded-3xl p-10 md:p-16 text-primary-foreground space-y-8 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl font-headline font-bold">Ready to apply these?</h2>
            <p className="text-primary-foreground/80 leading-relaxed">
              Use the Analyzer to see how these dynamics play out in real companies like Uber, LinkedIn, or your own business.
            </p>
            <div className="pt-6">
              <Link href="/">
                <button className="bg-accent hover:bg-accent/90 text-white font-headline px-8 py-3 rounded-xl transition-all flex items-center gap-2 group shadow-lg">
                  Start New Analysis
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
