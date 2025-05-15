// src/lib/localStorage.ts
import type { ChildProfile } from '@/types';

const CHILDREN_KEY = 'vaxTrackChildren';

export function getChildProfiles(): ChildProfile[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(CHILDREN_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error parsing child profiles from localStorage:", error);
    // Optional: Clear corrupted data to prevent future errors
    // localStorage.removeItem(CHILDREN_KEY); 
    return []; // Return empty array on error
  }
}

export function saveChildProfiles(profiles: ChildProfile[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CHILDREN_KEY, JSON.stringify(profiles));
  } catch (error) {
    console.error("Error saving child profiles to localStorage:", error);
    // Handle potential errors during saving, e.g. localStorage full
  }
}

export function getChildProfileById(id: string): ChildProfile | undefined {
  if (!id) return undefined; // Ensure ID is not empty or null
  const profiles = getChildProfiles();
  return profiles.find(profile => profile.id === id);
}

export function addChildProfile(profileData: Omit<ChildProfile, 'id' | 'caregivers' | 'compliancePercentage'>): ChildProfile {
  const profiles = getChildProfiles();
  const newProfile: ChildProfile = {
    id: crypto.randomUUID(),
    name: profileData.name,
    dateOfBirth: profileData.dateOfBirth,
    gender: profileData.gender,
    photoUrl: profileData.photoUrl,
    weight: profileData.weight,
    height: profileData.height,
    preExistingConditions: profileData.preExistingConditions,
    previousAdverseReactions: profileData.previousAdverseReactions,
    allergies: profileData.allergies,
    familyHistoryFlags: profileData.familyHistoryFlags,
    vaccinationHistory: profileData.vaccinationHistory || "",
    vaccinationRecordUrl: profileData.vaccinationRecordUrl,
    vaccinationVerificationStatus: profileData.vaccinationVerificationStatus || 'pending',
    caregivers: [], // Initialize with no caregivers
    compliancePercentage: Math.floor(Math.random() * 51) + 50, // Random compliance for demo
  };
  profiles.push(newProfile);
  saveChildProfiles(profiles);
  return newProfile;
}

export function updateChildProfile(updatedProfile: ChildProfile): void {
  let profiles = getChildProfiles();
  profiles = profiles.map(profile =>
    profile.id === updatedProfile.id ? updatedProfile : profile
  );
  saveChildProfiles(profiles);
}

export function removeChildProfile(id: string): void {
  let profiles = getChildProfiles();
  profiles = profiles.filter(profile => profile.id !== id);
  saveChildProfiles(profiles);
}
