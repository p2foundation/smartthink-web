import Link from 'next/link';

export const metadata = {
  title: 'Our Mission',
  description: 'Democratizing cybersecurity education — Africa-anchored, global reach.',
};

export default function MissionPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Our Mission
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Make world-class cybersecurity training and consulting accessible everywhere — 
        mobile-first, WhatsApp-connected, with region-specific pricing and payment methods.
      </p>
      <p className="mt-8">
        <Link href="/about" className="text-primary-600 hover:underline">About us →</Link>
        {' · '}
        <Link href="/" className="text-primary-600 hover:underline">Home</Link>
      </p>
    </div>
  );
}
