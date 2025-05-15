// src/app/settings/page.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Palette, CalendarPlus, Save } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();

  const handleSaveChanges = () => {
    // Simulate saving settings
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated (simulated).",
      className: "bg-accent text-accent-foreground"
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Application Settings</CardTitle>
          <CardDescription>Manage your notification, display, and calendar preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Notification Preferences */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><Bell className="h-5 w-5 text-primary" />Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="upcoming-vaccine-notifs" className="flex-grow">Upcoming Vaccine Reminders</Label>
                <Switch id="upcoming-vaccine-notifs" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="disease-alerts-notifs" className="flex-grow">Disease Outbreak Alerts</Label>
                <Switch id="disease-alerts-notifs" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="appointment-confirmations" className="flex-grow">Appointment Confirmations</Label>
                <Switch id="appointment-confirmations" />
              </div>
            </div>
          </section>

          <Separator />

          {/* Display Preferences */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><Palette className="h-5 w-5 text-primary" />Display Preferences</h3>
            <div className="space-y-4">
               <div className="p-3 border rounded-md">
                <Label htmlFor="theme-preference" className="block mb-2">Theme</Label>
                <p className="text-sm text-muted-foreground">Theme (Light/Dark mode) is controlled globally using the toggle button in the header/sidebar.</p>
              </div>
              <div className="p-3 border rounded-md">
                <Label htmlFor="language-preference" className="block mb-2">Language</Label>
                 <Select defaultValue="en">
                    <SelectTrigger id="language-preference">
                        <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="bn">বাংলা (Bangla)</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Content translation for AI-generated text is available on relevant pages via translate buttons.</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Calendar Sync Options */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><CalendarPlus className="h-5 w-5 text-primary" />Calendar Sync</h3>
            <div className="space-y-4 p-3 border rounded-md">
              <p className="text-sm text-muted-foreground">Sync vaccination schedules with your preferred calendar application.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => toast({title: "Calendar Sync", description: "Google Calendar sync coming soon!"})}>Sync with Google Calendar (Soon)</Button>
                <Button variant="outline" onClick={() => toast({title: "Calendar Sync", description: "Outlook Calendar sync coming soon!"})}>Sync with Outlook Calendar (Soon)</Button>
                <Button variant="outline" onClick={() => toast({title: "Calendar Sync", description: "iCal export coming soon!"})}>Export iCal File (Soon)</Button>
              </div>
            </div>
          </section>
          
          <Separator />

          <Button onClick={handleSaveChanges} className="w-full">
            <Save className="mr-2 h-4 w-4" /> Save Changes (Simulated)
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}
