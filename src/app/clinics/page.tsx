// src/app/clinics/page.tsx
import { NearbyClinicsMap } from '@/components/clinics/nearby-clinics-map';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export default function ClinicsPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center gap-2">
            <MapPin className="h-7 w-7" /> Nearby Clinics
          </CardTitle>
          <CardDescription>Find vaccination clinics in your area. (Static map for MVP)</CardDescription>
        </CardHeader>
        <CardContent>
          <NearbyClinicsMap />
        </CardContent>
      </Card>
    </div>
  );
}
