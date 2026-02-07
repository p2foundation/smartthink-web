import Link from 'next/link';
import { Users, BadgeCheck, Globe } from 'lucide-react';

export const metadata = {
  title: 'Recruitment',
  description: 'Connect with skills-verified cybersecurity talent across regions.',
};

export default function RecruitmentPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Talent Recruitment
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Connect your organization with skills-verified cybersecurity talent across Africa, USA, and Europe.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          { icon: Users, title: 'Verified talent', desc: 'Pre-vetted professionals ready to contribute.' },
          { icon: BadgeCheck, title: 'Skills-verified', desc: 'Certifications and practical assessments.' },
          { icon: Globe, title: 'Global reach', desc: 'GH, NG, US, EU — region-aware matching.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-slate-200 bg-white p-6">
            <Icon className="h-8 w-8 text-primary-600" />
            <h2 className="mt-3 font-semibold text-slate-900">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-slate-500">
        Recruitment is coming soon. <Link href="/contact" className="text-primary-600 hover:underline">Contact us</Link> to join the waitlist.
      </p>
    </div>
  );
}
