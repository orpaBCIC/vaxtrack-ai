// src/components/child/add-child-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Save, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { addChildProfile as saveChildProfileToStorage } from "@/lib/localStorage";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "../ui/separator";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50),
  dateOfBirth: z.date({
    required_error: "Date of birth is required.",
  }),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  photo: z.any()
    .refine((files) => files?.length <= 1, "Only one photo is allowed.")
    .refine((files) => !files || files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ).optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
  
  preExistingConditions: z.string().optional(),
  previousAdverseReactions: z.string().optional(),
  allergies: z.string().optional(),
  familyHistoryFlags: z.string().optional(),
  
  vaccinationHistory: z.string().optional(),
  vaccinationRecord: z.any()
    .refine((files) => files?.length <= 1, "Only one record file is allowed.")
    .refine((files) => !files || files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .optional(), // Can be PDF, JPG, PNG etc.
  vaccinationVerificationStatus: z.enum(['verified', 'pending', 'unverified']).default('pending'),
});

export function AddChildForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      vaccinationHistory: "",
      gender: undefined,
      weight: "",
      height: "",
      preExistingConditions: "",
      previousAdverseReactions: "",
      allergies: "",
      familyHistoryFlags: "",
      vaccinationVerificationStatus: "pending",
    },
  });

  // Simulate file to data URI conversion
  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let photoUrl: string | undefined = undefined;
      if (values.photo && values.photo.length > 0) {
        // In a real app, upload to a storage service and get URL
        // For demo, we can use a placeholder or try to convert to data URI (can be large)
        // photoUrl = await fileToDataUri(values.photo[0]); // This can make localStorage very large
        photoUrl = URL.createObjectURL(values.photo[0]); // Temporary client-side URL
        toast({ title: "Photo Selected", description: "Photo prepared (simulated upload). Note: This is a temporary local URL for demo.", duration: 5000});
      }

      let vaccinationRecordUrl: string | undefined = undefined;
      if (values.vaccinationRecord && values.vaccinationRecord.length > 0) {
        // vaccinationRecordUrl = await fileToDataUri(values.vaccinationRecord[0]);
        vaccinationRecordUrl = URL.createObjectURL(values.vaccinationRecord[0]);
        toast({ title: "Record Selected", description: "Vaccination record prepared (simulated upload). Note: This is a temporary local URL for demo.", duration: 5000});
      }
      
      const newChild = saveChildProfileToStorage({
        name: values.name,
        dateOfBirth: values.dateOfBirth.toISOString(),
        gender: values.gender,
        photoUrl: photoUrl, // Using placeholder for actual upload
        weight: values.weight,
        height: values.height,
        preExistingConditions: values.preExistingConditions,
        previousAdverseReactions: values.previousAdverseReactions,
        allergies: values.allergies,
        familyHistoryFlags: values.familyHistoryFlags,
        vaccinationHistory: values.vaccinationHistory || "",
        vaccinationRecordUrl: vaccinationRecordUrl, // Placeholder
        vaccinationVerificationStatus: values.vaccinationVerificationStatus,
      });
      toast({
        title: "Child Profile Created",
        description: `${values.name}'s profile has been successfully added.`,
        variant: "default",
        className: "bg-accent text-accent-foreground"
      });
      router.push(`/child/${newChild.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save child profile. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to save child profile:", error);
    }
  }

  const photoRef = form.register("photo");
  const recordRef = form.register("vaccinationRecord");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="text-xl font-semibold text-primary border-b pb-2">Demographics</h2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Child's Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter child's full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>Date of Birth</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        {field.value ? (
                            format(field.value, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Child's Photo (Optional)</FormLabel>
                <FormControl>
                    <Input type="file" {...photoRef} accept="image/*" />
                </FormControl>
                <FormDescription>Upload a recent photo of the child. Max 5MB. (Simulated upload for demo)</FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Weight (Optional)</FormLabel>
                    <FormControl>
                    <Input placeholder="e.g., 10 kg or 22 lbs" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Height (Optional)</FormLabel>
                    <FormControl>
                    <Input placeholder="e.g., 75 cm or 2 ft 6 in" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        
        <Separator className="my-8" />
        <h2 className="text-xl font-semibold text-primary border-b pb-2">Medical History</h2>
        <FormField
            control={form.control}
            name="preExistingConditions"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Pre-existing Conditions (Optional)</FormLabel>
                <FormControl>
                    <Textarea placeholder="List any known medical conditions, e.g., Asthma, Eczema" {...field} rows={3}/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="previousAdverseReactions"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Previous Adverse Reactions to Vaccines (Optional)</FormLabel>
                <FormControl>
                    <Textarea placeholder="Describe any significant reactions to past vaccinations" {...field} rows={3}/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="allergies"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Allergies (Optional)</FormLabel>
                <FormControl>
                    <Textarea placeholder="List any known allergies, e.g., Peanuts, Penicillin, Latex" {...field} rows={3}/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="familyHistoryFlags"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Family History Flags (Optional)</FormLabel>
                <FormControl>
                    <Textarea placeholder="Note any significant family medical history, e.g., History of autoimmune diseases, Seizure disorders in family" {...field} rows={3}/>
                </FormControl>
                <FormDescription>This can help in assessing potential risks for certain vaccines.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />

        <Separator className="my-8" />
        <h2 className="text-xl font-semibold text-primary border-b pb-2">Vaccination History</h2>
        <FormField
          control={form.control}
          name="vaccinationHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manual Vaccination Entry (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List any vaccines the child has already received, e.g., HepB - 01/15/2023, RV - 03/20/2023"
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter each vaccine and date if known.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="vaccinationRecord"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Upload Vaccination Record (Optional)</FormLabel>
                <FormControl>
                    <Input type="file" {...recordRef} accept=".pdf,.jpg,.jpeg,.png" />
                </FormControl>
                <FormDescription>Upload a scanned copy or photo of the vaccination card/record. Max 5MB. (Simulated upload for demo)</FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="vaccinationVerificationStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vaccination Record Verification Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select verification status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Needs Clarification</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Status of the uploaded vaccination record.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {form.formState.isSubmitting ? "Saving..." : "Save Child Profile"}
        </Button>
      </form>
    </Form>
  );
}
