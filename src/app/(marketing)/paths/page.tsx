import Link from 'next/link';
import { Route } from 'lucide-react';

export const metadata = {
  title: 'Learning Paths',
  description: 'Structured learning paths for cybersecurity roles and certifications.',
};

export default function LearningPathsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Learning Paths
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        AI-powered and curated paths: from fundamentals to advanced roles. Coming soon.
      </p>
      <div className="mt-12 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <Route className="h-10 w-10 text-primary-600" />
        <p className="text-slate-600">
          Paths will combine courses, labs, and live sessions. <Link href="/courses" className="text-primary-600 hover:underline">Browse courses</Link> in the meantime.
        </p>
      </div>
      <p className="mt-8">
        <Link href="/" className="text-primary-600 hover:underline">← Back to home</Link>
      </p>
    </div>
  );
}
