// src/components/dashboard/dashboard-alert-banner.tsx
"use client";

import type { DiseaseAlert } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';
import { TranslateButton } from '@/components/ai/translate-button';

// Mock data for alerts
const mockAlerts: DiseaseAlert[] = [
  {
    id: '1',
    title: 'Increased Flu Activity Reported',
    description: 'Local health authorities report an increase in flu cases. Ensure your family is vaccinated.',
    riskLevel: 'medium',
    dateIssued: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Measles Case Confirmed Nearby',
    description: 'A case of measles has been confirmed in the tri-county area. Verify MMR vaccination status.',
    riskLevel: 'high',
    dateIssued: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
];

export function DashboardAlertBanner() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <ShieldAlert className="h-6 w-6 text-destructive" />
          Disease Alerts
          <TranslateButton textToTranslate="Disease Alerts" buttonSize="sm" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockAlerts.length > 0 ? (
          mockAlerts.map((alert) => (
            <Alert key={alert.id} variant={alert.riskLevel === 'high' ? 'destructive' : 'default'} className="shadow-sm">
              <ShieldAlert className={`h-4 w-4 ${alert.riskLevel === 'high' ? 'text-destructive-foreground' : 'text-primary'}`} />
              <AlertTitle className={`font-semibold ${alert.riskLevel === 'high' ? 'text-destructive-foreground' : ''}`}>
                {alert.title}
                <TranslateButton textToTranslate={alert.title} buttonSize="sm" />
              </AlertTitle>
              <AlertDescription className={`${alert.riskLevel === 'high' ? 'text-destructive-foreground/90' : ''}`}>
                {alert.description}
                <TranslateButton textToTranslate={alert.description} />
                <span className="block text-xs opacity-75 mt-1">
                  Issued: {format(new Date(alert.dateIssued), 'PPP')}
                </span>
              </AlertDescription>
            </Alert>
          ))
        ) : (
          <p className="text-muted-foreground">No active alerts at this time. <TranslateButton textToTranslate="No active alerts at this time." /></p>
        )}
      </CardContent>
    </Card>
  );
}
