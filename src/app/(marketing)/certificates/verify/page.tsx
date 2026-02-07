import Link from 'next/link';
import { Search } from 'lucide-react';

export const metadata = {
  title: 'Verify Certificate',
  description: 'Verify a SmartThink certificate by code or QR.',
};

export default function VerifyCertificatePage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Verify Certificate
      </h1>
      <p className="mt-4 text-slate-600">
        Enter the verification code from the certificate to confirm authenticity.
      </p>
      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
        <label className="block text-sm font-medium text-slate-700">Verification code</label>
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            placeholder="e.g. ST-xxxx-xxxx"
            className="flex-1 rounded-lg border border-slate-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-3 font-medium text-white hover:bg-primary-700">
            <Search className="h-5 w-5" />
            Verify
          </button>
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Verification API integration coming soon.
        </p>
      </div>
      <p className="mt-8">
        <Link href="/certificates" className="text-primary-600 hover:underline">← Certificates</Link>
      </p>
    </div>
  );
}
