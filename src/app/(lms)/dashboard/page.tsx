'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useRegionStore } from '@/stores/region-store';
import { Shield, BookOpen, Award, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchCourses } from '@/lib/lms-courses';
import { useLmsStore } from '@/stores/lms-store';
import type { Course } from '@/shared';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { regionConfig } = useRegionStore();
  const { enrollments } = useLmsStore();

  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setCoursesLoading(true);
    fetchCourses()
      .then((data) => {
        if (!alive) return;
        setCourses(data);
      })
      .finally(() => {
        if (!alive) return;
        setCoursesLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  // Mock user data for demonstration
  const mockUser = {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+233 20 123 4567',
    role: 'STUDENT' as const,
    regionCode: 'GH' as const,
    avatarUrl: undefined,
    isVerified: true,
    emailVerifiedAt: '2024-01-15T10:30:00Z',
    twoFactorEnabled: false,
    twoFactorMethod: null,
    whatsappOptIn: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  };

  const currentUser = user || mockUser;

  const userEnrollments = useMemo(() => {
    return Object.values(enrollments).filter((e) => e.userId === currentUser.id);
  }, [enrollments, currentUser.id]);

  const enrollmentByCourseId = useMemo(() => {
    const map = new Map<string, (typeof userEnrollments)[number]>();
    for (const e of userEnrollments) map.set(e.courseId, e);
    return map;
  }, [userEnrollments]);

  const enrolledCourses = useMemo(() => {
    if (!courses.length) return [] as Array<{ course: Course; progress: number; currentLessonId?: string }>;
    const list: Array<{ course: Course; progress: number; currentLessonId?: string }> = [];
    for (const course of courses) {
      const e = enrollmentByCourseId.get(course.id);
      if (!e) continue;
      list.push({ course, progress: e.progress, currentLessonId: e.currentLessonId });
    }
    list.sort((a, b) => b.progress - a.progress);
    return list;
  }, [courses, enrollmentByCourseId]);

  const completedCount = userEnrollments.filter((e) => e.status === 'COMPLETED').length;
  const enrolledCount = userEnrollments.length;

  return (
    <div>
      {/* User Profile Summary */}
      <div className="mb-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-100">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative">
            {currentUser.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-sm"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xl font-bold shadow-sm">
                {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
              </div>
            )}
            
            {/* KYC Status */}
            <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-white flex items-center justify-center ${
              currentUser.isVerified 
                ? 'bg-green-100 text-green-600 border-green-200' 
                : 'bg-amber-100 text-amber-600 border-amber-200'
            }`}>
              {currentUser.isVerified ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome back, {currentUser.firstName}!
            </h1>
            <p className="mt-1 text-slate-600">
              {currentUser.email} • {regionConfig.flag} {regionConfig.name}
            </p>
            
            {/* Status Badges */}
            <div className="flex items-center gap-3 mt-3">
              <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full border ${
                currentUser.role === 'ADMIN' ? 'bg-red-100 text-red-700 border-red-200' :
                currentUser.role === 'INSTRUCTOR' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                'bg-blue-100 text-blue-700 border-blue-200'
              }`}>
                <Shield className="h-3 w-3" />
                {currentUser.role.charAt(0) + currentUser.role.slice(1).toLowerCase()}
              </span>
              
              <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full border ${
                currentUser.isVerified 
                  ? 'bg-green-100 text-green-700 border-green-200' 
                  : 'bg-amber-100 text-amber-700 border-amber-200'
              }`}>
                {currentUser.isVerified ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    KYC Verified
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3" />
                    KYC Pending
                  </>
                )}
              </span>
              
              <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full border bg-slate-100 text-slate-700 border-slate-200">
                <Clock className="h-3 w-3" />
                Member since {new Date(currentUser.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { label: 'Enrolled Courses', value: String(enrolledCount), icon: BookOpen, color: 'bg-primary-50 text-primary-600 border-primary-100' },
          { label: 'Completed', value: String(completedCount), icon: CheckCircle, color: 'bg-green-50 text-green-600 border-green-100' },
          { label: 'Certificates', value: String(completedCount), icon: Award, color: 'bg-amber-50 text-amber-600 border-amber-100' },
          { label: 'Learning Hours', value: '—', icon: Clock, color: 'bg-purple-50 text-purple-600 border-purple-100' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl border p-6 ${stat.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 opacity-60" />
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Continue learning</h2>
            <Button variant="ghost" asChild>
              <Link href="/dashboard/courses">View all</Link>
            </Button>
          </div>

          {coursesLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="h-16 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          ) : enrolledCourses.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center">
              <div className="text-sm font-semibold text-slate-900">No enrollments yet</div>
              <div className="mt-1 text-sm text-slate-600">Explore the catalog and enroll to start learning.</div>
              <div className="mt-4">
                <Button asChild>
                  <Link href="/dashboard/courses">Browse courses</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {enrolledCourses.slice(0, 3).map(({ course, progress, currentLessonId }) => (
                <div key={course.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 truncate">{course.title}</div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold">{course.level}</span>
                        <span className="rounded-full bg-primary-50 px-2 py-0.5 font-semibold text-primary-700">{progress}%</span>
                      </div>
                    </div>

                    <Button
                      className="shrink-0 gap-2"
                      asChild
                      disabled={!currentLessonId}
                    >
                      <Link href={currentLessonId ? `/dashboard/courses/${course.slug}/lessons/${currentLessonId}` : `/dashboard/courses/${course.slug}`}>
                        Resume
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-primary-600" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Status */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Account Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Email Verification</span>
              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                currentUser.emailVerifiedAt 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {currentUser.emailVerifiedAt ? 'Verified' : 'Pending'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">KYC Status</span>
              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                currentUser.isVerified 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {currentUser.isVerified ? 'Verified' : 'Pending'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Two-Factor Auth</span>
              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                currentUser.twoFactorEnabled 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {currentUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">WhatsApp Notifications</span>
              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                currentUser.whatsappOptIn 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {currentUser.whatsappOptIn ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
