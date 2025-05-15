// src/components/child/vaccination-schedule-display.tsx
"use client";

import type { VaccineDose } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format, parseISO, isPast, isToday, differenceInDays } from 'date-fns';
import { Syringe, CalendarClock, Info, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import { getVaccineInfoBySlug } from '@/lib/vaccineData';
import { TranslateButton } from '@/components/ai/translate-button'; // Import TranslateButton


interface VaccinationScheduleDisplayProps {
  schedule: VaccineDose[];
}

export function VaccinationScheduleDisplay({ schedule }: VaccinationScheduleDisplayProps) {
  if (!schedule || schedule.length === 0) {
    return <p className="text-muted-foreground">No vaccination schedule information available. <TranslateButton textToTranslate="No vaccination schedule information available."/></p>;
  }

  const getStatusBadge = (dueDate: string): React.ReactNode => {
    try {
      const date = parseISO(dueDate);
      if (isToday(date)) {
        return <Badge className="bg-yellow-500 hover:bg-yellow-500/90 text-white">Due Today</Badge>;
      }
      if (isPast(date)) {
        return <Badge variant="destructive">Overdue</Badge>;
      }
      const diff = differenceInDays(date, new Date());
      if (diff >= 0 && diff <= 7) {
        return <Badge className="bg-blue-500 hover:bg-blue-500/90 text-white">Upcoming</Badge>;
      }
      return <Badge variant="outline">Scheduled</Badge>;
    } catch (error) {
      return <Badge variant="outline">Unknown Date</Badge>;
    }
  };
  
  const generateVaccineLink = (vaccineName: string): string | null => {
    const baseName = vaccineName.split('(')[0].trim();
    const slug = slugify(baseName);
    
    if (getVaccineInfoBySlug(slug)) {
      return `/vaccine/${slug}`;
    }
    const directSlug = slugify(vaccineName);
    if (getVaccineInfoBySlug(directSlug)){
      return `/vaccine/${directSlug}`;
    }
    return null; 
  };

  return (
    <div className="rounded-md border shadow-sm overflow-hidden">
      <Table>
        <TableCaption>
            Generated Vaccination Schedule. Consult with a healthcare provider for final decisions. Click on a vaccine name for more details.
            <TranslateButton textToTranslate="Generated Vaccination Schedule. Consult with a healthcare provider for final decisions. Click on a vaccine name for more details." />
        </TableCaption>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[300px]"><Syringe className="inline-block mr-2 h-4 w-4 text-primary" />Vaccine <TranslateButton textToTranslate="Vaccine" buttonSize="sm" className="ml-0" /></TableHead>
            <TableHead><CalendarClock className="inline-block mr-2 h-4 w-4 text-primary" />Due Date <TranslateButton textToTranslate="Due Date" buttonSize="sm" className="ml-0" /></TableHead>
            <TableHead><Info className="inline-block mr-2 h-4 w-4 text-primary" />Notes <TranslateButton textToTranslate="Notes" buttonSize="sm" className="ml-0" /></TableHead>
            <TableHead className="text-right">Status <TranslateButton textToTranslate="Status" buttonSize="sm" className="ml-0" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedule.map((dose, index) => {
            const vaccineLink = generateVaccineLink(dose.vaccine);
            return (
              <TableRow key={index} className="hover:bg-muted/20">
                <TableCell className="font-medium">
                  {vaccineLink ? (
                    <Link href={vaccineLink} className="hover:underline text-primary flex items-center gap-1">
                      {dose.vaccine} <LinkIcon className="h-3 w-3 opacity-70" />
                    </Link>
                  ) : (
                    dose.vaccine
                  )}
                   <TranslateButton textToTranslate={dose.vaccine} />
                </TableCell>
                <TableCell>
                  {dose.dueDate ? format(parseISO(dose.dueDate), 'PPP') : 'N/A'}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {dose.notes || 'N/A'}
                  {dose.notes && <TranslateButton textToTranslate={dose.notes} />}
                </TableCell>
                <TableCell className="text-right">{getStatusBadge(dose.dueDate)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
