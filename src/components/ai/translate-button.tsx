"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Languages, Loader2, RefreshCcw } from 'lucide-react';
import { translateText as translateTextFlow } from '@/ai/flows/translate-text-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface TranslateButtonProps {
  textToTranslate: string;
  originalLanguageName?: string;
  targetLanguageName?: string;
  className?: string;
  buttonSize?: "sm" | "default" | "lg" | "icon" | null | undefined;
}

export function TranslateButton({
  textToTranslate,
  originalLanguageName = 'English',
  targetLanguageName = 'Bangla',
  className,
  buttonSize = "sm",
}: TranslateButtonProps) {
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTranslated, setShowTranslated] = useState(false);
  const { toast } = useToast();

  // Effect to reset translation if textToTranslate changes
  useEffect(() => {
    setTranslatedText(null);
    setShowTranslated(false);
  }, [textToTranslate]);

  const handleTranslate = async () => {
    if (isLoading) return;

    if (translatedText) { // If text is already translated
      setShowTranslated(!showTranslated); // Toggle visibility
      return;
    }

    // If not translated yet, fetch translation
    setIsLoading(true);
    try {
      const result = await translateTextFlow({ text: textToTranslate, targetLanguage: targetLanguageName });
      if (result && result.translatedText) {
        setTranslatedText(result.translatedText);
        setShowTranslated(true); // Show immediately after successful translation
      } else {
        throw new Error('Translation failed or returned empty.');
      }
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: 'Translation Error',
        description: `Could not translate to ${targetLanguageName}. ${error instanceof Error ? error.message : ''}`,
        variant: 'destructive',
      });
      setTranslatedText(null); 
      setShowTranslated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!textToTranslate || textToTranslate.trim() === "") return null;

  const IconComponent = translatedText && showTranslated ? RefreshCcw : Languages;
  const buttonText = 
    isLoading ? `Translating...` :
    translatedText && showTranslated ? `Show in ${originalLanguageName}` :
    translatedText && !showTranslated ? `Show in ${targetLanguageName}` :
    `Translate to ${targetLanguageName}`;


  return (
    <div className={cn("inline-block ml-2", className)}>
      <Button variant="outline" size={buttonSize} onClick={handleTranslate} disabled={isLoading} className="text-xs py-1 px-2 h-auto md:text-sm md:py-1.5 md:px-3">
        {isLoading ? (
          <Loader2 className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4 animate-spin" />
        ) : (
          <IconComponent className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
        )}
        {buttonText}
      </Button>
      {showTranslated && translatedText && (
        <div className="mt-2 p-2 bg-muted/50 rounded-md border text-sm">
          <p className="text-xs text-muted-foreground"><em>({targetLanguageName})</em></p>
          <p className="whitespace-pre-wrap">{translatedText}</p>
        </div>
      )}
    </div>
  );
}
