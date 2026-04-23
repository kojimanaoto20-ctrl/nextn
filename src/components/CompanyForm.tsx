"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MOCK_URLS } from '@/lib/mock-data';
import { Globe, Loader2 } from 'lucide-react';

const formSchema = z.object({
  companyUrl: z.string().url("Please enter a valid URL (e.g., https://apple.com)"),
});

interface CompanyFormProps {
  onSubmit: (data: { companyUrl: string }) => void;
  isLoading?: boolean;
}

export function CompanyForm({ onSubmit, isLoading }: CompanyFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyUrl: '',
    },
  });

  const loadExample = (url: string) => {
    form.setValue('companyUrl', url);
  };

  return (
    <Card className="w-full shadow-lg border-primary/10 overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-primary/10 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-2xl font-headline text-primary flex items-center gap-2">
            <Globe className="h-6 w-6 text-accent" />
            Analyze a Company
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">Try an example:</span>
            {Object.entries(MOCK_URLS).map(([key, url]) => (
              <Button
                key={key}
                variant="outline"
                size="sm"
                type="button"
                onClick={() => loadExample(url)}
                className="capitalize hover:bg-accent hover:text-white hover:border-accent transition-all text-[10px] font-bold tracking-wider"
              >
                {key}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8 pb-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="companyUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Company Website URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="https://example.com"
                        {...field}
                        className="h-14 pl-12 text-lg rounded-xl border-primary/20 focus-visible:ring-accent"
                      />
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white font-headline transition-all rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing platform strategy… this may take 15–30 seconds
                </span>
              ) : "Run Ecosystem Analysis"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
