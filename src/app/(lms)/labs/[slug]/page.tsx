'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowRight, ChevronRight, Clock, Shield, Tag, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Lab } from '@/lib/lms-labs';
import { fetchLabBySlug } from '@/lib/lms-labs';
import { useAuthStore } from '@/stores/auth-store';
import { useRegionStore } from '@/stores/region-store';
import { getRunForUser, useLabsStore } from '@/stores/labs-store';

export default function LabDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const { tokens } = useAuthStore();
  const { user } = useAuthStore();
  const { regionCode } = useRegionStore();
  const { runs, startOrResumeRun } = useLabsStore();

  const [lab, setLab] = useState<Lab | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    setIsLoading(true);

    fetchLabBySlug(slug, { token: tokens?.accessToken ?? undefined, regionCode: regionCode ?? undefined })
      .then((l) => {
        if (!alive) return;
        setLab(l);
      })
      .finally(() => {
        if (!alive) return;
        setIsLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [slug, tokens?.accessToken, regionCode]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-48 animate-pulse rounded bg-slate-100" />
        <div className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white" />
        <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />
      </div>
    );
  }

  if (!lab) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <div className="text-lg font-semibold text-slate-900">Lab not found</div>
        <div className="mt-2 text-sm text-slate-600">Try returning to the labs catalog.</div>
        <div className="mt-6">
          <Button asChild>
            <Link href="/labs">Back to labs</Link>
          </Button>
        </div>
      </div>
    );
  }

  const run = user ? getRunForUser(runs, user.id, lab.id) : undefined;
  const resumeHref = `/labs/${lab.slug}/run`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/dashboard" className="hover:text-slate-700">Dashboard</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/labs" className="hover:text-slate-700">Labs</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="line-clamp-1 text-slate-700">{lab.title}</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
                {lab.difficulty}
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                {lab.steps.length} steps
              </span>
              {lab.tags.slice(0, 4).map((t) => (
                <span key={t} className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {t}
                </span>
              ))}
            </div>

            <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">{lab.title}</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">{lab.description}</p>

            <div className="mt-4 grid gap-3 text-xs text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>{lab.estimatedMinutes} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-400" />
                <span>{lab.enrollmentCount.toLocaleString()} runs</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-slate-400" />
                <span className="truncate">{lab.tags.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:max-w-sm">
            <div className="text-sm font-semibold text-slate-900">Run this lab</div>
            <div className="mt-2 text-sm text-slate-600">Interactive lab runner with step-by-step validation.</div>
            <Button
              className="mt-4 w-full gap-2"
              onClick={() => {
                if (!user) {
                  return;
                }
                startOrResumeRun({ userId: user.id, labId: lab.id });
              }}
              asChild
            >
              <Link href={resumeHref}>
                {run ? `Resume (${run.progress}%)` : 'Start lab'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600">
              <Shield className="mt-0.5 h-4 w-4 text-primary-600" />
              <div>
                <div className="font-semibold text-slate-900">Enterprise-ready workflow</div>
                <div className="mt-0.5">Designed for global teams, reporting standards, and repeatable playbooks.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Steps</h2>
        <div className="mt-4 space-y-3">
          {lab.steps.map((s, idx) => (
            <div key={s.id} className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm font-semibold text-slate-900">{idx + 1}. {s.title}</div>
              <div className="mt-1 text-sm text-slate-600">{s.objective}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
