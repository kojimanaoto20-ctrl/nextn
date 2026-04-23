
"use client"

import React, { useState } from 'react';
import { CompanyForm } from '@/components/CompanyForm';
import { ScoreDashboard } from '@/components/ScoreDashboard';
import { AnalysisResult } from '@/lib/types';
import { analyzeCompany } from '@/ai/flows/explain-company-risk-factors';
import { BookOpen, Compass, ChevronRight, Activity, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysis = async (input: { companyUrl: string }) => {
    setIsLoading(true);
    try {
      const result = await analyzeCompany(input);
      
      setAnalysisResult({
        ...result,
        companyUrl: input.companyUrl
      });
      
      // Scroll to dashboard
      setTimeout(() => {
        document.getElementById('analysis-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg shadow-inner">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight text-primary">
              Ecosystem Risk <span className="text-accent">Analyzer</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-primary hover:text-accent transition-colors">Analyzer</Link>
            <Link href="/frameworks" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Framework Explorer</Link>
            <Link href="/frameworks" className="bg-primary/5 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all border border-primary/20 flex items-center gap-2">
              <BookOpen className="h-3 w-3" />
              LEARN FRAMEWORKS
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {/* Hero Section */}
        <section className="relative text-center max-w-3xl mx-auto space-y-6 pt-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-accent/20">
            <Globe className="h-3 w-3" />
            URL-Driven AI Analysis
          </div>
          <h1 className="text-5xl md:text-6xl font-headline font-bold text-primary leading-tight">
            Analyze Risk in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Connected Economy</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Quantify platform strength and evaluate ecosystem risks using Columbia Business School's world-class methodology. Simply provide a URL.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <ChevronRight className="h-4 w-4 text-accent" />
              Direct Analysis
            </div>
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <ChevronRight className="h-4 w-4 text-accent" />
              Qualitative Insights
            </div>
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <ChevronRight className="h-4 w-4 text-accent" />
              Strategic Memos
            </div>
          </div>
        </section>

        {/* Input Form Section */}
        <section className="max-w-3xl mx-auto">
          <CompanyForm onSubmit={handleAnalysis} isLoading={isLoading} />
        </section>

        {/* Analysis Results Section */}
        {analysisResult && (
          <section id="analysis-results" className="pt-20 border-t border-primary/5 space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-headline text-primary">Strategic Assessment: {analysisResult.companyName}</h2>
              <p className="text-muted-foreground">{analysisResult.industry} • {analysisResult.companyUrl}</p>
            </div>
            <ScoreDashboard result={analysisResult} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-primary/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center space-y-4">
          <div className="flex justify-center items-center gap-2 grayscale opacity-50">
             <Activity className="h-5 w-5 text-primary" />
             <span className="font-headline font-bold text-primary">Ecosystem Risk Analyzer</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            This tool uses AI to simulate a strategic consultation based on Columbia Business School's Technology Strategy curriculum.
          </p>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground/60 pt-4">
            &copy; {new Date().getFullYear()} Strategic Platforms Inc. • AI-Driven Analysis
          </div>
        </div>
      </footer>
    </div>
  );
}
