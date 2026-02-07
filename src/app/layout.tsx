import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import './globals.css';

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
      <body className="min-h-screen bg-white text-slate-900 antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
