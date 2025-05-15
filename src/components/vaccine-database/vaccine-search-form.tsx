// src/components/vaccine-database/vaccine-search-form.tsx
"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';

interface VaccineSearchFormProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function VaccineSearchForm({ onSearch, isLoading }: VaccineSearchFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <Input
        type="text"
        placeholder="Search for a vaccine or symptoms..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow text-base md:text-sm"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading || !query.trim()} className="px-6">
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Search className="h-5 w-5" />
        )}
        <span className="ml-2 hidden sm:inline">Search</span>
      </Button>
    </form>
  );
}
