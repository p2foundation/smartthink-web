'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { useRegionStore } from '@/stores/region-store';
import { Users, BookOpen, Star, DollarSign, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Course, UserProfile } from '@/shared';
import { fetchCourses } from '@/lib/lms-courses';

interface InstructorDashboardProps {
  user: UserProfile;
}

export function InstructorDashboard({ user }: InstructorDashboardProps) {
  const { regionConfig } = useRegionStore();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setCoursesLoading(true);
    fetchCourses()
      .then((data) => {
        if (!alive) return;
        // In a real app, we would fetch only instructor's courses
        // For now, we'll filter client-side or just show all for demo if ID matches
        // adjusting to filter by instructor.id if possible, otherwise showing all for demo purposes
        // assuming mock data might not perfectly align with current user ID
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

  // Filter courses taught by this instructor (mock logic: if course.instructor.id matches or just some for demo)
  // For demo: we'll just take the first 3 courses and pretend they are ours if none match
  const myCourses = useMemo(() => {
    const owned = courses.filter(c => c.instructor.id === user.id);
    return owned.length > 0 ? owned : courses.slice(0, 3); 
  }, [courses, user.id]);

  const stats = useMemo(() => {
    const totalStudents = myCourses.reduce((acc, c) => acc + (c.enrollmentCount || 0), 0);
    const avgRating = myCourses.length 
      ? myCourses.reduce((acc, c) => acc + (c.averageRating || 0), 0) / myCourses.length 
      : 0;
    
    return {
      totalCourses: myCourses.length,
      totalStudents,
      avgRating: avgRating.toFixed(1),
      revenue: totalStudents * 150 // Mock revenue calculation
    };
  }, [myCourses]);

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Active Courses', value: String(stats.totalCourses), icon: BookOpen, color: 'bg-blue-50 text-blue-600 border-blue-100' },
          { label: 'Total Students', value: String(stats.totalStudents), icon: Users, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
          { label: 'Average Rating', value: stats.avgRating, icon: Star, color: 'bg-amber-50 text-amber-600 border-amber-100' },
          { label: 'Total Revenue', value: `${regionConfig.currency} ${stats.revenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-50 text-green-600 border-green-100' },
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
        {/* Main Content - My Courses */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary-600" />
                My Courses
              </h2>
              <div className="flex gap-2">
                 <Button size="sm" asChild>
                  <Link href="/dashboard/manage/courses/new">
                    <Plus className="h-4 w-4 mr-1" />
                    Create Course
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="text-primary-600 hover:text-primary-700">
                  <Link href="/dashboard/manage/courses">View all</Link>
                </Button>
              </div>
            </div>

            {coursesLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="h-20 animate-pulse rounded-xl bg-slate-50 border border-slate-100" />
                ))}
              </div>
            ) : myCourses.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center bg-slate-50">
                <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">No courses yet</h3>
                <p className="mt-1 text-sm text-slate-500 max-w-xs mx-auto mb-4">
                  Start sharing your knowledge by creating your first course.
                </p>
                <Button asChild>
                  <Link href="/dashboard/manage/courses/new">Create Course</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {myCourses.map((course) => (
                  <div key={course.id} className="group rounded-xl border border-slate-200 p-4 transition-all hover:border-primary-200 hover:shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            course.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                            course.status === 'DRAFT' ? 'bg-slate-100 text-slate-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {course.status}
                          </span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500">{course.level}</span>
                        </div>
                        <h3 className="font-semibold text-slate-900 truncate group-hover:text-primary-700 transition-colors">
                          {course.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {course.enrollmentCount} students
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-400" />
                            {course.averageRating}
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link href={`/dashboard/manage/courses/${course.id}`}>
                          Manage
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Performance Chart Placeholder */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
             <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary-600" />
                Performance
              </h2>
            </div>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-100 border-dashed">
              <p className="text-slate-400 text-sm">Revenue & Enrollment Chart would go here</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { text: 'New student enrolled in "Intro to Cybersecurity"', time: '2 mins ago', icon: Users, color: 'text-blue-600 bg-blue-50' },
                { text: 'Course "Network Security" approved', time: '1 hour ago', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
                { text: 'New review on "Ethical Hacking"', time: '3 hours ago', icon: Star, color: 'text-amber-600 bg-amber-50' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-700 leading-snug">{activity.text}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Action Items</h2>
             <div className="space-y-3">
               <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                 <p className="text-sm font-medium text-amber-800">Pending Review</p>
                 <p className="text-xs text-amber-600 mt-1">"Advanced SOC Analysis" needs your attention for content updates.</p>
                 <Button variant="ghost" className="text-amber-700 h-auto p-0 text-xs mt-2 hover:bg-transparent hover:text-amber-800">View Course &rarr;</Button>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper icons
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}
