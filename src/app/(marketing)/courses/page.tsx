import Link from 'next/link';
import { BookOpen, Video, Award } from 'lucide-react';

export const metadata = {
  title: 'Courses',
  description: 'Browse cybersecurity courses — self-paced, hands-on labs, and industry certifications.',
};

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Cybersecurity Courses
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        On-demand training: pre-recorded videos, modules, and lessons. Self-paced learning with
        region-specific pricing (GH₵, NGN, $, €).
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          { icon: BookOpen, title: 'Self-paced', desc: 'Learn at your own speed' },
          { icon: Video, title: 'Hands-on labs', desc: 'Real-world scenarios' },
          { icon: Award, title: 'Certifications', desc: 'QR-verified certificates' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-slate-200 bg-white p-6">
            <Icon className="h-8 w-8 text-primary-600" />
            <h2 className="mt-3 font-semibold text-slate-900">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-slate-500">
        Course catalog is loading from the API. <Link href="/" className="text-primary-600 hover:underline">Back to home</Link>.
      </p>
    </div>
  );
}
