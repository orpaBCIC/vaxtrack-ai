// src/types/index.ts
export interface Caregiver {
  id: string;
  email: string;
  permissionLevel?: 'view' | 'edit' | 'admin'; // Added permission level
}

export interface ChildProfile {
  id: string;
  name: string;
  dateOfBirth: string; // ISO string format
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say'; // Added gender
  photoUrl?: string; // Added photoUrl (will be placeholder or data URI)
  weight?: string; // Added weight (e.g., "10 kg" or "22 lbs")
  height?: string; // Added height (e.g., "75 cm" or "2 ft 6 in")
  
  preExistingConditions?: string; // Added medical history fields
  previousAdverseReactions?: string;
  allergies?: string;
  familyHistoryFlags?: string; // Simple text for flags like "Diabetes, Heart Conditions"

  vaccinationHistory: string; // Simple text for now
  vaccinationRecordUrl?: string; // Added record upload URL (placeholder or data URI)
  vaccinationVerificationStatus?: 'verified' | 'pending' | 'unverified'; // Added verification status

  caregivers: Caregiver[];
  compliancePercentage?: number; 
}

export interface VaccineDose {
  vaccine: string;
  dueDate: string; // ISO string format
  notes?: string;
  status?: 'due' | 'administered' | 'missed'; // Example status
}

export interface VaccinationSchedule {
  childId: string;
  schedule: VaccineDose[];
}

export interface DiseaseAlert {
  id: string;
  title: string;
  description: string;
  riskLevel: 'high' | 'medium' | 'low';
  dateIssued: string; // ISO string format
}

export interface VaccineFAQ {
  question: string;
  answer: string;
}

export interface VaccineInfo {
  id: string; // slug for URL and identification
  name: string; // Full vaccine name
  description: string;
  benefits: string[];
  commonSideEffects: string[];
  seriousSideEffects?: string[];
  optimalTimingWindows: string; // Text description, e.g., "Typically given at 2, 4, and 6 months"
  contraindications?: string; // Who should not get the vaccine
  staticFaqs?: VaccineFAQ[]; // Pre-defined FAQs
  lastUpdatedStatic: string; // ISO date string for static content
  efficacyStatistics?: string; // Added efficacy statistics
  sideEffectManagement?: string; // Added side effect management info
}

// Types for AI-powered vaccine search
export interface SearchedVaccineInfo {
  vaccineName: string;
  isIdentified: boolean;
  description: string;
  usageSummary: string;
  commonBenefits: string[];
  commonSideEffects: string[];
  importantConsiderations: string[];
  administrationSchedule: string;
  sourceInformation: string;
}

export interface SearchedVaccineInfoResult {
  results: SearchedVaccineInfo[];
  queryAnalysis: string;
}

```