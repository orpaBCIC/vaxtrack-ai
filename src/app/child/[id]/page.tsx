// src/app/child/[id]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { ChildProfile } from '@/types';
import { getChildProfileById } from '@/lib/localStorage';
import { ChildDetailView } from '@/components/child/child-detail-view';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

export default function ChildProfilePage() {
  const params = useParams();
  const router = useRouter();
  const idFromParams = params.id; // This can be string, string[], or undefined

  const [childProfile, setChildProfile] = useState<ChildProfile | null>(null);
  const [status, setStatus] = useState<'loading' | 'found' | 'not_found' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let currentId: string | null = null;
    if (typeof idFromParams === 'string' && idFromParams.trim() !== "") {
      currentId = idFromParams.trim();
    } else if (Array.isArray(idFromParams) && idFromParams.length > 0 && typeof idFromParams[0] === 'string' && idFromParams[0].trim() !== "") {
      currentId = idFromParams[0].trim();
    }

    if (currentId) {
      setStatus('loading'); 
      try {
        const profile = getChildProfileById(currentId);
        if (profile) {
          setChildProfile(profile);
          setStatus('found');
        } else {
          setErrorMessage(`Child profile with ID "${currentId}" not found.`);
          setStatus('not_found');
        }
      } catch (e) {
        console.error("Error retrieving child profile:", e);
        setErrorMessage(e instanceof Error ? e.message : "Failed to load profile data due to an unexpected error.");
        setStatus('error');
      }
    } else if (idFromParams !== undefined) { 
      // idFromParams is defined but not a valid, non-empty string
      setErrorMessage("Invalid or missing child identifier in URL.");
      setStatus('error');
    }
    // If idFromParams is undefined, status remains 'loading', waiting for router.
  }, [idFromParams]);

  useEffect(() => {
    if (status === 'not_found') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (status === 'not_found') {
    // This content will be shown briefly while router.push (from useEffect) takes effect.
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Child profile not found. Redirecting to dashboard...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="container mx-auto py-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2 text-destructive">Error Loading Profile</h1>
        <p className="text-muted-foreground mb-6">{errorMessage || 'An unexpected error occurred while trying to load the child profile.'}</p>
        <Link href="/dashboard" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  if (status === 'found' && childProfile) {
    return (
      <div className="container mx-auto py-8">
        <ChildDetailView initialProfile={childProfile} />
      </div>
    );
  }

  // Fallback for any unexpected state, though ideally should not be reached.
  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-2xl font-semibold mb-4">Profile Unvailable</h1>
      <p className="text-muted-foreground mb-4">The child profile could not be displayed. Please try again or return to the dashboard.</p>
      <Link href="/dashboard" passHref>
        <Button variant="outline" className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go to Dashboard
        </Button>
      </Link>
    </div>
  );
}
