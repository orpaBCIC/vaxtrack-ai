// src/components/layout/app-layout.tsx
"use client";

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, PlusCircle, MapPin, Bell, Baby, FileSearch, Settings } from 'lucide-react'; 
import { Separator } from '@/components/ui/separator';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button'; // Import ThemeToggleButton

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  matchStartsWith?: boolean;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home, matchStartsWith: false }, 
  { href: '/add-child', label: 'Add Child', icon: PlusCircle, matchStartsWith: false },
  { href: '/child', label: 'Child Profiles', icon: Baby, matchStartsWith: true }, 
  { href: '/vaccine-database', label: 'Vaccine Database', icon: FileSearch, matchStartsWith: false }, 
  { href: '/clinics', label: 'Nearby Clinics', icon: MapPin, matchStartsWith: false },
  { href: '/alerts', label: 'Alerts', icon: Bell, matchStartsWith: false },
  { href: '/settings', label: 'Settings', icon: Settings, matchStartsWith: false }, // Added Settings
];

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.matchStartsWith) {
      return pathname.startsWith(item.href);
    }
    return pathname === item.href;
  };
  
  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between p-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <SyringeIcon className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-semibold text-primary">VaxTrack</h1>
            </Link>
          </div>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={isActive(item)}
                    tooltip={{children: item.label, side: 'right', align: 'center'}}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          {/* Optional: Add footer content like settings or logout later */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:justify-end">
          <SidebarTrigger className="md:hidden" />
          <ThemeToggleButton /> {/* Add ThemeToggleButton here */}
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function SyringeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 2 4 4" />
      <path d="m17 7 3-3" />
      <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
      <path d="m9 11 4 4" />
      <path d="m5 19-3 3" />
      <path d="m14 4 6 6" />
    </svg>
  )
}
