'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { LMSLabCard } from '@/components/lms-lab-card';
import type { Lab, LabDifficulty } from '@/lib/lms-labs';
import { fetchLabs } from '@/lib/lms-labs';
import { useAuthStore } from '@/stores/auth-store';
import { useRegionStore } from '@/stores/region-store';
import { getRunForUser, useLabsStore } from '@/stores/labs-store';

const DIFFICULTIES: LabDifficulty[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

export default function LabsPage() {
  const { tokens } = useAuthStore();
  const { user } = useAuthStore();
  const { regionCode } = useRegionStore();
  const { runs } = useLabsStore();

  const [labs, setLabs] = useState<Lab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<LabDifficulty>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let alive = true;
    setIsLoading(true);

    fetchLabs({ token: tokens?.accessToken ?? undefined, regionCode: regionCode ?? undefined })
      .then((data) => {
        if (!alive) return;
        setLabs(data);
      })
      .finally(() => {
        if (!alive) return;
        setIsLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [tokens?.accessToken, regionCode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return labs
      .filter((l) => (selected.size ? selected.has(l.difficulty) : true))
      .filter((l) => {
        if (!q) return true;
        const hay = `${l.title} ${l.shortDescription} ${l.description} ${l.tags.join(' ')}`.toLowerCase();
        return hay.includes(q);
      });
  }, [labs, query, selected]);

  const activeFilterCount = selected.size;

  const clearFilters = () => {
    setSelected(new Set());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Labs</h1>
          <p className="mt-1 text-sm text-slate-600">Hands-on, scenario-driven labs designed for global teams.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowFilters((v) => !v)} className="gap-2" type="button">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1.5 text-xs font-semibold text-white">
                {activeFilterCount}
              </span>
            )}
          </Button>
          {activeFilterCount > 0 && (
            <Button variant="ghost" onClick={clearFilters} className="gap-2" type="button">
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search labs, tags, scenarios..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
            />
          </div>
        </div>

        {showFilters && (
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:w-[360px]">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} type="button">
                Close
              </Button>
            </div>

            <div className="mt-4">
              <div className="text-xs font-semibold text-slate-600">Difficulty</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {DIFFICULTIES.map((d) => {
                  const active = selected.has(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        const next = new Set(selected);
                        if (active) next.delete(d);
                        else next.add(d);
                        setSelected(next);
                      }}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        active
                          ? 'border-primary-200 bg-primary-50 text-primary-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-[188px] animate-pulse rounded-2xl border border-slate-200 bg-white p-5" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <div className="mx-auto max-w-md">
            <div className="text-lg font-semibold text-slate-900">No labs match your search.</div>
            <div className="mt-2 text-sm text-slate-600">Try clearing filters or searching a different scenario.</div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button variant="outline" onClick={clearFilters} type="button">
                Clear filters
              </Button>
              <Button onClick={() => setQuery('')} type="button">
                Reset search
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((lab) => (
            <LMSLabCard
              key={lab.id}
              lab={lab}
              run={user ? getRunForUser(runs, user.id, lab.id) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
