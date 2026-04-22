"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CompanyAnalysisInput } from '@/lib/types';
import { MOCK_COMPANIES } from '@/lib/mock-data';

const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  industry: z.string().min(2, "Industry is required"),
  businessModel: z.string().min(10, "Provide a brief description"),
  coreTechnology: z.string().min(10, "Describe the core technology"),
  complementors: z.string().min(5, "List key complementors"),
  competitors: z.string().min(5, "List main competitors"),
  monetizationModel: z.string().min(5, "Describe how it makes money"),
  networkEffects: z.string().min(10, "Explain the network effects"),
  switchingCosts: z.string().min(10, "Explain switching costs"),
  multihomingRisk: z.string().min(10, "Assess multihoming risk"),
  disintermediationRisk: z.string().min(10, "Assess disintermediation risk"),
});

interface CompanyFormProps {
  onSubmit: (data: CompanyAnalysisInput) => void;
  isLoading?: boolean;
}

export function CompanyForm({ onSubmit, isLoading }: CompanyFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: MOCK_COMPANIES.uber,
  });

  const loadExample = (key: string) => {
    form.reset(MOCK_COMPANIES[key]);
  };

  return (
    <Card className="w-full shadow-lg border-primary/10">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-headline text-primary">Company Ecosystem Input</CardTitle>
            <CardDescription className="text-muted-foreground mt-1">Provide detailed strategic information for analysis.</CardDescription>
          </div>
          <div className="flex gap-2">
            {Object.keys(MOCK_COMPANIES).map((key) => (
              <Button 
                key={key} 
                variant="outline" 
                size="sm" 
                onClick={() => loadExample(key)}
                className="capitalize hover:bg-accent hover:text-white"
              >
                {key}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Apple" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Consumer Electronics" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="businessModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Model</FormLabel>
                  <FormControl>
                    <Textarea placeholder="How the business operates and delivers value..." {...field} className="min-h-[80px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="coreTechnology"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Core Technology</FormLabel>
                    <FormControl>
                      <Textarea placeholder="The primary tech driving the platform..." {...field} className="min-h-[80px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monetizationModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monetization Model</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Revenue streams and capture methods..." {...field} className="min-h-[80px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="complementors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complementors</FormLabel>
                    <FormControl>
                      <Input placeholder="App devs, peripheral makers..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="competitors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Competitors</FormLabel>
                    <FormControl>
                      <Input placeholder="Direct and indirect rivals..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 border-t pt-6">
              <h3 className="font-headline font-medium text-primary">Dynamic Risks & Mechanics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="networkEffects"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Network Effects</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe direct and indirect effects..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="switchingCosts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Switching Costs</FormLabel>
                      <FormControl>
                        <Textarea placeholder="What keeps users on the platform?..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="multihomingRisk"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Multihoming Risk</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Can users easily use rivals simultaneously?..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="disintermediationRisk"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Disintermediation Risk</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Can users bypass the platform?..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-white font-headline transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Analyzing Ecosystem..." : "Run Ecosystem Analysis"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
