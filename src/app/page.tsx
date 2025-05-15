// src/app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SyringeIcon } from '@/components/layout/app-layout'; 
import Image from 'next/image';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted/30">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SyringeIcon className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold text-primary">VaxTrack</h1>
        </div>
        <nav className="space-x-4 flex items-center">
          <ThemeToggleButton />
          <Link href="/login" passHref>
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/register" passHref>
            <Button>Register</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-grow container mx-auto flex flex-col items-center justify-center text-center py-12 px-4">
        <Card className="w-full max-w-3xl shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-5xl font-extrabold tracking-tight text-primary">
              Welcome to VaxTrack
            </CardTitle>
            <CardDescription className="text-xl text-muted-foreground mt-2">
              Your trusted partner in managing child vaccination schedules and staying informed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <Image
              src="/hero.jpeg"
              alt="Happy healthy family"
              width={800}
              height={400}
              className="rounded-lg shadow-lg mx-auto"
              data-ai-hint="family health"
            />
            <p className="text-lg text-foreground/90">
              VaxTrack helps you keep your children's immunizations up-to-date, provides reliable information on vaccines, and alerts you to important health advisories.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/register" passHref>
                <Button size="lg" className="text-lg px-8 py-6">Get Started</Button>
              </Link>
              <Link href="/dashboard" passHref>
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">View Demo Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <section className="mt-16 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Personalized Schedules", description: "Generate and track vaccination schedules for each child.", dataAiHint: "calendar schedule", image:"/schedule.jpeg" },
            { title: "Vaccine Information", description: "Access detailed information about various vaccines.", dataAiHint: "medical research", image:"/vac.jpeg"  },
            { title: "Health Alerts", description: "Stay updated on local disease outbreaks and advisories.", dataAiHint: "alert notification", image:"/alert.jpeg"  }
          ].map(feature => (
            <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow bg-card/70">
              <CardHeader>
                <Image 
                  src={`${feature.image}`} 
                  alt={feature.title}
                  width={300}
                  height={200}
                  className="rounded-t-lg object-cover w-full h-32"
                  data-ai-hint={feature.dataAiHint}
                />
                <CardTitle className="mt-4 text-primary">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>

      <footer className="container mx-auto py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} VaxTrack. All rights reserved.</p>
      </footer>
    </div>
  );
}
