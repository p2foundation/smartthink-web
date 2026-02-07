import Link from 'next/link';
import { BookOpen, Video, Calendar, Award } from 'lucide-react';

export const metadata = {
  title: 'Training & LMS',
  description: 'Self-paced and instructor-led cybersecurity training, live Zoom sessions, certifications.',
};

export default function TrainingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Training & LMS
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Two paths: on-demand courses (Course → Module → Lesson) and live sessions (Event + Zoom). 
        Hands-on labs, assessments, QR-verified certificates, AI-powered learning paths.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {[
          { icon: BookOpen, title: 'On-demand courses', desc: 'Pre-recorded videos and media, self-paced.' },
          { icon: Calendar, title: 'Live sessions', desc: 'Real-time training via Zoom; join by link.' },
          { icon: Video, title: 'Hands-on labs', desc: 'Simulations and real-world scenarios.' },
          { icon: Award, title: 'Certifications', desc: 'QR-verified certificates and career paths.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-slate-200 bg-white p-6">
            <Icon className="h-8 w-8 text-primary-600" />
            <h2 className="mt-3 font-semibold text-slate-900">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex gap-4">
        <Link href="/courses" className="text-primary-600 font-medium hover:underline">Browse courses →</Link>
        <Link href="/register" className="text-primary-600 font-medium hover:underline">Get started →</Link>
      </div>
    </div>
  );
}
