'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle, Clock, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Lab } from '@/lib/lms-labs';
import { fetchLabs } from '@/lib/lms-labs';
import { useAuthStore } from '@/stores/auth-store';
import { useLabsStore } from '@/stores/labs-store';

export default function MyLabsPage() {
  const { user, tokens } = useAuthStore();
  const { runs, resetRun } = useLabsStore();

  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchLabs({ token: tokens?.accessToken ?? undefined })
      .then((data) => {
        if (!alive) return;
        setLabs(data);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [tokens?.accessToken]);

  const myRuns = useMemo(() => {
    if (!user) return [];
    return Object.values(runs)
      .filter((r) => r.userId === user.id)
      .sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? ''));
  }, [runs, user]);

  const labById = useMemo(() => {
    const map = new Map<string, Lab>();
    for (const l of labs) map.set(l.id, l);
    return map;
  }, [labs]);

  const rows = useMemo(() => {
    return myRuns
      .map((r) => {
        const lab = labById.get(r.labId);
        if (!lab) return null;
        return { lab, run: r };
      })
      .filter(Boolean) as Array<{ lab: Lab; run: (typeof myRuns)[number] }>;
  }, [myRuns, labById]);

  if (!user) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <div className="text-lg font-semibold text-slate-900">Sign in required</div>
        <div className="mt-2 text-sm text-slate-600">Please sign in to view your labs.</div>
        <div className="mt-6">
          <Button asChild>
            <Link href="/login">Go to login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">My Labs</h1>
          <p className="mt-1 text-sm text-slate-600">Hands-on runs, progress, and proof-of-work exports.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/labs">Browse labs</Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-[170px] animate-pulse rounded-2xl border border-slate-200 bg-white p-5" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <div className="mx-auto max-w-md">
            <div className="text-lg font-semibold text-slate-900">No lab runs yet</div>
            <div className="mt-2 text-sm text-slate-600">Run a lab to start building proof-of-work.</div>
            <div className="mt-6">
              <Button asChild>
                <Link href="/labs">Explore labs</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map(({ lab, run }) => {
            const resumeHref = `/labs/${lab.slug}/run`;

            return (
              <div key={lab.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
                        {lab.difficulty}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {run.progress}%
                      </span>
                      {run.completedAt && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                          <CheckCircle className="h-4 w-4" />
                          Complete
                        </span>
                      )}
                    </div>

                    <div className="mt-3 text-base font-semibold text-slate-900 line-clamp-2">{lab.title}</div>

                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>{lab.estimatedMinutes} min</span>
                      <span className="text-slate-300">•</span>
                      <Shield className="h-4 w-4 text-slate-400" />
                      <span>{lab.steps.length} steps</span>
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 text-white">
                    <Shield className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-2 w-full rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-primary-600" style={{ width: `${run.progress}%` }} />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild className="gap-2">
                    <Link href={resumeHref}>
                      Resume
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => resetRun({ userId: user.id, labId: lab.id })}
                    type="button"
                  >
                    Restart
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
