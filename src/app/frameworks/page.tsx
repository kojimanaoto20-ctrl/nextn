"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  ArrowRight,
  Trophy,
  Network,
  DollarSign,
  Rocket,
  ShieldAlert,
  Scale,
  ArrowRightLeft,
  EyeOff,
} from 'lucide-react';
import Link from 'next/link';

const FRAMEWORKS = [
  {
    title: "Winner-Take-All Dynamics",
    icon: <Trophy className="h-5 w-5" />,
    description: "Assesses whether a market's structure favors consolidation around a single dominant platform.",
    details: "Evaluated across four axes from the Uber framework: (1) Multi-homing costs — how hard is it to use rivals simultaneously? (2) Preference for standardization — do users benefit from everyone being on one platform? (3) Necessity of intermediation — is the platform essential to the transaction? (4) Dispersion of user power — are buyers and sellers fragmented? High scores indicate WTA or WTMost dynamics; low scores suggest a fragmented, no-winner market.",
    category: "Strength",
    isStrength: true,
  },
  {
    title: "Network Effect Quality",
    icon: <Network className="h-5 w-5" />,
    description: "Evaluates the type, density, and breadth of network effects powering the platform.",
    details: "Direct effects occur within the same user group (e.g., messaging); indirect effects occur when one side's growth benefits another (e.g., more drivers improving rider experience). High-quality network effects combine both types, have high connection density among nodes, and span multiple sides of the market. Weak or single-sided effects with sparse connections yield low ratings.",
    category: "Strength",
    isStrength: true,
  },
  {
    title: "Revenue Anchor Clarity",
    icon: <DollarSign className="h-5 w-5" />,
    description: "Identifies which platform side is the true revenue source and whether the 'Network Cover' is working.",
    details: "From the LinkedIn framework: platforms often subsidize one side (e.g., free users consuming content) while monetizing the other (e.g., recruiters paying for access). The subsidized side's value proposition is the 'Network Cover' — a believable story that keeps them engaged. High clarity means the paying side is obvious and the cover story is credible. Low clarity signals misaligned monetization or a fragile cover narrative.",
    category: "Strength",
    isStrength: true,
  },
  {
    title: "Platform Initiation Maturity",
    icon: <Rocket className="h-5 w-5" />,
    description: "Measures how far along the company is in solving the Cold Start problem and completing the Product-to-Platform transition.",
    details: "From the Google framework: early platforms must bootstrap both sides of the market before network effects kick in. A high-maturity platform has solved the cold start problem, built a self-reinforcing flywheel, and transitioned fully from a pipeline product to a network platform. Low maturity indicates the company is still operating as a product or is in the early, fragile stages of platform growth.",
    category: "Strength",
    isStrength: true,
  },
  {
    title: "Competitive Vulnerability",
    icon: <ShieldAlert className="h-5 w-5" />,
    description: "Assesses exposure to Niche Attack and Envelopment — the two primary competitive threats to established platforms.",
    details: "From the LinkedIn framework: Niche Attack occurs when a specialized competitor captures a high-value segment (e.g., a platform for finance professionals only), peeling away premium users. Envelopment occurs when an adjacent platform bundles the incumbent's functionality into a broader offering (e.g., a tech giant adding a competing feature). High vulnerability means exposure to both vectors. Low vulnerability indicates strong defenses against specialization and bundling attacks.",
    category: "Risk",
    isStrength: false,
  },
  {
    title: "Non-Market Risk",
    icon: <Scale className="h-5 w-5" />,
    description: "Evaluates governance, regulatory, and dependency risks that exist outside competitive market dynamics.",
    details: "Three categories from the LinkedIn framework: (1) Governance risk — exposure to fraud, misinformation, or abuse by platform participants; (2) Regulatory risk — antitrust scrutiny, data privacy laws, or sector-specific rules that could constrain the business model; (3) Dependency risk — over-reliance on a single partner, supplier, or infrastructure provider (e.g., app stores, cloud providers). High scores reflect significant multi-category exposure.",
    category: "Risk",
    isStrength: false,
  },
  {
    title: "Disintermediation Risk",
    icon: <ArrowRightLeft className="h-5 w-5" />,
    description: "The risk that users bypass the platform to transact directly, linked to the Necessity of Intermediation axis.",
    details: "From the Uber framework: when the platform's role in a transaction is primarily matching rather than ongoing facilitation, users may connect through the platform and then exit. High risk occurs when the platform adds little post-matching value and switching to direct transactions is low-cost. Platforms mitigate this by embedding themselves in trust, payments, insurance, or tooling — making the platform indispensable throughout the relationship lifecycle.",
    category: "Risk",
    isStrength: false,
  },
  {
    title: "Network Cover Sustainability",
    icon: <EyeOff className="h-5 w-5" />,
    description: "Assesses whether the platform's cover story — the non-monetized value proposition for the subsidized side — remains credible.",
    details: "From the LinkedIn framework: platforms that monetize one side must keep the other side engaged with a compelling, authentic-feeling narrative (e.g., 'professional networking,' 'learning,' 'staying connected'). High risk means the cover is eroding — users are becoming aware of their role as the product, leading to disengagement or backlash. Low risk indicates the cover story is deeply embedded in user behavior and identity, making it stable even as monetization intensifies.",
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
            The eight dimensions PlatformLens evaluates, drawn from graduate-level platform strategy curricula covering Uber, LinkedIn, and Google case studies. Use these to understand your analysis results.
          </p>
        </section>

        {/* Strengths */}
        <section className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Strengths</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strengths.map((f, i) => (
              <FrameworkCard key={i} framework={f} />
            ))}
          </div>
        </section>

        {/* Risks */}
        <section className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Risks</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
