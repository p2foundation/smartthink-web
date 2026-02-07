import Link from 'next/link';
import { Award } from 'lucide-react';

export const metadata = {
  title: 'Certificates',
  description: 'QR-verified cybersecurity certificates from SmartThink.',
};

export default function CertificatesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Certificates
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Industry-aligned certifications with QR verification. Earn credentials that employers trust.
      </p>
      <div className="mt-12 flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6">
        <Award className="h-10 w-10 text-primary-600" />
        <div>
          <h2 className="font-semibold text-slate-900">Verify a certificate</h2>
          <Link href="/certificates/verify" className="text-primary-600 hover:underline">Verify certificate →</Link>
        </div>
      </div>
      <p className="mt-8">
        <Link href="/" className="text-primary-600 hover:underline">← Back to home</Link>
      </p>
    </div>
  );
}
