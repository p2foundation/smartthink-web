import Link from 'next/link';
import { Mail, MapPin, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch — sales, support, and enterprise inquiries.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Contact Us
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Sales, support, and enterprise inquiries. We respond quickly — including via WhatsApp where available.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6">
          <Mail className="h-6 w-6 text-primary-600 shrink-0" />
          <div>
            <h2 className="font-semibold text-slate-900">Email</h2>
            <a href="mailto:hello@smartthinkllc.com" className="text-primary-600 hover:underline">
              hello@smartthinkllc.com
            </a>
          </div>
        </div>
        <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6">
          <MapPin className="h-6 w-6 text-primary-600 shrink-0" />
          <div>
            <h2 className="font-semibold text-slate-900">Location</h2>
            <p className="text-slate-600">Accra, Ghana • Global</p>
          </div>
        </div>
        <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:col-span-2">
          <MessageCircle className="h-6 w-6 text-primary-600 shrink-0" />
          <div>
            <h2 className="font-semibold text-slate-900">WhatsApp Support</h2>
            <p className="text-slate-600">Region-specific WhatsApp support coming soon.</p>
            <a href="https://wa.me/233301234567" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp →
            </a>
          </div>
        </div>
      </div>
      <p className="mt-8">
        <Link href="/" className="text-primary-600 hover:underline">← Back to home</Link>
      </p>
    </div>
  );
}
