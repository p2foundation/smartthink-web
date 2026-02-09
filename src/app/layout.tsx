import type { Metadata } from 'next';
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import { Providers } from '@/components/providers';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'SmartThink — Cybersecurity Training & Consulting',
    template: '%s | SmartThink',
  },
  description:
    'World-class cybersecurity training, LMS, and consulting platform. Serving Africa, USA, and Europe with region-specific courses, certifications, and career paths.',
  keywords: [
    'cybersecurity training',
    'LMS',
    'certification',
    'Ghana',
    'Africa',
    'penetration testing',
    'cloud security',
    'SmartThink',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-bg text-fg antialiased ${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} font-sans`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
