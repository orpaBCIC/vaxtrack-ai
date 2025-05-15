// src/components/ui/map-placeholder.tsx
"use client";

import { MapPin, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function MapPlaceholder() {
  return (
    <Card className="border-dashed border-2 border-muted-foreground/50 shadow-none">
      <CardContent className="p-6 text-center">
        <MapPin className="mx-auto h-16 w-16 text-primary opacity-30 mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Interactive Map Coming Soon</h3>
        <p className="text-muted-foreground mb-4">
          This area will display an interactive map showing nearby clinics.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md text-left">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-500" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Developer Note:</strong> To enable the interactive map, you'll need to:
              </p>
              <ul className="mt-1 list-disc list-inside text-sm text-yellow-600">
                <li>Obtain a Google Maps JavaScript API key.</li>
                <li>Install a mapping library (e.g., <code>@react-google-maps/api</code>).</li>
                <li>Implement the map rendering logic in <code>src/components/clinics/nearby-clinics-map.tsx</code>.</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
