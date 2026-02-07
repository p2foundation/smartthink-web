'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle, Shield, UploadCloud, UserCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth-store';

export default function KycPage() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();

  if (!user) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <div className="text-lg font-semibold text-slate-900">Sign in required</div>
        <div className="mt-2 text-sm text-slate-600">Please sign in to manage verification.</div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild>
            <Link href="/login">Go to login</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isVerified = Boolean(user.isVerified);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Identity Verification (KYC)</h1>
            <p className="mt-2 text-sm text-slate-600">
              Verification helps protect learners, instructors, and enterprise customers worldwide.
            </p>
          </div>
          <div className="shrink-0">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                isVerified
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-amber-200 bg-amber-50 text-amber-700'
              }`}
            >
              {isVerified ? <CheckCircle className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
              {isVerified ? 'Verified' : 'Pending'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Step 1</div>
              <div className="mt-1 text-sm text-slate-600">Confirm your basic identity details.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
              <UploadCloud className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Step 2</div>
              <div className="mt-1 text-sm text-slate-600">Upload an ID document (passport or driver’s license).</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Step 3</div>
              <div className="mt-1 text-sm text-slate-600">Secure review and approval.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-primary-50 to-accent-50 p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">Demo mode</div>
            <div className="mt-1 text-sm text-slate-600">
              This is a platform preview. Click below to simulate verification so you can enroll in paid courses.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={isVerified ? 'outline' : 'default'}
              onClick={() => {
                updateUser({ isVerified: true });
                router.push('/dashboard/courses');
              }}
              disabled={isVerified}
            >
              {isVerified ? 'Already verified' : 'Verify now'}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Back to dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
