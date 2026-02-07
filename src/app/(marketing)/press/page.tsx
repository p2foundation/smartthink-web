import Link from 'next/link';

export const metadata = {
  title: 'Press & Media',
  description: 'Press kit and media inquiries.',
};

export default function PressPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Press & Media
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        For press and media inquiries, contact <a href="mailto:press@smartthinkllc.com" className="text-primary-600 hover:underline">press@smartthinkllc.com</a>.
      </p>
      <p className="mt-8">
        <Link href="/" className="text-primary-600 hover:underline">← Back to home</Link>
      </p>
    </div>
  );
}
