// src/components/dashboard/child-profiles-dashboard.tsx
"use client";

import type { ChildProfile } from '@/types';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Baby, ShieldCheck, PlusCircle } from 'lucide-react';
import { differenceInYears, parseISO } from 'date-fns';

interface ChildProfilesDashboardProps {
  profiles: ChildProfile[];
}

export function ChildProfilesDashboard({ profiles }: ChildProfilesDashboardProps) {
  const calculateAge = (dob: string) => {
    if (!dob) return 'N/A';
    try {
      return differenceInYears(new Date(), parseISO(dob));
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Child Profiles</h2>
        <Link href="/add-child" passHref>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Child
          </Button>
        </Link>
      </div>
      {profiles.length === 0 ? (
        <Card className="text-center py-8">
          <CardContent>
            <Baby className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No child profiles yet.</p>
            <p className="text-sm text-muted-foreground">Click "Add New Child" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <Card key={profile.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Baby className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-xl">{profile.name}</CardTitle>
                    <CardDescription>Age: {calculateAge(profile.dateOfBirth)} years</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-accent-foreground" />
                  <span className="font-medium">Compliance:</span>
                </div>
                <Progress value={profile.compliancePercentage || 75} className="w-full h-3 [&>div]:bg-accent" />
                <p className="text-sm text-muted-foreground mt-1">{profile.compliancePercentage || 75}% up to date</p>
              </CardContent>
              <CardFooter>
                <Link href={`/child/${profile.id}`} passHref className="w-full">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
