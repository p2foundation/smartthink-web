import Link from 'next/link';

export const metadata = {
  title: 'Community',
  description: 'Join the SmartThink learner and professional community.',
};

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Community
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Connect with fellow learners and cybersecurity professionals. Community forums and channels coming soon.
      </p>
      <p className="mt-8">
        <Link href="/" className="text-primary-600 hover:underline">← Back to home</Link>
      </p>
    </div>
  );
}
