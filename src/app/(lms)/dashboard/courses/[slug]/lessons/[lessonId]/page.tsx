'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Clock, Layers, PlayCircle, Shield } from 'lucide-react';

import type { Course, Lesson } from '@/shared';
import { Button } from '@/components/ui/button';
import { fetchCourseBySlug } from '@/lib/lms-courses';
import { useAuthStore } from '@/stores/auth-store';
import { useRegionStore } from '@/stores/region-store';
import { getEnrollmentForUser, useLmsStore } from '@/stores/lms-store';

function iconFor(type: Lesson['type']) {
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

export default function LessonViewerPage() {
  const params = useParams<{ slug: string; lessonId: string }>();
  const slug = params?.slug;
  const lessonId = params?.lessonId;

  const router = useRouter();
  const { tokens, user } = useAuthStore();
  const { regionCode } = useRegionStore();
  const { enrollments, enroll, setCurrentLesson, markLessonComplete } = useLmsStore();

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMarking, setIsMarking] = useState(false);

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

  const orderedLessons = useMemo(() => {
    if (!course) return [] as Lesson[];
    const modules = course.modules.slice().sort((a, b) => a.order - b.order);
    const list: Lesson[] = [];
    for (const m of modules) {
      const lessons = m.lessons.slice().sort((a, b) => a.order - b.order);
      for (const l of lessons) list.push(l);
    }
    return list;
  }, [course]);

  const currentIndex = orderedLessons.findIndex((l) => l.id === lessonId);
  const currentLesson = currentIndex >= 0 ? orderedLessons[currentIndex] : undefined;
  const prevLesson = currentIndex > 0 ? orderedLessons[currentIndex - 1] : undefined;
  const nextLesson = currentIndex >= 0 && currentIndex < orderedLessons.length - 1 ? orderedLessons[currentIndex + 1] : undefined;

  const enrollment = useMemo(() => {
    if (!user || !course) return undefined;
    return getEnrollmentForUser(enrollments, user.id, course.id);
  }, [enrollments, user, course]);

  useEffect(() => {
    if (!user || !course || !lessonId) return;

    if (!enrollment) {
      enroll({ userId: user.id, courseId: course.id, firstLessonId: lessonId });
    }

    setCurrentLesson({ userId: user.id, courseId: course.id, lessonId });
  }, [user, course, lessonId, enrollment, enroll, setCurrentLesson]);

  const isCompleted = Boolean(enrollment?.completedLessonIds.includes(lessonId));

  const handleMarkComplete = async () => {
    if (!user || !course || !currentLesson) return;

    setIsMarking(true);
    await new Promise((r) => setTimeout(r, 500));
    markLessonComplete({ userId: user.id, courseId: course.id, lessonId: currentLesson.id, totalLessons: orderedLessons.length });
    setIsMarking(false);
  };

  if (!user) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <div className="text-lg font-semibold text-slate-900">Sign in required</div>
        <div className="mt-2 text-sm text-slate-600">Please sign in to start learning.</div>
        <div className="mt-6">
          <Button asChild>
            <Link href="/login">Go to login</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-48 animate-pulse rounded bg-slate-100" />
        <div className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white" />
        <div className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white" />
      </div>
    );
  }

  if (!course || !currentLesson) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <div className="text-lg font-semibold text-slate-900">Lesson not found</div>
        <div className="mt-2 text-sm text-slate-600">Try returning to the course overview.</div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/courses">Back to courses</Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/courses/${slug}`}>Course overview</Link>
          </Button>
        </div>
      </div>
    );
  }

  const progress = enrollment?.progress ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href={`/dashboard/courses/${slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primary-700">
            <ArrowLeft className="h-4 w-4" />
            Back to course
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">{currentLesson.title}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
              {iconFor(currentLesson.type)}
              {currentLesson.type}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
              <Clock className="h-4 w-4 text-slate-400" />
              {Math.max(1, Math.round(currentLesson.duration / 60))} min
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-2.5 py-1 font-semibold text-primary-700">
              Progress {progress}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleMarkComplete} disabled={isCompleted || isMarking} className="gap-2">
            <CheckCircle className="h-4 w-4" />
            {isCompleted ? 'Completed' : isMarking ? 'Saving…' : 'Mark complete'}
          </Button>
          <Button
            onClick={() => {
              if (!nextLesson) return;
              router.push(`/dashboard/courses/${slug}/lessons/${nextLesson.id}`);
            }}
            disabled={!nextLesson}
            className="gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Lesson content</div>
          <div className="mt-2 text-sm text-slate-600">
            {currentLesson.content ? currentLesson.content : 'This lesson content will render here (video/text/lab/quiz) once the API is connected.'}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Up next</div>
          <div className="mt-3 space-y-2">
            {orderedLessons.slice(0, 12).map((l) => {
              const active = l.id === currentLesson.id;
              const done = Boolean(enrollment?.completedLessonIds.includes(l.id));
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => router.push(`/dashboard/courses/${slug}/lessons/${l.id}`)}
                  className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition ${
                    active
                      ? 'border-primary-200 bg-primary-50 text-primary-800'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{l.title}</div>
                      <div className="mt-0.5 text-xs text-slate-500">{l.type}</div>
                    </div>
                    {done && <CheckCircle className="h-4 w-4 text-green-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => {
            if (!prevLesson) return;
            router.push(`/dashboard/courses/${slug}/lessons/${prevLesson.id}`);
          }}
          disabled={!prevLesson}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <Button asChild variant="ghost">
          <Link href="/dashboard/courses">All courses</Link>
        </Button>
      </div>
    </div>
  );
}
