'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { BookOpen, Shield, ToggleLeft, ToggleRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Course } from '@/shared';
import { CourseStatus } from '@/shared';
import { fetchCourses } from '@/lib/lms-courses';
import { useAuthStore } from '@/stores/auth-store';

export default function ManageCoursesPage() {
  const { user } = useAuthStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const isStaff =
    user?.role === 'ADMIN' ||
    user?.role === 'SUPER_ADMIN' ||
    user?.role === 'INSTRUCTOR' ||
    user?.role === 'CONTENT_MANAGER';

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

  const byStatus = useMemo(() => {
    const published = courses.filter((c) => c.status === CourseStatus.PUBLISHED);
    const draft = courses.filter((c) => c.status === CourseStatus.DRAFT);
    const archived = courses.filter((c) => c.status === CourseStatus.ARCHIVED);
    return { published, draft, archived };
  }, [courses]);

  if (!user) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <div className="text-lg font-semibold text-slate-900">Sign in required</div>
        <div className="mt-2 text-sm text-slate-600">Please sign in to manage courses.</div>
        <div className="mt-6">
          <Button asChild>
            <Link href="/login">Go to login</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!isStaff) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <div className="text-lg font-semibold text-slate-900">Access restricted</div>
        <div className="mt-2 text-sm text-slate-600">You don’t have permission to manage courses.</div>
        <div className="mt-6">
          <Button asChild>
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const togglePublish = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        if (c.status === CourseStatus.PUBLISHED) return { ...c, status: CourseStatus.DRAFT };
        if (c.status === CourseStatus.DRAFT) return { ...c, status: CourseStatus.PUBLISHED };
        return c;
      }),
    );
  };

  const toggleArchive = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        if (c.status === CourseStatus.ARCHIVED) return { ...c, status: CourseStatus.DRAFT };
        return { ...c, status: CourseStatus.ARCHIVED };
      }),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Manage Courses</h1>
          <p className="mt-1 text-sm text-slate-600">Staff-only view for course lifecycle and publishing controls.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/courses">View catalog</Link>
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {[{ label: 'Published', count: byStatus.published.length }, { label: 'Draft', count: byStatus.draft.length }, { label: 'Archived', count: byStatus.archived.length }].map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">{s.label}</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">{s.count}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-14 animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="grid grid-cols-12 gap-3 border-b border-slate-100 px-5 py-3 text-xs font-semibold text-slate-600">
            <div className="col-span-6">Course</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-4 text-right">Actions</div>
          </div>

          <div className="divide-y divide-slate-100">
            {courses.map((c) => (
              <div key={c.id} className="grid grid-cols-12 items-center gap-3 px-5 py-4">
                <div className="col-span-6 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900">{c.title}</div>
                      <div className="truncate text-xs text-slate-500">/{c.slug}</div>
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {c.status}
                  </span>
                </div>

                <div className="col-span-4 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => togglePublish(c.id)} className="gap-2" type="button">
                    {c.status === CourseStatus.PUBLISHED ? <ToggleLeft className="h-4 w-4" /> : <ToggleRight className="h-4 w-4" />}
                    {c.status === CourseStatus.PUBLISHED ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button variant="outline" onClick={() => toggleArchive(c.id)} className="gap-2" type="button">
                    <Shield className="h-4 w-4" />
                    {c.status === CourseStatus.ARCHIVED ? 'Restore' : 'Archive'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
