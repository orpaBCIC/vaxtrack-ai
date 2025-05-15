import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[()]/g, '') // Remove parentheses
    .replace(/[^\w-]+/g, '') // Remove all non-word chars (except hyphen)
    .replace(/--+/g, '-'); // Replace multiple - with single -
}
