// src/app/dashboard/page.tsx
"use client";

import { ChildProfilesDashboard } from '@/components/dashboard/child-profiles-dashboard';
import { DashboardAlertBanner } from '@/components/dashboard/dashboard-alert-banner';
import { useEffect, useState } from 'react';
import type { ChildProfile } from '@/types';
import { getChildProfiles } from '@/lib/localStorage';

export default function DashboardPage() {
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching profiles, ensuring it runs client-side
    setChildProfiles(getChildProfiles());
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading dashboard...</p></div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-primary">VaxTrack Dashboard</h1>
      </div>
      
      <DashboardAlertBanner />
      <ChildProfilesDashboard profiles={childProfiles} />
    </div>
  );
}
