'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Award, BookOpen, ChevronRight, Clock, Layers, PlayCircle, Shield, Star, Users } from 'lucide-react';

import type { Course, Lesson } from '@/shared';
import { Button } from '@/components/ui/button';
import { fetchCourseBySlug } from '@/lib/lms-courses';
import { useAuthStore } from '@/stores/auth-store';
import { useRegionStore } from '@/stores/region-store';
import { formatPrice } from '@/shared';
import { getEnrollmentForUser, useLmsStore } from '@/stores/lms-store';

function lessonIcon(type: Lesson['type']) {
  switch (type) {
    case 'VIDEO':
      return <PlayCircle className="h-4 w-4 text-primary-600" />;
    case 'QUIZ':
      return <Shield className="h-4 w-4 text-amber-600" />;
    case 'LAB':
      return <Layers className="h-4 w-4 text-accent-600" />;
    default:
      return <BookOpen className="h-4 w-4 text-slate-500" />;
  }
}

export default function DashboardCourseDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const router = useRouter();
  const { tokens, user } = useAuthStore();
  const { regionCode } = useRegionStore();
  const { enrollments, enroll } = useLmsStore();

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    setIsLoading(true);

    fetchCourseBySlug(slug, { token: tokens?.accessToken ?? undefined, regionCode: regionCode ?? undefined })
      .then((c) => {
        if (!alive) return;
        setCourse(c);
      })
      .finally(() => {
        if (!alive) return;
        setIsLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [slug, tokens?.accessToken, regionCode]);

  const pricing = useMemo(() => {
    if (!course) return undefined;
    return course.regionPricing.find((p) => p.regionCode === regionCode) ?? course.regionPricing[0];
  }, [course, regionCode]);

  const price = useMemo(() => {
    if (!pricing) return undefined;
    return formatPrice(pricing.price, pricing.regionCode);
  }, [pricing]);

  const originalPrice = useMemo(() => {
    if (!pricing?.originalPrice) return undefined;
    return formatPrice(pricing.originalPrice, pricing.regionCode);
  }, [pricing]);

  const minutes = course ? Math.round(course.totalDuration / 60) : 0;

  const orderedLessons = useMemo(() => {
    if (!course) return [] as Array<{ moduleId: string; moduleTitle: string; lesson: Lesson }>;
    const result: Array<{ moduleId: string; moduleTitle: string; lesson: Lesson }> = [];
    const modules = course.modules.slice().sort((a, b) => a.order - b.order);
    for (const m of modules) {
      const lessons = m.lessons.slice().sort((a, b) => a.order - b.order);
      for (const l of lessons) result.push({ moduleId: m.id, moduleTitle: m.title, lesson: l });
    }
    return result;
  }, [course]);

  const enrollment = useMemo(() => {
    if (!user || !course) return undefined;
    return getEnrollmentForUser(enrollments, user.id, course.id);
  }, [enrollments, user, course]);

  const enrolled = Boolean(enrollment);
  const progress = enrollment?.progress ?? 0;

  const firstLessonId = orderedLessons[0]?.lesson.id;
  const currentLessonId = enrollment?.currentLessonId ?? firstLessonId;

  const needsKyc = Boolean(user) && !user?.isVerified && Boolean(pricing?.price && pricing.price > 0);

  const startLearning = async () => {
    if (!course) return;

    if (!user) {
      router.push('/login');
      return;
    }

    if (needsKyc) {
      router.push('/dashboard/kyc');
      return;
    }

    if (!enrolled) {
      setIsEnrolling(true);
      await new Promise((r) => setTimeout(r, 900));
      enroll({ userId: user.id, courseId: course.id, firstLessonId });
      setIsEnrolling(false);
    }

    if (currentLessonId) {
      router.push(`/dashboard/courses/${course.slug}/lessons/${currentLessonId}`);
    } else {
      router.push('/dashboard/courses');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-48 animate-pulse rounded bg-slate-100" />
        <div className="h-20 animate-pulse rounded-2xl border border-slate-200 bg-white" />
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />
          <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <div className="text-lg font-semibold text-slate-900">Course not found</div>
        <div className="mt-2 text-sm text-slate-600">Try returning to the course catalog.</div>
        <div className="mt-6">
          <Button asChild>
            <Link href="/dashboard/courses">Back to courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isStaff = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' || user?.role === 'INSTRUCTOR' || user?.role === 'CONTENT_MANAGER';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/dashboard" className="hover:text-slate-700">Dashboard</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/dashboard/courses" className="hover:text-slate-700">Courses</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="line-clamp-1 text-slate-700">{course.title}</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
                {course.level}
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                {course.status}
              </span>
              {course.tags.slice(0, 4).map((t) => (
                <span key={t} className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {t}
                </span>
              ))}
            </div>

            <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">{course.title}</h1>

            {course.shortDescription && (
              <p className="mt-2 max-w-3xl text-sm text-slate-600">{course.shortDescription}</p>
            )}

            <div className="mt-4 grid gap-3 text-xs text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>{minutes} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-slate-400" />
                <span>{course.totalLessons} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-400" />
                <span>{course.enrollmentCount.toLocaleString()} learners</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span>{course.averageRating.toFixed(1)} rating</span>
              </div>
            </div>
          </div>

          <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:max-w-sm">
            <div className="flex items-end justify-between gap-4">
              <div className="text-sm font-semibold text-slate-900">
                {price ?? '—'}
                {originalPrice && (
                  <span className="ml-2 text-xs font-medium text-slate-400 line-through">{originalPrice}</span>
                )}
              </div>
              {pricing?.discountPercentage ? (
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                  Save {pricing.discountPercentage}%
                </span>
              ) : null}
            </div>

            {enrolled && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-white">
                  <div className="h-2 rounded-full bg-primary-600" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            <div className="mt-5 space-y-2">
              <Button className="w-full" onClick={startLearning} disabled={isEnrolling}>
                {needsKyc ? 'Complete KYC to enroll' : enrolled ? 'Continue learning' : isEnrolling ? 'Enrolling…' : 'Enroll & start'}
              </Button>
              {isStaff && (
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#">Manage course</Link>
                </Button>
              )}
              <div className="pt-1 text-xs text-slate-500">
                Instructor: {course.instructor.firstName} {course.instructor.lastName}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">What you’ll learn</h2>
            <p className="mt-2 text-sm text-slate-600">{course.description}</p>

            {course.prerequisites.length > 0 && (
              <div className="mt-4">
                <div className="text-xs font-semibold text-slate-600">Prerequisites</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {course.prerequisites.map((p) => (
                    <span key={p} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Curriculum</h2>
              <div className="text-xs text-slate-500">{course.modules.length} modules</div>
            </div>

            <div className="mt-4 space-y-4">
              {course.modules
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((m) => (
                  <div key={m.id} className="rounded-xl border border-slate-200 bg-white">
                    <div className="flex items-start justify-between gap-3 px-4 py-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{m.order + 1}. {m.title}</div>
                        {m.description && <div className="mt-1 text-xs text-slate-500">{m.description}</div>}
                      </div>
                      <div className="text-xs font-semibold text-slate-600">{m.lessons.length} lessons</div>
                    </div>
                    <div className="border-t border-slate-100">
                      {m.lessons
                        .slice()
                        .sort((a, b) => a.order - b.order)
                        .map((l) => (
                          <div key={l.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                            <div className="flex min-w-0 items-center gap-2">
                              {lessonIcon(l.type)}
                              <div className="min-w-0">
                                <div className="truncate text-sm text-slate-800">{l.title}</div>
                                <div className="text-xs text-slate-500">{l.type}</div>
                              </div>
                            </div>
                            <div className="shrink-0 text-xs font-semibold text-slate-600">
                              {Math.max(1, Math.round(l.duration / 60))}m
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Investor-ready quality</h2>
            <div className="mt-3 space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <Shield className="mt-0.5 h-4 w-4 text-primary-600" />
                <div>
                  <div className="font-semibold text-slate-900">Role-aware learning</div>
                  <div className="text-xs">Student, Instructor, Admin paths with clear access boundaries.</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Award className="mt-0.5 h-4 w-4 text-amber-600" />
                <div>
                  <div className="font-semibold text-slate-900">Certification outcomes</div>
                  <div className="text-xs">Designed to lead to verifiable certificates and job readiness.</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Layers className="mt-0.5 h-4 w-4 text-accent-600" />
                <div>
                  <div className="font-semibold text-slate-900">Modular architecture</div>
                  <div className="text-xs">Modules → lessons → labs, built for scale and performance.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-primary-50 to-accent-50 p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Next best action</div>
            <div className="mt-2 text-sm text-slate-600">Enroll and complete the first module today.</div>
            <Button className="mt-4 w-full" onClick={startLearning} disabled={isEnrolling}>
              {enrolled ? 'Continue' : isEnrolling ? 'Enrolling…' : 'Start now'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
