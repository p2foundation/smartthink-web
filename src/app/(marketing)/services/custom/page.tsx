import Link from 'next/link';

export const metadata = {
  title: 'Custom Solutions',
  description: 'Tailored cybersecurity training and consulting for your organization.',
};

export default function CustomSolutionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Custom Solutions
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Tailored training programs, custom learning paths, and enterprise deployments. 
        Region-specific content and pricing.
      </p>
      <p className="mt-8">
        <Link href="/contact" className="text-primary-600 font-medium hover:underline">Contact sales →</Link>
        {' · '}
        <Link href="/" className="text-primary-600 font-medium hover:underline">Back to home</Link>
      </p>
    </div>
  );
}
