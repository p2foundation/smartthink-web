'use client';

import Link from 'next/link';
import { Clock, Shield, Tag, Users } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { Lab } from '@/lib/lms-labs';
import type { LabRunRecord } from '@/stores/labs-store';

export function LMSLabCard({ lab, run }: { lab: Lab; run?: LabRunRecord }) {
  return (
    <Link
      href={`/labs/${lab.slug}`}
      className={cn(
        'group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all',
        'hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
              {lab.difficulty}
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {lab.steps.length} steps
            </span>
          </div>

          <h3 className="mt-3 line-clamp-2 text-base font-semibold text-slate-900 group-hover:text-primary-700">
            {lab.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-slate-600">{lab.shortDescription}</p>
        </div>

        <div className="hidden shrink-0 sm:block">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 text-white">
            <Shield className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-400" />
          <span>{lab.estimatedMinutes} min</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-slate-400" />
          <span>{lab.enrollmentCount.toLocaleString()} runs</span>
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <Tag className="h-4 w-4 text-slate-400" />
          <span className="truncate">{lab.tags.join(', ')}</span>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="text-sm font-semibold text-slate-900">Open lab</div>
        {run ? (
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {run.progress}%
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
