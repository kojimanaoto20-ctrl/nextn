"use client"

import React, { useState } from 'react';
import { CompanyForm } from '@/components/CompanyForm';
import { ScoreDashboard } from '@/components/ScoreDashboard';
import { AnalysisResult } from '@/lib/types';
import { analyzeCompany } from '@/ai/flows/explain-company-risk-factors';
import { Activity, BookOpen, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAnalysis = async (input: { companyUrl: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeCompany(input);
      setAnalysisResult({
        ...result,
        companyUrl: input.companyUrl
      });
      setTimeout(() => {
        document.getElementById('analysis-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error("Analysis failed", err);
      setError("Analysis failed. Please check the URL and try again.");
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
              Platform<span className="text-accent">Lens</span>
            </span>
          </div>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-primary hover:text-accent transition-colors">Analyzer</Link>
            <Link href="/frameworks" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Framework Explorer</Link>
          </div>
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-primary/10 px-4 py-4 space-y-3">
            <Link href="/" className="block text-sm font-medium text-primary" onClick={() => setMobileMenuOpen(false)}>Analyzer</Link>
            <Link href="/frameworks" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Framework Explorer</Link>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {/* Hero Section */}
        <section className="relative text-center max-w-3xl mx-auto space-y-6 pt-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-accent/20">
            Platform Intelligence, Instantly
          </div>
          <h1 className="text-5xl md:text-6xl font-headline font-bold text-primary leading-tight">
            Analyze Risk in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Connected Economy</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Turn any company URL into a platform strategy report. Quantify network effects, switching costs, and ecosystem risks in seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {["Direct Analysis", "Qualitative Insights", "Strategic Memos"].map((label) => (
              <span key={label} className="text-sm text-primary font-medium bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                {label}
              </span>
            ))}
          </div>
        </section>

        {/* Input Form Section */}
        <section className="max-w-3xl mx-auto">
          <CompanyForm onSubmit={handleAnalysis} isLoading={isLoading} />
          {error && (
            <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-700">
              {error}
            </div>
          )}
        </section>

        {/* Analysis Results Section */}
        {analysisResult && (
          <section id="analysis-results" className="pt-8 border-t border-primary/5 space-y-10">
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
            <span className="font-headline font-bold text-primary">PlatformLens</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            This tool uses AI to analyze platform dynamics and ecosystem risks, inspired by frameworks taught in graduate-level technology strategy courses.
          </p>
        </div>
      </footer>
    </div>
  );
}
