// src/components/layout/public-layout.tsx
import type { ReactNode } from 'react';
import Link from 'next/link';
import { SyringeIcon } from './app-layout'; 
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  // Most public pages (landing, login, register) handle their own headers.
  // If a consistent public header with theme toggle is needed, it can be added here.
  // For now, theme toggle is implicitly part of individual page layouts if they choose to include it,
  // or handled globally via the ThemeProvider. The `ThemeToggleButton` is available for use.
  // The landing page already has a header, let's add it there.

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Example of a global public header if desired: */}
      {/* 
      <header className="py-4 border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" passHref>
            <div className="flex items-center gap-2 cursor-pointer">
              <SyringeIcon className="h-8 w-8 text-primary" />
              <span className="text-2xl font-semibold text-primary">VaxTrack</span>
            </div>
          </Link>
          <ThemeToggleButton />
        </div>
      </header> 
      */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
