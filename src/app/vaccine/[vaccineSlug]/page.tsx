// src/app/vaccine/[vaccineSlug]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { VaccineInfo } from '@/types';
import { getVaccineInfoBySlug } from '@/lib/vaccineData';
import { VaccineDetailDisplay } from '@/components/vaccine/vaccine-detail-display';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function VaccineDetailPage() {
  const params = useParams();
  const router = useRouter();
  const vaccineSlug = params.vaccineSlug as string;
  const [vaccineInfo, setVaccineInfo] = useState<VaccineInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (vaccineSlug) {
      setIsLoading(true);
      setError(null);
      const info = getVaccineInfoBySlug(vaccineSlug);
      if (info) {
        setVaccineInfo(info);
      } else {
        setError(`Vaccine information for "${vaccineSlug}" not found.`);
        // Optionally redirect or show a more prominent not found component
        // router.push('/404'); 
      }
      setIsLoading(false);
    }
  }, [vaccineSlug, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-lg">Loading vaccine details...</p>
      </div>
    );
  }

  if (error || !vaccineInfo) {
    return (
      <div className="container mx-auto py-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2 text-destructive">Information Not Found</h1>
        <p className="text-muted-foreground mb-6">{error || 'The requested vaccine details could not be loaded.'}</p>
        <Link href="/dashboard" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      <VaccineDetailDisplay vaccineInfo={vaccineInfo} />
    </div>
  );
}
