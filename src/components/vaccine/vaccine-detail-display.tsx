// src/components/vaccine/vaccine-detail-display.tsx
"use client";

import type { VaccineInfo, VaccineFAQ } from '@/types';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, ShieldCheck, HelpCircle, AlertTriangle, CalendarDays, RefreshCw, Loader2, CheckCircle2, ExternalLink, Percent, Activity } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { getVaccineFaqs } from '@/ai/flows/get-vaccine-faqs';
import { useToast } from '@/hooks/use-toast';
import { TranslateButton } from '@/components/ai/translate-button'; // Import TranslateButton

interface VaccineDetailDisplayProps {
  vaccineInfo: VaccineInfo;
}

export function VaccineDetailDisplay({ vaccineInfo }: VaccineDetailDisplayProps) {
  const [aiFaqs, setAiFaqs] = useState<VaccineFAQ[] | null>(null);
  const [isLoadingAiFaqs, setIsLoadingAiFaqs] = useState(false);
  const [aiFaqsError, setAiFaqsError] = useState<string | null>(null);
  const [lastUpdatedAi, setLastUpdatedAi] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLoadAiFaqs = async () => {
    setIsLoadingAiFaqs(true);
    setAiFaqsError(null);
    try {
      const result = await getVaccineFaqs({ vaccineName: vaccineInfo.name });
      if (result && result.faqs) {
        setAiFaqs(result.faqs);
        setLastUpdatedAi(result.lastUpdatedAiFaqs);
        toast({
          title: 'AI FAQs Loaded',
          description: `Successfully fetched FAQs for ${vaccineInfo.name}.`,
          variant: 'default',
          className: 'bg-accent text-accent-foreground'
        });
      } else {
        throw new Error('No FAQs returned from AI service.');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      setAiFaqsError(message);
      toast({
        title: 'Error Loading AI FAQs',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoadingAiFaqs(false);
    }
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-3xl text-primary flex items-center gap-2">
            <ShieldCheck className="h-8 w-8" /> {vaccineInfo.name}
          </CardTitle>
          <TranslateButton textToTranslate={vaccineInfo.name} buttonSize="sm" />
        </div>
        <CardDescription>
          {vaccineInfo.description}
          <TranslateButton textToTranslate={vaccineInfo.description} />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" />Benefits</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {vaccineInfo.benefits.map((benefit, index) => (
              <li key={index}>
                {benefit}
                <TranslateButton textToTranslate={benefit} />
              </li>
            ))}
          </ul>
        </section>
        <Separator />
        <section>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-yellow-600" />Common Side Effects</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {vaccineInfo.commonSideEffects.map((effect, index) => (
              <li key={index}>
                {effect}
                <TranslateButton textToTranslate={effect} />
              </li>
            ))}
          </ul>
          {vaccineInfo.seriousSideEffects && vaccineInfo.seriousSideEffects.length > 0 && (
             <>
                <h4 className="text-lg font-medium mt-3 mb-1 text-destructive">Serious Side Effects (Rare)</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {vaccineInfo.seriousSideEffects.map((effect, index) => (
                      <li key={index}>
                        {effect}
                        <TranslateButton textToTranslate={effect} />
                      </li>
                    ))}
                </ul>
                <p className="text-sm text-destructive mt-1">Seek immediate medical attention if you observe any serious side effects. <TranslateButton textToTranslate="Seek immediate medical attention if you observe any serious side effects."/></p>
             </>
          )}
        </section>
         {vaccineInfo.sideEffectManagement && (
          <>
            <Separator />
            <section>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Activity className="h-5 w-5 text-primary" />Side Effect Management</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {vaccineInfo.sideEffectManagement}
                <TranslateButton textToTranslate={vaccineInfo.sideEffectManagement} />
              </p>
            </section>
          </>
        )}
        <Separator />
        <section>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" />Optimal Timing Windows</h3>
          <p className="text-muted-foreground whitespace-pre-line">
            {vaccineInfo.optimalTimingWindows}
            <TranslateButton textToTranslate={vaccineInfo.optimalTimingWindows} />
          </p>
        </section>
        {vaccineInfo.efficacyStatistics && (
          <>
            <Separator />
            <section>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Percent className="h-5 w-5 text-primary" />Efficacy Statistics</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {vaccineInfo.efficacyStatistics}
                <TranslateButton textToTranslate={vaccineInfo.efficacyStatistics} />
              </p>
            </section>
          </>
        )}
        {vaccineInfo.contraindications && (
          <>
            <Separator />
            <section>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Info className="h-5 w-5 text-primary" />Contraindications</h3>
              <p className="text-muted-foreground">
                {vaccineInfo.contraindications}
                <TranslateButton textToTranslate={vaccineInfo.contraindications} />
              </p>
            </section>
          </>
        )}
        <Separator />
        <section>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2"><HelpCircle className="h-5 w-5 text-primary" />Frequently Asked Questions (FAQs)</h3>
          {vaccineInfo.staticFaqs && vaccineInfo.staticFaqs.length > 0 && (
            <Accordion type="single" collapsible className="w-full">
              {vaccineInfo.staticFaqs.map((faq, index) => (
                <AccordionItem value={`static-faq-${index}`} key={`static-faq-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                    <TranslateButton textToTranslate={faq.question} buttonSize="sm" />
                    </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                    <TranslateButton textToTranslate={faq.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
           <p className="text-xs text-muted-foreground mt-2">
            Static information last updated: {format(parseISO(vaccineInfo.lastUpdatedStatic), 'PPP p')}
          </p>
        </section>
        <Separator />
        <section>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                 <h3 className="text-xl font-semibold mb-2 sm:mb-0 flex items-center gap-2"><RefreshCw className="h-5 w-5 text-primary" />AI-Powered FAQs (Experimental)</h3>
                <Button onClick={handleLoadAiFaqs} disabled={isLoadingAiFaqs} size="sm">
                    {isLoadingAiFaqs ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                    {aiFaqs ? 'Reload AI FAQs' : 'Load AI FAQs'}
                </Button>
            </div>
            {isLoadingAiFaqs && <div className="flex items-center justify-center py-4"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="ml-2">Loading AI FAQs...</p></div>}
            {aiFaqsError && <Alert variant="destructive"><AlertTriangle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{aiFaqsError}</AlertDescription></Alert>}
            
            {aiFaqs && aiFaqs.length > 0 && (
                <Accordion type="single" collapsible className="w-full mt-2">
                {aiFaqs.map((faq, index) => (
                    <AccordionItem value={`ai-faq-${index}`} key={`ai-faq-${index}`}>
                    <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                        <TranslateButton textToTranslate={faq.question} buttonSize="sm" />
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                        <TranslateButton textToTranslate={faq.answer} />
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            )}
            {lastUpdatedAi && (
                <p className="text-xs text-muted-foreground mt-2">
                    AI FAQs generated on: {format(parseISO(lastUpdatedAi), 'PPP p')}
                </p>
            )}
            {!isLoadingAiFaqs && !aiFaqs && !aiFaqsError && (
                 <p className="text-sm text-muted-foreground text-center py-4">Click "Load AI FAQs" to get additional insights from our AI assistant. This feature is experimental. <TranslateButton textToTranslate='Click "Load AI FAQs" to get additional insights from our AI assistant. This feature is experimental.' /></p>
            )}
        </section>
      </CardContent>
      <CardFooter className="flex-col items-start text-sm text-muted-foreground">
        <p><strong>Disclaimer:</strong> The information provided on this page is for general informational purposes only, and does not constitute medical advice. It is essential to consult with a qualified healthcare professional for any health concerns or before making any decisions related to your health or treatment. <TranslateButton textToTranslate="Disclaimer: The information provided on this page is for general informational purposes only, and does not constitute medical advice. It is essential to consult with a qualified healthcare professional for any health concerns or before making any decisions related to your health or treatment." /></p>
        <p className="mt-2">For the most current and comprehensive information, please refer to official sources like the Centers for Disease Control and Prevention (CDC) or the World Health Organization (WHO). <TranslateButton textToTranslate="For the most current and comprehensive information, please refer to official sources like the Centers for Disease Control and Prevention (CDC) or the World Health Organization (WHO)."/></p>
        <div className="mt-2">
            <a href="https://www.cdc.gov/vaccines/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                CDC Vaccines Page <ExternalLink className="h-3 w-3"/>
            </a>
        </div>
      </CardFooter>
    </Card>
  );
}

```