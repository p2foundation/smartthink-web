'use client';

import Link from 'next/link';
import { BookOpen, Clock, Star, Users } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { Course } from '@/shared';
import { useRegionStore } from '@/stores/region-store';
import { formatPrice } from '@/shared';
import { useAuthStore } from '@/stores/auth-store';
import { getEnrollmentForUser, useLmsStore } from '@/stores/lms-store';

export function LMSCourseCard({ course }: { course: Course }) {
  const { regionCode } = useRegionStore();
  const { user } = useAuthStore();
  const { enrollments } = useLmsStore();

  const enrollment = user ? getEnrollmentForUser(enrollments, user.id, course.id) : undefined;

  const pricing = course.regionPricing.find((p) => p.regionCode === regionCode) ?? course.regionPricing[0];
  const price = pricing ? formatPrice(pricing.price, pricing.regionCode) : undefined;
  const originalPrice = pricing?.originalPrice ? formatPrice(pricing.originalPrice, pricing.regionCode) : undefined;

  const minutes = Math.round(course.totalDuration / 60);

  return (
    <Link
      href={`/dashboard/courses/${course.slug}`}
      className={cn(
        'group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all',
        'hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
              {course.level}
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {course.status}
            </span>
          </div>

          <h3 className="mt-3 line-clamp-2 text-base font-semibold text-slate-900 group-hover:text-primary-700">
            {course.title}
          </h3>

          {course.shortDescription && (
            <p className="mt-2 line-clamp-2 text-sm text-slate-600">{course.shortDescription}</p>
          )}
        </div>

        <div className="hidden shrink-0 sm:block">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 opacity-90" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-400" />
          <span>{minutes} min</span>
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
          <span>{course.averageRating.toFixed(1)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="text-sm font-semibold text-slate-900">
          {price ?? '—'}
          {originalPrice && (
            <span className="ml-2 text-xs font-medium text-slate-400 line-through">{originalPrice}</span>
          )}
        </div>

        {enrollment ? (
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {enrollment.progress}%
            </span>
            <div className="text-sm font-semibold text-primary-700">Resume</div>
          </div>
        ) : (
          <div className="text-sm font-semibold text-primary-700">View</div>
        )}
      </div>
    </Link>
  );
}
