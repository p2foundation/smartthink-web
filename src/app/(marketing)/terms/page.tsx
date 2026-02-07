import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service',
  description: 'SmartThink terms of service.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-slate-600">
        Terms of service and acceptable use policy. Legal copy to be added. 
        Contact <a href="mailto:legal@smartthinkllc.com" className="text-primary-600 hover:underline">legal@smartthinkllc.com</a> for inquiries.
      </p>
      <p className="mt-8">
        <Link href="/" className="text-primary-600 hover:underline">← Back to home</Link>
      </p>
    </div>
  );
}
