// src/components/child/child-detail-view.tsx
"use client";

import type { ChildProfile, Caregiver, VaccineDose } from '@/types';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Baby, CalendarDays, FileText, Users, Mail, Trash2, ListChecks, Wand2, Loader2, Edit3, Save, UserCircle, Weight, Ruler, ShieldPlus, AlertTriangleIcon, ShieldAlert, FileArchive, CheckIcon, QrCode, Share2, FileDown } from 'lucide-react';
import { format, differenceInYears, parseISO } from 'date-fns';
import { updateChildProfile as saveProfileUpdate } from '@/lib/localStorage';
import { useToast } from '@/hooks/use-toast';
import { generateVaccinationSchedule as callGenerateScheduleAI } from '@/ai/flows/generate-vaccination-schedule';
import { VaccinationScheduleDisplay } from './vaccination-schedule-display';
import { Badge } from '@/components/ui/badge';

interface ChildDetailViewProps {
  initialProfile: ChildProfile;
}

export function ChildDetailView({ initialProfile }: ChildDetailViewProps) {
  const [profile, setProfile] = useState<ChildProfile>(initialProfile);
  const [newCaregiverEmail, setNewCaregiverEmail] = useState('');
  const [newCaregiverPermission, setNewCaregiverPermission] = useState<Caregiver['permissionLevel']>('view');
  const [isEditing, setIsEditing] = useState(false);
  
  // Editable fields state
  const [editedName, setEditedName] = useState(profile.name);
  const [editedDOB, setEditedDOB] = useState(profile.dateOfBirth);
  const [editedGender, setEditedGender] = useState(profile.gender);
  const [editedWeight, setEditedWeight] = useState(profile.weight);
  const [editedHeight, setEditedHeight] = useState(profile.height);
  const [editedPreExistingConditions, setEditedPreExistingConditions] = useState(profile.preExistingConditions);
  const [editedAdverseReactions, setEditedAdverseReactions] = useState(profile.previousAdverseReactions);
  const [editedAllergies, setEditedAllergies] = useState(profile.allergies);
  const [editedFamilyHistory, setEditedFamilyHistory] = useState(profile.familyHistoryFlags);
  const [editedVaccinationHistory, setEditedVaccinationHistory] = useState(profile.vaccinationHistory);
  const [editedVerificationStatus, setEditedVerificationStatus] = useState(profile.vaccinationVerificationStatus);
  // Photo and record upload are not directly editable here, assume they are done via a separate flow or initial add.

  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);
  const [schedule, setSchedule] = useState<VaccineDose[] | null>(null);
  const [scheduleError, setScheduleError] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    // If initialProfile changes (e.g. due to parent component re-fetch), update local state
    setProfile(initialProfile);
    setEditedName(initialProfile.name);
    setEditedDOB(initialProfile.dateOfBirth);
    setEditedGender(initialProfile.gender);
    setEditedWeight(initialProfile.weight);
    setEditedHeight(initialProfile.height);
    setEditedPreExistingConditions(initialProfile.preExistingConditions);
    setEditedAdverseReactions(initialProfile.previousAdverseReactions);
    setEditedAllergies(initialProfile.allergies);
    setEditedFamilyHistory(initialProfile.familyHistoryFlags);
    setEditedVaccinationHistory(initialProfile.vaccinationHistory);
    setEditedVerificationStatus(initialProfile.vaccinationVerificationStatus);
  }, [initialProfile]);


  const handleAddCaregiver = () => {
    if (newCaregiverEmail.trim() && !profile.caregivers.find(c => c.email === newCaregiverEmail.trim())) {
      const newCaregiver: Caregiver = { 
        id: crypto.randomUUID(), 
        email: newCaregiverEmail.trim(),
        permissionLevel: newCaregiverPermission 
      };
      const updatedProfile = { ...profile, caregivers: [...profile.caregivers, newCaregiver] };
      setProfile(updatedProfile);
      saveProfileUpdate(updatedProfile);
      setNewCaregiverEmail('');
      setNewCaregiverPermission('view');
      toast({ title: "Caregiver Added", description: `${newCaregiver.email} (${newCaregiver.permissionLevel}) can now manage this profile.`, className: "bg-accent text-accent-foreground" });
    } else {
      toast({ title: "Invalid Email or Duplicate", description: "Please enter a valid, unique email address.", variant: "destructive" });
    }
  };

  const handleRemoveCaregiver = (caregiverId: string) => {
    const updatedCaregivers = profile.caregivers.filter(c => c.id !== caregiverId);
    const updatedProfile = { ...profile, caregivers: updatedCaregivers };
    setProfile(updatedProfile);
    saveProfileUpdate(updatedProfile);
    toast({ title: "Caregiver Removed", description: `Caregiver has been removed.`, variant: "default" });
  };

  const handleEditToggle = () => {
    if (isEditing) { 
      const updatedProfile: ChildProfile = {
        ...profile,
        name: editedName,
        dateOfBirth: editedDOB,
        gender: editedGender,
        weight: editedWeight,
        height: editedHeight,
        preExistingConditions: editedPreExistingConditions,
        previousAdverseReactions: editedAdverseReactions,
        allergies: editedAllergies,
        familyHistoryFlags: editedFamilyHistory,
        vaccinationHistory: editedVaccinationHistory,
        vaccinationVerificationStatus: editedVerificationStatus,
        // photoUrl and vaccinationRecordUrl are not directly edited here
      };
      setProfile(updatedProfile);
      saveProfileUpdate(updatedProfile);
      toast({ title: "Profile Updated", description: `${profile.name}'s details have been saved.`, className: "bg-accent text-accent-foreground" });
    } else { 
      setEditedName(profile.name);
      setEditedDOB(profile.dateOfBirth);
      setEditedGender(profile.gender);
      setEditedWeight(profile.weight);
      setEditedHeight(profile.height);
      setEditedPreExistingConditions(profile.preExistingConditions);
      setEditedAdverseReactions(profile.previousAdverseReactions);
      setEditedAllergies(profile.allergies);
      setEditedFamilyHistory(profile.familyHistoryFlags);
      setEditedVaccinationHistory(profile.vaccinationHistory);
      setEditedVerificationStatus(profile.vaccinationVerificationStatus);
    }
    setIsEditing(!isEditing);
  };

  const handleGenerateSchedule = async () => {
    setIsLoadingSchedule(true);
    setScheduleError(null);
    setSchedule(null);
    try {
      const result = await callGenerateScheduleAI({
        childName: profile.name,
        childDateOfBirth: profile.dateOfBirth,
        vaccinationHistory: profile.vaccinationHistory,
      });
      if (result && result.vaccinationSchedule) {
        setSchedule(result.vaccinationSchedule as VaccineDose[]);
        toast({ title: "Schedule Generated", description: `Vaccination schedule for ${profile.name} is ready.`, className: "bg-accent text-accent-foreground" });
      } else {
        throw new Error("AI service returned an empty or invalid schedule.");
      }
    } catch (error) {
      console.error("Failed to generate schedule:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setScheduleError(`Failed to generate schedule: ${errorMessage}`);
      toast({ title: "Schedule Generation Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoadingSchedule(false);
    }
  };

  const calculateAge = (dob: string) => {
    try {
      return differenceInYears(new Date(), parseISO(dob));
    } catch { return 'N/A'; }
  };
  
  const displayOrDefault = (value: string | undefined, defaultText: string = 'Not specified') => value || defaultText;

  return (
    <div className="space-y-8">
      <Card className="shadow-xl">
        <CardHeader className="flex flex-row justify-between items-start">
          <div className="flex items-center gap-4">
            {profile.photoUrl ? (
                <Image src={profile.photoUrl} alt={profile.name} width={80} height={80} className="rounded-full object-cover border" data-ai-hint="child portrait" />
            ) : (
                <UserCircle className="h-20 w-20 text-muted-foreground" />
            )}
            <div>
                <CardTitle className="text-3xl text-primary flex items-center gap-2">
                {isEditing ? 
                    <Input value={editedName} onChange={e => setEditedName(e.target.value)} className="text-3xl p-1 h-auto"/> 
                    : profile.name
                }
                </CardTitle>
                {!isEditing && <CardDescription>Manage {profile.name}'s vaccination details and schedule.</CardDescription>}
            </div>
          </div>
          <Button variant="outline" onClick={handleEditToggle} className="flex items-center gap-2">
            {isEditing ? <><Save className="h-4 w-4"/> Save Changes</> : <><Edit3 className="h-4 w-4"/> Edit Profile</>}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" />Date of Birth</h3>
                {isEditing ? (
                <Input type="date" value={editedDOB ? format(parseISO(editedDOB), 'yyyy-MM-dd') : ''} onChange={e => setEditedDOB(parseISO(e.target.value).toISOString())} />
                ) : (
                <p>{profile.dateOfBirth ? format(parseISO(profile.dateOfBirth), 'PPP') : 'Not set'} (Age: {calculateAge(profile.dateOfBirth)} years)</p>
                )}
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Users className="h-5 w-5 text-primary" />Gender</h3>
                {isEditing ? (
                     <Select onValueChange={(value) => setEditedGender(value as ChildProfile['gender'])} defaultValue={editedGender}>
                        <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                        </SelectContent>
                    </Select>
                ) : (
                    <p>{displayOrDefault(profile.gender)}</p>
                )}
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Weight className="h-5 w-5 text-primary" />Weight</h3>
                {isEditing ? (
                    <Input value={editedWeight || ''} onChange={e => setEditedWeight(e.target.value)} placeholder="e.g., 10 kg" />
                ) : (
                    <p>{displayOrDefault(profile.weight)}</p>
                )}
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Ruler className="h-5 w-5 text-primary" />Height</h3>
                {isEditing ? (
                    <Input value={editedHeight || ''} onChange={e => setEditedHeight(e.target.value)} placeholder="e.g., 75 cm" />
                ) : (
                    <p>{displayOrDefault(profile.height)}</p>
                )}
            </div>
          </section>

          <Separator />
          <h3 className="text-xl font-semibold text-primary flex items-center gap-2"><ShieldPlus className="h-6 w-6" />Medical Information</h3>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 className="text-md font-medium mb-1 flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-muted-foreground" />Pre-existing Conditions</h4>
                {isEditing ? (
                    <Textarea value={editedPreExistingConditions || ''} onChange={e => setEditedPreExistingConditions(e.target.value)} rows={3} placeholder="e.g., Asthma, Eczema"/>
                ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{displayOrDefault(profile.preExistingConditions)}</p>
                )}
            </div>
            <div>
                <h4 className="text-md font-medium mb-1 flex items-center gap-2"><AlertTriangleIcon className="h-5 w-5 text-muted-foreground" />Previous Adverse Reactions</h4>
                {isEditing ? (
                    <Textarea value={editedAdverseReactions || ''} onChange={e => setEditedAdverseReactions(e.target.value)} rows={3} placeholder="e.g., High fever after MMR"/>
                ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{displayOrDefault(profile.previousAdverseReactions)}</p>
                )}
            </div>
            <div>
                <h4 className="text-md font-medium mb-1 flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-muted-foreground" />Allergies</h4>
                 {isEditing ? (
                    <Textarea value={editedAllergies || ''} onChange={e => setEditedAllergies(e.target.value)} rows={3} placeholder="e.g., Peanuts, Penicillin"/>
                ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{displayOrDefault(profile.allergies)}</p>
                )}
            </div>
            <div>
                <h4 className="text-md font-medium mb-1 flex items-center gap-2"><Users className="h-5 w-5 text-muted-foreground" />Family History Flags</h4>
                {isEditing ? (
                    <Textarea value={editedFamilyHistory || ''} onChange={e => setEditedFamilyHistory(e.target.value)} rows={3} placeholder="e.g., Diabetes in family"/>
                ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{displayOrDefault(profile.familyHistoryFlags)}</p>
                )}
            </div>
          </section>
          
          <Separator />
          <h3 className="text-xl font-semibold text-primary flex items-center gap-2"><FileText className="h-6 w-6" />Vaccination History</h3>
          <section className="space-y-4">
            <div>
                <h4 className="text-md font-medium mb-1">Manual Record</h4>
                {isEditing ? (
                <Textarea value={editedVaccinationHistory} onChange={e => setEditedVaccinationHistory(e.target.value)} rows={5} placeholder="e.g., HepB - 01/15/2023, RV - 03/20/2023"/>
                ) : (
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">{profile.vaccinationHistory || 'No manual history recorded.'}</p>
                )}
            </div>
            <div className="flex items-center gap-4">
                <h4 className="text-md font-medium">Uploaded Record:</h4>
                {profile.vaccinationRecordUrl ? 
                    (<a href={profile.vaccinationRecordUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1"><FileArchive className="h-4 w-4"/>View Record</a>) 
                    : <span className="text-sm text-muted-foreground">None</span>
                }
            </div>
            <div>
                <h4 className="text-md font-medium mb-1">Verification Status:</h4>
                {isEditing ? (
                    <Select onValueChange={(value) => setEditedVerificationStatus(value as ChildProfile['vaccinationVerificationStatus'])} defaultValue={editedVerificationStatus}>
                        <SelectTrigger className="w-[200px]"><SelectValue placeholder="Select status" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="verified">Verified</SelectItem>
                            <SelectItem value="unverified">Unverified</SelectItem>
                        </SelectContent>
                    </Select>
                ) : (
                    <Badge variant={profile.vaccinationVerificationStatus === 'verified' ? 'default' : profile.vaccinationVerificationStatus === 'pending' ? 'secondary' : 'destructive'} className="capitalize">
                        <CheckIcon className="mr-1 h-4 w-4"/>{profile.vaccinationVerificationStatus || 'Pending'}
                    </Badge>
                )}
            </div>
          </section>
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center gap-2"><Users className="h-6 w-6" />Caregivers</CardTitle>
          <CardDescription>Manage who can access and edit this child's profile.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
            <div className="md:col-span-2">
              <Label htmlFor="caregiverEmail">Add Caregiver Email</Label>
              <Input
                type="email"
                id="caregiverEmail"
                placeholder="Enter caregiver's email"
                value={newCaregiverEmail}
                onChange={(e) => setNewCaregiverEmail(e.target.value)}
              />
            </div>
             <div>
                <Label htmlFor="caregiverPermission">Permission Level</Label>
                <Select onValueChange={(value) => setNewCaregiverPermission(value as Caregiver['permissionLevel'])} defaultValue={newCaregiverPermission}>
                    <SelectTrigger id="caregiverPermission"><SelectValue placeholder="Select permission" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="view">View Only</SelectItem>
                        <SelectItem value="edit">Edit Access</SelectItem>
                        <SelectItem value="admin">Full Admin</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleAddCaregiver} className="w-full sm:w-auto">Add Caregiver</Button>
            <Button variant="outline" onClick={() => toast({title: "QR Code Generation", description: "Feature coming soon!"})} className="w-full sm:w-auto">
                <QrCode className="mr-2 h-4 w-4"/> Generate Sharing QR (Soon)
            </Button>
          </div>
          {profile.caregivers.length > 0 ? (
            <ul className="space-y-2 pt-2">
              {profile.caregivers.map((caregiver) => (
                <li key={caregiver.id} className="flex justify-between items-center p-2 border rounded-md bg-secondary/30">
                  <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground"/>{caregiver.email} <Badge variant="outline" className="capitalize">{caregiver.permissionLevel || 'view'}</Badge></span>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove {caregiver.email} as a caregiver for {profile.name}. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleRemoveCaregiver(caregiver.id)} className="bg-destructive hover:bg-destructive/90">Remove</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">No additional caregivers assigned.</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center gap-2"><ListChecks className="h-6 w-6" />Vaccination Schedule & Catch-Up</CardTitle>
          <CardDescription>Generate a personalized vaccination schedule based on the child's age and history. This will include catch-up plans for missed doses.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGenerateSchedule} disabled={isLoadingSchedule} className="w-full md:w-auto mb-4">
            {isLoadingSchedule ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
            ) : (
              <><Wand2 className="mr-2 h-4 w-4" /> Generate Schedule</>
            )}
          </Button>
          {scheduleError && <p className="text-destructive text-sm">{scheduleError}</p>}
          {schedule && <VaccinationScheduleDisplay schedule={schedule} />}
           {!isLoadingSchedule && !schedule && !scheduleError && (
            <p className="text-muted-foreground text-center py-4">Click "Generate Schedule" to view recommended vaccinations, including any catch-up doses needed.</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => toast({title: "Export PDF", description: "Feature coming soon!"})}>
                <FileDown className="mr-2 h-4 w-4" /> Export as PDF (Soon)
            </Button>
             <Button variant="outline" className="w-full sm:w-auto" onClick={() => toast({title: "Share Profile", description: "Feature coming soon!"})}>
                <Share2 className="mr-2 h-4 w-4" /> Share Profile (Soon)
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}