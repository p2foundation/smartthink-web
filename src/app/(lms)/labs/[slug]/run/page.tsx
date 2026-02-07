'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, Circle, Clock, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Lab } from '@/lib/lms-labs';
import { fetchLabBySlug } from '@/lib/lms-labs';
import { useAuthStore } from '@/stores/auth-store';
import { useRegionStore } from '@/stores/region-store';
import { getRunForUser, useLabsStore } from '@/stores/labs-store';

export default function LabRunnerPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const router = useRouter();
  const { tokens, user } = useAuthStore();
  const { regionCode } = useRegionStore();
  const { runs, startOrResumeRun, setActiveStepIndex: persistActiveStep, markStepComplete } = useLabsStore();

  const [lab, setLab] = useState<Lab | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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

  const steps = lab?.steps ?? [];
  const run = user && lab ? getRunForUser(runs, user.id, lab.id) : undefined;

  const activeStepIndex = run?.activeStepIndex ?? 0;
  const activeStep = steps[activeStepIndex];
  const completedStepIds = new Set(run?.completedStepIds ?? []);

  const progress = useMemo(() => {
    if (!steps.length) return 0;
    return run?.progress ?? Math.round((completedStepIds.size / steps.length) * 100);
  }, [completedStepIds, steps.length, run?.progress]);

  const markComplete = async () => {
    if (!activeStep) return;
    if (!user || !lab) return;
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 450));
    startOrResumeRun({ userId: user.id, labId: lab.id });
    markStepComplete({ userId: user.id, labId: lab.id, stepId: activeStep.id, totalSteps: steps.length });
    setIsSaving(false);
  };

  const goNext = () => {
    if (!steps.length) return;
    if (!user || !lab) return;
    startOrResumeRun({ userId: user.id, labId: lab.id });
    persistActiveStep({ userId: user.id, labId: lab.id, index: Math.min(steps.length - 1, activeStepIndex + 1), totalSteps: steps.length });
  };

  const goPrev = () => {
    if (!steps.length) return;
    if (!user || !lab) return;
    startOrResumeRun({ userId: user.id, labId: lab.id });
    persistActiveStep({ userId: user.id, labId: lab.id, index: Math.max(0, activeStepIndex - 1), totalSteps: steps.length });
  };

  if (!user) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <div className="text-lg font-semibold text-slate-900">Sign in required</div>
        <div className="mt-2 text-sm text-slate-600">Please sign in to run labs.</div>
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
        <div className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white" />
      </div>
    );
  }

  if (!lab || !activeStep) {
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

  const isStepComplete = completedStepIds.has(activeStep.id);

  const downloadReport = () => {
    if (!user || !lab) return;
    const report = {
      userId: user.id,
      labId: lab.id,
      labSlug: lab.slug,
      labTitle: lab.title,
      generatedAt: new Date().toISOString(),
      progress,
      activeStepIndex,
      completedStepIds: Array.from(completedStepIds),
      steps: lab.steps.map((s, idx) => ({
        id: s.id,
        index: idx,
        title: s.title,
        objective: s.objective,
        expectedOutcome: s.expectedOutcome,
        completed: completedStepIds.has(s.id),
      })),
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartthink-lab-report-${lab.slug}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href={`/labs/${lab.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primary-700">
            <ArrowLeft className="h-4 w-4" />
            Back to lab
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">{lab.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
              <Clock className="h-4 w-4 text-slate-400" />
              {lab.estimatedMinutes} min
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-2.5 py-1 font-semibold text-primary-700">
              Progress {progress}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={markComplete} disabled={isStepComplete || isSaving} className="gap-2" type="button">
            <CheckCircle className="h-4 w-4" />
            {isStepComplete ? 'Completed' : isSaving ? 'Saving…' : 'Mark complete'}
          </Button>
          <Button variant="outline" onClick={downloadReport} className="gap-2" type="button">
            Download report
          </Button>
          <Button
            onClick={() => {
              if (activeStepIndex >= steps.length - 1) {
                router.push('/dashboard');
                return;
              }
              goNext();
            }}
            className="gap-2"
            type="button"
          >
            {activeStepIndex >= steps.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-600">Step {activeStepIndex + 1} of {steps.length}</div>
              <div className="mt-2 text-lg font-semibold text-slate-900">{activeStep.title}</div>
              <div className="mt-2 text-sm text-slate-600">{activeStep.objective}</div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <Shield className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-700">Expected outcome</div>
            <div className="mt-1 text-sm text-slate-600">{activeStep.expectedOutcome}</div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={goPrev} disabled={activeStepIndex === 0} className="gap-2" type="button">
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/labs">All labs</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Checklist</div>
          <div className="mt-3 space-y-2">
            {steps.map((s, idx) => {
              const done = completedStepIds.has(s.id);
              const active = idx === activeStepIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    if (!user || !lab) return;
                    startOrResumeRun({ userId: user.id, labId: lab.id });
                    persistActiveStep({ userId: user.id, labId: lab.id, index: idx, totalSteps: steps.length });
                  }}
                  className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition ${
                    active
                      ? 'border-primary-200 bg-primary-50 text-primary-800'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{idx + 1}. {s.title}</div>
                    </div>
                    {done ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Circle className="h-4 w-4 text-slate-300" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
