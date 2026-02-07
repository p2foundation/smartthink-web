import Link from 'next/link';

export const metadata = {
  title: 'Careers',
  description: 'Join SmartThink — we are hiring.',
};

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Careers
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        We are building a global team. Open roles will be listed here. 
        Send your CV to <a href="mailto:careers@smartthinkllc.com" className="text-primary-600 hover:underline">careers@smartthinkllc.com</a>.
      </p>
      <p className="mt-8">
        <Link href="/" className="text-primary-600 hover:underline">← Back to home</Link>
      </p>
    </div>
  );
}
