import Link from 'next/link';
import { Shield, FileCheck, AlertTriangle, Layout } from 'lucide-react';

export const metadata = {
  title: 'Consulting',
  description: 'Enterprise cybersecurity consulting — risk, compliance, incident response, architecture.',
};

export default function ConsultingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Enterprise Consulting
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Risk assessments, compliance audits, incident response, and security architecture. 
        Regional compliance expertise.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {[
          { icon: Shield, title: 'Risk assessments', desc: 'Identify and prioritize security risks.' },
          { icon: FileCheck, title: 'Compliance audits', desc: 'ISO 27001, SOC 2, and regional frameworks.' },
          { icon: AlertTriangle, title: 'Incident response', desc: 'Preparation and response planning.' },
          { icon: Layout, title: 'Security architecture', desc: 'Design and review secure systems.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-slate-200 bg-white p-6">
            <Icon className="h-8 w-8 text-primary-600" />
            <h2 className="mt-3 font-semibold text-slate-900">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-slate-500">
        Consulting services are in development. <Link href="/contact" className="text-primary-600 hover:underline">Contact us</Link> for early access.
      </p>
    </div>
  );
}
