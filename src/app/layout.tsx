// src/app/layout.tsx
"use client"; 

import { usePathname } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppLayout } from '@/components/layout/app-layout';
import { PublicLayout } from '@/components/layout/public-layout';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/hooks/use-theme'; // Import ThemeProvider

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const PUBLIC_PATHS = ['/', '/login', '/register']; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPublicPage = PUBLIC_PATHS.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning> {/* suppressHydrationWarning recommended for theme switching */}
      <head>
        <title>VaxTrack MVP</title>
        <meta name="description" content="Track and manage vaccination schedules for your children." />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider> {/* Wrap with ThemeProvider */}
          {isPublicPage ? (
            <PublicLayout>{children}</PublicLayout>
          ) : (
            <AppLayout>{children}</AppLayout>
          )}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
