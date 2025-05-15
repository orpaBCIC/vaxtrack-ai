// src/app/alerts/page.tsx
"use client";

import { DashboardAlertBanner } from '@/components/dashboard/dashboard-alert-banner'; // Re-using the banner component for content
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';

export default function AlertsPage() {
  return (
    <div className="container mx-auto py-8">
       <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center gap-2">
            <Bell className="h-7 w-7" /> Disease Alerts
          </CardTitle>
          <CardDescription>Stay informed about current health advisories and alerts.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Reusing DashboardAlertBanner component logic here, which contains the list of alerts */}
          {/* If alerts become more complex, a dedicated AlertsList component would be better */}
          <div className="mt-[-1rem]"> {/* Adjust margin if CardHeader from DashboardAlertBanner is redundant */}
            <DashboardAlertBanner />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
