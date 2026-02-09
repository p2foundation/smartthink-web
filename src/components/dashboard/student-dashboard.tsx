'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { useRegionStore } from '@/stores/region-store';
import { useLmsStore } from '@/stores/lms-store';
import { BookOpen, Award, Clock, CheckCircle, AlertCircle, ArrowRight, PlayCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Course, UserProfile } from '@/shared';
import { fetchCourses } from '@/lib/lms-courses';

interface StudentDashboardProps {
  user: UserProfile;
}

export function StudentDashboard({ user }: StudentDashboardProps) {
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

  const userEnrollments = useMemo(() => {
    return Object.values(enrollments).filter((e) => e.userId === user.id);
  }, [enrollments, user.id]);

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
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Enrolled Courses', value: String(enrolledCount), icon: BookOpen, color: 'bg-primary-50 text-primary-600 border-primary-100' },
          { label: 'Completed', value: String(completedCount), icon: CheckCircle, color: 'bg-green-50 text-green-600 border-green-100' },
          { label: 'Certificates', value: String(completedCount), icon: Award, color: 'bg-amber-50 text-amber-600 border-amber-100' },
          { label: 'Learning Hours', value: '12.5', icon: Clock, color: 'bg-purple-50 text-purple-600 border-purple-100' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl border p-6 ${stat.color} shadow-sm transition-all hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 opacity-60" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content - Course Progress */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Learning */}
          <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-display text-fg flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-primary-600" />
                Continue Learning
              </h2>
              <Button variant="ghost" size="sm" asChild className="text-primary-600 hover:text-primary-700">
                <Link href="/dashboard/courses">View all courses</Link>
              </Button>
            </div>

            {coursesLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="h-24 animate-pulse rounded-xl bg-bg-secondary border border-border-secondary" />
                ))}
              </div>
            ) : enrolledCourses.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-8 text-center bg-bg-secondary">
                <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-fg-muted" />
                </div>
                <h3 className="text-sm font-semibold text-fg">No active courses</h3>
                <p className="mt-1 text-sm text-fg-secondary max-w-xs mx-auto mb-4">
                  Explore our catalog and start your learning journey today.
                </p>
                <Button asChild>
                  <Link href="/dashboard/courses">Browse Catalog</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {enrolledCourses.slice(0, 3).map(({ course, progress, currentLessonId }) => (
                  <div key={course.id} className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary-200 hover:shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-bg-secondary text-fg-secondary">
                            {course.level}
                          </span>
                          <span className="text-xs text-fg-muted">•</span>
                          <span className="text-xs text-fg-muted">{course.tags?.[0] ?? 'General'}</span>
                        </div>
                        <h3 className="font-semibold text-fg truncate group-hover:text-primary-700 transition-colors">
                          {course.title}
                        </h3>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div 
                              className="h-full bg-primary-600 rounded-full transition-all duration-500" 
                              style={{ width: `${progress}%` }} 
                            />
                          </div>
                          <span className="text-xs font-medium text-fg-secondary min-w-[3ch]">
                            {progress}%
                          </span>
                        </div>
                      </div>

                      <Button
                        className="shrink-0 gap-2"
                        size="sm"
                        asChild
                        disabled={!currentLessonId}
                      >
                        <Link href={currentLessonId ? `/dashboard/courses/${course.slug}/lessons/${currentLessonId}` : `/dashboard/courses/${course.slug}`}>
                          Resume
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Recommended Path */}
          <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-500/10 text-primary-700 text-xs font-medium mb-3 border border-primary-200">
                    <Award className="h-3 w-3" />
                    Recommended Path
                  </div>
                  <h3 className="text-xl font-bold font-display mb-2">Cybersecurity Analyst Path</h3>
                  <p className="text-fg-secondary text-sm max-w-lg mb-6">
                    Master the essential skills to become a SOC Analyst. Includes 5 courses, 12 labs, and a final capstone project.
                  </p>
                  <Button variant="secondary">
                    View Learning Path
                  </Button>
                </div>
                <div className="hidden sm:block">
                  <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center border border-primary-200">
                    <span className="text-2xl font-bold">0%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar - Account & Schedule */}
        <div className="space-y-6">
          {/* Account Status */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h2 className="text-lg font-bold text-fg mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary-600" />
              Account Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-sm font-medium text-fg-secondary">Email</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full ${
                  user.emailVerifiedAt 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                }`}>
                  {user.emailVerifiedAt ? (
                    <>
                      <CheckCircle className="h-3 w-3" /> Verified
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3 w-3" /> Pending
                    </>
                  )}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-sm font-medium text-fg-secondary">KYC Status</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full ${
                  user.isVerified 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                }`}>
                  {user.isVerified ? (
                    <>
                      <CheckCircle className="h-3 w-3" /> Verified
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3 w-3" /> Pending
                    </>
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-border-secondary mt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-fg-muted uppercase tracking-wider">Profile Completion</span>
                  <span className="text-xs font-bold text-fg-secondary">85%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100">
                  <div className="h-1.5 rounded-full bg-green-500" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold font-display text-fg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary-600" />
                Upcoming
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 rounded-lg border border-border bg-card hover:border-primary-200 transition-colors cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex flex-col items-center justify-center border border-blue-100">
                    <span className="text-xs font-bold uppercase">Feb</span>
                    <span className="text-lg font-bold leading-none">12</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-fg group-hover:text-primary-700 transition-colors">Intro to Network Security</h4>
                    <p className="text-xs text-fg-muted mt-1">Live Webinar • 2:00 PM UTC</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-border bg-card hover:border-primary-200 transition-colors cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex flex-col items-center justify-center border border-purple-100">
                    <span className="text-xs font-bold uppercase">Feb</span>
                    <span className="text-lg font-bold leading-none">15</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-fg group-hover:text-primary-700 transition-colors">Weekly Mentorship Call</h4>
                    <p className="text-xs text-fg-muted mt-1">Group Session • 4:00 PM UTC</p>
                  </div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4 text-xs h-8">
              View Calendar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
