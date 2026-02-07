'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Award, CheckCircle, ExternalLink, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Course } from '@/shared';
import { EnrollmentStatus } from '@/shared';
import { fetchCourses } from '@/lib/lms-courses';
import { useAuthStore } from '@/stores/auth-store';
import { useLmsStore } from '@/stores/lms-store';

export default function CertificatesPage() {
  const { user } = useAuthStore();
  const { enrollments } = useLmsStore();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchCourses()
      .then((data) => {
        if (!alive) return;
        setCourses(data);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  const completed = useMemo(() => {
    if (!user) return [];
    const byId = new Map(courses.map((c) => [c.id, c] as const));

    return Object.values(enrollments)
      .filter((e) => e.userId === user.id)
      .filter((e) => e.status === EnrollmentStatus.COMPLETED)
      .map((e) => {
        const course = byId.get(e.courseId);
        if (!course) return null;
        const hash = `demo-${user.id}-${course.id}`;
        return {
          course,
          issuedAt: e.completedAt ?? e.startedAt,
          verificationHash: hash,
        };
      })
      .filter(Boolean) as Array<{ course: Course; issuedAt: string; verificationHash: string }>;
  }, [user, enrollments, courses]);

  if (!user) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <div className="text-lg font-semibold text-slate-900">Sign in required</div>
        <div className="mt-2 text-sm text-slate-600">Please sign in to view certificates.</div>
        <div className="mt-6">
          <Button asChild>
            <Link href="/login">Go to login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Certificates</h1>
          <p className="mt-1 text-sm text-slate-600">Verifiable outcomes for learners and employers worldwide.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/certificates/verify" className="gap-2">
            Verify a certificate
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-primary-50 to-accent-50 p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary-700">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Investor-ready verification</div>
            <div className="mt-1 text-sm text-slate-600">
              Each certificate is designed to be QR-verifiable and tamper-resistant. This page is demo-backed by LMS completion data.
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-[170px] animate-pulse rounded-2xl border border-slate-200 bg-white p-5" />
          ))}
        </div>
      ) : completed.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <div className="mx-auto max-w-md">
            <div className="text-lg font-semibold text-slate-900">No certificates yet</div>
            <div className="mt-2 text-sm text-slate-600">
              Complete a course to generate your first certificate.
            </div>
            <div className="mt-6">
              <Button asChild>
                <Link href="/dashboard/courses">Browse courses</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {completed.map(({ course, issuedAt, verificationHash }) => (
            <div key={course.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    Issued
                  </div>
                  <div className="mt-3 text-base font-semibold text-slate-900 line-clamp-2">{course.title}</div>
                  <div className="mt-2 text-xs text-slate-600">
                    Issued: {new Date(issuedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                  <Award className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-700">Verification hash</div>
                <div className="mt-1 truncate font-mono text-xs text-slate-600">{verificationHash}</div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/certificates/verify?hash=${encodeURIComponent(verificationHash)}`}>Verify</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
