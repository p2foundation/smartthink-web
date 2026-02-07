'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle, Clock, PauseCircle, PlayCircle, ShieldX, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Course } from '@/shared';
import { fetchCourses } from '@/lib/lms-courses';
import { useAuthStore } from '@/stores/auth-store';
import { EnrollmentStatus } from '@/shared';
import { useLmsStore } from '@/stores/lms-store';

function badgeForStatus(status: EnrollmentStatus) {
  switch (status) {
    case EnrollmentStatus.ACTIVE:
      return 'bg-primary-50 text-primary-700 border-primary-200';
    case EnrollmentStatus.COMPLETED:
      return 'bg-green-50 text-green-700 border-green-200';
    case EnrollmentStatus.PAUSED:
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case EnrollmentStatus.CANCELLED:
      return 'bg-slate-100 text-slate-700 border-slate-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

export default function MyCoursesPage() {
  const { user } = useAuthStore();
  const {
    enrollments,
    pauseEnrollment,
    resumeEnrollment,
    cancelEnrollment,
    resetEnrollment,
  } = useLmsStore();

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

  const myEnrollments = useMemo(() => {
    if (!user) return [];
    return Object.values(enrollments)
      .filter((e) => e.userId === user.id)
      .sort((a, b) => b.progress - a.progress);
  }, [enrollments, user]);

  const courseById = useMemo(() => {
    const map = new Map<string, Course>();
    for (const c of courses) map.set(c.id, c);
    return map;
  }, [courses]);

  const rows = useMemo(() => {
    return myEnrollments
      .map((e) => {
        const course = courseById.get(e.courseId);
        if (!course) return null;
        return { course, enrollment: e };
      })
      .filter(Boolean) as Array<{ course: Course; enrollment: (typeof myEnrollments)[number] }>;
  }, [myEnrollments, courseById]);

  if (!user) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <div className="text-lg font-semibold text-slate-900">Sign in required</div>
        <div className="mt-2 text-sm text-slate-600">Please sign in to view your courses.</div>
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
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">My Courses</h1>
          <p className="mt-1 text-sm text-slate-600">Enrollments, progress, and outcomes in one place.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/courses">Browse catalog</Link>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-[180px] animate-pulse rounded-2xl border border-slate-200 bg-white p-5" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <div className="mx-auto max-w-md">
            <div className="text-lg font-semibold text-slate-900">No courses yet</div>
            <div className="mt-2 text-sm text-slate-600">Start by enrolling in a course from the catalog.</div>
            <div className="mt-6">
              <Button asChild>
                <Link href="/dashboard/courses">Explore courses</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map(({ course, enrollment }) => {
            const statusBadge = badgeForStatus(enrollment.status);
            const resumeHref = enrollment.currentLessonId
              ? `/dashboard/courses/${course.slug}/lessons/${enrollment.currentLessonId}`
              : `/dashboard/courses/${course.slug}`;

            return (
              <div key={course.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusBadge}`}>
                        {enrollment.status}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {course.level}
                      </span>
                    </div>
                    <div className="mt-3 text-base font-semibold text-slate-900 line-clamp-2">{course.title}</div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>{Math.round(course.totalDuration / 60)} min</span>
                      <span className="text-slate-300">•</span>
                      <BookOpen className="h-4 w-4 text-slate-400" />
                      <span>{course.totalLessons} lessons</span>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 opacity-90" />
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Progress</span>
                    <span>{enrollment.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-primary-600" style={{ width: `${enrollment.progress}%` }} />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild className="gap-2" disabled={enrollment.status === EnrollmentStatus.CANCELLED}>
                    <Link href={resumeHref}>
                      {enrollment.status === EnrollmentStatus.COMPLETED ? 'Review' : 'Resume'}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  {enrollment.status === EnrollmentStatus.ACTIVE && (
                    <Button
                      variant="outline"
                      onClick={() => pauseEnrollment({ userId: user.id, courseId: course.id })}
                      className="gap-2"
                      type="button"
                    >
                      <PauseCircle className="h-4 w-4" />
                      Pause
                    </Button>
                  )}

                  {enrollment.status === EnrollmentStatus.PAUSED && (
                    <Button
                      variant="outline"
                      onClick={() => resumeEnrollment({ userId: user.id, courseId: course.id })}
                      className="gap-2"
                      type="button"
                    >
                      <PlayCircle className="h-4 w-4" />
                      Resume
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    onClick={() => resetEnrollment({ userId: user.id, courseId: course.id, firstLessonId: course.modules[0]?.lessons[0]?.id })}
                    className="gap-2"
                    type="button"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Restart
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => cancelEnrollment({ userId: user.id, courseId: course.id })}
                    className="gap-2 text-red-600 hover:text-red-700"
                    type="button"
                    disabled={enrollment.status === EnrollmentStatus.CANCELLED}
                  >
                    <XCircle className="h-4 w-4" />
                    Cancel
                  </Button>

                  {!user.isVerified && (
                    <Button variant="outline" asChild className="gap-2">
                      <Link href="/dashboard/kyc">
                        <ShieldX className="h-4 w-4" />
                        Verify KYC
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
