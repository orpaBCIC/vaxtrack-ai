// src/components/vaccine-database/vaccine-search-result-item.tsx
import type { SearchedVaccineInfo } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Info, CalendarDays, ShieldCheck, Activity, BookOpen } from 'lucide-react';
import { TranslateButton } from '@/components/ai/translate-button';

interface VaccineSearchResultItemProps {
  vaccineInfo: SearchedVaccineInfo;
}

export function VaccineSearchResultItem({ vaccineInfo }: VaccineSearchResultItemProps) {
  return (
    <Card className="shadow-lg border-primary/20">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl text-primary flex items-center gap-2">
            <ShieldCheck className="h-7 w-7" /> {vaccineInfo.vaccineName}
            {!vaccineInfo.isIdentified && <Badge variant="outline" className="ml-2">General Info</Badge>}
          </CardTitle>
          <TranslateButton textToTranslate={vaccineInfo.vaccineName} buttonSize="sm" />
        </div>
        <CardDescription>
          {vaccineInfo.description}
          <TranslateButton textToTranslate={vaccineInfo.description} />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="multiple" defaultValue={['usage', 'benefits']} className="w-full">
          
          <AccordionItem value="usage">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              <div className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-primary" /> Usage Summary
              </div>
              <TranslateButton textToTranslate="Usage Summary" buttonSize="sm" className="ml-auto" />
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {vaccineInfo.usageSummary || "No specific usage summary provided."}
              {vaccineInfo.usageSummary && <TranslateButton textToTranslate={vaccineInfo.usageSummary} />}
            </AccordionContent>
          </AccordionItem>

          {vaccineInfo.commonBenefits && vaccineInfo.commonBenefits.length > 0 && (
            <AccordionItem value="benefits">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-600" /> Common Benefits
                </div>
                <TranslateButton textToTranslate="Common Benefits" buttonSize="sm" className="ml-auto" />
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {vaccineInfo.commonBenefits.map((benefit, index) => (
                    <li key={`benefit-${index}`}>
                      {benefit}
                      <TranslateButton textToTranslate={benefit} />
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          {vaccineInfo.commonSideEffects && vaccineInfo.commonSideEffects.length > 0 && (
            <AccordionItem value="side-effects">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                 <div className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-yellow-600" /> Common Side Effects
                 </div>
                 <TranslateButton textToTranslate="Common Side Effects" buttonSize="sm" className="ml-auto"/>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {vaccineInfo.commonSideEffects.map((effect, index) => (
                    <li key={`effect-${index}`}>
                      {effect}
                      <TranslateButton textToTranslate={effect} />
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}
          
          {vaccineInfo.administrationSchedule && (
            <AccordionItem value="schedule">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-5 w-5 text-primary" /> Administration Schedule
                </div>
                <TranslateButton textToTranslate="Administration Schedule" buttonSize="sm" className="ml-auto" />
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground whitespace-pre-line">
                {vaccineInfo.administrationSchedule}
                <TranslateButton textToTranslate={vaccineInfo.administrationSchedule} />
              </AccordionContent>
            </AccordionItem>
          )}

          {vaccineInfo.importantConsiderations && vaccineInfo.importantConsiderations.length > 0 && (
            <AccordionItem value="considerations">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                 <div className="flex items-center">
                  <Info className="mr-2 h-5 w-5 text-blue-600" /> Important Considerations
                 </div>
                 <TranslateButton textToTranslate="Important Considerations" buttonSize="sm" className="ml-auto"/>
              </AccordionTrigger>
              <AccordionContent>
                 <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {vaccineInfo.importantConsiderations.map((consideration, index) => (
                    <li key={`consideration-${index}`}>
                      {consideration}
                      <TranslateButton textToTranslate={consideration} />
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
        
        <Separator />
        <div>
            <h4 className="text-sm font-semibold flex items-center gap-1"><BookOpen className="h-4 w-4"/>Source Information</h4>
            <p className="text-xs text-muted-foreground italic mt-1">
                {vaccineInfo.sourceInformation}
                <TranslateButton textToTranslate={vaccineInfo.sourceInformation} />
            </p>
        </div>

      </CardContent>
    </Card>
  );
}
