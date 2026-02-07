import Link from 'next/link';
import { HelpCircle, BookOpen, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Help Center',
  description: 'FAQs and support for SmartThink.',
};

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Help Center
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Find answers and get support. WhatsApp support available in select regions.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          { icon: HelpCircle, title: 'FAQs', desc: 'Common questions and answers. Coming soon.' },
          { icon: BookOpen, title: 'Documentation', desc: 'Guides and tutorials. Coming soon.' },
          { icon: MessageCircle, title: 'Contact support', desc: 'Email or WhatsApp.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-slate-200 bg-white p-6">
            <Icon className="h-8 w-8 text-primary-600" />
            <h2 className="mt-3 font-semibold text-slate-900">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-8">
        <Link href="/contact" className="text-primary-600 hover:underline">Contact us →</Link>
        {' · '}
        <Link href="/" className="text-primary-600 hover:underline">Home</Link>
      </p>
    </div>
  );
}
