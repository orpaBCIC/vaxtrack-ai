// src/app/vaccine-database/page.tsx
"use client";

import { useState, useEffect } from 'react';
import type { SearchedVaccineInfoResult, SearchedVaccineInfo, VaccineInfo } from '@/types';
import { VaccineSearchForm } from '@/components/vaccine-database/vaccine-search-form';
import { VaccineSearchResultItem } from '@/components/vaccine-database/vaccine-search-result-item';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle, FileSearch, Lightbulb, List } from 'lucide-react';
import { TranslateButton } from '@/components/ai/translate-button';
import { getAllVaccineInfo } from '@/lib/vaccineData';
import { format, parseISO } from 'date-fns';

export default function VaccineDatabasePage() {
  const [searchResults, setSearchResults] = useState<SearchedVaccineInfoResult | null>(null);
  const [isLoading, setIsLoading] = useState(false); // For AI search
  const [error, setError] = useState<string | null>(null); // For AI search

  const [staticVaccines, setStaticVaccines] = useState<SearchedVaccineInfo[]>([]);
  const [isLoadingStatic, setIsLoadingStatic] = useState(true);

  useEffect(() => {
    setIsLoadingStatic(true);
    const allStaticVaccinesData = getAllVaccineInfo();
    const mappedStaticVaccines = allStaticVaccinesData.map((vaccine: VaccineInfo): SearchedVaccineInfo => {
      const considerations: string[] = [];
      if (vaccine.contraindications) {
        considerations.push(`Contraindications: ${vaccine.contraindications}`);
      }
      if (vaccine.seriousSideEffects && vaccine.seriousSideEffects.length > 0) {
        considerations.push(`Potential Serious Side Effects (rare): ${vaccine.seriousSideEffects.join('; ')}. Seek immediate medical attention if observed.`);
      } else if (vaccine.contraindications && (!vaccine.seriousSideEffects || vaccine.seriousSideEffects.length === 0)) {
         considerations.push("Like all medicines, this vaccine can cause side effects, although not everybody gets them. Most are mild and short-lived.");
      }
      
      if (considerations.length === 0) { // Fallback if no specific considerations from data
          considerations.push("Consult a healthcare professional for specific advice, contraindications, and potential side effects related to your health status.");
      }
      // Ensure general advice about discussing medical history is present
      if (!considerations.some(c => c.toLowerCase().includes("medical history"))) {
        considerations.push("Always discuss your or your child's full medical history and any pre-existing conditions with a healthcare provider before vaccination.");
      }


      return {
        vaccineName: vaccine.name,
        isIdentified: true,
        description: vaccine.description,
        usageSummary: vaccine.optimalTimingWindows,
        commonBenefits: vaccine.benefits,
        commonSideEffects: vaccine.commonSideEffects,
        importantConsiderations: considerations,
        administrationSchedule: vaccine.optimalTimingWindows,
        sourceInformation: `Information from VaxTrack's curated database. Last static update: ${vaccine.lastUpdatedStatic ? format(parseISO(vaccine.lastUpdatedStatic), 'PPP') : 'N/A'}. Always verify critical information with official health sources.`,
      };
    });
    setStaticVaccines(mappedStaticVaccines);
    setIsLoadingStatic(false);
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setSearchResults(null); // Clear previous AI search results

    try {
      const { searchVaccineInfo } = await import('@/ai/flows/search-vaccine-info');
      const results = await searchVaccineInfo({ vaccineQuery: query });
      setSearchResults(results);
    } catch (e) {
      console.error("Failed to search vaccine info:", e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during search.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const pageTitle = "Vaccine Information Database";
  const pageDescription = "Search for detailed information about vaccines using our AI-powered database. Enter a vaccine name (e.g., \"MMR\", \"Hepatitis B\") or symptoms (e.g., \"cough and fever in infants\") to learn more. You can also browse common vaccines below.";
  const searchingText = "Searching for vaccine information...";
  const searchErrorTitle = "Search Error";
  const searchResultsTitle = "Search Results";
  const noResultsText = "No specific vaccine information found for your query. Try rephrasing or being more specific.";
  const disclaimerTitle = "Important Disclaimer";
  const disclaimerText = "The information provided by this AI tool is for general informational purposes only and does not constitute medical advice. Always consult with a qualified healthcare professional for any health concerns or before making any decisions related to health or treatment. Vaccine guidelines may vary by region; refer to your local health authority.";


  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-primary flex items-center gap-2">
            <FileSearch className="h-8 w-8" /> 
            {pageTitle}
            <TranslateButton textToTranslate={pageTitle} buttonSize="sm" />
          </CardTitle>
          <CardDescription>
            {pageDescription}
            <TranslateButton textToTranslate={pageDescription} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VaccineSearchForm onSearch={handleSearch} isLoading={isLoading} />
        </CardContent>
      </Card>

      {/* AI Search Loading Indicator */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg text-muted-foreground">
            {searchingText}
            <TranslateButton textToTranslate={searchingText} />
            </p>
        </div>
      )}

      {/* AI Search Error Display */}
      {error && !isLoading && (
        <Alert variant="destructive" className="shadow-md">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>
            {searchErrorTitle}
            <TranslateButton textToTranslate={searchErrorTitle} buttonSize="sm"/>
            </AlertTitle>
          <AlertDescription>
            {error}
            <TranslateButton textToTranslate={error} />
            </AlertDescription>
        </Alert>
      )}

      {/* AI Search Results Display */}
      {searchResults && !isLoading && !error && (
        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
                {searchResultsTitle}
                <TranslateButton textToTranslate={searchResultsTitle} buttonSize="sm"/>
            </CardTitle>
            {searchResults.queryAnalysis && (
                 <CardDescription className="flex items-start gap-2 pt-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>
                        {searchResults.queryAnalysis}
                        <TranslateButton textToTranslate={searchResults.queryAnalysis} />
                    </span>
                </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {searchResults.results.length > 0 ? (
              searchResults.results.map((vaccine, index) => (
                <VaccineSearchResultItem key={`search-${vaccine.vaccineName.replace(/\s+/g, '-')}-${index}`} vaccineInfo={vaccine} />
              ))
            ) : (
              <p className="text-muted-foreground text-center py-6">
                {noResultsText}
                <TranslateButton textToTranslate={noResultsText} />
              </p>
            )}
            <Alert variant="default" className="mt-6 bg-muted/50">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>
                    {disclaimerTitle}
                    <TranslateButton textToTranslate={disclaimerTitle} buttonSize="sm"/>
                </AlertTitle>
                <AlertDescription>
                    {disclaimerText}
                    <TranslateButton textToTranslate={disclaimerText} />
                </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Static Common Vaccines List - Show if not loading AI search, no AI results, and no AI error */}
      {!isLoading && !searchResults && !error && (
        isLoadingStatic ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg text-muted-foreground">Loading common vaccines... <TranslateButton textToTranslate="Loading common vaccines..." /></p>
            </div>
        ) : staticVaccines.length > 0 ? (
            <Card className="shadow-lg mt-8">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary flex items-center gap-2">
                        <List className="h-7 w-7" /> Browse Common Vaccines
                        <TranslateButton textToTranslate="Browse Common Vaccines" buttonSize="sm"/>
                    </CardTitle>
                    <CardDescription>
                        Explore information on commonly administered vaccines. For specific or less common vaccines, please use the AI search above.
                        <TranslateButton textToTranslate="Explore information on commonly administered vaccines. For specific or less common vaccines, please use the AI search above." />
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {staticVaccines.map((vaccine, index) => (
                        <VaccineSearchResultItem key={`static-${vaccine.vaccineName.replace(/\s+/g, '-')}-${index}`} vaccineInfo={vaccine} />
                    ))}
                    <Alert variant="default" className="mt-6 bg-muted/50">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>
                            {disclaimerTitle}
                            <TranslateButton textToTranslate={disclaimerTitle} buttonSize="sm"/>
                        </AlertTitle>
                        <AlertDescription>
                            {disclaimerText} {/* Use existing constant for disclaimer */}
                            <TranslateButton textToTranslate={disclaimerText} />
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        ) : (
             <Card className="shadow-lg mt-8">
                <CardHeader>
                     <CardTitle className="text-2xl text-primary flex items-center gap-2">
                        <List className="h-7 w-7" /> Common Vaccines
                        <TranslateButton textToTranslate="Common Vaccines" buttonSize="sm"/>
                     </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        No common vaccine information is currently available in the offline database. Please use the search function.
                        <TranslateButton textToTranslate="No common vaccine information is currently available in the offline database. Please use the search function." />
                    </p>
                </CardContent>
            </Card>
        )
      )}
    </div>
  );
}

