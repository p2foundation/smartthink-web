import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
  description: 'SmartThink privacy policy and data handling.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-slate-600">
        How we collect, use, and protect your data. We are committed to privacy and regional compliance (e.g. GDPR where applicable). 
        Full policy to be published. Contact <a href="mailto:privacy@smartthinkllc.com" className="text-primary-600 hover:underline">privacy@smartthinkllc.com</a>.
      </p>
      <p className="mt-8">
        <Link href="/" className="text-primary-600 hover:underline">← Back to home</Link>
      </p>
    </div>
  );
}
